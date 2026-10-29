# Marketplace submission

**Status: submitted; awaiting Google review.**

- Submitted: 2026-10-29T21:11:12.764485+00:00.
- Product: WODira, version 1.0.0.
- Organization and technical/support contact: WODira, info@wodira.app.
- Channel: [Antigravity Marketplace partner intake form](https://forms.gle/2EX5RFYPoJe1UgxR9), linked from Google's [Build plugins documentation](https://antigravity.google/docs/build-plugins).
- Browser confirmation: “Se ha registrado tu respuesta.”
- Repository: https://github.com/WODira-app/wodira-antigravity
- Release: https://github.com/WODira-app/wodira-antigravity/releases/tag/v1.0.0
- Documentation submitted: https://wodira-app.github.io/wodira-antigravity/

Google controls review, acceptance and marketplace availability. A recorded response is proof of submission, not acceptance. The plugin can already be installed from the public repository URL. Do not advertise an official marketplace install identifier until Google confirms the listing.

## Initial submission verification (1.0.0)

- Antigravity CLI 1.4.10: strict validation passed; five skills, one rule and one MCP server discovered.
- Native install/list/uninstall from the public GitHub repository passed; the prior local plugin configuration was restored.
- Gemini CLI 0.66.0: native extension validation passed.
- Six public-package contract checks and GitHub Actions validation passed.
- GitHub Pages build succeeded, serving both public CIMD documents as matching JSON without redirects.
- MCP discovery, S256 advertisement and the unauthenticated 401 challenge passed.
- Both pre-consent browser authorization requests reached WODira sign-in. No account grant, token exchange, authenticated business action or private-data retrieval was performed. Host PDF rendering was not certified.

Confirmation screenshots and local validation artifacts are retained outside Git in `output/`. No credentials or private application data are included in the repository or release archives.

## Published update (1.1.0)

[Release 1.1.0](https://github.com/WODira-app/wodira-antigravity/releases/tag/v1.1.0) is published from commit `3fa4aa1fc447b53985ea4a6bb68fac7ed97c20b6`. The submitted repository and documentation URLs now include its updated public-search guidance. The original application remains pending; no duplicate marketplace submission was sent.

- The production MCP accepts anonymous connection, both public event searches and the search MCP App resource. Returned official event links open successfully. Protected account tools still return HTTP 401 with an OAuth challenge.
- Session and OAuth searches are covered by the WODira API integration tests; no real private account was accessed for production verification.
- Antigravity/Gemini native validation, six package checks, GitHub Actions, Pages and hosted CIMD checks passed.
- Public client identifiers, scopes and callbacks are unchanged. Installation does not grant account access.
