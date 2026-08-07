# Example — HIGH-Risk Execution

## Scenario

A production service definition must be replaced. The action changes production state but has a narrow mutation boundary and deterministic acceptance.

Package preparation does not authorize execution.

```text
[MANAGER → EXECUTOR]

Status:
READY

Work item:
Issue #80

Risk:
MEDIUM

Objective:
Inspect current production state and prepare the smallest safe execution package for replacing service X.

In scope:
- read-only inspection
- package preparation

Out of scope:
- production mutation
- credential changes
- provider writes

Acceptance criteria:
- exact preconditions defined
- mutation allowlist closed under execution
- rollback/recovery boundary defined
- implementation-ready package returned
```

After the package is returned, independent review occurs:

```text
[MANAGER → REVIEWER]

Candidate:
Executor result 500100

Risk:
HIGH for eventual execution

Review objective:
Independently evaluate the exact production package, including hidden prerequisite mutations, stop conditions, verification, and rollback.
```

If approved, the Owner records exact authority:

```text
[OWNER → EXECUTOR]

I authorize execution of the exact package in result 500100,
independently approved in review 500140.

Authorization applies only at the expected pre-state and only
within the exact mutation boundary described there.

Refresh all material volatile preconditions before mutation.
Stop before mutation on material drift or any required mutation
outside the authorized boundary.
```

The executing Executor revalidates live state and either executes exactly or fails closed.

Stable evidence such as an immutable artifact checksum may be inherited. Volatile evidence such as current service state, lock ownership, or live configuration is refreshed at execution time.
