# MORE — GitHub Coordination and Handoff Specification

**Manager / Owner / Reviewer / Executor**  
**Version 2.0.0-rc.1**

## 1. Purpose

MORE establishes a lightweight, reliable method for coordinating human maintainers and software agents in an established GitHub project.

MORE uses the project's existing infrastructure:

- GitHub issues for work definition and active authority;
- branches and commits for repository changes;
- pull requests for integration and code review;
- issue or pull-request comments for role handoffs;
- GitHub Actions and project-specific commands for verification;
- repository documentation for durable knowledge;
- observed system state for operational truth.

The system must:

- make current authority unambiguous;
- allow work to resume from a cold start;
- separate decision authority, coordination, execution, and independent review;
- preserve sufficient evidence to verify claimed results;
- fail closed when execution exceeds the authorized boundary;
- allow narrow corrections without rebuilding an entire work package;
- reuse valid evidence instead of rerunning work without cause;
- keep consequential actions explicitly bounded;
- avoid creating a second project-management or governance system on top of GitHub;
- adapt to an established project's conventions rather than replacing them.

MORE governs coordination and authority. It does not replace the project's technical documentation, contribution rules, security policy, test suite, release process, deployment procedures, branch protection, or maintainer authority.

The governing model is:

```text
Owner authorizes consequences.
Manager bounds and coordinates work.
Executor performs the bounded task.
Reviewer independently evaluates a bounded result.
```

## 2. The MORE Model

MORE defines four conceptual roles:

```text
M — Manager
O — Owner
R — Reviewer
E — Executor
```

These are responsibility and authority boundaries, not job titles. They do not require four different people, four persistent agents, or four simultaneous sessions.

A project should use only the separation required by the risk and nature of the current work.

A LOW-risk documentation task may involve only a combined Manager/Executor. A HIGH-risk production action may involve package preparation, independent review, explicit Owner authorization, execution, and risk-driven post-execution review.

MORE does not create hierarchy for its own sake. Role separation exists only where it provides meaningful authority, independence, or safety.

## 3. Role Definitions

### 3.1 Manager

The Manager owns coordination.

The Manager:

- interprets current project intent;
- identifies the governing GitHub work item;
- inspects relevant project and repository state;
- defines the bounded objective;
- distinguishes current authority from historical context;
- identifies relevant risk;
- defines scope, exclusions, acceptance criteria, and stop conditions;
- delegates bounded work;
- reconciles Executor and Reviewer results;
- identifies whether Owner authority is required;
- issues bounded remediation;
- manages integration and closure.

The Manager may inspect code, artifacts, logs, systems, and verification evidence. Manager inspection does not satisfy a requirement for independent Reviewer approval.

The Manager should specify the required outcome and safety boundary without unnecessarily prescribing implementation details.

### 3.2 Owner

The Owner holds consequential project authority.

The Owner is normally the project owner, an authorized human maintainer, or another actor explicitly delegated authority for the relevant class of decision.

The Owner:

- determines project intent when material choices remain;
- resolves product, architecture, operational, security, cost, and policy decisions that exceed delegated authority;
- authorizes consequential actions when explicit authorization is required;
- accepts explicitly disclosed residual risk when appropriate;
- may record final closure for owner-authorized actions.

An agent must not assume Owner authority merely because it can technically perform an action.

Approval to implement or investigate does not automatically authorize deployment, destructive operations, provider writes, credential changes, external communication, billing changes, data migration, irreversible actions, or changes to protected security or operational boundaries.

CRITICAL actions require explicit human Owner authorization.

### 3.3 Reviewer

The Reviewer owns independent evaluation of a bounded result.

The Reviewer:

- receives an exact candidate, result, package, artifact, or state to review;
- evaluates it against the active requirements;
- independently examines material evidence;
- identifies defects, gaps, ambiguity, scope expansion, and residual risk;
- distinguishes reproduced evidence from evidence inherited from another role;
- issues a clear disposition;
- does not silently repair the candidate being reviewed.

Reviewer independence is defined by the relationship to the candidate, not by the activity being performed.

A Reviewer may read source code, inspect artifacts, run tests, reproduce failures, inspect operational state, evaluate a proposed command package, or perform read-only investigation.

A Reviewer must not satisfy independent review by approving its own active execution result.

The same underlying model or tool may be used for Executor and Reviewer roles if the review occurs in a genuinely separate context and the project permits this.

### 3.4 Executor

The Executor performs the bounded task.

Executor is not synonymous with programmer.

Executor work may include:

- implementing code;
- modifying configuration;
- preparing an artifact;
- performing read-only investigation;
- constructing a future execution package;
- running verification;
- executing an approved operational action;
- performing a bounded migration;
- gathering evidence.

The Executor:

- follows the latest active handoff;
- inspects the state relevant to that handoff;
- performs only authorized work;
- resolves ordinary implementation details independently;
- verifies its result proportionally;
- reports exact resulting state;
- stops when execution would exceed its authority.

The Executor must not silently expand scope or infer authorization merely because a technically obvious next step exists.

## 4. Role Combination and Independence

MORE roles are conceptual responsibility and authority boundaries. They do not require separate actors unless separation provides meaningful independence or authority control.

The same actor may perform multiple roles when doing so does not defeat a required separation.

For ordinary LOW-risk work, one actor may combine Manager and Executor responsibilities. In such a case, an explicit self-handoff is unnecessary when no responsibility or authority is actually being transferred.

```text
Issue
  ↓
combined Manager / Executor
  ↓
verified result
  ↓
closure
```

