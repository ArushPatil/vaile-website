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
  const evaluate = async (expression) => {
    const response = await cdp('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (response.exceptionDetails) throw new Error(response.exceptionDetails.exception?.description ?? JSON.stringify(response.exceptionDetails));
    return response.result.value;
  };

  await cdp('Page.enable');
  await cdp('Runtime.enable');
  await cdp('Page.addScriptToEvaluateOnNewDocument', { source: `try { sessionStorage.setItem('vaile_has_loaded', '1'); } catch {}` });
  const findings = [];

  for (const viewport of viewports) {
    await cdp('Emulation.setDeviceMetricsOverride', { width: viewport.width, height: viewport.height, deviceScaleFactor: 1, mobile: viewport.mobile, screenWidth: viewport.width, screenHeight: viewport.height });
    await cdp('Page.navigate', { url });
    for (let attempt = 0; attempt < 50; attempt += 1) {
      if (await evaluate(`Boolean(document.querySelector('.chapter-shell') && !document.querySelector('.manual-shell.is-loading') && document.querySelector('.chapter-cut') && document.querySelector('.chapter-build'))`)) break;
      await sleep(150);
    }
    await evaluate(`document.documentElement.style.scrollBehavior = 'auto'; document.body.style.scrollBehavior = 'auto';`);
    const metric = await evaluate(`(() => {
      const box = (selector) => { const el = document.querySelector(selector); if (!el) return { selector, missing: true, width: 0, height: 0, position: 'missing', grid: 'missing', overflow: 'missing', borderWidth: 'missing', padding: 'missing' }; const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return { selector, flowTop: Math.round(r.top + scrollY), width: Math.round(r.width), height: Math.round(r.height), position: s.position, grid: s.gridTemplateColumns, overflow: s.overflow, borderWidth: s.borderTopWidth, padding: s.paddingTop }; };
      return {
        viewport: { width: innerWidth, height: innerHeight },
        scrollWidth: document.documentElement.scrollWidth,
        privacyPosition: getComputedStyle(document.querySelector('.privacy-choice')).position,
        stackPositions: [...document.querySelectorAll('.manual-stack > [data-stack-item]')].map((el) => getComputedStyle(el).position),
        elements: ['.chapter-allocation', '.gallery-stage', '.gallery-stage figure', '.chapter-cut', '.cut-layout figure', '.chapter-fit', '.fit-layout figure', '.chapter-build', '.build-layout figure', '.chapter-care'].map(box),
        headerMark: box('.manual-header .manual-brand img'),
      };
    })()`);

    const lookup = Object.fromEntries(metric.elements.map((item) => [item.selector, item]));
    const desktop = viewport.width >= 901;
    const checks = {
      noHorizontalOverflow: metric.scrollWidth === viewport.width,
      privacyIsInFlow: metric.privacyPosition !== 'fixed',
      expectedStackMode: desktop ? metric.stackPositions.every((position) => position === 'sticky') : metric.stackPositions.every((position) => position === 'relative'),
      galleryImageHasReadableWidth: lookup['.gallery-stage figure'].width >= Math.floor(viewport.width * (desktop ? 0.42 : 0.82)),
      cutImageHasReadableWidth: lookup['.cut-layout figure'].width >= Math.floor(viewport.width * (desktop ? 0.25 : 0.82)),
      fitImageHasReadableWidth: lookup['.fit-layout figure'].width >= Math.floor(viewport.width * (desktop ? 0.14 : 0.9)),
      buildImageHasReadableWidth: lookup['.build-layout figure'].width >= Math.floor(viewport.width * (desktop ? 0.3 : 0.82)),
      mobileGalleryIsOneColumn: desktop || !lookup['.gallery-stage'].grid.includes(' '),
      unboxedHeaderMark: metric.headerMark.width >= (desktop ? 42 : 30) && metric.headerMark.borderWidth === '0px' && metric.headerMark.padding === '0px',
    };
    const sectionTargets = ['.chapter-allocation', '.chapter-gallery', '.chapter-cut', '.chapter-fit', '.chapter-build', '.chapter-care'];
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
