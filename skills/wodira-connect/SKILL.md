---
name: wodira-connect
description: Connect or troubleshoot WODira's public MCP in Antigravity or Gemini CLI, discover available tools and resources, and explain account or organization access requirements.
---

Find the connected WODira server: Antigravity normally names it `wodira_public`; Gemini CLI uses `wodira`. Tool prefixes vary by host, so use the tool discovery interface rather than constructing names.

1. If disconnected, let the host run OAuth against the configured client. A WODira account signs in through WODira's authorization UI. No API key, client secret, copied cookie or pasted access token belongs in this plugin. In Gemini CLI, the interactive command is `/mcp auth wodira`; Antigravity exposes Authenticate in its MCP settings.
2. Discover the live tools and resources. Read `wodira://docs/index`, then `wodira://docs/mcp`. Use `hello` as the connection smoke check if it is exposed. A resource URI is a client-side MCP identifier, not an HTTPS page.
3. Discover the task's domain guide: `events`, `boxes`, `planning` or `programming` under `wodira://docs/`. The active catalog is authoritative; a documented example is not proof that a tool exists in this profile or for this account.
4. The canonical server is `https://api.wodira.app/mcp`. Discovery starts at `https://api.wodira.app/.well-known/oauth-protected-resource/mcp`. WODira currently advertises CIMD client metadata; this package supplies separate public client identifiers for Antigravity and Gemini. The host owns PKCE, browser sign-in and token storage/refresh.

For a `401`, reauthenticate through the host. For a `403`, distinguish missing OAuth consent from organization role, MCP access, feature or athlete-sharing permissions; explain the actual restriction. For a `404`, check the identifier and live tool catalog. Do not switch to `/mcp/commerce` or `/mcp/admin` to make a request work. After a `409`, reload the current state and preview again instead of forcing a stale revision.

If the host cannot display an MCP App, inspect the structured result and its official links. If it returns a binary file, use the host's file-saving/presentation support; do not expose authentication material to a third-party conversion service.
