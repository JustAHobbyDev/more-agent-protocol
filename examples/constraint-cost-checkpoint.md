# Example — Constraint-Cost Checkpoint

This example shows when a Manager should reassess a constraint instead of continuing to add machinery around it.

## Trigger

A deployment recommendation assumes uninterrupted operation. That assumption is not an explicit Owner requirement, but preserving it now requires additional scheduling, locking, catch-up, recovery, and acceptance logic.

Before authorizing more of that machinery, the Manager compares:

- preserving uninterrupted operation and accepting its lifecycle burden;
- using a bounded maintenance window or temporary backlog;
- replacing a weak external primitive that requires reconciliation.

The Manager may choose an alternative only within delegated authority. If the choice consequentially changes availability, architecture, provider, cost, durability, safety, or other project policy, the Manager reports `NEEDS DECISION` and presents the bounded alternatives to the Owner.

## Boundaries

| Case | Result |
| --- | --- |
| A security or data-integrity invariant is costly | Preserve it. Cost does not authorize weakening a required safety boundary; any permissible consequential change requires Owner authority. |
| Zero downtime is only an inherited assumption | Compare its orchestration burden with a maintenance window or temporary backlog before adding more machinery. |
| A provider limitation drives growing reconciliation logic | Surface replacement or relaxation as an architectural option; obtain Owner authority if the choice is consequential. |
| A Reviewer finds one narrow bug in proportionate work | Apply narrow remediation. Do not force an architecture reconsideration. |
| Successive defects cluster in controls that preserve one negotiable assumption | Treat the pattern as sufficient evidence to run the checkpoint; the findings do not themselves authorize a changed constraint. |
| The Owner explicitly requires uninterrupted operation | Record the required constraint and continue. Do not repeat the checkpoint without materially new evidence or a changed proposal. |

The checkpoint does not require a scorecard, numeric threshold, standing review, or new approval layer. Its purpose is to keep a negotiable assumption from becoming self-justifying merely because compensating work has already begun.
