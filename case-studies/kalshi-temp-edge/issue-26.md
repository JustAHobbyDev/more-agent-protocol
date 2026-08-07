# Field Case — `kalshi-temp-edge` Issue #26

Source: https://github.com/JustAHobbyDev/kalshi-temp-edge/issues/26

## Purpose

Issue #26 is a large operational-planning handoff. It tests whether MORE can remain precise on a complex production task without confusing package preparation with execution authority.

At the time of analysis, Issue #26 contained an active `[MANAGER → EXECUTOR]` handoff and no result comments yet.

## Current handoff

The Executor is authorized to:

- perform fresh read-only repository and production inspection;
- reconcile the accepted Stage B code with current deployed state;
- prepare the smallest safe deployment and operational-acceptance package.

The Executor is explicitly **not** authorized to:

- deploy;
- modify services or timers;
- load credentials;
- contact providers;
- archive or replicate data;
- alter the protected Issue #23 state.

The eventual production execution is separately recognized as consequential work requiring independent review and explicit Owner approval.

## Why the active actor is Executor, not Reviewer

The handoff sometimes uses ordinary-language phrases such as “deployment-scope review,” but the active actor is performing a bounded task assigned by the Manager: inspect and construct a candidate package.

In MORE terminology:

```text
Manager → Executor
    package preparation

Executor → Manager
    candidate package

Manager → Reviewer
    independent evaluation of that package
```

Roles describe authority relationships, not verbs or professions.

## Stable versus volatile state

Issue #26 references stable accepted boundaries such as prior PR implementations and durable single-writer Decision 0011, while also requiring fresh observation of volatile state such as:

- installed unit hashes;
- timer state;
- collector PIDs/restarts;
- current lock ownership;
- current ledger state;
- pending replication;
- locally eligible archive work.

MORE can therefore compress stable context by exact reference while refreshing live evidence that can drift.

## MORE lessons

This case validated:

- **risk per handoff** — current read-only package preparation can be MEDIUM while later production execution is HIGH;
- **package preparation is not execution authority**;
- **Executor is not synonymous with coder**;
- **stable versus volatile evidence**;
- **operation-relevant invariants** — proposed command details should not become hard requirements unless they protect a real safety or acceptance property;
- **shared execution-boundary closure** — package preparer, Reviewer, Manager, and executing Executor each have distinct responsibilities;
- **staged verification**;
- **risk-driven post-execution review** — provider/data effects can justify independent observation where a purely local deterministic change may not.

## Distribution lesson

Large operational handoffs should be compressed by referencing stable accepted material, not by deleting safety boundaries.

```text
Compress references, not safety boundaries.
```

MORE does not impose arbitrary handoff word limits.