MORE handoffs exist to transfer bounded responsibility or authority between actors or independently operating roles. They are not required merely to narrate an internal role change by the same actor.

An addressed handoff becomes appropriate when responsibility moves to another actor, independent Reviewer evaluation begins, Owner judgment or authorization is required, a replacement actor assumes work, or the current authority boundary otherwise needs to be made explicit.

For work where independent review is required:

```text
active Executor ≠ independent Reviewer
```

The same underlying model or tool may perform both roles only in genuinely separate contexts where the project permits this and the later review does not rely on hidden continuity from execution.

For work requiring explicit Owner authorization:

```text
technical ability ≠ Owner authority
```

A Manager may perform ordinary inspection and acceptance when independent review is unnecessary. A Manager may not relabel its own inspection as independent Reviewer approval when the active risk boundary requires independent review.

An Executor may not self-authorize HIGH or CRITICAL consequential execution.

Role combination should remove unnecessary ceremony. It must not collapse meaningful independence or authority boundaries.

## 5. Governing Principles

### 5.1 The latest addressed handoff is operative

Within a GitHub work item, the latest valid handoff explicitly addressed to the acting role defines current instruction and authority.

Historical instructions remain context unless the active handoff incorporates them by exact reference.

```text
Historical instruction is context.
The latest addressed handoff is operative authority.
```

Supersession of instruction does not automatically supersede technical facts.

A later handoff does not erase failed verification, observed system state, unresolved Reviewer findings, recorded mutations or external effects, known blockers, or contradictions in evidence.

Such evidence persists until it is resolved, invalidated because its actual subject materially changed, superseded by stronger evidence showing the earlier observation was incorrect, or explicitly determined to be irrelevant to the current claim.

A newer instruction that conflicts with unresolved evidence does not make the evidence disappear. The acting role must reconcile the conflict or stop and report it.

```text
Authority can be superseded.
Observed reality must be reconciled.
```

Agents must not combine every historical instruction into an expanding implied specification. They also must not use chronology to discard an unresolved technical fact.

### 5.2 An active handoff may incorporate exact prior material

A current handoff may intentionally incorporate an earlier package, result, approval, or evidence by exact reference.

Example:

```text
Base package:
Executor result 123456

Amendment:
Replace only the quarantine path described below.

Inherited:
All other boundaries, hashes, verification requirements,
rollback rules, and prohibitions from 123456 remain unchanged.
```

The operative instruction is the current handoff plus the exact material it explicitly incorporates. Unreferenced historical instructions remain inactive.

### 5.3 Repository and observed system state are technical truth

Git records what has actually been implemented. Observed system state records what is actually running or deployed.

Written descriptions do not override the relevant commit, source tree, pull-request diff, generated artifacts, deployed files, service state, data state, provider state, or other directly observed technical evidence.

When written claims conflict with technical state, the acting role must report the discrepancy.

### 5.4 Verification outranks assertion

A claim of completion is not sufficient evidence.

Completion must be supported by proportionate verification such as tests, builds, linting, static analysis, type checking, exact hashes, artifact inspection, manual inspection, deployment checks, runtime observation, or comparison against acceptance criteria.

Unrun checks must not be represented as passing.

### 5.5 Exactness must be relevant

A precise constraint is useful only when it protects a material invariant.

Before making an exact condition a blocking precondition, identify what it protects. A hard precondition should map to at least one of:

- an input actually consumed by the operation;
- the identity of the intended target;
- the current authority boundary;
- a safety property;
- an acceptance condition;
- a rollback or recovery assumption.

Use this test:

```text
If this value differed while every state actually consumed by
 the operation and every relevant safety property remained the same,
would execution still need to stop?
```

If the answer is no, the condition should normally be informational rather than blocking.

Different identities must not be treated as interchangeable merely because they are related. Examples include commit identity, tree/content identity, artifact identity, checkout identity, deployed-release identity, and live-system identity.

```text
Exact but irrelevant constraints create false blockers.
Exact relevant constraints create safety.
```

### 5.6 Durable and transient information remain separate

Durable knowledge belongs in durable project documentation. Transient work state belongs in GitHub work items.

Do not preserve temporary task state by adding it to permanent project documents.

### 5.7 GitHub is the shared coordination channel

MORE does not require a parallel mailbox, command ledger, session journal, authority registry, task database, or approval registry.

Use existing GitHub surfaces whenever they are sufficient.

Default locations are:

```text
Before a pull request exists → issue
After a pull request exists  → pull request for implementation matters
Code-specific feedback       → inline PR review
Scope/authority decisions    → governing issue or top-level PR comment
Durable project knowledge    → repository documentation
```

Operational work with no meaningful pull request may remain entirely in its issue.

### 5.8 Add structure only after demonstrated failure

Begin with the smallest workable mechanism.

Do not add process because a failure is merely imaginable.

Prefer first a clearer handoff, better stop condition, sharper acceptance criterion, existing GitHub feature, or bounded amendment.

Add another protocol mechanism only when concrete recurring evidence shows the smaller mechanism is insufficient.

### 5.9 Requirements are evaluated as a whole

Acceptance criteria are evidence requirements. They are not, by themselves, the complete definition of successful work.

The operative requirement is the coherent combination of:

- objective;
- scope;
- exclusions;
- constraints;
- protected invariants;
- applicable durable decisions;
- acceptance criteria;
- current authority.

Passing every enumerated checkbox does not excuse violating another active requirement.

```text
checklist compliance
        ≠
successful outcome
```

