#!/usr/bin/env node
import assert from 'node:assert/strict';

const resource = 'https://api.wodira.app/mcp';
const metadataUrl = 'https://api.wodira.app/.well-known/oauth-protected-resource/mcp';
const getJson = async (url) => {
  const response = await fetch(url, { redirect: 'error', signal: AbortSignal.timeout(15000) });
  assert.equal(response.status, 200, `Metadata unavailable: ${new URL(url).pathname}`);
  return response.json();
};

const metadata = await getJson(metadataUrl);
assert.equal(metadata.resource, resource);
assert.ok(metadata.scopes_supported.includes('profile'));
assert.ok(metadata.scopes_supported.includes('organizer:ai'));
assert.ok(metadata.authorization_servers.includes('https://api.wodira.app/auth'));
const authorization = await getJson('https://api.wodira.app/.well-known/oauth-authorization-server');
assert.equal(authorization.issuer, 'https://api.wodira.app/auth');
assert.equal(authorization.client_id_metadata_document_supported, true);
assert.ok(authorization.code_challenge_methods_supported.includes('S256'));

let requestId = 0;
const rpc = async (method, params = {}) => fetch(resource, {
  method: 'POST',
  redirect: 'error',
  signal: AbortSignal.timeout(15000),
  headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream', 'MCP-Protocol-Version': '2025-06-18' },
  body: JSON.stringify({
    jsonrpc: '2.0', id: ++requestId, method, params,
  }),
});
const result = async (method, params) => {
  const response = await rpc(method, params);
  assert.equal(response.status, 200, `Public ${method} must work without sign-in`);
  assert.equal(response.headers.get('www-authenticate'), null);
  const body = await response.text();
  const message = response.headers.get('content-type')?.startsWith('text/event-stream')
    ? JSON.parse(body.split(/\r?\n/).find((line) => line.startsWith('data: '))?.slice(6) ?? '{}')
    : JSON.parse(body);
  assert.equal(message.error, undefined, `Public ${method} returned a protocol error`);
  assert.ok(message.result, `Missing ${method} result`);
  return message.result;
};
await result('initialize', { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'wodira-plugin-check', version: '1.1.0' } });
const catalog = await result('tools/list');
const search = catalog.tools.find((tool) => tool.name === 'search_events');
assert.equal(search._meta.ui.resourceUri, 'ui://wodira/v2/search-events');
let eventCount = 0;
for (const name of ['search_events', 'athlete_search_upcoming_events']) {
  const response = await result('tools/call', { name, arguments: { limit: 1 } });
  assert.notEqual(response.isError, true, `${name} must return public results`);
  const events = JSON.parse(response.content.find((item) => item.type === 'text').text);
  assert.ok(Array.isArray(events));
  for (const event of events) {
    assert.equal(event.eventStatus, 'PUBLISHED');
    assert.match(event.eventUrl, /^https:\/\/wodira\.app\/events\/[^/]+$/);
  }
  eventCount += events.length;
}
const ui = await result('resources/read', { uri: search._meta.ui.resourceUri });
assert.equal(ui.contents[0].mimeType, 'text/html;profile=mcp-app');
const protectedResponse = await rpc('tools/call', { name: 'athlete_my_orders', arguments: {} });
assert.equal(protectedResponse.status, 401, 'Private account tools must require sign-in');
assert.ok(protectedResponse.headers.get('www-authenticate')?.includes(`resource_metadata="${metadataUrl}"`));
await protectedResponse.body?.cancel();
console.log(JSON.stringify({ resource, discovery: 'ok', publicSearch: 'ok', eventCount, mcpApp: 'ok', privateStatus: 401, pkce: 'S256', cimd: true, accountDataAccessed: false }));
