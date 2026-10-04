from copy import deepcopy

import pytest

from analysis.prepare_recruiting_comparison import baseline, presentation


@pytest.fixture
def evaluation():
    return {"state": {"own_business": {"firm_id": 5, "currency_code": "USD",
            "employees": 0, "open_jobs": 0, "target_headcount": 2},
            "resources": {"firm:5:USD": {"available_cents": 100}},
            "goals": [], "memories": [{"text": "unchanged"}]},
            "questions": {"action": {"criteria": {
                "post": {"actions": [{"type": "post_job", "firm_id": 5, "wage": 100}],
                         "requirements": {"firm:5:USD": 100}},
                "wait": {"actions": []}}}}}


def test_only_one_added_field_and_no_source_mutation(evaluation):
    before = deepcopy(evaluation)
    changed = presentation(evaluation)
    lens = changed["state"].pop("recruiting_evidence")
    assert changed == evaluation == before
    for pointer, value in lens.items():
        source = evaluation
        for part in pointer.strip("/").split("/"):
            source = source[part]
        assert source == value


def test_gap_uses_existing_exact_candidate(evaluation):
    assert baseline(evaluation)["choice"] == "post"


@pytest.mark.parametrize("employees,vacancies", [(2, 0), (0, 2), (1, 1), (3, 0)])
def test_target_covered_does_not_post(evaluation, employees, vacancies):
    evaluation["state"]["own_business"].update(employees=employees, open_jobs=vacancies)
    assert baseline(evaluation)["choice"] == "wait"


def test_missing_staffing_is_unknown_not_zero(evaluation):
    del evaluation["state"]["own_business"]["employees"]
    assert baseline(evaluation)["choice"] is None
    assert "/state/own_business/employees" not in presentation(evaluation)["state"]["recruiting_evidence"]


def test_personal_cash_cannot_fund_firm(evaluation):
    evaluation["state"]["resources"] = {"agent:27:USD": {"available_cents": 10000000}}
    assert baseline(evaluation)["choice"] is None


def test_currency_mismatch_deferred(evaluation):
    evaluation["state"]["own_business"]["currency_code"] = "CAD"
    assert baseline(evaluation)["choice"] is None


def test_no_invented_or_bundled_candidate(evaluation):
    evaluation["questions"]["action"]["criteria"]["post"]["actions"].append({"type": "set_price"})
    assert baseline(evaluation)["choice"] is None


def test_wrong_firm_deferred(evaluation):
    evaluation["questions"]["action"]["criteria"]["post"]["actions"][0]["firm_id"] = 6
    assert baseline(evaluation)["choice"] is None


def test_insufficient_funds_deferred(evaluation):
    evaluation["state"]["resources"]["firm:5:USD"]["available_cents"] = 99
    assert baseline(evaluation)["choice"] is None


def test_refuses_double_intervention(evaluation):
    with pytest.raises(ValueError):
        presentation(presentation(evaluation))
