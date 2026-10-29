---
name: wodira-athlete
description: Find WODira sports events and review the signed-in athlete's registrations, tickets, orders, results, saved events, box classes and personal sports calendar.
---

Read `wodira://docs/events` or `wodira://docs/boxes` as relevant and inspect the live schemas. Use the signed-in athlete; a name or email supplied in a prompt is not authorization to read somebody else's account.

- For event discovery, use `search_events` or `athlete_search_upcoming_events`. Resolve dates, location and team/category constraints from the request. Present returned dates, prices, availability and official event links; do not invent quotas or fees.
- For an existing entry, discover `athlete_my_registrations`, `athlete_my_tickets`, `athlete_my_orders` and `athlete_ticket_access`. Distinguish registration price, order total, supplements, fees and later adjustments using the returned breakdown. A team title need not identify the athlete; show participant names when relevant. Treat QR codes and receipt links as private access material.
- For the athlete's agenda, use `athlete_my_sports_calendar`, the bookmark tools and their returned timezone. Follow cursors and date filters rather than implying the first page is complete.
- For today's box activity, use `athlete_my_boxes`, `boxes_classes_today` and `athlete_my_box_reservations_today`. Resolve the box from the athlete's accessible memberships; report credit or membership restrictions as returned.
- For sports results or spending summaries, inspect `athlete_my_results` and `athlete_my_statistics`, retaining date range, currency and missing-data information.

The public profile does not promise checkout, confirmed refunds or offline manual registrations. If the requested purchase or business action is absent, provide the returned WODira page link and explain which step the user completes in the app. Do not reroute to a private profile. For any available mutation, use the current schema, the user's authorized scope and the host's approval flow; first show a relevant preview when the server requires one.
