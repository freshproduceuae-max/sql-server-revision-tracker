// Starts scripts/dev-server.js directly (no shell wrapper) and hands its
// exact PID to global-teardown.js for a guaranteed, direct kill.
//
// Why this replaces Playwright's built-in `webServer` config: `webServer`
// spawns its `command` string through a shell (`cmd.exe /c ...` on
// Windows), so the PID Playwright tracks for teardown is the shell's PID,
// not the actual node.exe running dev-server.js underneath it -- Windows
// does not automatically kill a process's children when the process itself
// is killed. Playwright ships its own tree-kill logic to work around this,
// but a fresh, independent Codex review reproduced the dev-server surviving
// past `npx playwright test`'s own exit (still LISTENING on port 4173,
// created a few seconds into the run, present in every "AFTER" snapshot)
// across repeated runs in its sandbox, even after the earlier
// never-resolving-Promise mock fix. Spawning node.exe directly (shell:
// false) means the PID we get back IS the actual server process -- no
// intermediary, no tree-kill needed, no dependency on how any particular
// environment's process/job-object handling behaves.
'use strict';
const { spawn } = require('child_process');
const path = require('path');
const http = require('http');

const PORT = 4173; // must match playwright.config.js's PORT constant

function waitForServer(url, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  return new Promise((resolve, reject) => {
    const attempt = () => {
      const req = http.get(url, (res) => {
        res.resume();
        resolve();
      });
      req.on('error', () => {
        if (Date.now() > deadline) {
          reject(new Error(`dev-server did not become ready within ${timeoutMs}ms`));
        } else {
          setTimeout(attempt, 100);
        }
      });
    };
    attempt();
  });
}

module.exports = async function globalSetup() {
  const scriptPath = path.join(__dirname, '..', '..', 'scripts', 'dev-server.js');
  const child = spawn(process.execPath, [scriptPath, String(PORT)], {
    cwd: path.join(__dirname, '..', '..'),
    stdio: 'inherit',
    shell: false, // the whole point -- no intermediary shell process
    windowsHide: true,
  });
  child.unref(); // don't let this handle itself keep the setup process alive

  await waitForServer(`http://localhost:${PORT}/index.html`, 10_000);

  // Handed to global-teardown.js via an env var on the SAME process tree --
  // Playwright runs globalSetup and globalTeardown as separate invocations,
  // not necessarily sharing process memory, so this must cross via a file,
  // not a module-level variable.
  const fs = require('fs');
  fs.writeFileSync(path.join(__dirname, '.dev-server-pid'), String(child.pid), 'utf8');
};
