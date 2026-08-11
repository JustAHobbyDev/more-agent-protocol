# MORE Progress and Attention Events

**Profile:** `more.events/1`  
**Status:** Optional implementation profile; non-authoritative.

MORE uses GitHub work items and addressed handoffs as its durable coordination surface. This profile defines a small transport-neutral event format that a harness, UI, notification adapter, monitoring agent, or other integration may emit and consume to surface meaningful MORE coordination state without scraping arbitrary prose.

The event stream is a projection of coordination state. It is not a second authority channel.

## 1. Core invariant

A MORE event never creates, expands, revokes, or satisfies authority.

In particular, delivery, acknowledgement, duplication, delay, loss, or consumption of an event does not by itself:

- authorize consequential action;
- satisfy an Owner decision or authorization boundary;
- validate or invalidate an otherwise valid handoff;
- supersede the latest addressed handoff;
- replace a durable handoff or result that MORE requires on the governing coordination surface;
- become a current-work, approval, or authority registry.

When an event represents a durable MORE handoff, result, decision request, blocker, completion, or failure, the durable record remains authoritative and the event should identify that record exactly.

```text
MORE event
    = notification / projection / telemetry

MORE event
    ≠ authority
```

A project that emits no MORE events remains fully capable of using MORE.

## 2. Event types

Implementations should use the smallest event set that serves their consumers. `more.events/1` defines these event types:

### `PROGRESS`

Optional ongoing activity that may help a UI, monitor, or human understand that work is active.

Examples include investigation underway, implementation in progress, or review in progress.

`PROGRESS` may be ephemeral. It must not be used in place of a required durable handoff, result, blocker, decision request, or terminal report.

### `HANDOFF`

A durable MORE responsibility transition has been published.

A `HANDOFF` event must reference the exact durable handoff it represents. The event may include source and target MORE roles for routing or display, but those fields do not establish authority independently of the durable record.

### `ATTENTION_REQUIRED`

A human or harness should inspect something, but the event does not itself represent an Owner decision request or a terminal blocker.

Examples include degraded observability, malformed publication, unusual agent behavior, or another condition worth surfacing without inventing a new MORE authority state.

When the underlying condition is itself a required durable MORE boundary, use the more specific event type and reference the durable record.

### `DECISION_REQUIRED`

A durable boundary requiring Owner or other human judgment has been published, normally corresponding to `NEEDS DECISION` or an addressed Manager → Owner request.

A `DECISION_REQUIRED` event must reference the exact durable decision surface. A response to the event transport does not constitute Owner authorization unless that response is also recorded through the project's valid MORE authorization surface.

### `BLOCKED`

A durable blocker has been reported and further progress requires access, evidence, external input, actor availability, or another condition outside the current execution boundary.

A `BLOCKED` event must reference the durable blocker report.

### `COMPLETED`

A durable result or closure states that the relevant bounded work completed successfully.

A `COMPLETED` event must reference the durable result or closure. It should describe the actual completed subject rather than imply that a larger parent work item is complete when unresolved work remains.

### `FAILED`

A durable result states that the relevant bounded work failed.

A `FAILED` event must reference the durable failure report. Failure of one bounded child or operation does not automatically imply failure of an entire parent work item unless the durable record says so.

## 3. Common envelope

The canonical representation is a JSON object. Transports may serialize the same fields differently when necessary, but consumers should be able to recover the same semantics.

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
  "summary": "<concise human-readable event summary>",
  "target_role": "<MORE role when the event is addressed>",
  "status": "<MORE work state or Reviewer disposition when useful>",
  "subject": "<exact candidate, artifact, result, package, or state reference when useful>",
  "record": "<exact durable GitHub handoff/result/comment URL when applicable>",
  "parent_id": "<causal/correlation event id when useful>",
  "actor_context": "<runtime execution-context identity when available>",
  "emitted_at": "<RFC 3339 timestamp when available>"
}
```

Fields beyond the required six are optional unless the event semantics below require them.

### 3.1 `spec`

For this profile the value is exactly:

```text
more.events/1
```

Consumers should ignore unsupported future profile versions rather than guessing their semantics.

### 3.2 `id`

`id` is an opaque event identifier suitable for deduplication. It should be globally unique in practice, for example a UUID or another collision-resistant identifier.

The event ID identifies the event instance. It does not identify the authoritative work item or handoff.

### 3.3 `work_item`

`work_item` identifies exactly one governing GitHub issue or pull request, preferably by canonical URL. `owner/repository#number` is acceptable when the issue/PR type remains unambiguous in the implementation context.

An event with an ambiguous or incorrect work-item identity must not be used to infer authority.

### 3.4 `role` and `target_role`

`role` identifies the MORE role responsible for the reported event state.

`target_role` is used when the event corresponds to an addressed transition or request. It is normally present for `HANDOFF` and `DECISION_REQUIRED`.

Runtime actor identity is separate from MORE role authority. Implementations may use `actor_context` for execution provenance without treating it as authority.

### 3.5 `status`

When useful, `status` should reuse existing MORE vocabulary rather than create a parallel state taxonomy.

Typical work states are:

```text
READY
IN PROGRESS
COMPLETE
BLOCKED
NEEDS DECISION
FAILED
```

Reviewer dispositions are typically:

```text
APPROVED
CHANGES REQUESTED
NEEDS DECISION
BLOCKED
```

An event type and status may overlap intentionally. `DECISION_REQUIRED` with `status: "NEEDS DECISION"`, for example, lets consumers route on the event type while retaining the MORE-native work state.

### 3.6 `record`

