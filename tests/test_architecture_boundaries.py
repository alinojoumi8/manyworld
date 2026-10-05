from importlib import import_module
from inspect import Parameter, signature
from typing import get_type_hints


RETAINED_SYMBOLS = {
    "hosted.auth": (
        "AuthFailure",
        "LoginThrottlePolicy",
        "SessionCredentials",
        "UserRecord",
    ),
    "engine.types": (
        "ActionEnvelope",
        "Clause",
        "ValidationError",
    ),
    "agents.passports": (
        "LocalCitizenshipService",
        "SqlitePassportRepository",
    ),
}

REMOVED_SYMBOLS = {
    "hosted.auth": (
        "AuthService",
        "AuthStore",
        "InviteRecord",
        "PendingUser",
        "SessionRecord",
        "AuthenticatedSession",
        "login_throttle_key",
    ),
    "engine.types": (
        "Money",
        "Contract",
        "Obligation",
        "LegalMatter",
        "LegalDecision",
        "Claim",
        "InformationExposure",
        "Bill",
        "PolicyRuleChange",
        "Region",
        "FxOrder",
        "DatasetManifest",
        "ScenarioPack",
    ),
    "agents.passports": ("PassportRepository",),
}


def test_retained_architecture_symbols_remain_importable():
    for module_name, symbol_names in RETAINED_SYMBOLS.items():
        module = import_module(module_name)
        missing = [name for name in symbol_names if not hasattr(module, name)]
        assert not missing, f"{module_name} no longer exposes {missing}"


def test_removed_architecture_symbols_do_not_return():
    for module_name, symbol_names in REMOVED_SYMBOLS.items():
        module = import_module(module_name)
        restored = [name for name in symbol_names if hasattr(module, name)]
        assert not restored, f"{module_name} restored retired symbols {restored}"


def test_prepared_attach_uses_an_optional_concrete_passport_repository():
    passports = import_module("agents.passports")
    constructor = passports.LocalCitizenshipService.__init__
    repository = signature(constructor).parameters["repository"]
    # Prepared-run attachment reuses validated storage without initializing it.
    # This concrete seam must not restore the retired PassportRepository protocol.
    assert repository.kind is Parameter.KEYWORD_ONLY
    assert repository.default is None
    assert get_type_hints(constructor)["repository"] == passports.SqlitePassportRepository | None
