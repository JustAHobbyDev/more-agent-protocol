# Project Cedar — Artifact Exactness

**Source visibility:** Private

Project Cedar is the stable public codename for a private production project used to validate MORE. The public MORE repository intentionally contains no mapping back to the source repository.

## Purpose

This case tested whether precise preconditions were actually relevant to the operation being performed.

The bounded task was to create and verify one release artifact from an exact immutable source revision without modifying repository or production state.

## Initial false stop

The original handoff required both the canonical source ref and the current checkout to equal the release revision.

The Executor found that:

- the canonical source ref matched the required revision;
- the checkout pointed at a different already-accepted revision;
- both revisions had identical source-tree content;
- the working tree and index were clean.

Because the active handoff explicitly required checkout identity, the Executor correctly stopped rather than silently ignoring or changing that condition.

## Why the precondition was unnecessary

The artifact command consumed an explicitly named immutable source revision. The checkout's symbolic identity was not an input to artifact creation.

The Manager therefore superseded only the checkout-identity precondition while leaving the artifact source, output boundary, safety checks, and verification requirements unchanged.

The Executor then generated and verified the artifact without changing branch, refs, index, or worktree state.

## Review limitation

The Reviewer could independently inspect the source identity, posted inventory, generation contract, and reported checksum evidence.

The Reviewer could not independently byte-read the local artifact because it intentionally remained on the development machine.

The review disclosed that limitation and required exact size/checksum revalidation if the artifact later crossed a transfer or staging boundary.

## MORE lessons

This case directly motivated or validated:

- **operation-relevant exactness** — hard preconditions should protect actual operation inputs, authority boundaries, safety properties, or acceptance conditions;
- **fail-closed obedience** — a defective handoff is not permission for the Executor to ignore it;
- **bounded supersession** — one bad precondition can be corrected without rewriting the whole package;
- **evidence scoping** — source-revision identity, source-tree identity, workspace identity, and artifact identity prove different claims;
- **Reviewer evidence disclosure** — independent judgment does not require pretending all evidence was independently reproduced;
- **boundary-triggered revalidation** — local artifact evidence remains useful, but the relevant identity property must be re-established when the artifact crosses a boundary.

## Privacy note

Exact repository identifiers, revisions, artifact names, private issue numbers, and local paths remain in the private source. The public case retains only the protocol-relevant structure.
