# kalshi-temp-edge — MORE v2 Minimal Adoption Dry Run

This exercise applies `ADOPTION.md` to the active `JustAHobbyDev/kalshi-temp-edge` repository without changing that repository.

The purpose is to test whether MORE can be adopted by an established project without rewriting working conventions or recreating the process accumulation the project previously rejected.

## Existing project surfaces inspected

The dry run inspected:

- `AGENTS.md`;
- `CURRENT.md`;
- `DECISIONS.md`;
- the current Stage B work item, Issue #26.

These surfaces already separate durable project knowledge from transient work authority:

- `CURRENT.md` records current phase, milestone, operating state, and next action;
- `DECISIONS.md` records durable active-project decisions;
- GitHub issues carry bounded work and addressed handoffs;
- `AGENTS.md` defines repository-wide agent behavior.

Those artifacts should remain. They are not duplicate MORE ledgers.

## Existing behavior that already matches MORE

`AGENTS.md` already provides most of MORE's minimum adoption semantics:

- the latest explicitly addressed handoff is active instruction;
- historical comments are context unless incorporated;
- repository state determines what has actually been implemented;
- private session context does not create authority;
- work stays inside the active handoff;
- consequential operations require explicit authorization;
- deployment authority is separate from implementation authority;
- acceptance must be supported by proportionate evidence;
- result reports distinguish PASS, FAIL, NOT RUN, unavailable checks, and remaining risk;
- narrow package defects are corrected in the same work item rather than spawning unnecessary governance artifacts.

Issue #26 already demonstrates risk scoped to the current handoff: the active task is MEDIUM read-only package preparation, while the eventual host-changing/provider-capable execution will require independent review and explicit Owner authorization.

## Existing project-native controls to preserve

A MORE adoption should not replace or duplicate:

- `CURRENT.md`;
- `DECISIONS.md`;
- the repository's `COMPLETE | BLOCKED | NEEDS DECISION | FAILED` result vocabulary;
- the detailed Executor result structure in `AGENTS.md`;
- the current threat-level convention;
- existing issue, PR, release, deployment, and production-safety practices;
- Decision 0011 or any other durable technical decision.

The project may keep controls stricter or more detailed than MORE's default.

## Minimal missing semantics

A literal replacement of `AGENTS.md` with MORE's default repository block would be worse than the existing instructions.

The smallest useful adoption delta is instead to identify the existing workflow as MORE-aligned and add only semantics that are not currently explicit enough:

1. **Role mapping**
   - Manager: bounds and coordinates the work item.
   - Owner: holds consequential project authority.
   - Reviewer: independently evaluates an exact candidate/package/result.
   - Executor: performs the bounded task, including read-only investigation or package preparation.

2. **Evidence persistence**
   A newer handoff changes current instruction but does not erase unresolved technical evidence or findings. Valid unchanged evidence may be inherited; volatile state is refreshed when its current value matters.

3. **Subject-bound review and authorization**
   Reviewer approval and Owner authorization apply to the exact candidate/package/action reviewed or authorized and do not automatically transfer across material changes.

4. **Prospective adoption boundary**
   Existing issue history does not need to be rewritten. MORE terminology begins with new work items or the next explicitly addressed handoff in an existing item.

## Proposed repository-level delta

A real adoption could add a short section to `AGENTS.md` similar to:

```text
## MORE alignment

This repository uses MORE v2 semantics for GitHub work handoffs:
Manager / Owner / Reviewer / Executor.

Existing repository terminology, threat levels, result states, durable documents,
and issue/PR practices remain authoritative where compatible.

MORE applies prospectively to new work items and to the next explicitly addressed
handoff in already-open work items. Existing history is not rewritten.

A newer handoff changes current instruction and authority but does not erase
unresolved evidence, failed verification, or observed technical facts.
Unchanged valid evidence may be inherited; volatile state must be refreshed when
its current value matters.

Reviewer approval and Owner authorization are bound to the exact subject reviewed
or authorized and do not automatically transfer across material changes.

Executor means the actor performing the bounded task, including investigation,
package preparation, implementation, verification, or approved operational work.
```

The rest of the existing `AGENTS.md` should remain intact.

## Issue #26 prospective replay

No rewrite of Issue #26 is needed.

Its current `[MANAGER → EXECUTOR]` handoff remains understandable under MORE:

- the current Executor is performing read-only package preparation, not independent review;
- the current MEDIUM boundary authorizes inspection and package construction only;
- future HIGH execution remains separately gated by independent Reviewer evaluation and explicit Owner authorization;
- Decision 0011, Issue #23 protections, current production state, and existing technical evidence remain active constraints;
- a future bounded amendment can inherit unchanged package evidence while refreshing volatile production preconditions;
- a materially changed execution package cannot automatically inherit Reviewer approval or Owner authorization.

The only terminology needing future cleanup is language such as "the reviewer may select" inside an Executor-directed package-preparation handoff. Under MORE, the package-preparing Executor may propose a smaller sufficient observation; the later Reviewer independently judges whether it is sufficient. This is a local wording migration, not a protocol defect and not a reason to rewrite the existing issue before its next handoff.

## Cold-start test

Using the current repository plus the proposed minimal delta, a fresh actor can recover:

- governing project state from `CURRENT.md`;
- durable constraints from `DECISIONS.md`;
- repository-wide execution rules from `AGENTS.md`;
- current task authority from Issue #26's latest addressed handoff;
- actual technical truth from repository and observed production state.

No session journal, authority registry, project board, or additional coordination database is required.

## Removal test

The proposed adoption is reversible by removing or superseding the short MORE-alignment section and recording a replacement future-handoff rule.

No issue history, technical evidence, durable decision, or repository state would need to be rewritten.

## Field-test result

**Classification:** Protocol validation with one documentation lesson.

The adoption guide succeeds when it treats MORE as a semantic overlay on working repository practices rather than an installation package.

The dry run confirms that:

- equivalent existing controls should be reused;
- the full default repository instruction should not be pasted when it would duplicate stronger local rules;
- adoption can begin prospectively without rewriting open work;
- durable current-state and decision documents are compatible with MORE when they record project truth rather than transient task authority;
- removal remains straightforward.

No normative MORE defect was discovered by this exercise.