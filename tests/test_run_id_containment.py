"""Run-id path containment and checkpoint-source integrity (security L7/L8).

``--resume`` / ``--export-static`` / ``--report`` / ``--fork RUNID@TICK`` derive
a database path from an operator-supplied run id. These tests prove that every
derived path stays inside the run data root, that a tampered ``checkpoints.path``
row cannot redirect a fork copy, and that normal run ids still resolve.
"""
from __future__ import annotations

import shutil
import sys

import pytest

import run as run_module
from engine.store import Store
from run import _contained_run_database, fork_run, open_run


# ── shared helper ───────────────────────────────────────────────────────────

def test_contained_run_database_accepts_run_ids_and_contained_paths(tmp_path):
    runs = tmp_path / "runs"
    runs.mkdir()
    assert _contained_run_database("normal-run", runs) == (
        runs / "normal-run.db").resolve()

    inside = runs / "explicit.db"
    inside.write_bytes(b"")
    assert _contained_run_database(
        str(inside), runs, accept_explicit_path=True) == inside.resolve()


@pytest.mark.parametrize("value", ["../../x", "../x", "/abs/path/x", "a/b", "normal\n"])
def test_contained_run_database_rejects_escaping_run_ids(tmp_path, value):
    runs = tmp_path / "runs"
    runs.mkdir()
    with pytest.raises(ValueError, match="invalid run id|escapes the run data root"):
        _contained_run_database(value, runs)


def test_contained_run_database_rejects_paths_and_symlinks_outside_root(tmp_path):
    runs = tmp_path / "runs"
    runs.mkdir()
    outside = tmp_path / "outside.db"
    outside.write_bytes(b"")
    with pytest.raises(ValueError, match="escapes the run data root"):
        _contained_run_database(str(outside), runs, accept_explicit_path=True)

    link = runs / "link.db"
    link.symlink_to(outside)
    with pytest.raises(ValueError, match="escapes the run data root"):
        _contained_run_database("link", runs)


# ── resume ──────────────────────────────────────────────────────────────────

def test_open_run_resume_rejects_out_of_root_targets_without_creating_files(
        tmp_path):
    runs = tmp_path / "runs"
    outside = tmp_path / "outside"
    outside.mkdir()
    (outside / "x.db").write_bytes(b"")
    sentinel = outside / "x.db"

    for value in ("../../x", "../x", str(outside / "x")):
        with pytest.raises(ValueError, match="invalid --resume target"):
            open_run({}, value, None, data_dir=runs)

    assert list(runs.iterdir()) == []
    assert sentinel.read_bytes() == b""


def test_cli_resume_rejects_out_of_root_run_id(tmp_path, monkeypatch, capsys):
    runs = tmp_path / "runs"
    runs.mkdir()
    monkeypatch.setattr(run_module, "DATA_DIR", runs)
    monkeypatch.setattr(run_module, "load_dotenv", lambda: None)
    monkeypatch.setattr(run_module, "configure_logging", lambda: None)
    monkeypatch.setattr(sys, "argv", [
        "run.py", "--config", "runs/base.yaml", "--resume", "../../x",
    ])

    with pytest.raises(SystemExit) as exc:
        run_module.main()

    assert exc.value.code == 2
    assert "--resume target" in capsys.readouterr().err


# ── export-static ───────────────────────────────────────────────────────────

def test_cli_export_static_rejects_out_of_root_path(tmp_path, monkeypatch, capsys):
    runs = tmp_path / "runs"
    runs.mkdir()
    outside = tmp_path / "outside.db"
    outside.write_bytes(b"")
    monkeypatch.setattr(run_module, "DATA_DIR", runs)
    monkeypatch.setattr(run_module, "load_dotenv", lambda: None)
    monkeypatch.setattr(run_module, "configure_logging", lambda: None)
    monkeypatch.setattr(sys, "argv", [
        "run.py", "--export-static", str(outside),
    ])

    with pytest.raises(SystemExit) as exc:
        run_module.main()

    assert exc.value.code == 2
    assert "escapes the run data root" in capsys.readouterr().err