An actor must not exploit an omission in acceptance criteria to defeat the stated objective or a protected boundary. Likewise, a broad objective does not authorize work outside explicit scope or authority.

No category automatically overrides the others merely because it is more general or more specific.

If active requirements materially conflict, the acting role must not choose whichever interpretation permits the desired action. It must reconcile the conflict through the applicable MORE boundary or report `NEEDS DECISION`.

This rule does not permit an Executor to waive an explicit acceptance criterion because the Executor considers it unnecessary. An active criterion remains required until valid authority supersedes or corrects it.

```text
Satisfy the actual bounded outcome,
not merely the easiest literal reading of one field.
```

## 6. Authority Order

When instructions conflict, apply this order.

### 6.1 Safety and external obligations

Legal, security, privacy, platform, and operational obligations take precedence.

### 6.2 Current explicit Owner direction

Current Owner direction outranks older project direction within the Owner's authority.

### 6.3 Current addressed handoff

The latest handoff addressed to the acting role governs current work, including material it explicitly incorporates by reference.

### 6.4 Accepted durable project documentation

Durable repository instructions govern matters not superseded by current authority.

### 6.5 Repository and observed system state

Technical state determines what actually exists.

### 6.6 Historical discussion

Older issues, comments, reviews, plans, and superseded handoffs are context only.

A material conflict must be reported rather than silently resolved.

## 7. GitHub Work-Item Boundary

Every active unit of MORE-governed work must have one identifiable GitHub work item. The default is one GitHub issue.

A work item should normally identify the objective, relevant current state, active scope, exclusions, risk level, acceptance criteria, latest handoff, unresolved decisions, implementation branch or pull request where applicable, and final closure.

The issue does not need to contain the complete history of the project.

### 7.1 When to create a separate issue

Create a separate issue for an independently meaningful outcome such as a distinct defect, separately deployable feature, external dependency, durable architecture decision, genuinely independent parallel work, or follow-up work not required for the current outcome.

Do not create another issue merely because implementation has multiple steps, review found one bounded defect, several files are involved, multiple tests are required, or a narrow amendment is needed.

## 8. Active Handoffs

A MORE handoff transfers bounded responsibility or authority.

Canonical forms include:

```text
[MANAGER → EXECUTOR]
[EXECUTOR → MANAGER]

[MANAGER → REVIEWER]
[REVIEWER → MANAGER]

[MANAGER → OWNER]

[OWNER → EXECUTOR]
```

Other addressed forms may be used where clear.

`[OWNER → RECORD]` may be used for an Owner closure statement. `RECORD` is not a fifth MORE role.

### 8.1 One active addressed handoff

The normal work item has one current addressed handoff governing the current action.

A completed result does not remain an instruction. A review approval does not itself authorize execution unless the Owner or project rules grant that authority.

An Owner authorization may incorporate an independently reviewed execution package by exact reference.

## 9. Base and Delta Handoffs

When a previous package is mostly valid, do not rewrite it merely to change one bounded element. Use a delta.

A delta should identify:

```text
Base:
<exact comment, result, commit, artifact, or package>

Changed:
<only the changed boundary>

Inherited:
<what remains authoritative>

Invalidated evidence:
<any previous evidence no longer valid>

New verification:
<what must now be checked>

Required approval:
<none | reviewer | owner | reviewer + owner>
```

A delta must not silently modify unrelated scope.

### 9.1 Delta chains must remain cold-startable

Do not accumulate a long chain of amendments that requires historical reconstruction.

When the operative state becomes difficult to recover from, the Manager should post one replacement handoff that folds the operative state into a clean package.

Do not create a new governance layer to explain the chain. Replace the ambiguity.

## 10. Risk Applies to the Handoff

Risk is evaluated at the current action boundary, not permanently assigned to an entire issue.

The same issue may move through LOW read-only inspection, MEDIUM package preparation, HIGH production mutation, and LOW closure.

### 10.1 Risk classification describes the action

A stated risk classification describes the substantive characteristics of the current action. It does not grant permission to perform an action under controls weaker than its actual risk requires.

```text
label: LOW
        +
actual HIGH-risk operation
        ≠
LOW authority
```

When an acting MORE role identifies concrete characteristics showing that the proposed action materially exceeds its stated risk boundary, that role must not proceed using the weaker controls.

It should identify the mismatch and apply already-required higher safeguards where current authority clearly permits doing so, or stop and return the matter for risk and authority reconciliation.

Examples of material underclassification include an action described as LOW or MEDIUM that actually introduces production mutation, credential rotation or disclosure, destructive data effects, provider writes, substantial external cost, irreversible migration, or security-boundary changes.

Risk escalation is conservative. An Executor or Reviewer may refuse to proceed under an apparently underclassified boundary. That does not give the role authority to expand the work, redesign the package, or perform the higher-risk action without the review and Owner authority that higher classification requires.

### 10.2 Higher stated controls are not unilaterally downgraded

An acting role must not independently remove safeguards merely because it believes the stated risk classification is unnecessarily high.

If a handoff explicitly requires HIGH controls for an action that appears LOW or MEDIUM, the acting role may recommend reclassification. Until valid authority changes the boundary, the stronger stated controls remain operative.

```text
suspected underclassification
    → may stop or escalate

suspected overclassification
    → may recommend relaxation,
      but may not relax it unilaterally
```

### 10.3 Risk disagreement requires a concrete basis

A role should not obstruct work merely by asserting that something feels riskier. A claimed material mismatch should identify the characteristic that changes the risk boundary.

When the substantive risk remains genuinely uncertain, use `NEEDS DECISION` rather than inventing authority in either direction.

