const state = { tests: [], artifacts: [] };
const $ = (selector) => document.querySelector(selector);
const clean = (text) => String(text || '').replace(/\u001b\[[0-9;]*m/g, '').trim();
const formatMs = (value) => `${Math.round(value).toLocaleString()} ms`;

async function loadData() {
  const response = await fetch(`/api/data?time=${Date.now()}`);
  const data = await response.json();
  state.tests = data.tests || [];
  state.artifacts = data.artifacts || [];
  $('#run-time').textContent = data.generatedAt ? `Updated ${new Date(data.generatedAt).toLocaleTimeString()}` : 'No run loaded';
  render();
}

function render() {
  const passed = state.tests.filter((test) => test.status === 'passed').length;
  const failed = state.tests.filter((test) => test.status === 'failed').length;
  const skipped = state.tests.filter((test) => test.status === 'skipped').length;
  const totalDuration = state.tests.reduce((sum, test) => sum + test.duration, 0);
  $('#run-state').textContent = state.tests.length ? (failed ? `${failed} FAILURE${failed > 1 ? 'S' : ''} NEED ATTENTION` : 'RUN HEALTHY') : 'WAITING FOR RUN DATA';
  $('#metrics').innerHTML = [['Total tests', state.tests.length, ''], ['Passed', passed, 'pass'], ['Failed', failed, 'failed'], ['Run time', formatMs(totalDuration), '']].map(([label, value, className]) => `<div class="metric ${className}"><div class="metric-label">${label}</div><div class="metric-value">${value}</div></div>`).join('');
  renderDurationChart();
  renderPerformance();
  renderResults();
}

function renderDurationChart() {
  const chart = $('#duration-chart');
  if (!state.tests.length) { chart.innerHTML = '<div class="empty">Run Playwright to see runtime data.</div>'; return; }
  const max = Math.max(...state.tests.map((test) => test.duration), 1);
  chart.innerHTML = state.tests.slice(0, 12).map((test) => `<div class="bar-item" title="${escapeHtml(test.title)}"><span class="bar-ms">${Math.round(test.duration)}ms</span><div class="bar" style="height:${Math.max(4, test.duration / max * 100)}%;background:${test.status === 'failed' ? 'var(--coral)' : 'var(--blue)'}"></div><span class="bar-label">${escapeHtml(shortName(test.title))}</span></div>`).join('');
}

function renderPerformance() {
  const metric = state.tests.flatMap((test) => test.attachments || []).find((attachment) => attachment.name === 'performance-metrics' && attachment.value?.value !== undefined);
  if (!metric) return;
  const { value, budget } = metric.value;
  const percent = Math.min(100, value / budget * 100);
  $('#gauge-value').textContent = Math.round(value);
  $('.gauge').style.setProperty('--gauge', `${percent}%`);
  $('#budget-label').textContent = `Budget ${formatMs(budget)}`;
  $('#gauge-status').textContent = value < budget ? 'Within performance budget' : 'Over performance budget';
  $('#gauge-detail').textContent = `${formatMs(value)} measured for DOM content loaded. ${value < budget ? `${Math.round(budget - value)} ms headroom remains.` : `${Math.round(value - budget)} ms over the limit.`}`;
}

function renderResults() {
  const filter = $('#status-filter').value;
  const results = state.tests.filter((test) => filter === 'all' || test.status === filter);
  const template = $('#result-template');
  $('#results').innerHTML = '';
  if (!results.length) { $('#results').innerHTML = '<div class="empty">No matching test results.</div>'; return; }
  results.forEach((test) => {
    const row = template.content.cloneNode(true);
    const article = row.querySelector('.result-row');
    article.classList.add(test.status);
    row.querySelector('.result-title').textContent = test.title;
    row.querySelector('.result-suite').textContent = `${test.file}  /  ${test.status.toUpperCase()}`;
    row.querySelector('.result-location').textContent = test.location?.file ? `Location: ${test.location.file}:${test.location.line}:${test.location.column}` : '';
    row.querySelector('.result-error').textContent = clean(test.error) || 'No failure message recorded.';
    row.querySelector('.result-duration').textContent = formatMs(test.duration);
    const links = row.querySelector('.result-links');
    const related = state.artifacts.filter((artifact) => test.status === 'failed' || /performance/i.test(test.title));
    related.slice(0, 4).forEach((artifact) => { const link = document.createElement('a'); link.href = artifact.url; link.target = '_blank'; link.textContent = artifact.type === 'png' ? 'View screenshot' : artifact.type === 'zip' ? 'Open trace' : 'View context'; links.appendChild(link); });
    $('#results').appendChild(row);
  });
}

function shortName(title) { return title.length > 18 ? `${title.slice(0, 16)}...` : title; }
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]); }
$('#refresh').addEventListener('click', loadData);
$('#status-filter').addEventListener('change', renderResults);
setInterval(() => loadData().catch(() => {}), 15000);
loadData().catch(() => { $('#run-state').textContent = 'REPORT UNAVAILABLE'; $('#results').innerHTML = '<div class="empty">Start the dashboard from the project root with npm run dashboard.</div>'; });
