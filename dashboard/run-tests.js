const { spawn } = require('node:child_process');
const http = require('node:http');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const dashboardUrl = 'http://localhost:4173';
const isWindows = process.platform === 'win32';

function dashboardIsRunning() {
  return new Promise((resolve) => {
    const request = http.get(`${dashboardUrl}/api/data`, (response) => {
      response.resume();
      resolve(response.statusCode === 200);
    });
    request.on('error', () => resolve(false));
    request.setTimeout(700, () => { request.destroy(); resolve(false); });
  });
}

function startDashboard() {
  const command = process.execPath;
  const server = spawn(command, [path.join(__dirname, 'server.js')], {
    cwd: projectRoot,
    detached: true,
    stdio: 'ignore',
    windowsHide: true,
  });
  server.unref();
}

function openDashboard() {
  const command = isWindows ? 'explorer.exe' : process.platform === 'darwin' ? 'open' : 'xdg-open';
  const launcher = spawn(command, [dashboardUrl], { detached: true, stdio: 'ignore', windowsHide: true });
  launcher.on('error', (error) => console.error(`Could not open dashboard at ${dashboardUrl}: ${error.message}`));
  launcher.unref();
}

async function main() {
  if (!(await dashboardIsRunning())) startDashboard();
  const playwrightCli = require.resolve('@playwright/test/cli');
  const test = spawn(process.execPath, [playwrightCli, 'test', ...process.argv.slice(2)], {
    cwd: projectRoot,
    stdio: 'inherit',
  });
  test.on('close', (code, signal) => {
    openDashboard();
    process.exitCode = signal ? 1 : code ?? 1;
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