### LOW

No meaningful security, data, production, financial, or compatibility risk.

Examples include documentation, isolated reversible code, and read-only inspection.

Independent review is optional unless project rules require it.

### MEDIUM

Meaningful but bounded possibility of regression, inconsistency, compatibility impact, or limited operational disruption.

Requires proportionate verification. Independent review should be used where a materially different second evaluation improves confidence.

Owner authorization is required only when the action exceeds delegated authority.

### HIGH

Meaningful risk involving production, data integrity, credentials, external providers, irreversible migration, substantial cost, security, or consequential external communication.

HIGH consequential execution requires:

1. an exact bounded execution package;
2. independent Reviewer approval;
3. explicit Owner authorization;
4. fresh pre-execution validation;
5. defined rollback or recovery behavior.

### CRITICAL

Immediate or severe risk to production, security, legal obligations, credentials, finances, or data integrity.

CRITICAL execution requires independent pre-execution review, explicit human Owner authorization, exact preconditions, exact stop conditions, recovery planning, and independent post-execution verification.

When risk is materially uncertain, stop as `NEEDS DECISION`.

## 11. Manager Responsibilities

Before issuing a handoff, the Manager should:

1. identify the governing work item;
2. locate the current authority;
3. inspect relevant repository or system state;
4. identify the actual operation or result required;
5. assign risk to this handoff;
6. define scope and exclusions;
7. identify operation-relevant invariants;
8. provide testable acceptance criteria;
9. identify required verification;
10. define stop conditions;
11. determine whether independent review or Owner authorization will be required.

The Manager should avoid specifying implementation details that the Executor can safely determine.

For a consequential execution package, the Manager must not advance the package to Reviewer or Owner while a known execution-boundary gap remains. The Manager is responsible for coordinating boundary closure, but the package preparer and Reviewer have independent responsibilities under Section 12.

## 12. Execution-Boundary Closure

An authorized mutation boundary must include every state change necessarily required to perform the approved operation.

An execution package is incomplete if it authorizes a final target but omits a prerequisite mutation needed to reach it.

Examples include creating an unlisted parent directory, writing an unlisted temporary file required for installation, modifying an additional symlink, implicitly altering another service, changing a branch or worktree when the package prohibits Git-state mutation, or introducing an extra credential, provider writer, queue, timer, or worker.

The requirement is:

```text
Every required mutation is inside the proposed boundary.
No required mutation is merely assumed.
```

### 12.1 Package preparer

The Executor or other role preparing a consequential execution package must identify the mutations logically required by the proposed command sequence.

Where practical, it should verify prerequisite path, filesystem, service, configuration, and target assumptions before presenting the package as implementation-ready.

### 12.2 Reviewer

When independent review is required, the Reviewer must challenge the proposed boundary for hidden or prerequisite mutations.

The Reviewer should ask whether the package can actually be executed from its stated pre-state without changing anything outside its allowlist.

Independent review does not guarantee that every environmental assumption can be discovered before execution, but known or reasonably inspectable prerequisites must not be ignored.

### 12.3 Manager

The Manager must not advance a package for consequential Owner authorization while a known execution-boundary defect remains unresolved.

The Manager coordinates any bounded amendment required to repair the package.

### 12.4 Executor at execution time

The executing Executor must still validate the real pre-state immediately before consequential mutation.

If execution discovers a required mutation outside the authorized boundary:

```text
stop before the unauthorized mutation
preserve current state
report the exact gap
propose the smallest justified correction
```

The Executor must not repair the allowlist by inference.

Successful package review does not transfer authority to resolve a newly discovered boundary defect during execution.

## 13. Executor Responsibilities

Before acting, the Executor must:

1. read the governing work item;
2. locate the latest addressed handoff;
3. resolve any explicitly incorporated base package;
4. inspect the state relevant to the intended operation;
5. identify applicable durable project instructions;
6. confirm the action is within scope;
7. confirm that required authority exists;
8. perform required preconditions.

The Executor may resolve ordinary implementation choices.

The Executor must not silently widen scope, reinterpret consequential Owner authorization, alter an independently approved execution package materially, perform adjacent cleanup, redesign unrelated components, or make unstated product decisions.

### 13.1 Executor `NEEDS DECISION`

Report `NEEDS DECISION` when multiple materially different outcomes are possible, current instructions conflict, acceptance criteria are inconsistent, scope must materially expand, a package defect requires changing the authorized boundary, destructive or consequential work lacks sufficient authorization, a product/architecture/security/provider/billing/policy decision remains, or the correct result depends on an unstated Owner preference.

### 13.2 Executor `BLOCKED`

Report `BLOCKED` when required access or credentials are unavailable, a required service or repository cannot be accessed, the environment cannot perform required verification, an external dependency prevents progress, or repository/platform policy prevents the authorized action.

### 13.3 Fail closed

When the Executor cannot perform the authorized action exactly and safely:

```text
stop before mutation
preserve current state
report exact evidence
identify the smallest justified correction
```

Technical obviousness does not expand authority.

## 14. Reviewer Responsibilities

The Reviewer receives a bounded candidate.

Before disposition, the Reviewer should:

1. identify the exact candidate or package;
2. identify the governing active requirements;
3. inspect relevant repository or system state;
4. inspect the Executor evidence;
5. independently examine risk-sensitive boundaries;
6. identify what evidence was reproduced versus inherited;
7. identify missing or stale evidence;
8. check scope and exclusions;
9. evaluate rollback or recovery where relevant;
10. issue one clear disposition.

Recommended dispositions are:

