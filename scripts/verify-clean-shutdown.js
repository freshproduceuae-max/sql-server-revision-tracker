// Objective process-lifecycle check for the headless coverage harness.
//
// Spawns the exact test command, waits for it to exit within a bounded
// window, then diffs a full process-tree snapshot (PID, parent PID,
// command line, creation time, listening ports) taken before and after.
// Any node.exe/chrome.exe/msedge.exe/*playwright* process that appeared
// during the run and is STILL PRESENT after it exited is reported as a
// leak, with its full identity and its parentage chain back to (or away
// from) the process we spawned -- so a leak can be positively attributed
// to this test run rather than guessed at.
//
// Only PIDs whose parentage chain traces back to the spawned command are
// ever candidates for cleanup (--kill-leaked); anything else (e.g. an
// unrelated Adobe or MCP server process) is reported, never touched.
//
// Usage:
//   node scripts/verify-clean-shutdown.js [-- <command> <args...>]
//   node scripts/verify-clean-shutdown.js --exit-timeout=90000 --kill-leaked -- npx playwright test
//
// Default command if none given: `npx playwright test`.
'use strict';
const { spawn, execFileSync } = require('child_process');

function parseArgs(argv) {
  const opts = { exitTimeoutMs: 90_000, killLeaked: false, command: null, args: [] };
  let i = 0;
  for (; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--') {
      i++;
      break;
    } else if (a.startsWith('--exit-timeout=')) {
      opts.exitTimeoutMs = Number(a.split('=')[1]);
    } else if (a === '--kill-leaked') {
      opts.killLeaked = true;
    }
  }
  const rest = argv.slice(i);
  if (rest.length) {
    opts.command = rest[0];
    opts.args = rest.slice(1);
  } else {
    opts.command = 'npx';
    opts.args = ['playwright', 'test'];
  }
  return opts;
}

// wmic output is CSV-ish with a header row; ProcessId/ParentProcessId are
// numeric, CreationDate is WMI's own timestamp format, CommandLine can
// contain commas so we parse it as "everything after the 2nd-to-last
// comma-delimited numeric field" rather than naive CSV splitting.
function snapshotProcesses() {
  // Matched broadly by name (node.exe, and any browser-family executable
  // Playwright might launch), then filtered in JS to exclude command lines
  // that are obviously unrelated system/user browser instances (this
  // machine runs its own Edge/Chrome tabs, extensions, crashpad handlers,
  // etc. that would otherwise drown out the ~5-10 processes this test run
  // actually cares about). A process survives the filter if it's node.exe
  // (any node process is a legitimate candidate -- the dev server, a
  // Playwright worker, npx itself) OR its command line contains
  // "ms-playwright" (Playwright's own browser cache path -- the one
  // reliable marker that a browser process belongs to Playwright, not the
  // user's regular browser).
  const raw = execFileSync(
    'wmic',
    [
      'process',
      'where',
      "name='node.exe' or name='chrome.exe' or name='msedge.exe' or name='Playwright.exe' or name='WebKitNetworkProcess.exe' or name='WebKitWebProcess.exe'",
      'get',
      'ProcessId,ParentProcessId,CreationDate,CommandLine',
      '/format:csv',
    ],
    { encoding: 'utf8' }
  );
  const lines = raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length < 2) return [];
  const header = lines[0].split(',');
  const idx = {
    Node: header.indexOf('Node'),
    CommandLine: header.indexOf('CommandLine'),
    CreationDate: header.indexOf('CreationDate'),
    ParentProcessId: header.indexOf('ParentProcessId'),
    ProcessId: header.indexOf('ProcessId'),
  };
  const procs = [];
  for (const line of lines.slice(1)) {
    // CommandLine itself can contain commas (quoted paths etc.) -- wmic's
    // /format:csv does NOT quote-escape embedded commas, so split from
    // the right using the known trailing numeric-field count (3: creation
    // date, parent pid, pid) and treat everything before that as node +
    // commandline joined by the first comma.
    const parts = line.split(',');
    if (parts.length < 5) continue;
    const pid = Number(parts[parts.length - 1]);
    const ppid = Number(parts[parts.length - 2]);
    const creationDate = parts[parts.length - 3];
    const node = parts[0];
    const commandLine = parts.slice(1, parts.length - 3).join(',');
    if (!Number.isFinite(pid)) continue;
    const cmd = commandLine || '(no command line -- access denied or system process)';
    procs.push({ pid, ppid, creationDate, commandLine: cmd, node });
  }
  // node column holds the machine/hostname from wmic, not "node.exe" --
  // filter is on commandLine/executable, not that field.
  return procs.filter((p) => {
    const cmdLower = p.commandLine.toLowerCase();
    const isNode = cmdLower.includes('node.exe') || cmdLower.startsWith('"node"') || cmdLower.startsWith('node ');
    const isPlaywrightBrowser = cmdLower.includes('ms-playwright');
    return isNode || isPlaywrightBrowser;
  });
}

