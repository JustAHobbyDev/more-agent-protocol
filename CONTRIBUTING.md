# Contributing to MORE

MORE is developed using the principles it defines.

## Development model

Use GitHub Issues for independently meaningful protocol work and pull requests for specification or repository changes.

The normal path is:

```text
issue
  ↓
implementation / proposal
  ↓
pull request
  ↓
review
  ↓
merge
```

Avoid creating project-management machinery that duplicates GitHub state.

## What belongs in an issue

Open an issue for:

- a demonstrated protocol defect;
- a field report showing MORE behaving poorly or ambiguously;
- a concrete proposal backed by a use case;
- an adoption problem;
- a distribution or documentation improvement;
- a release-blocking inconsistency.

Do not open separate issues merely because one protocol change requires multiple edits or tests.

## Evidence-first proposals

A proposed normative rule should answer:

1. What failure or recurring friction does it address?
2. Can the problem be fixed with a clearer existing rule, handoff, stop condition, or GitHub feature instead?
3. What new behavior would the rule require?
4. What new ceremony or failure mode could the rule introduce?

MORE intentionally prefers demonstrated failure over speculative completeness.

## Pull requests

A pull request changing `SPEC.md` should:

- link the governing issue;
- identify the exact behavior being changed;
- distinguish normative changes from wording clarifications;
- include the motivating field or adversarial case;
- update examples or case studies when the old material would become misleading;
- avoid unrelated cleanup.

Normative changes should receive independent review before merge.

## Review

Reviewer findings are evidence, not votes.

A later approval does not erase an unresolved earlier finding. Conflicting material findings must be reconciled.

Reviewers should focus on protocol behavior, ambiguity, unintended ceremony, authority gaps, and compatibility with MORE's minimalism.

## Release-candidate policy

During an RC cycle, changes to normative behavior should be driven by:

- field use;
- reproducible protocol failures;
- adversarial cases that expose an unresolved authority or evidence problem.

Wording-only improvements may be accepted when they do not change behavior.

## Scope discipline

Do not use MORE development as an excuse to build:

- a second issue tracker;
- a custom authority database;
- a session journal;
- a mandatory agent hierarchy;
- a workflow engine that the protocol does not require.

Tooling may eventually be useful, but it should implement proven protocol needs rather than invent them.

## License

MORE is licensed under the Apache License 2.0. By intentionally submitting a contribution for inclusion in MORE, you agree that the contribution is provided under the terms of the Apache License 2.0 unless you explicitly state otherwise, consistent with Section 5 of the license.

See [`LICENSE`](LICENSE) for the full terms.
