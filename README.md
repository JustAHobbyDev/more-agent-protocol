# MORE

**Manager / Owner / Reviewer / Executor**

MORE is a lightweight, GitHub-native coordination protocol for human and software-agent work.

It is designed for established projects that want clear authority, bounded execution, independent review when it matters, and cold-startable handoffs without building a second project-management system beside GitHub.

## Status

**MORE v2.0.0-rc.1 — release candidate development**

The normative specification is maintained in [`SPEC.md`](SPEC.md). RC1 is being developed publicly through ordinary GitHub issues and pull requests. The field evidence required before stable v2.0.0 is defined in [`FIELD_VALIDATION.md`](FIELD_VALIDATION.md).

## The four roles

- **Manager** — interprets intent, bounds work, coordinates handoffs, and reconciles results.
- **Owner** — holds consequential project authority and authorizes actions that exceed delegated authority.
- **Reviewer** — independently evaluates an exact candidate, package, artifact, result, or state.
- **Executor** — performs the bounded task. Executor is an authority role, not a synonym for programmer; execution may include coding, investigation, package preparation, verification, or operational work.

MORE roles are conceptual boundaries. Low-risk work does not require four separate actors. Separation is introduced only when it provides meaningful authority or independent evaluation.

## Core rules

1. The latest valid handoff addressed to the acting role defines current instruction and authority.
2. Historical instructions are context unless the active handoff incorporates them by exact reference.
3. New authority does not erase unresolved evidence, failed verification, or observed technical facts.
4. Repository and observed system state are technical truth.
5. Verification outranks assertion.
6. Exact constraints should protect an actual operation input, authority boundary, safety property, or acceptance condition.
7. High-risk execution fails closed when real state differs from the authorized boundary.
8. Valid evidence can be inherited; volatile state is refreshed when it matters.
9. Reviewer approval and Owner authorization are bound to the exact subject they evaluate or authorize.
10. GitHub remains the shared coordination surface; MORE does not require parallel ledgers, session journals, or authority registries.

## Typical high-risk flow

```text
Manager → Executor
    prepare exact execution package

Executor → Manager
    package + evidence

Manager → Reviewer
    independent review

Reviewer → Manager
    APPROVED / findings

Owner → Executor
    exact execution authorization

Executor → Manager
    execution result + verification
```

A Reviewer defect normally goes back through the Manager to the same Executor. A bounded correction may be reviewed as a delta without rebuilding the entire package. Consequential authorization for a materially changed package must be renewed.

## Why MORE exists

Agent workflows tend to fail in two opposite directions:

- **too little structure** — agents infer authority, lose context, or approve their own consequential work;
- **too much structure** — governance artifacts, repeated context, and approval machinery become more expensive than the engineering work.

MORE tries to keep only the controls justified by real failure modes.

The v2 design was informed by field use in a private production project published here under the codename **Project Cedar**, including fail-closed execution, bounded package amendments, evidence reuse, operational package preparation, and minimal adoption, followed by multiple rounds of adversarial protocol testing.

Private-source field studies use stable public codenames and sanitized evidence. The public repository does not intentionally publish mappings back to private source projects. See [`FIELD_VALIDATION.md`](FIELD_VALIDATION.md).

## Repository layout

```text
SPEC.md                 Normative MORE v2 specification
ADOPTION.md             Minimal adoption guide for established repositories
FIELD_VALIDATION.md     RC-to-stable real-world validation and privacy rules
CONTRIBUTING.md         Development and proposal workflow
AGENTS.md               Instructions for software agents working on MORE
examples/               Small, copyable handoff patterns
case-studies/           Sanitized field evidence and protocol lessons
.github/                Contribution templates
```

## Adoption

MORE is intended to be adopted incrementally. A project does not need to rewrite its history, replace its branching strategy, add a project board, or create new workflow databases.

A minimal adoption can begin with:

- role definitions;
- the latest-addressed-handoff rule;
- one Manager → Executor / Executor → Manager pattern;
- independent Reviewer semantics where risk requires them;
- explicit Owner authorization for consequential execution;
- cold-start and evidence rules.

Start with [`ADOPTION.md`](ADOPTION.md). It shows how to inspect an existing repository, reuse equivalent controls, adopt MORE prospectively, and remove it without rewriting history. See [`SPEC.md`](SPEC.md) for the complete protocol and `examples/` for reusable patterns.

## Development

MORE itself is developed using MORE principles:

- Issues define independently meaningful protocol work.
- Pull requests carry specification changes.
- Review findings are evidence, not votes.
- Narrow defects should produce narrow amendments.
- New governance mechanisms require demonstrated failure, not hypothetical completeness.

See [`CONTRIBUTING.md`](CONTRIBUTING.md). Field reports should use the repository's Field report issue template and are evaluated against [`FIELD_VALIDATION.md`](FIELD_VALIDATION.md).

## License

MORE is licensed under the [Apache License 2.0](LICENSE) (`Apache-2.0`).
