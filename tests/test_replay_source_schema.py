"""Replay/fork source-schema validation tests.

Replay re-inserts rows whose column names come from the source database's own
schema. These tests pin the structural gate (engine.schema.assert_source_table_schema)
and the quoted-identifier inserts (engine.store.Store) that together keep a
crafted shared run archive from smuggling SQL into a destination store.
"""
from __future__ import annotations

import sqlite3

import pytest

from engine.schema import (
    SchemaCompatibilityError,
    assert_source_table_schema,
    initialize_schema,
)
from engine.store import Store

from run import REPLAY_EXTERNAL_SOURCE_TABLES, REPLAY_INPUT_TABLES


def _fresh_source() -> sqlite3.Connection:
    conn = sqlite3.connect(":memory:")
    initialize_schema(conn)
    return conn


def test_current_schema_source_passes():
    conn = _fresh_source()
    try:
        assert_source_table_schema(
            conn, REPLAY_INPUT_TABLES + REPLAY_EXTERNAL_SOURCE_TABLES,
            required_tables=REPLAY_INPUT_TABLES)
    finally:
        conn.close()


def test_missing_required_input_table_is_rejected():
    conn = _fresh_source()
    try:
        conn.execute("DROP TABLE calibration_targets")
        with pytest.raises(SchemaCompatibilityError, match="missing required table"):
            assert_source_table_schema(
                conn, REPLAY_INPUT_TABLES, required_tables=REPLAY_INPUT_TABLES)
    finally:
        conn.close()


def test_missing_optional_external_table_is_allowed():
    conn = _fresh_source()
    try:
        conn.execute("DROP TABLE external_agent_connections")
        assert_source_table_schema(
            conn, REPLAY_EXTERNAL_SOURCE_TABLES, required_tables=())
    finally:
        conn.close()


def test_crafted_injection_column_is_rejected():
    conn = _fresh_source()
    try:
        # Model a crafted shared archive: a quoted column whose name smuggles
        # an INSERT ... SELECT suffix into an unquoted identifier context.
        conn.execute("DROP TABLE calibration_targets")
        conn.execute('CREATE TABLE calibration_targets '
                     '("id) SELECT ? --" TEXT, dataset TEXT)')
        with pytest.raises(SchemaCompatibilityError, match="incompatible schema"):
            assert_source_table_schema(conn, ("calibration_targets",))
    finally:
        conn.close()


def test_extra_source_column_is_rejected():
    conn = _fresh_source()
    try:
        conn.execute("ALTER TABLE calibration_targets ADD COLUMN smuggled TEXT")
        with pytest.raises(SchemaCompatibilityError, match="incompatible schema"):
            assert_source_table_schema(conn, ("calibration_targets",))
    finally:
        conn.close()


def test_quoted_insert_cannot_escape_statement_shape(tmp_path):
    store = Store(str(tmp_path / "dest.db"), create=True)
    try:
        # The identifier is quoted, so a crafted column name stays a column
        # name: SQLite rejects the unknown column instead of executing a
        # smuggled INSERT ... SELECT.
        with pytest.raises(sqlite3.OperationalError):
            store.insert("calibration_targets", **{"id) SELECT ? --": "x"})
    finally:
        store.close()


def test_quoted_insert_round_trips_normal_columns(tmp_path):
    store = Store(str(tmp_path / "dest.db"), create=True)
    try:
        row_id = store.insert(
            "calibration_targets", dataset_manifest_id=1,
            target_key="gdp", value_json='{"v": 1}', unit="usd")
        assert int(row_id) > 0
        row = store.query_one(
            "SELECT target_key, unit FROM calibration_targets WHERE id=?", (row_id,))
        assert (row["target_key"], row["unit"]) == ("gdp", "usd")
        store.update("calibration_targets", row_id, unit="cad")
        assert store.scalar("SELECT unit FROM calibration_targets WHERE id=?",
                            (row_id,)) == "cad"
        store.init_run_meta("quote-roundtrip", 1, {})
        store.set_meta(status="paused")
        assert store.get_meta()["status"] == "paused"
        store.commit()
    finally:
        store.close()


def test_older_source_may_omit_defaulted_additive_column():
    conn = _fresh_source()
    try:
        conn.execute("DROP TABLE calibration_targets")
        conn.execute("CREATE TABLE calibration_targets (id INTEGER PRIMARY KEY, "
                     "dataset_manifest_id INTEGER NOT NULL, target_key TEXT NOT NULL, "
                     "value_json TEXT NOT NULL, unit TEXT NOT NULL)")
        assert_source_table_schema(conn, ("calibration_targets",))
    finally:
        conn.close()
