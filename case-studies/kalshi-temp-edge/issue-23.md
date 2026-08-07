# Field Case — `kalshi-temp-edge` Issue #23

Source: https://github.com/JustAHobbyDev/kalshi-temp-edge/issues/23

## Purpose

Issue #23 is the clearest field example of the full MORE authority cycle: package preparation, independent review, explicit Owner authorization, fail-closed execution, bounded amendment, renewed review/authorization, successful execution, and closure.

## Sequence

```text
Manager → Executor
    read-only production inspection + execution-package preparation

Executor → Manager
    exact quarantine-and-mask package

Reviewer → Manager
    APPROVED

Owner → Executor
    exact execution authorization

Executor → Manager
    NEEDS DECISION — stopped before mutation

Manager → Reviewer
    path-only amendment

Reviewer → Manager
    APPROVED

Owner → Executor
    fresh authorization for amended package

Executor → Manager
    COMPLETE — exact package executed and verified

Owner → Record
    CLOSED — COMPLETED
```

## Failure discovered at execution

The reviewed package proposed creating:

```text
/etc/kalshi-temp-edge/quarantine/issue-23-legacy-publishers
```

but the parent directory:

```text
/etc/kalshi-temp-edge/quarantine
```

did not exist.

Creating the approved child would therefore require a mutation outside the exact Owner-authorized allowlist.

The Executor did not infer permission to create the missing parent. It stopped before mutation and reported the boundary defect.

## Correction

The Manager amended only the quarantine path to:

```text
/etc/kalshi-temp-edge/issue-23-legacy-publishers
```

whose parent already existed on the same filesystem.

The original package's hashes, protected-state checks, masks, acceptance logic, rollback boundary, and durable Decision 0011 remained incorporated by reference.

The changed mutation boundary received fresh independent review and fresh Owner authorization.

## MORE lessons

This case directly motivated or validated:

- **fail-closed execution** — technical obviousness does not expand authority;
- **execution-boundary closure** — every prerequisite mutation must be inside the proposed boundary;
- **base + delta handoffs** — narrow defects should produce narrow amendments;
- **evidence reuse** — unchanged hashes and package evidence remained useful;
- **volatile revalidation** — live unit/process/lock/ledger state was refreshed before actual mutation;
- **authorization binding** — changing the mutation boundary required fresh Owner authority;
- **risk-driven post-execution review** — the final local systemd acceptance was sufficiently mechanical that a second independent review would have added little confidence.

## Anti-lesson

MORE should not respond to this failure by requiring a new authority registry, command ledger, or package compiler. The failure was addressed by a clearer mutation boundary and a bounded amendment using ordinary GitHub comments.
