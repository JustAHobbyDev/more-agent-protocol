---
name: Field report
description: Report how MORE behaved in a real project workflow.
title: "Field report: "
labels: []
assignees: []
---

## MORE version

Release, tag, or exact public MORE commit used.

## Public project identifier

For a public source, use the public project name.

For a private source, use a stable neutral codename such as `Project Cedar`. Do **not** include the private repository name, URL, private issue/PR numbers, private commit hashes, or a public mapping back to the source project.

## Source visibility

`PUBLIC` or `PRIVATE`.

If `PRIVATE`, sanitize the report according to `FIELD_VALIDATION.md`. Public evidence should point to sanitized MORE artifacts rather than inaccessible private-source URLs.

## MORE roles involved

- Manager:
- Owner:
- Reviewer:
- Executor:

Only list roles that actually participated. Use role descriptions rather than private identities when identities are not intended for disclosure.

## Risk boundary

LOW / MEDIUM / HIGH / CRITICAL

## Validation coverage

List only the scenarios this field use genuinely exercised. Do not use task checkboxes for coverage classification.

Possible values:

- Low-risk role collapse
- Independent review of a repository candidate
- Bounded remediation and rereview
- High-risk consequential execution
- Cold-start or replacement continuation
- Evidence reuse across a transition or delta
- Other / not primarily a stable-release validation case

Coverage:

## What happened

Summarize the operative handoffs or equivalent shared-state transitions and final result. For private sources, preserve protocol structure while removing source-identifying operational details.

## What worked

Which MORE rules reduced ambiguity, risk, context cost, or duplicated work?

## Friction or failure

Where did MORE cause unnecessary work, fail to specify behavior, or permit an undesirable result?

## Public evidence

Link sanitized public MORE case studies, public commits, public pull requests, or other public evidence.

For a private source, do not link private repositories or reproduce private identifiers. State when exact supporting evidence remains in the private source.

Distinguish direct evidence from inherited evidence when that distinction matters.

## Classification

List the applicable classification in plain text rather than task checkboxes:

- Protocol validation
- Documentation or example gap
- Project-specific misuse
- Possible normative defect

Classification:

## Protocol implication

Describe the smallest justified follow-up. If this appears to be a normative defect, open a separate protocol-defect issue and link this report as sanitized public evidence.
