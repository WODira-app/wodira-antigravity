import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { test } from 'node:test';

const root = new URL('../', import.meta.url);
const json = async (path) => JSON.parse(await readFile(new URL(path, root), 'utf8'));
const endpoint = 'https://api.wodira.app/mcp';
const site = 'https://wodira-app.github.io/wodira-antigravity/';

test('both clients connect directly to the public MCP without embedded credentials or automatic trust', async () => {
  const agy = (await json('mcp_config.json')).mcpServers.public;
  const gemini = (await json('gemini-extension.json')).mcpServers.wodira;
  assert.equal(agy.serverUrl, endpoint);
  assert.equal(gemini.httpUrl, endpoint);
  for (const server of [agy, gemini]) {
    assert.equal(server.headers, undefined);
    assert.equal(server.command, undefined);
    assert.equal(server.trust, undefined);
    assert.equal(server.authProviderType, undefined);
    assert.equal(server.oauth.clientSecret, undefined);
  }
});

test('Antigravity has a public CIMD client with only its documented HTTPS callback', async () => {
  const server = (await json('mcp_config.json')).mcpServers.public;
  const client = await json('docs/oauth/antigravity.json');
  assert.equal(server.oauth.clientId, `${site}oauth/antigravity.json`);
  assert.equal(client.client_id, server.oauth.clientId);
  assert.deepEqual(client.redirect_uris, ['https://antigravity.google/oauth-callback']);
  assert.equal(client.token_endpoint_auth_method, 'none');
  assert.deepEqual(client.grant_types, ['authorization_code', 'refresh_token']);
});

test('Gemini has a distinct public client and a matching fixed loopback callback', async () => {
  const server = (await json('gemini-extension.json')).mcpServers.wodira;
  const client = await json('docs/oauth/gemini.json');
  assert.equal(server.oauth.clientId, `${site}oauth/gemini.json`);
  assert.equal(client.client_id, server.oauth.clientId);
  assert.equal(server.oauth.redirectUri, 'http://localhost:3334/oauth/callback');
  assert.deepEqual(client.redirect_uris, [server.oauth.redirectUri]);
  assert.equal(client.token_endpoint_auth_method, 'none');
  assert.deepEqual(server.oauth.audiences, [endpoint]);
  assert.equal(server.oauth.enabled, true);
});

test('public clients request profile and organizer consent without private commerce, CRM or admin scopes', async () => {
  const expected = ['email', 'offline_access', 'openid', 'organizer:ai', 'profile'];
  for (const file of ['docs/oauth/antigravity.json', 'docs/oauth/gemini.json']) {
    const client = await json(file);
    assert.deepEqual(client.scope.split(' ').sort(), expected);
    assert.equal(new URL(client.client_uri).origin, new URL(client.client_id).origin);
    assert.equal(client.client_secret, undefined);
    assert.equal(client.registration_access_token, undefined);
  }
  const server = (await json('gemini-extension.json')).mcpServers.wodira;
  assert.deepEqual([...server.oauth.scopes].sort(), expected);
});

test('the two installable manifests share their release version and branded local icon', async () => {
  const plugin = await json('plugin.json');
  const extension = await json('gemini-extension.json');
  const pkg = await json('package.json');
  assert.equal(plugin.name, 'wodira');
  assert.equal(plugin.displayName, 'WODira');
  assert.equal(extension.name, plugin.name);
  assert.equal(plugin.version, pkg.version);
  assert.equal(extension.version, pkg.version);
  assert.ok(plugin.suggestedPrompts.length > 0 && plugin.suggestedPrompts.length <= 3);
  const svg = await readFile(new URL(plugin.logo, root), 'utf8');
  assert.match(svg, /<svg\s/);
  assert.doesNotMatch(svg, /<script\b|https?:\/\/(?!www\.w3\.org\/)/i);
});

test('all five packaged skills can be discovered by their matching directory names', async () => {
  const directories = await readdir(new URL('skills/', root), { withFileTypes: true });
  const names = directories.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
  assert.deepEqual(names, ['wodira-athlete', 'wodira-box-insights', 'wodira-connect', 'wodira-organizer', 'wodira-peak']);
  for (const name of names) {
    const source = await readFile(new URL(`skills/${name}/SKILL.md`, root), 'utf8');
    assert.ok(source.startsWith(`---\nname: ${name}\n`));
    assert.match(source, /\ndescription: /);
    assert.doesNotMatch(source, /\bTODO\b|\bFIXME\b|\[INSERT /);
  }
});
