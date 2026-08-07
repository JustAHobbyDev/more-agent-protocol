# Project Cedar — Operational Package Preparation

**Source visibility:** Private

Project Cedar is the stable public codename for a private production project used to validate MORE. The public MORE repository intentionally contains no mapping back to the source repository.

## Purpose

This case tested whether MORE could remain precise on a complex production change while keeping package preparation separate from execution authority.

The project needed to extend an existing archival workflow to a second data target while preserving an established single-writer replication path, current durable state, and existing operational protections.

## Current handoff

The active handoff authorized the Executor to:

- perform fresh read-only repository and production inspection;
- reconcile already-reviewed implementation with current deployed state;
- prepare the smallest safe deployment and operational-acceptance package.

It explicitly did **not** authorize the Executor to:

- deploy;
- modify services or schedules;
- load credentials;
- contact external providers;
- archive or replicate data;
- weaken existing protected state.

The eventual production execution was separately classified as consequential work requiring independent review and explicit Owner authorization.

## Why the active actor is Executor, not Reviewer

The work included review-like inspection, but the actor was performing a bounded task assigned by the Manager: construct a candidate execution package.

In MORE terms:

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

The package could inherit stable accepted boundaries such as reviewed implementation contracts and durable single-writer rules.

It still had to refresh volatile state such as:

- installed configuration identity;
- scheduler state;
- process identity and restart state;
- current lock ownership;
- current ledger or accounting state;
- pending work;
- currently eligible work items.

This allowed the package to compress stable context by reference without treating live state as permanently valid.

## MORE lessons

This case validated:

- **risk per handoff** — read-only package preparation can carry lower risk than later consequential execution;
- **package preparation is not execution authority**;
- **Executor is not synonymous with coder**;
- **stable versus volatile evidence**;
- **operation-relevant invariants** — proposed sequencing should become mandatory only when it protects a real safety or acceptance property;
- **shared execution-boundary closure** — package preparer, Reviewer, Manager, and executing Executor have distinct responsibilities;
- **staged verification** — targeted checks during preparation, fresh live preflight at execution, and risk-directed acceptance afterward;
- **risk-driven post-execution review** — external or durable effects may justify independent observation when local deterministic changes would not.

## Distribution lesson

Large operational handoffs should be compressed by referencing stable accepted material, not by deleting safety boundaries.

```text
Compress references, not safety boundaries.
```

MORE does not impose arbitrary handoff word limits.

## Privacy note

Exact repository identifiers, deployment stages, system names, provider identities, data-market names, private issue numbers, revisions, and operational paths remain in the private source. They are not necessary to evaluate the MORE behavior demonstrated here.