function snapshotListeningPorts() {
  let raw;
  try {
    raw = execFileSync('netstat', ['-ano'], { encoding: 'utf8' });
  } catch (e) {
    return new Map();
  }
  const byPid = new Map();
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^\s*TCP\s+(\S+):(\d+)\s+\S+\s+LISTENING\s+(\d+)\s*$/);
    if (!m) continue;
    const [, addr, port, pidStr] = m;
    const pid = Number(pidStr);
    if (!byPid.has(pid)) byPid.set(pid, []);
    byPid.get(pid).push(`${addr}:${port}`);
  }
  return byPid;
}

function buildAncestryCheck(procs) {
  const byPid = new Map(procs.map((p) => [p.pid, p]));
  return function isDescendantOf(pid, ancestorPid, depth = 0) {
    if (depth > 20) return false; // guard against any cycle in bad data
    if (pid === ancestorPid) return true;
    const p = byPid.get(pid);
    if (!p || !p.ppid) return false;
    return isDescendantOf(p.ppid, ancestorPid, depth + 1);
  };
}

function fmtProc(p, ports) {
  const portStr = ports.has(p.pid) ? ports.get(p.pid).join(', ') : '(none)';
  return `  PID ${p.pid} | PPID ${p.ppid} | created ${p.creationDate} | ports: ${portStr}\n    cmd: ${p.commandLine}`;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));

  console.log(`=== verify-clean-shutdown ===`);
  console.log(`command: ${opts.command} ${opts.args.join(' ')}`);
  console.log(`exit-timeout: ${opts.exitTimeoutMs}ms`);
  console.log(`kill-leaked: ${opts.killLeaked}`);
  console.log('');

  const before = snapshotProcesses();
  console.log(`--- BEFORE: ${before.length} node/browser processes present ---`);
  for (const p of before) console.log(fmtProc(p, snapshotListeningPorts()));

  const start = Date.now();
  const child = spawn(opts.command, opts.args, {
    cwd: process.cwd(),
    shell: true,
    stdio: 'inherit',
  });

  console.log(`\nspawned PID ${child.pid} at ${new Date(start).toISOString()}\n`);

  let exited = false;
  let exitCode = null;
  const exitPromise = new Promise((resolve) => {
    child.on('exit', (code) => {
      exited = true;
      exitCode = code;
      resolve();
    });
  });
  const timeoutPromise = new Promise((resolve) => setTimeout(resolve, opts.exitTimeoutMs));

  await Promise.race([exitPromise, timeoutPromise]);
  const elapsedMs = Date.now() - start;

  console.log('');
  if (!exited) {
    console.log(`RESULT: process did NOT exit within ${opts.exitTimeoutMs}ms (elapsed ${elapsedMs}ms). Treating as a bound-violation.`);
  } else {
    console.log(`RESULT: process exited with code ${exitCode} after ${elapsedMs}ms.`);
  }

  // Give the OS a brief moment to finish tearing down any child processes
  // whose parent just exited, before snapshotting -- this is NOT a real
  // wait for the harness itself, just avoiding a race against OS bookkeeping.
  await new Promise((r) => setTimeout(r, 1000));

  const after = snapshotProcesses();
  const ports = snapshotListeningPorts();
  console.log(`\n--- AFTER: ${after.length} node/browser processes present ---`);
  for (const p of after) console.log(fmtProc(p, ports));

  const beforePids = new Set(before.map((p) => p.pid));
  const survivors = after.filter((p) => !beforePids.has(p.pid));

  console.log(`\n--- LEAK CHECK: ${survivors.length} new process(es) present after the run that were not present before ---`);
  if (survivors.length === 0) {
    console.log('No new processes survived the run. Clean shutdown confirmed.');
  } else {
    const isDescendantOf = buildAncestryCheck(after.concat(before));
    for (const p of survivors) {
      const isOurs = isDescendantOf(p.pid, child.pid);
      console.log(fmtProc(p, ports));
      console.log(`    identity: ${isOurs ? 'DESCENDANT of spawned PID ' + child.pid + ' -- attributable to this run' : 'NOT a descendant of spawned PID ' + child.pid + ' -- unrelated, do not touch'}`);
      if (isOurs && opts.killLeaked) {
        try {
          execFileSync('taskkill', ['/PID', String(p.pid), '/F'], { encoding: 'utf8' });
          console.log(`    action: killed (--kill-leaked was set, and this PID was positively identified as a descendant of the spawned process)`);
        } catch (e) {
          console.log(`    action: taskkill failed: ${e.message}`);
        }
      }
    }
  }

  const boundViolated = !exited;
  const leakedOurs = survivors.some((p) => buildAncestryCheck(after.concat(before))(p.pid, child.pid));
  const overallPass = !boundViolated && !leakedOurs;
  console.log(`\n=== OVERALL: ${overallPass ? 'PASS' : 'FAIL'} (exit-bound: ${!boundViolated}, no-attributable-leak: ${!leakedOurs}) ===`);

  process.exitCode = overallPass ? 0 : 1;
}

main().catch((e) => {
  console.error('verify-clean-shutdown crashed:', e);
  process.exitCode = 2;
});
