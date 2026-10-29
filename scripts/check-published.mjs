#!/usr/bin/env node
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash, randomBytes } from 'node:crypto';
import { request } from 'node:https';

const root = new URL('../', import.meta.url);
const authorization = await fetch('https://api.wodira.app/.well-known/oauth-authorization-server', {
  redirect: 'error', signal: AbortSignal.timeout(15000),
}).then((response) => { assert.equal(response.status, 200); return response.json(); });

for (const name of ['antigravity', 'gemini']) {
  const expected = JSON.parse(await readFile(new URL(`docs/oauth/${name}.json`, root), 'utf8'));
  const response = await fetch(expected.client_id, {
    headers: { Accept: 'application/json' }, redirect: 'error', signal: AbortSignal.timeout(15000),
  });
  assert.equal(response.status, 200, `Hosted ${name} metadata unavailable`);
  assert.match(response.headers.get('content-type') ?? '', /^application\/json\b/i);
  assert.deepEqual(await response.json(), expected);
  console.log(`${name}: hosted CIMD document matches the release and is served as JSON without redirects`);

  if (process.argv.includes('--authorize')) {
    // Pre-consent only: no cookies, login, token exchange or account data. The server may
    // persist this public client's metadata; this does not authorize a user's account.
    const url = new URL(authorization.authorization_endpoint);
    const verifier = randomBytes(32).toString('base64url');
    url.search = new URLSearchParams({
      client_id: expected.client_id, response_type: 'code', redirect_uri: expected.redirect_uris[0],
      scope: expected.scope, resource: 'https://api.wodira.app/mcp', state: randomBytes(24).toString('base64url'),
      code_challenge: createHash('sha256').update(verifier).digest('base64url'), code_challenge_method: 'S256',
    }).toString();
    // Node fetch sends Sec-Fetch-Mode: cors, selecting Better Auth's JSON API
    // response. This probe models opening the authorization URL in a browser.
    const authResponse = await new Promise((resolve, reject) => {
      const req = request(url, {
        headers: { Accept: 'text/html', 'Sec-Fetch-Mode': 'navigate', 'Sec-Fetch-Dest': 'document' },
        signal: AbortSignal.timeout(20000),
      }, (res) => {
        res.resume();
        res.on('end', () => resolve({ status: res.statusCode, location: res.headers.location }));
      });
      req.on('error', reject);
      req.end();
    });
    assert.ok([302, 303, 307].includes(authResponse.status), `${name}: expected pre-consent login redirect, got ${authResponse.status}`);
    const location = new URL(authResponse.location, url);
    assert.ok(['https://wodira.app', 'https://api.wodira.app'].includes(location.origin));
    assert.match(location.pathname, /\/(auth\/(sign-in|consent)|login)(\/|$)/);
    console.log(`${name}: authorization URL redirects to WODira sign-in; no account consent granted`);
  }
}
