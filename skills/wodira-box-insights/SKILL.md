---
name: wodira-box-insights
description: Analyze WODira box demand, class occupancy, busy and quiet hours, attendance and activity–coach correlations, with filtered PDF exports when the MCP client supports files.
---

Read `wodira://docs/boxes` and the schemas of `organizer_list_boxes` and `organizer_box_demand_statistics`.

1. Select an accessible organization using `organizer_list_my_organizations`; list its boxes with `organizer_list_boxes`, following `nextCursor` until complete. Use the returned box ID and timezone. OWNER/ADMIN access and the box's ANALYTICS feature are required; coach delegation alone does not grant these reports.
2. Resolve the user's reporting interval. Filters use `days` (30 by default) or a complete `from`/`to` pair in `YYYY-MM-DD`. Retain the box timezone. Read limits and valid filter values from the live schema/report; use returned activity keys and coach IDs rather than names guessed into identifiers.
3. Query `organizer_box_demand_statistics` with `format: JSON`. Separate bookings, capacity-weighted occupancy, attendance coverage, recorded no-show, waitlists, cancellations and unique members. Demand is not revenue, and unknown attendance is not zero absence.
4. Compare activities, weekly timeslots, coaches and activity–coach combinations using sample size and capacity. Explain coverage and scheduling differences. Correlation alone does not establish a coach's causal impact; identify small samples and avoid unsupported conclusions.
5. If asked for a PDF, repeat the same filters with `format: PDF`. The response can contain an embedded `application/pdf` resource with base64 bytes and filename/filter metadata. Present or save those bytes through the host's file support. Its `wodira://` URI is not a public download link and does not require another `resources/read` call.

Respect server limits, including reporting-range, class-count and PDF-row limits; narrow filters when the server asks instead of silently truncating or inventing totals. The report is aggregated: do not attempt to recover individual members' identities. If this host cannot handle binary resources, state that limitation, provide a supported text summary, and direct the user to the box's report page for export.
