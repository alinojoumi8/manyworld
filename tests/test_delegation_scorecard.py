from analysis.delegation_scorecard import aggregate, domains, majority


def test_two_votes_are_not_a_majority():
    assert majority(["WAIT", "WAIT", "ACT", "INSUFFICIENT_INFORMATION"]) is None
    assert majority(["WAIT", "WAIT", "ACT", "ACT"]) is None
    assert majority(["WAIT", "ACT", "ACT", "ACT"]) == "ACT"


def test_wait_in_mixed_menu_is_not_attributed_as_selected_domain():
    row = {"case_id": "one", "exposed_domains": ["career", "consumption"],
           "selected_domains": [], "majority": "WAIT", "actual_wait": True,
           "preferred_domain_votes": {}}
    result = aggregate([row], ["career", "consumption", "funding"])
    assert [r["menu_exposure_cases"] for r in result] == [1, 1, 0]
    assert all(r["selected_cases"] == 0 for r in result)
    assert all(r["missed_opportunity_cases_with_three_named_domain_votes"] == 0 for r in result)


def test_missed_opportunity_requires_majority_and_named_domain_support():
    rows = [{"case_id": "one", "exposed_domains": ["career", "founder_operations"],
             "selected_domains": [], "majority": "ACT", "actual_wait": True,
             "preferred_domain_votes": {"founder_operations": 3, "career": 1}}]
    result = aggregate(rows, ["career", "founder_operations"])
    assert result[0]["missed_opportunity_cases_with_three_named_domain_votes"] == 0
    assert result[1]["missed_opportunity_cases_with_three_named_domain_votes"] == 1


def test_bundles_preserve_both_domains_without_adding_wait():
    assert domains({"domain": "consumption+career"}) == {"consumption", "career"}
    assert domains({"domain": "wait"}) == set()
