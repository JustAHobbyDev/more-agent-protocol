# MORE v2 Field Validation

This document defines the minimum real-world evidence required before MORE advances from `v2.0.0-rc.1` to stable `v2.0.0`.

The purpose of RC validation is not to accumulate a large count of successful tasks. It is to exercise the protocol boundaries most likely to fail in real projects and determine whether MORE creates ambiguity, unsafe authority, or disproportionate ceremony.

## Validation principles

Field evidence should come from real project work using a shared coordination surface such as GitHub Issues and pull requests.

A field report may validate MORE even when the underlying task fails. A fail-closed stop, useful `NEEDS DECISION`, or correctly bounded remediation can be positive protocol evidence.

A field result is a MORE protocol defect only when the protocol itself is materially ambiguous, unsafe, internally inconsistent, or unnecessarily burdensome under reasonable application. Project-specific mistakes, bad implementation, ignored instructions, or an actor violating a clear MORE rule are not automatically protocol defects.

No public disclosure of private project details is required. Reports may redact project names, paths, credentials, provider identities, or other sensitive details so long as enough structure remains to evaluate the MORE behavior.

## Required stable-release coverage

Before `v2.0.0`, field evidence must collectively cover all six scenarios below.

The same project or work item may satisfy more than one scenario when the evidence genuinely exercises each boundary.

### 1. Low-risk role collapse

Demonstrate ordinary LOW-risk work where one actor legitimately combines Manager and Executor responsibilities without unnecessary self-handoff ceremony.

Evidence should show that:

- the work remained bounded and understandable;
- no independent Reviewer or Owner boundary was required merely because MORE defines four roles;
- the task could be completed and closed without MORE becoming heavier than the work itself.

### 2. Independent review of a repository candidate

Demonstrate a repository change or other bounded candidate that receives independent Reviewer evaluation.

Evidence should show that:

- the reviewed subject is exact and recoverable;
- Reviewer judgment is independent of the active Executor;
- direct and inherited evidence are not misrepresented;
- a material candidate change would require appropriate rereview rather than inheriting approval automatically.

### 3. Bounded remediation and rereview

Demonstrate a Reviewer finding or execution defect that produces a narrow correction rather than a new broad planning cycle.

Evidence should show that:

- the defect is identified precisely;
- the correction remains inside a bounded surface;
- unchanged evidence is reused when still valid;
- invalidated evidence is refreshed;
- rereview is proportionate to the changed subject.

### 4. High-risk consequential execution

Demonstrate a HIGH workflow that reaches actual consequential execution through an exact package.

The expected shape is generally:

```text
Manager → Executor
    prepare package

Executor → Manager
    package + evidence

Manager → Reviewer
    independent review

Reviewer → Manager
    disposition

Owner → Executor
    exact authorization

Executor → Manager
    execution result + verification
```

Equivalent project-native surfaces are acceptable when they preserve the same authority boundaries.

Evidence should show that:

- the execution package is closed over its required mutation boundary;
- Reviewer approval is bound to the reviewed subject;
- Owner authorization is bound to the exact consequential action and visible on the shared coordination surface;
- volatile preconditions are refreshed immediately before consequential mutation;
- unexpected drift or missing authority fails closed;
- rollback and recovery are distinguished when durable or external effects are possible.

Post-execution independent review need only be demonstrated when the actual action leaves material residual uncertainty or otherwise triggers the rule in `SPEC.md`.

### 5. Cold-start or replacement continuation

Demonstrate that a new actor or fresh context can continue an active work item without relying on private session memory.

Evidence should show that the replacement can recover current work from:

- the governing work item;
- the latest addressed handoff;
- exact incorporated references;
- repository or observed system state;
- durable project documentation.

If pre-existing uncommitted or partial working state exists, the replacement should inspect and preserve it rather than destroying unknown work to recreate a convenient baseline.

### 6. Evidence reuse across a transition or delta

Demonstrate at least one role transition, bounded amendment, or later execution boundary where previously gathered evidence is reused selectively.

Evidence should show that:

- stable evidence remains attached to the subject it actually proves;
- role transition alone does not invalidate evidence;
- volatile evidence is refreshed when current state matters;
- boundary crossing triggers only the revalidation needed to preserve the relevant property;
- evidence from one candidate is not laundered onto a materially different candidate.

## Diversity requirement

Validation must not consist solely of one unusually controlled repository or one repeated workflow pattern.

Before stable release, evidence should include at least **two distinct project contexts**. They may differ by repository, maintainer, domain, deployment model, or workflow style.

This is a diversity requirement, not a task-count requirement. There is no required minimum number of successful issues or pull requests beyond what is needed to cover the six scenarios credibly.

The existing `kalshi-temp-edge` case studies may contribute evidence, but stable release requires at least one additional project context during the RC period.

## How to report field use

Use the repository's **Field report** issue template when practical.

A useful report identifies:

- MORE version or commit used;
- project/work-item context;
- roles that actually participated;
- risk boundary;
- validation scenario(s) exercised;
- operative handoffs or equivalent shared-state transitions;
- exact evidence;
- what MORE improved;
- friction, ambiguity, or failure;
- whether the result appears to be validation, documentation friction, misuse, or a possible normative defect.

A report does not need to reproduce the full project history.

## Classifying findings

### Protocol validation

MORE produced the intended authority, evidence, or minimalism behavior without material ambiguity.

### Documentation or example gap

The normative rule was sufficient, but adopters had difficulty discovering or applying it. Fix guidance or examples rather than changing protocol behavior.

### Project-specific misuse

An actor ignored, violated, or failed to implement an otherwise clear MORE rule. Record the lesson when useful, but do not change the protocol merely to restate an already explicit prohibition.

### Possible normative defect

Reasonable application of the current specification permits materially unsafe, contradictory, ambiguous, or disproportionately burdensome behavior.

Normative defects should be filed separately as protocol-defect issues with the field report linked as evidence.

## Stable-release gate

MORE v2 is eligible for stable release when:

- [ ] all six required scenarios have credible field evidence;
- [ ] at least two distinct project contexts contributed to that evidence;
- [ ] at least one project context is additional to the original `kalshi-temp-edge` field evidence;
- [ ] open field reports contain no unresolved release-blocking normative defect;
- [ ] any normative RC change made in response to field evidence has received the review required by `CONTRIBUTING.md`;
- [ ] the minimal adoption guide has been exercised against at least one established repository;
- [ ] the current `SPEC.md`, examples, adoption guidance, and release notes describe the same protocol behavior.

Stable release does **not** require:

- a fixed number of successful tasks;
- telemetry;
- a custom validation database;
- a GitHub Project board;
- disclosure of private repository details;
- exhaustive testing of every conceivable edge case.

## Stopping rule

RC validation is sufficient when the required field coverage exists and remaining observations are either:

- ordinary successful repetitions of already-covered behavior;
- documentation improvements that do not change protocol semantics;
- project-specific misuse already addressed by clear rules;
- or non-blocking ideas without demonstrated protocol failure.

Do not keep MORE permanently in release-candidate status in pursuit of hypothetical completeness.