```text
APPROVED
CHANGES REQUESTED
NEEDS DECISION
BLOCKED
```

Do not create elaborate review-state taxonomies.

### 14.1 Reviewer independence is judgment, not ritual duplication

A Reviewer need not rerun every Executor command.

The Reviewer should independently reproduce evidence when the result is central to approval, reproduction is practical, the evidence is suspect, independence materially increases confidence, or project rules require it.

The Reviewer may rely on identified Executor evidence when the evidence is deterministic and credible, direct reproduction is unavailable or wasteful, the limitation is disclosed, and the next consequential boundary revalidates it when necessary.

A Reviewer must not imply independent reproduction when it merely inspected another role's evidence.

### 14.2 Reviewer does not silently repair

When a Reviewer finds a production or candidate defect:

```text
Reviewer → Manager
Manager → Executor
```

The Reviewer may repair review-owned tests, fixtures, or disposable review artifacts when explicitly within its scope.

The Reviewer should not modify the candidate and then approve the modified candidate as though it were independently reviewed.

### 14.3 Reviewer disposition is candidate-bound

A Reviewer disposition applies to the exact candidate, package, artifact, result, or state that was reviewed.

A material change to that subject does not automatically inherit the previous approval.

```text
candidate A
    ↓ reviewed
APPROVED

candidate A changes materially to B
    ↓
approval does not automatically transfer
```

Evidence whose actual subject remains unchanged may remain valid.

Rereview may therefore be limited to the changed surface, evidence invalidated by the change, integration effects of the change, and acceptance criteria affected by the change.

Material changes commonly include changed candidate head, changed artifact identity, changed mutation boundary, changed consequential behavior, changed rollback/recovery semantics, changed security/provider behavior, or changed acceptance boundary.

Do not treat approval of one candidate as approval of another merely because they are similar.

### 14.4 Conflicting Reviewer findings

Reviewers do not vote.

If multiple Reviewers produce conflicting material findings, the most recent disposition does not automatically erase earlier unresolved evidence.

The Manager must reconcile the underlying technical disagreement.

Appropriate responses include targeted reproduction, additional evidence, bounded remediation, clarification of a misunderstood requirement, another independent investigation, or `NEEDS DECISION` when the conflict cannot be technically resolved within current authority.

An earlier finding may cease to block when the defect is corrected, its subject materially changes, the evidence is demonstrated to have been incorrect, or the finding is shown not to apply to the operative candidate.

A later `APPROVED` disposition alone is not sufficient to make an unresolved contrary finding disappear.

## 15. Verification Strategy

Verification should be staged.

### 15.1 During implementation or investigation

Run the smallest checks that provide useful feedback.

Do not repeatedly run the entire expensive verification suite after every small change without cause.

### 15.2 At stable Executor handoff

Before claiming `COMPLETE`, run the verification appropriate to the actual acceptance boundary.

### 15.3 During Reviewer evaluation

Use independent, risk-directed verification focused on likely defects, acceptance boundaries, failure behavior, scope, invariants, and integration risk.

Reviewer verification need not mechanically duplicate the Executor's complete suite.

### 15.4 At consequential execution

Refresh all volatile preconditions that are material to safe execution.

The existence of previous evidence does not eliminate this requirement.

## 16. Evidence Identity and Validity

Evidence is meaningful only in relation to the claim and subject it actually proves.

Evidence should be scoped to the smallest subject and conditions necessary to support the claim.

Do not attach unrelated ambient state to an evidence claim merely because it was observable at the same time.

Examples:

```text
artifact checksum
    → subject: exact artifact bytes

artifact provenance
    → subject: generation from exact source commit/tree

workspace preservation
    → subject: branch/ref/index/worktree state

service acceptance
    → subject: exact deployed unit and relevant live state
```

Evidence identity should record or make recoverable the material combination of claim/subject, version/commit/artifact/target identity, relevant environment or system conditions, verification operation, observed result, and time when volatility matters.

### 16.1 Stable evidence

Evidence is relatively stable when its subject is immutable or demonstrably unchanged.

Examples include commit tree identity, immutable artifact checksum, and deterministic verification against an unchanged source identity.

Stable evidence may be inherited by later roles while its actual subject remains unchanged. Unrelated changes do not automatically invalidate it.

### 16.2 Volatile evidence

Evidence is volatile when its relevant subject can change independently.

Examples include service state, process existence, lock ownership, live credential metadata, provider state, branch head, live configuration, queue contents, and database contents.

Volatile evidence may support planning and review but must be refreshed at the consequential boundary when current state matters.

### 16.3 Evidence provenance

A role should distinguish conceptually between:

**Direct evidence** — the acting role independently observed or reproduced it.

**Inherited evidence** — the acting role relies on an exact earlier result.

**Revalidate-at-use evidence** — the evidence is adequate for planning or approval but must be refreshed before the consequential operation or boundary crossing.

These are explanatory concepts. Projects are not required to create formal labels or metadata fields for them.

### 16.4 Evidence invalidation

Prior evidence becomes stale when a condition relevant to its actual subject or claim changes.

Typical invalidators include the tested candidate changing, artifact changing, relevant configuration/fixtures/inputs changing, tested environment changing materially, live state changing, another observation conflicting with the result, or the required independence level changing.

A role transition by itself does not invalidate evidence. An unrelated repository or environment change does not invalidate evidence whose scoped subject remains unaffected.

### 16.5 Boundary-triggered revalidation

Evidence may also require revalidation when its subject crosses a boundary where identity or state could have changed independently, even when no defect is known.

