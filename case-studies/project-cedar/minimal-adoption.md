# Project Cedar — Minimal MORE Adoption

**Source visibility:** Private

Project Cedar is the stable public codename for a private production project used to validate MORE. The public MORE repository intentionally contains no mapping back to the source repository.

## Purpose

This exercise tested whether MORE could be adopted by an established repository without replacing working conventions or recreating a parallel governance system.

The exercise had two stages:

1. a read-only dry run against the existing repository configuration;
2. a real minimal adoption through the project's ordinary issue and pull-request workflow.

## Existing project surfaces inspected

The private repository already had:

- repository-level agent instructions;
- a current-state document;
- durable decision records;
- GitHub issues carrying bounded work and addressed handoffs;
- established risk, verification, and result-report conventions.

These surfaces already separated durable project knowledge from transient work authority. MORE did not require replacements for them.

## Existing behavior that already matched MORE

The repository already provided most of MORE's minimum semantics:

- the latest explicitly addressed handoff was active instruction;
- historical discussion was context unless incorporated;
- repository state was technical truth;
- private session context did not create authority;
- work stayed inside the active handoff;
- consequential operations required explicit authorization;
- deployment authority was separate from implementation authority;
- completion required proportionate evidence;
- narrow package defects were handled inside the same work item.

## Minimal missing semantics

A literal replacement of the existing agent instructions with MORE's generic default block would have duplicated stronger local rules.

The dry run identified only a small set of useful additions:

1. explicit Manager / Owner / Reviewer / Executor role mapping;
2. evidence persistence across later authority changes;
3. selective inheritance of unchanged valid evidence and refresh of volatile state;
4. exact-subject binding of Reviewer approval and Owner authorization;
5. prospective adoption without rewriting existing history.

## Live adoption

The real adoption changed only the repository's agent-instruction file and added a short MORE-alignment section. Existing project-specific risk levels, result states, durable documents, verification requirements, and current work-item history remained intact.

No application code, production state, deployment configuration, provider state, or durable technical decision changed.

## Prospective work-item replay

An already-open operational work item did not need to be rewritten merely because MORE was adopted.

Its existing Manager-to-Executor handoff remained valid. The next addressed handoff would apply the new terminology prospectively while preserving prior evidence and exact incorporated material.

This validated an important adoption rule:

```text
Adopt future coordination semantics.
Do not rewrite history to look MORE-shaped.
```

## Cold-start test

After the minimal alignment, a fresh actor could still recover:

- current project state from the existing current-state document;
- durable constraints from the existing decision record;
- repository-wide execution rules from the existing agent instructions;
- current task authority from the governing GitHub work item;
- technical truth from repository and observed system state.

No session journal, authority registry, project board, or additional coordination database was required.

## Removal test

The adoption remained reversible by removing or superseding the short MORE-alignment section and defining replacement future-handoff semantics.

No issue history, technical evidence, durable decision, or repository state would need to be rewritten.

## Field-test result

**Classification:** Protocol validation with a documentation lesson.

The adoption guide succeeds when it treats MORE as a semantic overlay on working repository practices rather than an installation package.

The field test confirmed that:

- equivalent existing controls should be reused;
- generic MORE instructions should not be duplicated where stronger local rules already exist;
- adoption can begin prospectively without rewriting open work;
- durable current-state and decision documents are compatible with MORE when they record project truth rather than transient task authority;
- a real adoption can remain a small additive repository-instruction change;
- removal remains straightforward.

No normative MORE defect was discovered by this exercise.

## Privacy note

Exact repository identity, private issue and pull-request numbers, commit hashes, and project-specific operational details remain in the private source. This public case study intentionally preserves only the MORE-relevant behavior.