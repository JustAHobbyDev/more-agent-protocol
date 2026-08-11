# MORE Progress and Attention Events

**Profile:** `more.events/1`  
**Status:** Optional implementation profile; non-authoritative.

MORE uses GitHub work items and addressed handoffs as its durable coordination surface. This profile gives harnesses, UIs, notification adapters, monitoring agents, and other integrations a small transport-neutral event format for observing meaningful coordination state without scraping arbitrary prose.

## Core rule

A MORE event is a projection of coordination state, not a second authority channel.

Delivery, acknowledgement, duplication, delay, loss, or consumption of an event does not by itself:

- authorize consequential action;
- satisfy an Owner decision or authorization boundary;
- supersede the latest addressed handoff;
- validate or invalidate an otherwise valid handoff;
- replace a durable handoff or result that MORE requires;
- create a current-work, approval, or authority registry.

When an event represents a durable MORE handoff, result, decision request, blocker, completion, or failure, the durable record remains authoritative and the event must reference it exactly.

A project that emits no MORE events remains fully capable of using MORE.

## Event types

`more.events/1` defines seven event types:

- **`PROGRESS`** — optional ongoing activity useful for observability. May be ephemeral. Must not replace a required handoff, result, blocker, decision request, or terminal report.
- **`HANDOFF`** — a durable MORE responsibility transition has been published. Must reference the exact durable handoff.
- **`ATTENTION_REQUIRED`** — a human or harness should inspect a condition that is not itself an Owner decision request or terminal blocker. May be ephemeral when it is purely observability/monitoring information.
- **`DECISION_REQUIRED`** — a durable boundary requiring Owner or other human judgment has been published, normally corresponding to `NEEDS DECISION` or an addressed decision request. Must reference the exact durable decision surface.
- **`BLOCKED`** — a durable blocker has been reported. Must reference the exact blocker report.
- **`COMPLETED`** — a durable result or closure reports successful completion of the bounded subject. Must reference that result or closure.
- **`FAILED`** — a durable result reports failure of the bounded subject. Must reference that failure report.

Use the specific boundary event instead of `ATTENTION_REQUIRED` when the underlying condition is already a durable MORE decision, blocker, completion, or failure state.

## Event envelope

The canonical representation is JSON. A transport may serialize the same fields differently when necessary.

Required fields:

```text
spec
id
type
work_item
role
summary
```

Recommended shape:

```json
{
  "spec": "more.events/1",
  "id": "<globally unique event id>",
  "type": "PROGRESS | HANDOFF | ATTENTION_REQUIRED | DECISION_REQUIRED | BLOCKED | COMPLETED | FAILED",
  "work_item": "<exact governing issue or pull-request identity>",
  "role": "Manager | Owner | Reviewer | Executor",
  "summary": "<concise human-readable summary>",
  "target_role": "<MORE role when addressed>",
  "status": "<MORE work state or Reviewer disposition when useful>",
  "subject": "<exact candidate/artifact/result/package/state reference when useful>",
  "record": "<exact durable handoff/result/comment URL when required>",
  "parent_id": "<causal/correlation event id when useful>",
  "actor_context": "<runtime execution-context identity when available>",
  "emitted_at": "<RFC 3339 timestamp when available>"
}
```

### Field rules

- `spec` is exactly `more.events/1`.
- `id` is an opaque, practically unique identifier suitable for deduplication.
- `work_item` identifies exactly one governing GitHub issue or pull request, preferably by canonical URL.
- `role` identifies the MORE role responsible for the reported state. Runtime actor identity is separate and may be carried in `actor_context`.
- `target_role` is normally present for addressed `HANDOFF` and `DECISION_REQUIRED` events.
- `status`, when present, should reuse existing MORE vocabulary such as `READY`, `IN PROGRESS`, `COMPLETE`, `BLOCKED`, `NEEDS DECISION`, `FAILED`, `APPROVED`, or `CHANGES REQUESTED` rather than introduce another state taxonomy.
- `record` is required for `HANDOFF`, `DECISION_REQUIRED`, `BLOCKED`, `COMPLETED`, and `FAILED`. It is optional for purely ephemeral `PROGRESS` and `ATTENTION_REQUIRED` events.

If MORE requires the underlying state to be durable, emitting an event without publishing that durable state first does not satisfy the requirement.

## Durable versus ephemeral state

```text
Durable GitHub coordination
    → authority, handoffs, results, decisions, blockers, closure

Optional MORE events
    → projection, notification, UI state, monitoring, progress telemetry
```