Examples include artifact creation → transfer, local release → production staging, repository object → deployed artifact, local object → provider upload/download, or prepared state → consequential execution.

At such a boundary, verify the property that must survive the crossing. Do not rerun unrelated verification merely because a boundary was crossed.

## 17. Thread Continuity and Replacement

MORE handoffs must support cold-start recovery. They do not require intentional cold starts.

```text
Cold-startability is a recovery property,
not a requirement to discard useful continuity.
```

When practical, reuse the same Executor thread for one work package and its remediation. When practical, reuse the same Reviewer thread for a candidate and its bounded rereview.

However, GitHub must remain sufficient for replacement; private session context must never be the only record of material authority or state; replacement actors must be able to reconstruct the work from the active handoff, incorporated references, repository or system state, and durable documentation.

### 17.1 Existing working state

A replacement or newly assigned Executor must inspect existing working state before modifying it.

This includes, where relevant, modified tracked files, untracked files, staged changes, current branch/head, worktrees, generated artifacts, and partially completed operational state.

Pre-existing work must be preserved unless current authority explicitly permits its removal, replacement, or abandonment.

Unknown provenance is a reason to inspect and reconcile state. It is not permission to discard it.

A replacement Executor must not use destructive cleanup such as reset, checkout-overwrite, broad deletion, or equivalent state removal merely to recreate a convenient baseline unless that action is explicitly authorized.

Repository and observed system state remain technical truth even when the actor that created that state is unavailable.

A replacement actor may continue existing work when it can reconcile that work with the current handoff and establish that continuation remains within scope. If ownership, intent, or safety cannot be established, stop and report the ambiguity.

### 17.2 Replacement

Replace an actor when it is unavailable, repeatedly returns no material evidence, has compromised context, required independence demands a fresh context, or project requirements otherwise require replacement.

Replacement does not invalidate valid repository state or evidence merely because the originating session is gone.

## 18. Remediation

Review findings should produce the smallest justified remediation.

The Manager should not turn narrow review feedback into a new broad planning package.

A remediation handoff should identify the exact defect, affected acceptance criterion, exact candidate, allowed correction boundary, and verification required after correction.

When possible, return remediation to the same Executor. After remediation, return the candidate to the same Reviewer when independent rereview is still required.

### 18.1 Bounded amendments to approved packages

A material change to a HIGH or CRITICAL execution package invalidates approval for the changed portion.

Changes affecting the mutation boundary, target, safety-relevant command sequence, credential/provider use, rollback boundary, recovery semantics, acceptance requirements, or irreversible effects normally require fresh Reviewer approval and Owner authorization.

Unchanged portions may remain incorporated by exact reference.

Do not infer authorization for the delta from authorization of the base.

## 19. Owner Authorization

When explicit Owner authorization is required, the authorization must be bound to the exact consequential action it permits.

### 19.1 Authorization subject

Owner authorization should identify, as applicable, the exact work item, candidate/package/artifact/release/commit/operational target, material amendments incorporated into that subject, authorized action, authorized target, relevant preconditions, mutation boundary, stop conditions, and rollback/recovery boundary.

Authorization applies to that subject. It does not automatically transfer to a materially different candidate or package.

```text
technical evidence may remain valid
        ≠
authority automatically remains valid
```

If the proposed execution differs materially from the authorized subject, the Executor must stop. The difference must receive whatever review and Owner authorization its risk requires.

Material differences commonly include changes to candidate identity, mutation boundary, target, credential/provider use, consequential command sequence, rollback/recovery behavior, acceptance boundary, or irreversible effects.

Incidental changes that do not alter the authorized action, safety properties, or consequential boundary need not trigger reauthorization unless project policy requires it.

### 19.2 Authorization visibility

Owner discussion or decisions may originate outside GitHub.

However, HIGH or CRITICAL execution authorization is not operative for MORE purposes until it is recorded on the project's shared coordination surface.

The default shared surface is the governing GitHub issue or pull request. A project may designate another durable coordination surface when appropriate.

```text
A replacement Executor must be able to discover
 the consequential authorization without access
 to private conversation history.
```

A private message such as `Go ahead.` may communicate Owner intent to the Manager. It does not, by itself, constitute discoverable execution authority for a cold-start Executor.

The Manager or Owner should record the resulting authorization before consequential execution begins.

### 19.3 Authorization by reference

An Owner should normally reference an already reviewed package rather than duplicating it.

Example:

```text
[OWNER → EXECUTOR]

I authorize execution of the exact package in result <id>,
as amended by <id> and independently approved in <id>.

Authorization applies only at the expected pre-state
and only within the exact mutation boundary described there.

Stop before mutation on material drift.
```

Owner authorization must not be inferred from technical ability, previous approval of another candidate, Reviewer approval, an old Owner authorization for a superseded package, or an apparently obvious next step.

## 20. Rollback and Recovery

Rollback is not inherently safe merely because it restores an earlier configuration.

A package should distinguish rollback before durable/external effects from recovery after durable/external effects.

A pre-approved local rollback may be appropriate while no external provider action occurred, no irreversible migration occurred, no durable data changed unexpectedly, and the defined rollback preconditions still hold.

After material durable or external effects:

- do not blindly retry;
- do not blindly restore old state;
- preserve evidence;
- stop ambiguous automation;
- reconcile actual state;
- obtain a new decision when needed.

## 21. Independent Post-Execution Review

Post-execution independent review is risk-driven. It is not a default second approval ceremony for every consequential action.

For HIGH work, require independent post-execution review when independent observation would materially reduce residual uncertainty.

