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

## Release verification

- Antigravity CLI 1.4.10: strict validation passed; five skills, one rule and one MCP server discovered.
- Native install/list/uninstall from the public GitHub repository passed; the prior local plugin configuration was restored.
- Gemini CLI 0.66.0: native extension validation passed.
- Six public-package contract checks and GitHub Actions validation passed.
- GitHub Pages build succeeded, serving both public CIMD documents as matching JSON without redirects.
- MCP discovery, S256 advertisement and the unauthenticated 401 challenge passed.
- Both pre-consent browser authorization requests reached WODira sign-in. No account grant, token exchange, authenticated business action or private-data retrieval was performed. Host PDF rendering was not certified.

Confirmation screenshots and local validation artifacts are retained outside Git in `output/`. No credentials or private application data are included in the repository or release archives.
