import { mkdir, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';

const port = 9555;
const url = process.env.LAYOUT_TEST_URL ?? 'http://127.0.0.1:5173/';
const outDir = `/tmp/vaile-layout-probe-${process.pid}`;
const viewports = [
  { name: 'desktop-1440', width: 1440, height: 900, mobile: false },
  { name: 'desktop-1024', width: 1024, height: 768, mobile: false },
  { name: 'tablet-768', width: 768, height: 1024, mobile: true },
  { name: 'phone-430', width: 430, height: 932, mobile: true },
  { name: 'phone-390', width: 390, height: 844, mobile: true },
  { name: 'phone-360', width: 360, height: 800, mobile: true },
];
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

await mkdir(outDir, { recursive: true });
const chrome = spawn('chromium', ['--headless=new', `--remote-debugging-port=${port}`, '--no-sandbox', '--disable-gpu', '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' });

try {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try { await fetch(`http://127.0.0.1:${port}/json/version`); break; } catch { await sleep(150); }
  }
  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const target = targets.find((item) => item.type === 'page');
  if (!target) throw new Error('No browser target available');
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.addEventListener('open', resolve, { once: true }); socket.addEventListener('error', reject, { once: true }); });
  let id = 0;
  const pending = new Map();
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      message.error ? reject(new Error(message.error.message)) : resolve(message.result);
    }
  });
  const cdp = (method, params = {}) => new Promise((resolve, reject) => {
    const requestId = ++id;
    pending.set(requestId, { resolve, reject });
    socket.send(JSON.stringify({ id: requestId, method, params }));
  });
  const evaluate = async (expression) => (await cdp('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result.value;

  await cdp('Page.enable');
  await cdp('Runtime.enable');
  await cdp('Page.addScriptToEvaluateOnNewDocument', { source: `try { sessionStorage.setItem('vaile_has_loaded', '1'); } catch {}` });
  const findings = [];

  for (const viewport of viewports) {
    await cdp('Emulation.setDeviceMetricsOverride', { width: viewport.width, height: viewport.height, deviceScaleFactor: 1, mobile: viewport.mobile, screenWidth: viewport.width, screenHeight: viewport.height });
    await cdp('Page.navigate', { url });
    for (let attempt = 0; attempt < 50; attempt += 1) {
      if (await evaluate(`Boolean(document.querySelector('.manual-shell') && !document.querySelector('.manual-shell.is-loading') && document.querySelector('.proof-inner') && document.querySelector('.build-inner'))`)) break;
      await sleep(150);
    }
    await evaluate(`document.documentElement.style.scrollBehavior = 'auto'; document.body.style.scrollBehavior = 'auto';`);
    const metric = await evaluate(`(() => {
      const box = (selector) => { const el = document.querySelector(selector); const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return { selector, flowTop: Math.round(r.top + scrollY), width: Math.round(r.width), height: Math.round(r.height), position: s.position, grid: s.gridTemplateColumns, overflow: s.overflow }; };
      return {
        viewport: { width: innerWidth, height: innerHeight },
        scrollWidth: document.documentElement.scrollWidth,
        privacyPosition: getComputedStyle(document.querySelector('.privacy-choice')).position,
        stackPositions: [...document.querySelectorAll('.manual-stack > [data-stack-item]')].map((el) => getComputedStyle(el).position),
        elements: ['.proof-inner', '.proof-image', '.proof-copy', '.build-inner', '.build-copy', '.build-image', '.care-inner'].map(box),
      };
    })()`);

    const lookup = Object.fromEntries(metric.elements.map((item) => [item.selector, item]));
    const desktop = viewport.width >= 901;
    const checks = {
      noHorizontalOverflow: metric.scrollWidth === viewport.width,
      privacyIsInFlow: metric.privacyPosition !== 'fixed',
      expectedStackMode: desktop ? metric.stackPositions.every((position) => position === 'sticky') : metric.stackPositions.every((position) => position === 'relative'),
      proofImageHasReadableWidth: lookup['.proof-image'].width >= Math.floor(viewport.width * (desktop ? 0.24 : 0.8)),
      buildImageHasReadableWidth: lookup['.build-image'].width >= Math.floor(viewport.width * (desktop ? 0.26 : 0.8)),
      mobileProofIsOneColumn: desktop || !lookup['.proof-inner'].grid.includes(' '),
      mobileBuildIsOneColumn: desktop || !lookup['.build-inner'].grid.includes(' '),
    };
    const sectionTargets = ['.allocation-sheet', '.proof-spread', '.build-spread', '.care-sheet'];
    const screenshots = [];
    for (const selector of sectionTargets) {
      const y = await evaluate(`(() => { const r = document.querySelector('${selector}').getBoundingClientRect(); return Math.round(r.top + scrollY + 12); })()`);
      await evaluate(`window.scrollTo({top:${y},behavior:'instant'}); new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))`);
      const screen = await cdp('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
      const file = `${viewport.name}-${selector.slice(1)}.png`;
      await writeFile(`${outDir}/${file}`, Buffer.from(screen.data, 'base64'));
      screenshots.push(file);
    }
    findings.push({ viewport, metric, checks, passed: Object.values(checks).every(Boolean), screenshots });
  }
  await writeFile(`${outDir}/results.json`, JSON.stringify(findings, null, 2));
  console.log(JSON.stringify(findings, null, 2));
  const failures = findings.flatMap((result) => Object.entries(result.checks).filter(([, value]) => !value).map(([check]) => `${result.viewport.name}: ${check}`));
  if (failures.length) throw new Error(`Responsive regression checks failed:\n${failures.join('\n')}`);
  socket.close();
} finally {
  chrome.kill('SIGTERM');
}