Examples include when the result depends materially on judgment rather than objective acceptance, provider/external effects cannot be completely established from Executor evidence, an irreversible or difficult-to-reverse data transformation occurred, a material acceptance condition could not be mechanically observed by the Executor, unexpected effects occurred, execution deviated from the approved package, material residual risk remains after Executor verification, or project policy independently requires it.

A HIGH action may close without a second Reviewer when execution matched the exact approved package, relevant volatile preconditions were refreshed before mutation, the resulting state is objectively and mechanically verifiable, all material acceptance checks passed, no unexpected effects occurred, no meaningful independent evidence would be added by repeating those checks, and project rules permit closure.

CRITICAL work requires independent post-execution review.

The governing package should make the expected post-execution review requirement clear before execution when practical.

If execution itself creates new uncertainty, the Manager may require post-execution independent review even when it was not originally planned.

## 22. Pull Requests and Integration

Use a pull request when repository changes require integration review.

The pull request should link the governing issue, identify the active implementation boundary, summarize the change, identify the exact candidate head, report verification, disclose checks not run, identify residual risks, and avoid duplicating the entire issue.

Code-specific review belongs in inline review comments where useful. Overall disposition, scope decisions, and broad remediation should remain consolidated in a top-level comment or governing issue.

A pull request must not claim to close an issue whose required outcome is still incomplete.

## 23. Parallel and Multi-Agent Work

Parallel work is appropriate when boundaries are genuinely independent.

Each concurrent work package should have a clear GitHub boundary, explicit ownership, identifiable repository or operational surface, visible dependencies, and an integration point.

Do not create an agent hierarchy merely because multiple agents are available. Do not maximize concurrency for its own sake.

Overlapping mutation ownership must be resolved before simultaneous execution.

Independent read-only investigation may occur in parallel when it does not create authority ambiguity.

### 23.1 Optional read-only scouts

A Manager or Reviewer may use a read-only helper to investigate bounded supplementary context.

Such a helper is not a fifth MORE role, holds no Owner/Manager authority, cannot approve anything, does not own a work item, does not create durable workflow state, must not mutate the repository or environment, and returns concise factual findings to the role that invoked it.

The invoking MORE role remains responsible for all decisions and claims based on those findings.

Use scouts only when they reduce meaningful context cost. Do not make them mandatory.

## 24. Work States and Dispositions

Projects may reuse existing labels or statuses.

The minimal general work states are:

```text
READY
IN PROGRESS
COMPLETE
BLOCKED
NEEDS DECISION
FAILED
```

Reviewer dispositions are normally:

```text
APPROVED
CHANGES REQUESTED
NEEDS DECISION
BLOCKED
```

Do not introduce new labels merely to reproduce these words. The active handoff comment carries authority. Labels are convenience metadata.

## 25. Standard Manager → Executor Handoff

Recommended structure:

```text
[MANAGER → EXECUTOR]

Status:
READY

Work item:
Issue #<number>

Risk:
LOW | MEDIUM | HIGH | CRITICAL

Objective:
<Required result>

Current state:
- <Material exact state only>

Base:
- <Exact incorporated package/result if applicable>

In scope:
- <Authorized work>

Out of scope:
- <Excluded work>

Constraints:
- <Material constraints>

Acceptance criteria:
- [ ] <Observable criterion>

Required verification:
- <Required evidence>

Stop and report if:
- <Conditions requiring BLOCKED or NEEDS DECISION>
```

Fields that add no useful information may be omitted. Do not pad handoffs with project history already available through durable documentation or exact references.

## 26. Standard Executor → Manager Result

Recommended structure:

```text
[EXECUTOR → MANAGER]

Status:
COMPLETE | BLOCKED | NEEDS DECISION | FAILED

Work item:
Issue #<number>

Candidate / state:
<branch, head, artifact, host, release, or target as applicable>

Result:
- <Concise final result>

Changes:
- <Actual mutations, or None>

Verification:
- <check> — PASS | FAIL | NOT RUN

Acceptance criteria:
- [x] <criterion> — PASS
- [ ] <criterion> — FAIL | NOT VERIFIED

Inherited evidence:
- <Exact reference when material>

Checks not performed:
- <check and reason, or None>

Unexpected findings:
- <material findings, or None>

Remaining risks:
- <risks, or None>

Decision or action required:
- <required action, or None>

Recommended next action:
- <smallest justified next step>
```

Report final state. Do not narrate every intermediate command.

## 27. Standard Manager → Reviewer Handoff

Recommended structure:

```text
[MANAGER → REVIEWER]

Status:
READY

Work item:
Issue #<number>

Candidate:
<exact result, PR head, artifact, package, or operational state>

Review objective:
<What the Reviewer must independently determine>

Risk:
LOW | MEDIUM | HIGH | CRITICAL

Acceptance boundary:
- <criteria>

Evidence available:
- <exact referenced evidence>

Independent verification required:
- <specific reproduction or risk-directed checks>

Known limitations:
- <evidence the Reviewer cannot directly reproduce>

Disposition:
APPROVED | CHANGES REQUESTED | NEEDS DECISION | BLOCKED
```

## 28. Standard Reviewer → Manager Result

Recommended structure:

```text
[REVIEWER → MANAGER]

Status:
APPROVED | CHANGES REQUESTED | NEEDS DECISION | BLOCKED

Work item:
Issue #<number>

Reviewed candidate:
<exact identity>

Result:
- <concise disposition and material findings>

Direct verification:
- <checks independently performed>

Inherited evidence:
- <evidence relied upon but not independently reproduced>

Acceptance criteria:
- [x] <criterion> — PASS
- [ ] <criterion> — FAIL

Remaining risks:
- <risks>

Decision or action required:
- <required action, or None>
```

