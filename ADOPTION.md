# Adopting MORE in an Existing Repository

MORE is designed to fit an established GitHub project without replacing working project practices.

The goal of adoption is not to copy the full specification into repository instructions. It is to identify which MORE behaviors the project already has, add only the missing authority and handoff semantics, and begin using them prospectively.

## 1. Inspect before changing anything

Before adopting MORE, inspect the project's current coordination surfaces.

At minimum, check:

- repository-level agent or contributor instructions;
- README and durable project-state documentation;
- architecture or decision records;
- current issues and pull requests;
- existing review and release practices;
- deployment, security, or production-authorization rules;
- any current work item that would be affected by adoption.

Do not assume MORE terminology is absent merely because the project uses different names.

## 2. Map existing controls to MORE

MORE roles are authority relationships, not required job titles.

A project may already have equivalent concepts:

| Existing concept | MORE relationship |
| --- | --- |
| maintainer, coordinator, lead | Manager when bounding and coordinating work |
| project owner, authorized maintainer | Owner when making consequential decisions |
| independent code or package review | Reviewer |
| implementer, investigator, operator | Executor |

Reuse working terminology when its meaning is clear. Do not rename project concepts merely to make them look MORE-shaped.

Likewise, preserve working project artifacts. A current-state document, architecture-decision record, security policy, release procedure, or deployment guide is not a duplicate MORE artifact when it records durable project knowledge rather than transient task authority.

## 3. Identify only the missing semantics

A minimal adoption normally needs no more than:

- a latest-addressed-handoff rule;
- the four conceptual role definitions or an equivalent mapping;
- a bounded Executor handoff/result convention;
- independent-review semantics where required;
- explicit Owner authorization semantics for consequential work;
- evidence and cold-start rules.

If the repository already expresses one of these clearly, keep it.

Do not add a second issue tracker, project board, command ledger, session journal, authority registry, label taxonomy, or task database merely to adopt MORE.

## 4. Minimal repository instruction

A repository starting without equivalent instructions may use the following block from the MORE specification:

```text
## MORE Work Handoffs

This repository uses MORE:
Manager / Owner / Reviewer / Executor.

For a MORE-governed GitHub work item:

- The latest handoff explicitly addressed to the acting role is operative instruction and authority.
- Historical instructions are context unless the active handoff incorporates them by exact reference.
- New authority does not erase unresolved evidence, failed verification, or observed technical facts.
- Repository and observed system state are technical truth.
- Verification outranks assertion.
- Executor means the role performing the bounded task; it is not limited to coding.
- Required independent review must be performed by a Reviewer separate from the active Executor.
- HIGH consequential execution requires independent review and explicit Owner authorization.
- The Executor must stop before mutation when execution would exceed the exact authorized boundary.
- Unchanged valid evidence may be inherited; volatile preconditions must be refreshed at the consequential boundary.
- Reviewer approval and Owner authorization are bound to their exact subjects.
- Narrow defects should produce bounded remediation or a bounded delta, not a new broad planning package.
- Work must remain cold-startable from GitHub, repository state, and durable documentation.
- Do not create parallel command ledgers, session journals, authority registries, or duplicate governance artifacts when GitHub already carries the state.
```

This is a default, not a mandatory paste-in template.

When existing repository instructions already cover most of the block, add only the missing clauses and identify the project as MORE-aligned. Duplicating the same rule in two places makes cold starts worse, not better.

## 5. Adopt prospectively

Do not rewrite old issues, reviews, approvals, or handoffs merely to convert their terminology to MORE.

Choose a prospective adoption boundary, for example:

```text
MORE v2 applies to new work items and to the next explicitly addressed
handoff in already-open work items. Historical comments retain their
original meaning and do not acquire new authority by relabeling.
```

An already-open issue may continue without being rewritten. The next handoff can establish the MORE role and current authority while incorporating any exact prior material that remains operative.

## 6. Separate roles only when separation matters

LOW-risk work may use one combined Manager/Executor without self-handoff ceremony.

Use a separate Reviewer when independent evaluation is required by project policy or the current risk boundary.

HIGH consequential execution requires independent review and explicit Owner authorization. CRITICAL actions require explicit human Owner authorization.

Do not introduce separate actors merely because MORE defines four conceptual roles.

## 7. Preserve project-native workflow

MORE should normally leave these unchanged:

- issue structure;
- branch naming;
- pull-request workflow;
- merge policy;
- test and CI commands;
- release process;
- security policy;
- deployment procedures;
- durable decision records;
- current-state documentation.

Project-native status names such as `BLOCKED`, `READY`, or `NEEDS DECISION` may remain when their semantics are compatible.

A project may keep stricter safeguards than MORE's minimum. Adoption is not authority to remove existing controls.

## 8. Test the adoption on real work

Use the smallest representative work item available.

Check whether a cold-start actor can answer:

1. What work item governs this task?
2. What is the latest instruction addressed to my role?
3. What authority do I actually have?
4. What evidence or unresolved findings remain valid?
5. What project-native documents define durable constraints?
6. What would make me stop rather than proceed?

Then observe whether MORE adds useful clarity without forcing duplicate reporting or handoffs.

If adoption exposes a protocol ambiguity, file a MORE field report or protocol-defect issue rather than compensating with local ceremony.

## 9. Removal and rollback

MORE adoption must be removable without rewriting project history.

If the project decides MORE is unsuitable:

1. record that future work is no longer governed by MORE;
2. remove or supersede the repository-level MORE instruction;
3. state the replacement coordination rule for active work items;
4. preserve existing issues, commits, reviews, evidence, and durable project documentation;
5. do not erase observed technical facts or completed authority records merely because the protocol changed.

Removing MORE changes future coordination semantics. It does not rewrite what previously happened.

## 10. Reporting adoption from a private repository

A private repository may validate MORE without becoming publicly identifiable.

When publishing an adoption field study from a private source:

- assign a stable neutral public codename;
- keep the codename-to-private-project mapping out of the public MORE repository;
- remove private repository URLs, issue/PR numbers, commit hashes, hostnames, exact paths, service names, provider identities, customer/market/location names, and other source-specific identifiers that are unnecessary to evaluate MORE;
- preserve the authority sequence, risk boundary, evidence behavior, adoption delta, and protocol lesson;
- link public readers only to sanitized MORE artifacts;
- leave exact supporting evidence inside the private project.

See `FIELD_VALIDATION.md` for the complete private-source publication rules.

## Adoption success criterion

A successful minimal adoption makes authority and handoffs clearer while adding little or no new project-management state.

If adoption requires a parallel governance system to explain MORE, the adoption is too heavy.