def test_cli_report_rejects_out_of_root_run_id(tmp_path, monkeypatch, capsys):
    runs = tmp_path / "runs"
    runs.mkdir()
    monkeypatch.setattr(run_module, "DATA_DIR", runs)
    monkeypatch.setattr(run_module, "load_dotenv", lambda: None)
    monkeypatch.setattr(run_module, "configure_logging", lambda: None)
    monkeypatch.setattr(sys, "argv", ["run.py", "--report", "../../x"])

    with pytest.raises(SystemExit) as exc:
        run_module.main()

    assert exc.value.code == 2
    assert "invalid run id" in capsys.readouterr().err


# ── fork ────────────────────────────────────────────────────────────────────

@pytest.mark.parametrize("spec", ["../x@1", "/abs/path/x@1", "a/b@1"])
def test_fork_rejects_escaping_run_ids(tmp_path, spec):
    runs = tmp_path / "runs"
    runs.mkdir()

    with pytest.raises(SystemExit, match="invalid run id|escapes the run data root"):
        fork_run(spec, data_dir=runs)

    assert list(runs.iterdir()) == []


def _fork_parent(tmp_path, *, stored_path: str | None = None):
    """A parent run whose checkpoint lives in its configured checkpoint root."""
    runs = tmp_path / "runs"
    checkpoints = tmp_path / "checkpoints"
    runs.mkdir()
    checkpoints.mkdir()
    config = {
        "seed": 7,
        "checkpoint_dir": str(checkpoints),
        "engine_semantics_version": 1,
    }
    parent_db = runs / "parent.db"
    derived = checkpoints / "parent_t1.db"
    store = Store(str(parent_db))
    store.init_run_meta("parent", 7, config)
    store.insert(
        "checkpoints", tick=1,
        path=str(derived if stored_path is None else stored_path),
        created_at="2026-10-07T00:00:00Z")
    store.commit()
    store.close()
    # Copy after close so SQLite has checkpointed its WAL into the main file.
    shutil.copyfile(parent_db, derived)
    return runs, checkpoints, derived


def test_fork_from_validated_checkpoint_succeeds(tmp_path):
    runs, _checkpoints, _derived = _fork_parent(tmp_path)

    new_id = fork_run("parent@1", data_dir=runs)

    dest = runs / f"{new_id}.db"
    assert dest.exists()
    store = Store(str(dest), read_only=True)
    try:
        meta = store.get_meta()
        assert meta["run_id"] == new_id
        assert meta["parent_run_id"] == "parent"
    finally:
        store.close()


def test_fork_rejects_tampered_checkpoint_path(tmp_path):
    outside = tmp_path / "outside.db"
    outside.write_bytes(b"SQLite format 3\x00not a real database")
    runs, _checkpoints, _derived = _fork_parent(tmp_path, stored_path=str(outside))
    before = outside.read_bytes()

    with pytest.raises(SystemExit, match="disagrees with its derived path"):
        fork_run("parent@1", data_dir=runs)

    assert outside.read_bytes() == before
    assert sorted(path.name for path in runs.iterdir()
                  if path.suffix == ".db") == ["parent.db"]


def test_fork_rejects_symlinked_checkpoint(tmp_path):
    outside = tmp_path / "outside.db"
    outside.write_bytes(b"SQLite format 3\x00not a real database")
    runs, _checkpoints, derived = _fork_parent(tmp_path)
    derived.unlink()
    derived.symlink_to(outside)

    with pytest.raises(SystemExit, match="escapes its checkpoint root"):
        fork_run("parent@1", data_dir=runs)

    assert sorted(path.name for path in runs.iterdir()
                  if path.suffix == ".db") == ["parent.db"]


def test_fork_rejects_hardlinked_explicit_checkpoint(tmp_path):
    runs, _checkpoints, derived = _fork_parent(tmp_path)
    link = tmp_path / "hardlink.db"
    link.hardlink_to(derived)

    with pytest.raises(SystemExit, match="unaliased regular file"):
        fork_run(str(link), data_dir=runs)

    assert sorted(path.name for path in runs.iterdir()) == ["parent.db"]
