# Example — Independently Orchestrated Child Stream

This example distinguishes a bounded Executor task from a child stream that coordinates its own work.

## Ordinary bounded delegation

Manager A delegates one implementation task to Executor E and remains the identifiable return destination. No child Manager is needed:

```text
Issue #40

[MANAGER → EXECUTOR]

Objective:
Implement the bounded parser correction.

Return to:
Manager A in Issue #40.
```

Executor E returns `[EXECUTOR → MANAGER]` in Issue #40 for Manager A to reconcile.

## Independent child stream

Manager A creates Issue #41 to coordinate its own implementation and independent review. Issue #41 establishes its Manager responsibility and bounded lineage:

```text
Issue #41

[MANAGER → MANAGER]

Parent delegation:
Issue #40, <exact handoff reference if needed>

Objective:
Prepare and independently review the parser compatibility candidate.

Delegated authority:
- modify the parser and focused tests
- coordinate Executor and Reviewer work in Issue #41

Out of scope:
- release or deployment
- changes outside the parser compatibility boundary

Return to:
Manager A in Issue #40.
```

A fresh context can bind to Issue #41 as its Manager, delegate bounded work, and reconcile Executor and Reviewer returns. Its authority cannot exceed Manager A's delegation, and it cannot manufacture Owner authority.

If Issue #41 instead contains only `[MANAGER → EXECUTOR]` and no recoverable Manager responsibility, the Executor may report its bounded result but must not become Manager. It reports the malformed return boundary and waits for the delegating Manager or another authorized project source to establish an unambiguous Manager handoff. No daemon, registry, or persistent Manager process is required.