The Reviewer must disclose material evidence limitations.

## 29. Standard Manager → Owner Decision Request

When a real Owner decision remains:

```text
[MANAGER → OWNER]

Work item:
Issue #<number>

Decision required:
<one bounded decision>

Current candidate:
<exact package/result>

Reviewer disposition:
<exact reference when applicable>

Material options:
- <option>
- <option>

Consequences:
- <material tradeoffs only>

Manager recommendation:
<recommendation, if one is justified>

Execution remains unauthorized until Owner direction is recorded.
```

Do not send ordinary implementation details to the Owner as decisions.

## 30. Merge and Closure

A repository change may be merged when it addresses the current active handoff, required acceptance criteria pass, required review is complete, required checks pass, risk requirements are satisfied, durable documentation is current where necessary, no blocking finding remains, and residual risk is disclosed.

An issue may close when the required outcome exists, required integration is complete, required execution occurred, required post-execution verification is complete, and no unresolved blocker remains inside the issue boundary.

The Manager normally owns closure. For consequential Owner-authorized actions, the Owner may record closure directly.

Example:

```text
[OWNER → RECORD]

Status:
CLOSED — COMPLETED

Issue #123 is complete.

The authorized action was executed and accepted.
The protected boundaries identified in the active package remain intact.
No further action remains under this issue.
```

After closure, the work item becomes historical context. It is not continuing authority.

## 31. Cold-Start Requirement

At any meaningful handoff boundary, a replacement actor must be able to recover current work from:

1. the governing work item;
2. the latest addressed handoff;
3. exact references incorporated by that handoff;
4. relevant repository or observed system state;
5. durable project documentation.

A cold-start actor should not need private chat history, another agent's hidden reasoning, a session journal, a private mailbox, or undocumented assumptions.

If the current operative state cannot be reconstructed this way, the Manager should replace the fragmented instruction set with one clearer handoff.

## 32. Anti-Patterns

MORE projects should avoid:

- **Accumulated authority** — treating every historical comment as simultaneously operative.
- **Governance proliferation** — adding registries, ledgers, journals, nested approvals, or status systems instead of clarifying one active handoff.
- **Role theater** — invoking all four roles for trivial work with no meaningful authority or independence boundary.
- **Self-review disguised as independence** — allowing the active Executor to satisfy a required independent Reviewer gate.
- **Approval by implication** — treating technical ability, previous approval, or obviousness as authority for a new consequential action.
- **Historical authorization reuse** — treating an old Owner approval as authorization for a materially changed package.
- **Exactness theater** — adding precise but operation-irrelevant constraints that create false blockers without protecting a real invariant.
- **Hidden mutation** — authorizing an output path or final state while omitting prerequisite mutations required to create it.
- **Review duplication** — requiring the Reviewer to rerun every Executor command regardless of evidence validity or risk.
- **Evidence amnesia** — rerunning expensive valid verification merely because a new role or session began.
- **Evidence overreach** — treating inherited evidence as independently reproduced evidence.
- **Blind rollback** — restoring old state after durable external effects without reconciling what actually occurred.
- **Narrative reporting** — posting chronological command transcripts instead of state, evidence, risks, and next action.
- **Scope creep** — using a bounded handoff to justify adjacent cleanup, redesign, or policy changes.
- **Delta accumulation** — allowing many partial amendments to become harder to understand than a replacement handoff.
- **Permanent temporary state** — writing current issue status into durable project documentation.

## 33. Adoption in an Established Project

MORE should be introduced prospectively and incrementally.

Adoption must not require the project to rewrite issue history, relabel every issue, reopen completed work, replace branching strategy, rebuild documentation, create a project board, or pause engineering work.

Before adoption, inspect existing README, CONTRIBUTING/AGENTS instructions, issue and PR templates, required checks, branch protections, release/deployment procedures, security policies, and representative recent work.

Reuse working conventions. Add only the missing MORE concepts.

A normal initial installation requires no more than a latest-handoff rule, role definitions, one Executor handoff/result structure, independent-review semantics where needed, Owner authorization semantics for consequential work, and evidence/cold-start rules.

## 34. Default Repository Instruction

A concise repository-level instruction may be:

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

Repositories may shorten or adapt this wording.

## 35. Success Criteria

MORE is working when:

- a cold-start actor can identify the current authorized task quickly;
- historical comments do not accidentally reactivate old instructions;
- Executors know exactly what they may and may not do;
- Reviewers provide genuinely independent judgment where required;
- Owner decisions occur only where consequential authority is actually needed;
- high-risk execution fails closed on drift or package defects;
- narrow defects produce narrow amendments;
- valid evidence survives role transitions when its subject has not changed;
- volatile state is refreshed before consequential use;
- unnecessary full verification reruns decline;
- work remains visible in ordinary GitHub surfaces;
- durable documentation remains free of transient work state;
- the coordination system does not grow faster than the engineering work.

## 36. Default Operating Rule

When uncertain:

```text
Find the current work item.
Find the latest handoff addressed to your role.
Resolve only the exact prior material it incorporates.
Inspect the state the operation actually consumes.
Stay inside the stated boundary.
Reuse valid evidence.
Refresh volatile evidence before consequential action.
Verify proportionally.
Stop rather than infer consequential authority.
Return the smallest useful result or delta.
Do not create a new governance mechanism unless repeated evidence requires one.
```

That is MORE.