Routine progress should remain low-volume. Consumers should not need to process tool-call telemetry to discover meaningful MORE boundaries.

When a required handoff or terminal result occurs, durable publication takes precedence over a preference to keep routine progress ephemeral.

## Delivery semantics

Events are designed to tolerate ordinary message-transport behavior:

1. **Duplicate** — consumers should deduplicate by `id`. Duplicate delivery has no authority effect.
2. **Delayed or reordered** — arrival order is not authority order. When current authority/status matters, consult the governing work item and durable record. `emitted_at` is display metadata, not authority.
3. **Lost** — event loss does not invalidate the durable MORE record. MORE does not require an event broker or replay log.
4. **Consumer outage** — a resumed consumer may reconcile from the governing work item and must not assume that missing events mean no coordination changes occurred.
5. **Missing durable record** — a boundary event whose required `record` cannot be resolved is unverified notification data and must not be used to infer authority.
6. **Wrong or stale subject** — if `work_item`, `subject`, or `record` conflicts with durable coordination state, durable state wins. A harness may surface the mismatch as `ATTENTION_REQUIRED`; it must not repair authority by guessing.

## Consumer behavior

Consumers may use events to:

- render progress or coordination state;
- send push, email, desktop, or other notifications;
- wake or route an execution context;
- surface human-attention boundaries;
- correlate runtime actor provenance;
- detect anomalous event patterns;
- trigger a refresh of the governing GitHub state.

Consumers must not use an event alone to:

- grant Owner authority;
- authorize consequential execution;
- select a historical handoff as operative without checking the governing work item;
- silently change scope, risk, constraints, or acceptance criteria;
- treat event acknowledgement as authorization;
- maintain conflicting authoritative task state beside GitHub.

## Examples

### Progress

```json
{
  "spec": "more.events/1",
  "id": "evt-6f0e8cc2",
  "type": "PROGRESS",
  "work_item": "https://github.com/example/project/issues/42",
  "role": "Executor",
  "status": "IN PROGRESS",
  "summary": "Running the bounded verification requested by the active handoff."
}
```

This is optional telemetry and needs no durable event record.

### Owner decision required

```json
{
  "spec": "more.events/1",
  "id": "evt-9b828d75",
  "type": "DECISION_REQUIRED",
  "work_item": "https://github.com/example/project/issues/42",
  "role": "Manager",
  "target_role": "Owner",
  "status": "NEEDS DECISION",
  "summary": "Owner must choose whether a bounded maintenance window is acceptable.",
  "record": "https://github.com/example/project/issues/42#issuecomment-123456789"
}
```

A notification adapter may turn this into mobile push, email, or a UI card. Acknowledging the notification does not authorize the decision; valid Owner direction must still be recorded through the project's MORE coordination surface.

### Handoff to another harness

```json
{
  "spec": "more.events/1",
  "id": "evt-e20a9230",
  "type": "HANDOFF",
  "work_item": "https://github.com/example/project/pull/77",
  "role": "Manager",
  "target_role": "Reviewer",
  "status": "READY",
  "summary": "Candidate is ready for independent review.",
  "subject": "commit:abc123",
  "record": "https://github.com/example/project/pull/77#issuecomment-987654321"
}
```

A harness may use this event to instantiate or alert a Reviewer context, but that context must still bind to the work item and recover operative authority from the durable handoff.

## Privacy

Events may be delivered to systems with different visibility from the governing repository. Emit only the information the consumer needs.

Do not copy secrets, credentials, private-source mappings, commercially sensitive evidence, or large artifacts into events merely because a transport can carry them. Prefer exact references when the consumer is authorized to resolve them.

## Adoption

This profile is optional and requires no changes to existing MORE handoffs.

A minimal integration can begin with boundary events only:

```text
HANDOFF
DECISION_REQUIRED
BLOCKED
COMPLETED
FAILED
```

Add `PROGRESS` or `ATTENTION_REQUIRED` only when a real UI, notification, monitoring, or observability need justifies them.

Implementations should prefer deriving boundary events automatically from actual coordination actions rather than requiring agents to manually duplicate every handoff in a second format.

The profile does not require a message broker, webhook provider, persistent event ledger, acknowledgement protocol, notification vendor, specific agent harness, or new MORE role.

```text
GitHub carries durable coordination.
MORE events make that coordination easier for other systems to observe.
```