`record` points to the exact durable coordination artifact represented by the event.

It is required for:

- `HANDOFF`;
- `DECISION_REQUIRED`;
- `BLOCKED`;
- `COMPLETED`;
- `FAILED`.

It is optional for `PROGRESS` and `ATTENTION_REQUIRED` when they are purely ephemeral telemetry.

If MORE requires the underlying state to be durable, emitting an event without publishing that durable state first does not satisfy the requirement.

## 4. Durable coordination versus ephemeral telemetry

The event profile intentionally supports both durable projections and ephemeral progress.

```text
Durable GitHub coordination
    → authority, handoffs, results, decisions, blockers, closure

Optional event stream
    → projection, notification, UI state, monitoring, progress telemetry
```

A harness may emit `PROGRESS` freely enough to support useful observability, but it should avoid turning every tool call or thought into an event. Consumers should not need to process high-volume telemetry to discover meaningful MORE boundaries.

When a required handoff or terminal result occurs, durable publication takes precedence over any preference to keep routine progress ephemeral.

## 5. Delivery and failure semantics

### 5.1 Duplicate events

Consumers should deduplicate by `id`. Duplicate delivery has no MORE authority effect.

### 5.2 Delayed or reordered events

Arrival order is not an authority order.

A consumer must not treat the last event it received as the latest operative handoff merely because it arrived last. When current authority or status matters, consult the governing work item and durable record.

`emitted_at` may help display ordering but does not supersede GitHub chronology or current project state.

### 5.3 Lost events

Loss of an event does not invalidate the underlying durable MORE record.

An event-aware harness may reconstruct current notification state from GitHub when practical, but MORE does not require an event broker, replay log, or persistent event queue.

### 5.4 Consumer outage and resume

A consumer that resumes after an outage may process later events or reconcile from the governing work item. It must not assume that the absence of received events means no coordination changes occurred.

### 5.5 Event without required durable record

If an event claims `HANDOFF`, `DECISION_REQUIRED`, `BLOCKED`, `COMPLETED`, or `FAILED` but its required durable `record` cannot be resolved, the consumer should treat the event as unverified notification data.

It must not infer authority from the event alone.

### 5.6 Wrong or stale subject

If `work_item`, `subject`, or `record` conflicts with the current durable coordination state, the durable state wins. A harness may surface the mismatch as `ATTENTION_REQUIRED`; it must not silently repair authority by guessing.

## 6. Examples

### 6.1 Ephemeral progress

```json
{
  "spec": "more.events/1",
  "id": "evt-6f0e8cc2",
  "type": "PROGRESS",
  "work_item": "https://github.com/example/project/issues/42",
  "role": "Executor",
  "status": "IN PROGRESS",
  "summary": "Running the bounded repository verification requested by the active handoff."
}
```

No durable record is required because this is optional progress telemetry.

### 6.2 Owner decision required

```json
{
  "spec": "more.events/1",
  "id": "evt-9b828d75",
  "type": "DECISION_REQUIRED",
  "work_item": "https://github.com/example/project/issues/42",
  "role": "Manager",
  "target_role": "Owner",
  "status": "NEEDS DECISION",
  "summary": "Owner must choose whether the deployment may accept a bounded maintenance window.",
  "record": "https://github.com/example/project/issues/42#issuecomment-123456789"
}
```

A notification adapter may turn this into mobile push, email, or a prominent UI card. Tapping or acknowledging the alert does not authorize the decision. The Owner decision must still be recorded through the valid project coordination surface.

### 6.3 Handoff consumed by another harness

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

A harness may use this event to instantiate or alert a Reviewer context, but the new context must still bind to the governing work item and recover its operative authority from the durable handoff.

## 7. Consumer behavior

A consumer may use events to:

- render progress or coordination status;
- send push/email/desktop notifications;
- wake or route an execution context;
- surface human-attention boundaries;
- correlate actor/runtime provenance;
- detect anomalous event patterns;
- trigger a refresh of the governing GitHub state.

A consumer must not use an event alone to:

- grant Owner authority;
- infer permission for consequential execution;
- select a historical handoff as operative without checking the governing work item;
- silently change MORE scope, risk, or acceptance criteria;
- treat event acknowledgement as authorization;
- maintain a conflicting authoritative task state beside GitHub.

## 8. Privacy and publication

Events may be delivered to systems with different visibility from the governing repository.

An emitter should apply the same minimum-necessary-disclosure discipline used elsewhere in MORE. Do not copy secrets, credentials, private-source mappings, commercially sensitive evidence, or large artifacts into events merely because a transport can carry them.

Prefer exact references to durable artifacts over duplicated content when the consumer is authorized to resolve those references.

## 9. Compatibility and adoption

This profile is optional.

A project may adopt it without changing existing MORE handoffs. Existing GitHub-native coordination remains authoritative and cold-startable whether or not events are emitted.

A minimal integration can begin with only boundary events:

```text
HANDOFF
DECISION_REQUIRED
BLOCKED
COMPLETED
FAILED
```

`PROGRESS` and `ATTENTION_REQUIRED` may be added when a real UI, notification, monitoring, or observability need justifies them.

Implementations should prefer deriving events automatically from actual coordination actions rather than requiring actors to duplicate every handoff manually in a second format.

The profile deliberately does not require:

- a message broker;
- a webhook provider;
- a persistent event ledger;
- acknowledgement semantics;
- a notification vendor;
- a specific agent harness;
- a new MORE role.

The intended relationship is:

```text
GitHub carries durable coordination.
MORE events make that coordination easier for other systems to observe.
```
