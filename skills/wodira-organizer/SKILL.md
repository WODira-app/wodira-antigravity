---
name: wodira-organizer
description: Review and operate a WODira organizer's events, registration data, order records and event metrics through authorized public MCP tools.
---

Read `wodira://docs/events` and `wodira://docs/mcp`, then inspect the currently available schemas.

1. Resolve organizations with `organizer_list_my_organizations`. If the user has multiple accessible organizations and the request does not identify one, ask which to use. Carry its returned `organizationId` through every organization-scoped call; do not choose an organization from an arbitrary event title.
2. Resolve the event with `organizer_list_events`, then inspect `organizer_event_detail` or `organizer_event_metrics_basic` when exposed. Preserve event dates, timezone, currency and the metric's exact denominator. WODira coordinates digital participant operations; do not claim it supplies professional timing hardware or physically runs the event.
3. For an incident, use the live order/ticket search tools before suggesting a change. Separate the purchaser, registration holder and team members, especially when names or emails have been corrected. Read the payment breakdown instead of equating the original order with every later adjustment.
4. A public `organizer_*` tool can require `profile organizer:ai`, an allowed role and enabled MCP access. Treat `403` as an access restriction; do not attempt session impersonation, direct database access, a private admin tool or another account.
5. For mutations the public catalog actually exposes, summarize the concrete target and effect, respect the user's authorization and host approvals, and follow the tool's preview/confirmation protocol. Reuse server-issued tokens and required idempotency keys; do not synthesize approval tokens. Re-read after ambiguous failures before retrying, and verify the returned final state.

For box demand and coach/time comparisons, use the focused box-insights workflow and `wodira://docs/boxes`. For coach programming, read `wodira://docs/programming` and its feature, content-state and athlete-consent restrictions before accessing athlete data or editing a draft. Never present an unavailable operation as successfully completed.
