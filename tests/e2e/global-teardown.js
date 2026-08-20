// Kills the exact dev-server.js PID that global-setup.js recorded. See
// global-setup.js's comment for why this replaces Playwright's built-in
// `webServer` teardown -- we spawned node.exe directly (no shell), so
// there is no process tree to walk: the recorded PID IS the server.
'use strict';
const fs = require('fs');
const path = require('path');

module.exports = async function globalTeardown() {
  const pidFile = path.join(__dirname, '.dev-server-pid');
  let pid;
  try {
    pid = Number(fs.readFileSync(pidFile, 'utf8').trim());
  } catch (e) {
    return; // global-setup never ran or already cleaned up -- nothing to do
  }
  try {
    fs.unlinkSync(pidFile);
  } catch (e) {
    // ignore -- best-effort cleanup of the handoff file itself
  }
  if (!Number.isFinite(pid)) return;
  try {
    process.kill(pid); // on Windows, Node maps this to TerminateProcess for the exact PID
  } catch (e) {
    // ESRCH-equivalent: process already gone, which is the success case,
    // not an error -- nothing left to kill.
  }
};
