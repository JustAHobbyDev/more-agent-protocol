# Repair malformed MORE comments with GitHub Actions

MORE handoffs occasionally arrive at GitHub with intended Markdown line breaks serialized as literal `\\n` text. The reusable repair workflow in this repository can repair that narrow publication defect without interpreting authority or changing handoff semantics.

## Install in a consuming repository

Create `.github/workflows/repair-more-comments.yml` in the consuming repository:

```yaml
name: Repair malformed MORE comments

on:
  issue_comment:
    types: [created]

permissions:
  contents: read
  issues: write
  pull-requests: write

jobs:
  repair:
    uses: JustAHobbyDev/more-agent-protocol/.github/workflows/repair-more-comment.yml@main
```

`issue_comment` covers top-level issue comments and pull-request conversation comments. Editing the original comment does not retrigger this workflow because the caller listens only for `created` events.

The reusable workflow uses the caller repository's `GITHUB_TOKEN`. No personal access token is required for the normal case. The caller must allow the requested `issues: write` / `pull-requests: write` permissions.

For reproducibility and security, pin the reusable workflow to an exact commit
instead of `@main`. The reusable workflow checks out its co-located repair action
from the same repository and exact commit that defines the called job, so the code
receiving the caller token is bound to the reviewed workflow source. A release tag
also keeps the workflow and action together, but a tag can move and is therefore a
weaker pin than a commit SHA.

## What is repaired

The repair is intentionally conservative. A comment is eligible only when all of these are true:

1. the body begins with a recognizable MORE addressed handoff using Owner, Manager, Executor, Reviewer, or `ROOT MANAGER` as the source and a normal MORE role as the destination;
2. at least three single-escaped literal newline sequences are present;
3. the body already contains at most one real newline;
4. the escaped text contains a blank-line boundary followed by a recognizable handoff field such as `Status:`, `Disposition:`, `Work item:`, `Result:`, or `Authority:`;
5. decoding only the single-escaped `\\r\\n` / `\\n` sequences preserves the same recognizable addressed header.

The action does not decode tabs, quotes, Unicode escapes, arbitrary JSON escapes, or double-escaped literal `\\n` content.

## Example

Before:

```text
[REVIEWER → MANAGER]\\n\\nDisposition:\\nAPPROVE\\n\\nWork item:\\nIssue #86
```

After:

```text
[REVIEWER → MANAGER]

Disposition:
APPROVE

Work item:
Issue #86
```

The existing GitHub comment is updated in place. No replacement comment, authority record, or secondary state is created.

## Boundary

This utility repairs publication fidelity only:

```text
publication fidelity repair != authority interpretation
```

If the comment does not match the narrow malformed-publication signature, it is left untouched.
