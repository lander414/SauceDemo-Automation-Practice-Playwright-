const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname);
const projectRoot = path.resolve(root, '..');
const port = Number(process.env.DASHBOARD_PORT || 4173);

function readJsonReport() {
  const reportPath = path.join(projectRoot, 'reports', 'test-results.json');
  if (!fs.existsSync(reportPath)) return { suites: [] };
  try { return JSON.parse(fs.readFileSync(reportPath, 'utf8')); } catch { return { suites: [] }; }
}

function collectFiles(directory, files = []) {
  if (!fs.existsSync(directory)) return files;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) collectFiles(entryPath, files);
    else files.push(entryPath);
  }
  return files;
}

function artifactUrl(filePath) {
  return `/artifacts/${path.relative(projectRoot, filePath).split(path.sep).map(encodeURIComponent).join('/')}`;
}

function buildData() {
  const tests = [];
  const flatten = (suite, parents = []) => {
    const suitePath = [...parents, suite.title].filter(Boolean);
    for (const spec of suite.specs || []) {
      for (const test of spec.tests || []) {
        const result = (test.results || []).at(-1) || {};
        const attachments = (result.attachments || []).map((attachment) => {
          let value = attachment.body;
          if (attachment.contentType === 'application/json' && value) {
            try { value = JSON.parse(Buffer.from(value, 'base64').toString('utf8')); } catch {}
          }
          return { name: attachment.name, contentType: attachment.contentType, value };
        });
        tests.push({
          id: `${suite.file}:${spec.title}`,
          title: spec.title,
          suite: suitePath.join(' / '),
          file: suite.file,
          status: result.status || 'skipped',
          duration: Number.isFinite(Number(result.duration)) ? Number(result.duration) : 0,
          error: result.error?.message || result.errors?.[0]?.message || '',
          stack: result.error?.stack || '',
          location: result.error?.location || { file: suite.file, line: suite.line, column: suite.column },
          attachments,
          startTime: result.startTime || null,
        });
      }
    }
    for (const child of suite.suites || []) flatten(child, suitePath);
  };
  for (const suite of readJsonReport().suites || []) flatten(suite);

  const artifactFiles = collectFiles(path.join(projectRoot, 'test-results'))
    .filter((file) => /\.(png|zip|md|webm)$/i.test(file))
    .map((file) => ({ name: path.basename(file), url: artifactUrl(file), type: path.extname(file).slice(1) }));
  return { generatedAt: new Date().toISOString(), tests, artifacts: artifactFiles };
}

const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.zip': 'application/zip', '.md': 'text/markdown' };
const server = http.createServer((request, response) => {
  const requestPath = decodeURIComponent((request.url || '/').split('?')[0]);
  if (requestPath === '/api/data') {
    response.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
    return response.end(JSON.stringify(buildData()));
  }
  const relativePath = requestPath === '/' ? 'index.html' : requestPath.replace(/^\/(?:dashboard\/)?/, '');
  const filePath = requestPath.startsWith('/artifacts/')
    ? path.join(projectRoot, requestPath.slice('/artifacts/'.length))
    : path.join(root, relativePath);
  if (!filePath.startsWith(root) && !filePath.startsWith(path.join(projectRoot, 'test-results'))) {
    response.writeHead(403); return response.end('Forbidden');
  }
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    response.writeHead(404); return response.end('Not found');
  }
  response.writeHead(200, { 'Content-Type': mime[path.extname(filePath)] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(response);
});
server.listen(port, () => console.log(`Dashboard running at http://localhost:${port}`));
