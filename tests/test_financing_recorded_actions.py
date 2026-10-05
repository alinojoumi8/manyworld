"""Offline recorded engine-action replay; whole-world replay is a separate gate."""
from __future__ import annotations

import hashlib
import json
import random
import sqlite3

import pytest

from engine.actions import ActionExecutor
from engine.core import Economy
from engine.store import Store
from world.replay_verify import verify_replay
from .conftest import make_agent, make_bank


@pytest.mark.parametrize("semantics", [7, 12])
def test_recorded_financing_actions_replay_exactly_without_rewriting_source(tmp_path, semantics):
    config = {"engine_semantics_version": semantics, "legal": {"enabled": True}}
    source_path, initial_path, replay_path = [tmp_path / name for name in ("source.db", "initial.db", "replay.db")]
    source = Store(str(source_path))
    source.init_run_meta("financing-fixture", 31, config)
    economy = Economy(source, config, random.Random(31), random.Random(32))
    economy.ensure_system_accounts()
    bank = make_bank(economy, reserves=5_000_000)
    founder, _ = make_agent(economy, bank, name="Founder", cash=2_000_000)
    investor, investor_account = make_agent(economy, bank, name="Investor", cash=2_000_000,
        kind="staff", role="vc_partner", occupation="venture capitalist")
    lawyer, _ = make_agent(economy, bank, name="Counsel", cash=100_000,
        kind="staff", role="lawyer", occupation="lawyer")
    firm = economy.firms.found_firm(0, founder, "Recorded Startup", "tech", opening_capital_cents=200_000)
    firm_account = int(economy.firms.get(firm)["account_id"])
    source.commit()
    with sqlite3.connect(initial_path) as baseline:
        source.conn.backup(baseline)
    initial_investor = economy.ledger.balance(investor_account)
    initial_firm = economy.ledger.balance(firm_account)
    executor = ActionExecutor(economy)
    records = []
    def record(tick, actor, action):
        result = executor.execute_action(tick, actor, action)
        assert result["ok"], result
        records.append({"tick": tick, "actor": actor, "action": action, "result": result})
        return result
    pitch = record(1, founder, {"type": "pitch_vc", "firm_id": firm, "ask": 250_000, "summary": "Recorded round"})
    offered = record(2, investor, {"type": "propose_term_sheet", "firm_id": firm,
        "instrument_type": "preferred_equity", "amount_cents": 250_000,
        "pre_money_cents": 1_000_000, "equity_bps": 2000,
        "metadata": {"pitch_id": pitch["pitch_id"]}})
    sheet = offered["term_sheet_id"]
    record(3, founder, {"type": "accept_term_sheet", "term_sheet_id": sheet})
    record(4, lawyer, {"type": "run_due_diligence", "term_sheet_id": sheet})
    record(5, investor, {"type": "close_funding_round", "term_sheet_id": sheet})
    assert economy.ledger.balance(investor_account) == initial_investor - 250_000
    assert economy.ledger.balance(firm_account) == initial_firm + 250_000
    assert economy.ledger.reconcile()[0]
    assert economy.startups.cap_table_reconciles(firm)
    source.set_meta(tick=5, status="paused")
    source.commit()
    source.close()
    digest = hashlib.sha256(source_path.read_bytes()).hexdigest()
    # Serialize the recording before consumption; replay cannot infer new terms.
    records = json.loads(json.dumps(records))
    with sqlite3.connect(initial_path) as baseline, sqlite3.connect(replay_path) as destination:
        baseline.backup(destination)
    replay = Store(str(replay_path))
    try:
        restored = Economy(replay, config, random.Random(31), random.Random(32))
        executor = ActionExecutor(restored)
        for item in records:
            assert executor.execute_action(item["tick"], item["actor"], item["action"]) == item["result"]
        assert replay.scalar("SELECT COUNT(*) FROM funding_rounds") == 1
        assert restored.ledger.reconcile()[0]
        assert restored.startups.cap_table_reconciles(firm)
        replay.set_meta(tick=5, status="paused")
        replay.commit()
        proof = verify_replay(source_path, replay_path)
        assert proof["exact"], proof["differences"]
        before = restored.ledger.balance(firm_account)
        assert not executor.execute_action(6, investor, records[-1]["action"])["ok"]
        assert replay.scalar("SELECT COUNT(*) FROM funding_rounds") == 1
        assert restored.ledger.balance(firm_account) == before
    finally:
        replay.close()
    assert hashlib.sha256(source_path.read_bytes()).hexdigest() == digest
