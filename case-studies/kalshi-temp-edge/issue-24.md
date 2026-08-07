# Field Case — `kalshi-temp-edge` Issue #24

Source: https://github.com/JustAHobbyDev/kalshi-temp-edge/issues/24

## Purpose

Issue #24 tested whether precise instructions were actually relevant to the operation being performed.

The bounded task was to create and verify one release artifact from an exact Git commit without modifying repository or production state.

## Initial false stop

The original handoff required both `origin/main` and checkout `HEAD` to equal the release commit.

The Executor found:

- `origin/main` matched the required release commit;
- checkout `HEAD` was a different already-merged branch commit;
- both commits had the identical required tree;
- the working tree and index were clean.

Because the active handoff explicitly required exact `HEAD` identity, the Executor correctly stopped rather than switching branches without authorization.

## Why the precondition was unnecessary

The artifact command consumed an explicitly named immutable commit:

```bash
git archive ... <release-commit>
```

Checkout `HEAD` was not an input to the archive operation.

The Manager therefore superseded only the bad `HEAD == release commit` precondition while leaving the rest of the artifact contract unchanged.

The Executor then generated and verified the artifact without changing branch, HEAD, refs, index, or worktree state.

## Review limitation

The Reviewer could inspect the repository evidence, exact artifact identity, repeated-generation equality, posted complete inventory, and Executor checksum evidence.

The Reviewer could not independently byte-read the local artifact because it intentionally remained on the development machine.

The review disclosed this limitation and required a future transfer/staging boundary to revalidate the received artifact's exact size and SHA-256.

## MORE lessons

This case directly motivated or validated:

- **operation-relevant exactness** — exact preconditions should protect actual operation inputs, authority boundaries, safety properties, or acceptance conditions;
- **fail-closed obedience to active authority** — a defective handoff is not permission for the Executor to ignore it;
- **bounded supersession** — one bad precondition can be corrected without rewriting the whole package;
- **evidence scoping** — commit identity, tree identity, workspace identity, and artifact identity prove different claims;
- **Reviewer evidence disclosure** — independent judgment does not require pretending all evidence was independently reproduced;
- **boundary-triggered revalidation** — artifact checksum evidence remains useful, but identity must be re-established when the artifact crosses a transfer/staging boundary.

## Anti-lesson

Exactness is not automatically safety. A precise but operation-irrelevant condition can create false blockers and additional handoff cycles.
