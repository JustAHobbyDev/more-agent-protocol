# Example — Bounded Amendment

## Scenario

A HIGH execution package has already been independently reviewed and Owner-authorized. At execution time, the Executor discovers that one proposed quarantine path has a missing parent directory outside the approved mutation allowlist.

The Executor must not infer permission to create the parent.

```text
[EXECUTOR → MANAGER]

Status:
NEEDS DECISION

Work item:
Issue #91

Result:
- Stopped before mutation.
- Approved target `/etc/app/quarantine/item` requires creation of unapproved parent `/etc/app/quarantine`.

Changes:
- None.

Verification:
- all other preflight state remains at reviewed boundary — PASS
- execution-boundary closure for approved path — FAIL

Recommended next action:
- amend only the quarantine path to a child of an already-existing same-filesystem parent.
```

The Manager may issue a delta rather than rewriting the whole package:

```text
[MANAGER → REVIEWER]

Status:
READY

Base:
Executor package 700100

Changed:
- quarantine path only:
  old: /etc/app/quarantine/item
  new: /etc/app/item-quarantine

Inherited:
- all original unit hashes
- protected-state checks
- mask operations
- acceptance checks
- rollback/recovery rules
- prohibitions

Invalidated evidence:
- path existence and same-filesystem evidence for the old target

New verification:
- existing parent is real, non-symlink, same filesystem
- new target absent
- old proposed target remains absent

Required approval:
- Reviewer + fresh Owner authorization
```

If the Reviewer approves the bounded amendment, the Owner authorizes the amended composition by exact reference. Unchanged evidence survives; consequential authority for the changed mutation boundary does not transfer automatically.
