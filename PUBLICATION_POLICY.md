# MORE Field-Study Publication Policy

MORE field studies may be derived from public or private project work. Public distribution should expose enough evidence to evaluate MORE while protecting information whose disclosure could create avoidable privacy, security, or competitive harm.

This policy complements `FIELD_VALIDATION.md`. It governs what information may be published from a source project; it does not change MORE's normative coordination behavior in `SPEC.md`.

## 1. Publish protocol evidence, not source-project value

The public purpose of a MORE field study is to show how the protocol behaved.

A public study should preserve only the information needed to evaluate questions such as:

- which MORE roles were active;
- what authority boundary governed the action;
- what risk level applied;
- what evidence was direct, inherited, or refreshed;
- whether a handoff failed closed;
- whether a bounded amendment occurred;
- whether review or Owner authorization remained valid;
- what acceptance condition passed or failed;
- what protocol lesson followed.

A field study does not need to disclose the source project's valuable technical, analytical, business, or operational substance merely to prove those protocol facts.

## 2. Private-source codenames

Private source projects use stable neutral public codenames.

The public MORE repository must not contain a codename-to-private-project lookup unless the source Owner explicitly authorizes that disclosure.

Source identity and commercially sensitive knowledge are separate concerns. A study can be fully anonymized and still disclose valuable private know-how. Both boundaries must be reviewed before publication.

## 3. Commercial-sensitivity default

For a private source, withhold information that could plausibly preserve or reveal a competitive, product, or market advantage unless the source Owner explicitly approves disclosure.

Examples include, when applicable:

- proprietary research findings or analysis results;
- strategy, decision, selection, or prioritization logic;
- model, signal, ranking, scoring, forecasting, or evaluation methods and performance;
- edge estimates, thresholds, opportunity-selection rules, or other derived decision metrics;
- proprietary datasets, data transformations, features, labels, or evaluation sets;
- experiment results whose value depends on remaining non-public;
- product roadmap details or unreleased capabilities;
- operational methods that materially improve replication of the source project's competitive advantage;
- non-public customer, market, pricing, cost, supplier, or partner information;
- any other know-how with plausible economic value from not being generally known.

This list is illustrative, not exhaustive.

When uncertain whether a detail has commercial value, the default is **do not publish it**. The public study should generalize the detail to the smallest statement needed to preserve the MORE lesson.

## 4. Identity and operational sanitization

For private sources, also remove or generalize identifiers that are unnecessary to evaluate MORE, including as applicable:

- private repository names and URLs;
- private issue and pull-request numbers;
- private commit hashes and artifact identifiers;
- hostnames and exact filesystem paths;
- service, unit, credential, account, provider, customer, market, location, or environment names;
- secret-adjacent metadata;
- source-specific operational details that create security or competitive value without strengthening the protocol evidence.

## 5. Preserve the evidence chain privately

Sanitization does not mean the underlying evidence may be invented or weakened.

The source project should retain the exact private evidence needed to substantiate the public structural claim. Public MORE readers should normally be linked only to sanitized public MORE artifacts.

A private-source field report should say that exact supporting evidence remains in the private source when public reproduction would disclose protected information.

## 6. Minimum necessary disclosure

Before publishing a private-source field study, apply this test to each source-specific detail:

```text
Does a public reader need this detail to evaluate the MORE behavior?
```

If no, omit or generalize it.

If yes, ask a second question:

```text
Could disclosing it materially reduce privacy, security, product, or market advantage?
```

If yes or materially uncertain, withhold it unless the source Owner explicitly authorizes disclosure. Reformulate the public evidence at a higher level if possible.

## 7. Owner authority

The source Owner may authorize disclosure of otherwise protected source information.

Such authorization should identify the exact information or class of information being released. General participation in MORE field validation does not imply permission to publish private project details or commercially sensitive know-how.

## 8. Historical exposure

This policy is prospective unless an Owner separately authorizes history rewriting or other destructive remediation.

Accidental or earlier disclosure does not make the same information automatically suitable for future publication. Forward-facing MORE materials should still follow the current protection standard.

## 9. Publication rule

The default public field-study rule is:

```text
Publish enough to validate MORE.
Protect private-source identity where useful.
Protect commercially valuable know-how by default.
When in doubt, preserve the source project's advantage and publish a more abstract protocol description.
```
