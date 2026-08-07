# kalshi-temp-edge — MORE v2 Minimal Adoption Field Test

This exercise applied `ADOPTION.md` to the active `JustAHobbyDev/kalshi-temp-edge` repository in two stages:

1. a read-only dry run against the existing project configuration;
2. a real minimal adoption through `kalshi-temp-edge` Issue #28 and PR #29.

The purpose was to test whether MORE can be adopted by an established project without rewriting working conventions or recreating the process accumulation the project previously rejected.

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

`AGENTS.md` already provided most of MORE's minimum adoption semantics:

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

## Existing project-native controls preserved

The adoption did not replace or duplicate:

- `CURRENT.md`;
- `DECISIONS.md`;
- the repository's `COMPLETE | BLOCKED | NEEDS DECISION | FAILED` result vocabulary;
- the detailed Executor result structure in `AGENTS.md`;
- the current threat-level convention;
- existing issue, PR, release, deployment, and production-safety practices;
- Decision 0011 or any other durable technical decision.

The project retains controls stricter or more detailed than MORE's default.

## Minimal missing semantics identified

A literal replacement of `AGENTS.md` with MORE's default repository block would have been worse than the existing instructions.

The dry run identified four useful additions:

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

## Live adoption

The Owner authorized `kalshi-temp-edge` as the field-test project.

Issue #28, **Adopt MORE v2 minimal handoff semantics**, bounded the adoption to `AGENTS.md` only and explicitly prohibited changes to application code, durable technical decisions, production state, and Issue #26's existing handoff.

PR #29 implemented the adoption with exactly:

```text
1 file changed
23 additions
0 deletions
```

The added `MORE alignment` section:

- identifies Manager / Owner / Reviewer / Executor;
- makes adoption prospective;
- preserves unresolved evidence across later authority changes;
- allows selective inheritance of unchanged valid evidence;
- requires volatile evidence to be refreshed when current state matters;
- binds Reviewer approval and Owner authorization to exact subjects;
- clarifies that Executor includes investigation and package preparation;
- preserves stricter existing repository safeguards.

PR #29 was squash-merged as:

```text
768251ca026755bdbfa99823d358e4dd586f24c4
```

No other project file changed.

## Issue #26 prospective replay

No rewrite of Issue #26 was needed before or during adoption.

Its existing `[MANAGER → EXECUTOR]` handoff remains understandable under MORE:

- the current Executor is performing read-only package preparation, not independent review;
- the current MEDIUM boundary authorizes inspection and package construction only;
- future HIGH execution remains separately gated by independent Reviewer evaluation and explicit Owner authorization;
- Decision 0011, Issue #23 protections, current production state, and existing technical evidence remain active constraints;
- a future bounded amendment can inherit unchanged package evidence while refreshing volatile production preconditions;
- a materially changed execution package cannot automatically inherit Reviewer approval or Owner authorization.

The only terminology needing future cleanup is language such as "the reviewer may select" inside an Executor-directed package-preparation handoff. Under MORE, the package-preparing Executor may propose a smaller sufficient observation; the later Reviewer independently judges whether it is sufficient. This is a local wording migration, not a protocol defect and not a reason to rewrite the existing issue before its next handoff.

## Cold-start test

With the minimal alignment merged, a fresh actor can recover:

- governing project state from `CURRENT.md`;
- durable constraints from `DECISIONS.md`;
- repository-wide execution rules and MORE alignment from `AGENTS.md`;
- current task authority from the governing issue's latest addressed handoff;
- actual technical truth from repository and observed production state.

No session journal, authority registry, project board, or additional coordination database is required.

## Removal test

The adoption is reversible by removing or superseding the short MORE-alignment section and recording a replacement future-handoff rule.

No issue history, technical evidence, durable decision, or repository state would need to be rewritten.

## Field-test result

**Classification:** Protocol validation with one documentation lesson.

The adoption guide succeeds when it treats MORE as a semantic overlay on working repository practices rather than an installation package.

The field test confirms that:

- equivalent existing controls should be reused;
- the full default repository instruction should not be pasted when it would duplicate stronger local rules;
- adoption can begin prospectively without rewriting open work;
- durable current-state and decision documents are compatible with MORE when they record project truth rather than transient task authority;
- a real adoption can remain a small additive repository-instruction change;
- removal remains straightforward.

No normative MORE defect was discovered by this exercise.

The corresponding MORE field report is Issue #7.