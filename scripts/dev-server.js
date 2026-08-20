// Dependency-free static file server used ONLY by the Playwright test
// harness (tests/e2e/) to serve the repo root over real HTTP, since the app
// fetches JSON/markdown at runtime and browsers block those over file://.
// Not used in production — Vercel serves the app there (see vercel.json).
//
// Serves exact files only (no SPA rewrite to index.html for unmatched
// paths) so a genuinely missing file 404s instead of silently returning
// index.html's 200 -- the harness needs real 404s to test error paths.
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PORT = Number(process.argv[2] || process.env.PORT || 4173);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.csv': 'text/csv; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

function safeJoin(root, urlPath) {
  // decodeURIComponent throws on a malformed %-escape (e.g. a lone '%'),
  // which would otherwise crash the whole server since this runs inside an
  // http request handler with no surrounding try/catch (Codex review
  // finding: an uncaught exception here takes the process down, not just
  // the one request).
  let decoded;
  try {
    decoded = decodeURIComponent(urlPath.split('?')[0]);
  } catch (e) {
    return null;
  }
  const resolved = path.normalize(path.join(root, decoded));
  // `resolved.startsWith(root)` alone is a raw STRING prefix check, not a
  // path-boundary check: a sibling directory like `<root>2` also starts
  // with the string `<root>` even though it is a completely different
  // directory (Codex review finding). Requiring the next character to be
  // the path separator -- or the paths being exactly equal -- fixes that.
  if (resolved !== root && !resolved.startsWith(root + path.sep)) return null;
  return resolved;
}

const server = http.createServer((req, res) => {
  let filePath = safeJoin(ROOT, req.url === '/' ? '/index.html' : req.url);
  if (!filePath) {
    res.writeHead(400);
    res.end('Bad request');
    return;
  }
  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*',
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`dev-server listening on http://localhost:${PORT}`);
});
