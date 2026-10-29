<p align="center"><img src="assets/logo.svg" width="112" height="112" alt="WODira"></p>

# WODira for Antigravity and Gemini CLI

Discover public sports events without signing in. Connect your WODira account when you want to review your athlete activity, operate your events or understand demand at your box. This repository packages WODira's **public MCP** for Google Antigravity and Gemini CLI, using each client's native extension format.

[Español](README.es.md) · [Documentation](https://wodira-app.github.io/wodira-antigravity/) · [WODira](https://wodira.app) · [Support](mailto:info@wodira.app)

## Install

### Antigravity App, CLI and IDE

Use a current Antigravity client (validated with CLI **1.4.10**):

```sh
agy plugin install https://github.com/WODira-app/wodira-antigravity
```

Open Customizations → Installed and enable WODira if needed. Search public events immediately, with or without an account. For private account features, authenticate its MCP server in the host's MCP settings. Installation does not sign you in or grant permission to your account. The server is normally named `wodira_public`.

**Marketplace:** [submitted for review on 2026-10-29](MARKETPLACE.md). Submission and approval are separate from GitHub distribution. Until Google accepts the listing, install using the repository URL above; do not assume `wodira@antigravity-plugins-official` is available.

### Gemini CLI

Validated with Gemini CLI **0.66.0**:

```sh
gemini extensions install https://github.com/WODira-app/wodira-antigravity
```

Public event search works immediately without login, including official event links and MCP Apps when supported. For private athlete or organizer features, run `/mcp auth wodira` inside Gemini CLI and complete WODira sign-in and consent in your browser. The configured callback is `http://localhost:3334/oauth/callback`; keep that local port available. Remote/headless machines need a browser-accessible callback on the same machine, or appropriate SSH forwarding. Do not paste access tokens into chat as a workaround.

Install using **one** client mechanism per application. Importing the Gemini extension into Antigravity while also installing the native plugin can expose the same server twice.

## Included skills

| Skill | Use it for |
| --- | --- |
| `/wodira-connect` | Sign-in, discovery, access errors and host capabilities |
| `/wodira-athlete` | Events, registrations, tickets, orders, results, classes and personal agenda |
| `/wodira-organizer` | Organization selection, event operations, participants and event metrics |
| `/wodira-box-insights` | Demand, occupancy, attendance, busy/quiet times, activity–coach comparisons and PDF reports |
| `/wodira-peak` | Daily readiness, activities, training load, wellness and authorized planning changes |

Examples: “Busca carreras híbridas cerca de mí”; “Resume las inscripciones de mi evento”; “Compara las clases, horarios y coaches de mi box durante los últimos 30 días”; “Exporta esos filtros a PDF”; “Revisa mi carga y mi calendario de entrenamiento de esta semana”. The agent responds in your language.

The live MCP catalog and account permissions determine the available tools. WODira's public profile does not expose private checkout, confirmed refunds or manual offline registration. This package does not connect to private commerce, CRM or admin profiles. Embedded MCP Apps and binary/PDF saving depend on host support; text and structured results remain usable. A `wodira://` resource URI is not a public file-download URL.

## Authentication and data

- Canonical endpoint: `https://api.wodira.app/mcp` over Streamable HTTP.
- Public access: connection, tool/resource discovery, `hello`, `search_events`, `athlete_search_upcoming_events`, documentation and static MCP Apps require no login. Search results remain public when signed in; private events and drafts are excluded. Account and organization tools trigger OAuth when needed. Supplied invalid credentials are rejected rather than silently ignored.
- OAuth discovery: `https://api.wodira.app/.well-known/oauth-protected-resource/mcp`.
- Public CIMD documents: [Antigravity](https://wodira-app.github.io/wodira-antigravity/oauth/antigravity.json) and [Gemini CLI](https://wodira-app.github.io/wodira-antigravity/oauth/gemini.json). They contain public identifiers, not credentials.
- Scopes: `openid profile email offline_access organizer:ai`. Organizer tools additionally enforce role, organization access and enabled features. A scope alone does not grant an organizational role. Users review the actual account consent in WODira.
- The host handles PKCE and token storage/refresh. No client secret, API key or bearer token is bundled. Read-only requests do not authorize unrelated writes; sensitive operations follow the user's request, server previews and host approvals.
- The plugin runs no local MCP proxy, background hook, telemetry service or separate data backend. Requested WODira data is returned to your chosen client and can enter its model context and conversation history. Review [WODira privacy](https://wodira.app/es/legal/privacy) and your host's privacy policy before using private athlete, health or financial data.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| `401` / disconnected | Reauthenticate in the host; do not copy session cookies or opaque tokens |
| `403` | Check consent, selected organization, OWNER/ADMIN role, MCP access and required features; box reports require ANALYTICS |
| `404` / missing tool | Refresh discovery and read the active profile's documentation; do not switch to a private endpoint |
| `409` | Reload state and preview again; do not force a stale revision or duplicate a timed-out write |
| Login rejects `client_id` | Check the public metadata URLs return JSON without redirects; run the published-metadata check below |
| Gemini callback cannot bind | Free local port 3334; its configured URI must match its CIMD document |
| MCP server omitted by old Antigravity | Upgrade the client and reinstall; the current native bundle uses `mcp_config.json` |
| PDF not displayed | Save the embedded PDF through a supported host feature, or use WODira's reports page |

## Development and validation

Runtime installation requires no Node dependency installation. Local checks use Node.js 22+ and pnpm:

```sh
pnpm test
agy plugin validate --strict .
gemini extensions validate .
pnpm check:mcp
pnpm check:published
```

`pnpm check:mcp` verifies anonymous connection, both public searches, official links, the MCP App resource and a `401` challenge for a protected account tool. It reads public event data only; it does not sign in or read personal orders. `pnpm check:published` verifies hosted CIMD bytes and JSON content types. Optional `node scripts/check-published.mjs --authorize` verifies pre-consent authorization redirects: it can register the public client metadata on WODira, but does not sign in, exchange tokens, grant account access or run business tools.

The native Antigravity validator is authoritative for its installed version. CLI 1.4.10 loads this native manifest's MCP servers from **`mcp_config.json`**; it warns that `mcp.json` is reserved for the Agent Plugins schema. Gemini reads `gemini-extension.json` and shares `rules/AGENTS.md` as its context file. This preserves one set of usage guidance without duplicate server definitions or ignored root context files.

## Release and support

Source and tagged releases: [WODira-app/wodira-antigravity](https://github.com/WODira-app/wodira-antigravity). Marketplace intake is submitted through Google's [official partner form](https://forms.gle/2EX5RFYPoJe1UgxR9); acceptance and listing updates are controlled by Google.

Contact **info@wodira.app** or open a repository issue. Do not include tokens, QR codes, private receipt URLs or members' personal data in issues. Source code is MIT licensed; WODira's name and logo remain its brand assets and this license grants no trademark rights.
