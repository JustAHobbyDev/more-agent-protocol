# Changelog

All notable normative changes to MORE will be recorded here.

## [2.0.0-rc.1] — Unreleased

Initial public release candidate for the formally named MORE protocol: **Manager / Owner / Reviewer / Executor**.

### Added

- Four explicit conceptual roles with risk-proportionate role separation.
- Latest-addressed-handoff authority model with evidence persistence.
- Base + delta handoffs for narrow amendments.
- Risk classification per action boundary.
- Execution-boundary closure and fail-closed consequential execution.
- Staged verification and evidence reuse.
- Stable, volatile, inherited, direct, and revalidate-at-use evidence concepts.
- Candidate-bound Reviewer dispositions.
- Subject-bound and publicly discoverable consequential Owner authorization.
- Thread affinity with cold-start recovery.
- Preservation of pre-existing workspace state during agent replacement.
- Risk-driven post-execution independent review.
- Risk anti-laundering rules.
- Whole-requirement evaluation to prevent checklist gaming.
- Optional read-only scouts as a non-role efficiency technique.

### Field evidence

The v2 design was exercised against recent `kalshi-temp-edge` work:

- Issue #23 — fail-closed production execution and bounded amendment after an allowlist defect.
- Issue #24 — correction of an operation-irrelevant exact precondition and evidence revalidation at artifact use.
- Issue #26 — large read-only package preparation preceding separately reviewed and Owner-authorized production execution.

### Adversarial testing

Four synthetic rounds tested:

- authority and role collisions;
- candidate and evidence binding;
- replacement-agent behavior;
- conflicting Reviewer findings;
- risk underclassification and overclassification;
- checklist gaming and scope expansion;
- partial provider effects and rollback/recovery boundaries;
- protocol minimalism on trivial work.

The targeted fourth round produced no new normative mechanism, establishing the RC1 baseline.

## [1.x] — Historical predecessor

MORE v2 evolved from the earlier GitHub Agent Communication and Handoff Specification. The predecessor is treated as historical design input rather than the normative specification of this repository.
