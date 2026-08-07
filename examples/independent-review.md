# Example — Independent Review

## Scenario

An Executor has completed a candidate that requires independent review.

The Reviewer evaluates the exact candidate rather than receiving the Executor's hidden reasoning.

```text
[MANAGER → REVIEWER]

Status:
READY

Work item:
Issue #57

Candidate:
PR #61 at head abc123

Review objective:
Determine whether the parser fix satisfies Issue #57 without changing the public output schema.

Risk:
MEDIUM

Acceptance boundary:
- reported defect is fixed
- public output schema is unchanged
- focused and regression verification remain valid

Evidence available:
- Executor result comment 100200
- CI run for abc123

Independent verification required:
- inspect the exact diff
- exercise the original regression case
- inspect schema-sensitive call sites

Disposition:
APPROVED | CHANGES REQUESTED | NEEDS DECISION | BLOCKED
```

Reviewer result:

```text
[REVIEWER → MANAGER]

Status:
APPROVED

Work item:
Issue #57

Reviewed candidate:
PR #61 at abc123

Result:
- Candidate fixes the regression without changing the public schema.

Direct verification:
- inspected diff — PASS
- reproduced original failure case against candidate — PASS
- inspected schema call sites — PASS

Inherited evidence:
- CI regression suite for abc123 — relied upon; not rerun locally

Remaining risks:
- None material identified.

Decision or action required:
- None.
```

If the candidate later changes materially to `def456`, this approval does not automatically transfer. Unchanged evidence may still be reused and rereview may be limited to the delta.
