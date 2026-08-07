# Project Cedar — Execution-Boundary Amendment

**Source visibility:** Private

Project Cedar is the stable public codename for a private production project used to validate MORE. The public MORE repository intentionally contains no mapping back to the source repository.

## Purpose

This case exercises the full authority cycle around a consequential but reversible local control change:

```text
Manager → Executor
    read-only inspection + execution-package preparation

Executor → Manager
    exact package + evidence

Manager → Reviewer
    independent package review

Reviewer → Manager
    APPROVED

Owner → Executor
    exact execution authorization

Executor → Manager
    NEEDS DECISION — stopped before mutation

Manager → Reviewer
    bounded path-only amendment

Reviewer → Manager
    APPROVED

Owner → Executor
    fresh authorization for amended package

Executor → Manager
    COMPLETE — package executed and verified
```

## Failure discovered at execution

The reviewed package required creating a quarantine directory under a parent directory that did not actually exist on the target system.

Creating the missing parent would have been a prerequisite mutation outside the exact Owner-authorized allowlist.

The Executor did not infer permission from the apparent harmlessness of the missing directory. It stopped before mutation and reported the package defect.

## Correction

The Manager changed only the quarantine location to an equally suitable path whose parent already existed on the same filesystem.

The amendment inherited the unchanged package evidence and safety boundaries while invalidating only the path-dependent portion.

Because the mutation boundary changed, the amended package received fresh independent review and fresh Owner authorization.

Immediately before execution, volatile live state was refreshed. The amended package then executed and passed its mechanical acceptance checks.

## MORE lessons

This case directly motivated or validated:

- **fail-closed execution** — technical obviousness does not expand authority;
- **execution-boundary closure** — every prerequisite mutation must fit inside the proposed boundary;
- **base + delta handoffs** — narrow defects should produce narrow amendments;
- **evidence reuse** — unchanged package evidence can remain valid across a bounded delta;
- **volatile revalidation** — current live state is refreshed at the consequential boundary;
- **authorization binding** — a changed mutation boundary requires fresh Owner authority;
- **risk-driven post-execution review** — mechanically observable local acceptance may not benefit from a second independent review when residual uncertainty is negligible.

## Privacy note

Exact repository identifiers, hostnames, paths, service names, hashes, issue numbers, and operational provider details remain in the private source. They are not needed to evaluate the MORE behavior demonstrated here.
