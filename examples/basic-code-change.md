# Example — Basic LOW-Risk Code Change

This example shows MORE without role theater.

## Scenario

A bug is confined to one parser function. The change is reversible, has focused tests, and does not affect production state, credentials, data, external providers, or a public compatibility boundary.

The same actor may combine Manager and Executor responsibilities.

```text
Issue #42

Objective:
Fix parsing of empty optional fields.

Risk:
LOW

Scope:
- src/parser.py
- focused parser tests

Acceptance:
- empty optional fields parse successfully
- existing focused parser tests pass
```

No explicit `[MANAGER → EXECUTOR]` self-handoff is necessary if one actor owns the work throughout.

After implementation:

```text
[EXECUTOR → MANAGER]

Status:
COMPLETE

Work item:
Issue #42

Candidate / state:
<exact branch and head>

Result:
- Empty optional fields now parse as intended.

Changes:
- src/parser.py
- tests/test_parser.py

Verification:
- pytest tests/test_parser.py — PASS

Checks not performed:
- Full regression suite — NOT RUN; change is isolated and focused coverage exercises the affected behavior.

Remaining risks:
- None identified.
```

Independent review is optional unless repository policy separately requires it.
