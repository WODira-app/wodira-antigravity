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

const response = await fetch(resource, {
  method: 'POST',
  redirect: 'error',
  signal: AbortSignal.timeout(15000),
  headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' },
  body: JSON.stringify({
    jsonrpc: '2.0', id: 1, method: 'initialize',
    params: { protocolVersion: '2025-03-26', capabilities: {}, clientInfo: { name: 'wodira-plugin-check', version: '1.0.0' } },
  }),
});
assert.equal(response.status, 401, 'Unauthenticated MCP access must require sign-in');
assert.ok(response.headers.get('www-authenticate')?.includes(`resource_metadata="${metadataUrl}"`));
console.log(JSON.stringify({ resource, discovery: 'ok', pkce: 'S256', cimd: true, unauthenticatedStatus: response.status, accountDataAccessed: false }));
