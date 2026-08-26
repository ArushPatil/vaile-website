import { mkdir, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";

const port = 9555;
const url = process.env.LAYOUT_TEST_URL ?? "http://127.0.0.1:5173/";
const outDir = `/tmp/vaile-current-layout-${process.pid}`;
const viewports = [
  { name: "desktop-1440", width: 1440, height: 900, mobile: false },
  { name: "desktop-1024", width: 1024, height: 768, mobile: false },
  { name: "tablet-768", width: 768, height: 1024, mobile: true },
  { name: "phone-430", width: 430, height: 932, mobile: true },
  { name: "phone-390", width: 390, height: 844, mobile: true },
  { name: "phone-360", width: 360, height: 800, mobile: true },
];
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

await mkdir(outDir, { recursive: true });
const chrome = spawn("chromium", ["--headless=new", `--remote-debugging-port=${port}`, "--no-sandbox", "--disable-gpu", "--hide-scrollbars", "about:blank"], { stdio: "ignore" });

try {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try { await fetch(`http://127.0.0.1:${port}/json/version`); break; } catch { await sleep(150); }
  }
  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const target = targets.find((item) => item.type === "page");
  if (!target) throw new Error("No browser target available");
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.addEventListener("open", resolve, { once: true }); socket.addEventListener("error", reject, { once: true }); });
  let id = 0;
  const pending = new Map();
  socket.addEventListener("message", (event) => {
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
    const response = await cdp("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (response.exceptionDetails) throw new Error(response.exceptionDetails.exception?.description ?? JSON.stringify(response.exceptionDetails));
    return response.result.value;
  };

  await cdp("Page.enable");
  await cdp("Runtime.enable");
  await cdp("Page.addScriptToEvaluateOnNewDocument", { source: "try { sessionStorage.setItem('vaile_has_loaded', '1'); } catch {}" });
  const findings = [];

  for (const viewport of viewports) {
    await cdp("Emulation.setDeviceMetricsOverride", { width: viewport.width, height: viewport.height, deviceScaleFactor: 1, mobile: viewport.mobile, screenWidth: viewport.width, screenHeight: viewport.height });
    await cdp("Page.navigate", { url });
    for (let attempt = 0; attempt < 50; attempt += 1) {
      if (await evaluate("Boolean(document.querySelector('.chapter-shell') && !document.querySelector('.manual-shell.is-loading') && document.querySelector('.gallery-dossier') && document.querySelector('.chapter-sizing'))")) break;
      await sleep(150);
    }
    await evaluate("document.documentElement.style.scrollBehavior = 'auto'; document.body.style.scrollBehavior = 'auto';");
    const metric = await evaluate(`(() => {
      const box = (selector) => {
        const el = document.querySelector(selector);
        if (!el) return { selector, missing: true, width: 0, height: 0, position: 'missing', grid: 'missing', columns: 0, paddingTop: 0, fontSize: 0 };
        const r = el.getBoundingClientRect(); const s = getComputedStyle(el);
        return { selector, width: Math.round(r.width), height: Math.round(r.height), position: s.position, grid: s.gridTemplateColumns, columns: s.gridTemplateColumns === 'none' ? 0 : s.gridTemplateColumns.split(' ').filter(Boolean).length, paddingTop: Number.parseFloat(s.paddingTop), fontSize: Number.parseFloat(s.fontSize) };
      };
      const headingInset = (selector) => { const section = document.querySelector(selector); const heading = section?.querySelector('h2'); if (!section || !heading) return -1; return Math.round(heading.getBoundingClientRect().top - section.getBoundingClientRect().top); };
      const style = (selector) => { const el = document.querySelector(selector); if (!el) return {}; const s = getComputedStyle(el); return { color: s.color, background: s.backgroundColor }; };
      return {
        scrollWidth: document.documentElement.scrollWidth,
        header: box('.manual-header'),
        chapterPositions: [...document.querySelectorAll('.chapter')].map((el) => getComputedStyle(el).position),
        chapterCount: document.querySelectorAll('.chapter').length,
        galleryPills: document.querySelectorAll('.gallery-pills button').length,
        galleryControls: document.querySelectorAll('.gallery-controls button').length,
        sizingTiles: [...document.querySelectorAll('.sizing-tile-ledger article')].map((tile) => { const s = getComputedStyle(tile); const r = tile.getBoundingClientRect(); const identifier = tile.querySelector('header'); const measurements = tile.querySelector('dl'); const measurementStyle = measurements ? getComputedStyle(measurements) : null; const center = r.top + r.height / 2; const identifierCenterOffset = identifier ? Math.round((identifier.getBoundingClientRect().top + identifier.getBoundingClientRect().height / 2) - center) : null; const measurementCenterOffset = measurements ? Math.round((measurements.getBoundingClientRect().top + measurements.getBoundingClientRect().height / 2) - center) : null; return { selected: tile.classList.contains('is-selected'), column: s.gridColumnStart, row: s.gridRowStart, width: Math.round(r.width), height: Math.round(r.height), measurementColumns: measurementStyle?.gridTemplateColumns === 'none' ? 0 : measurementStyle?.gridTemplateColumns.split(' ').filter(Boolean).length, identifierCenterOffset, measurementCenterOffset }; }),
        privacyChoiceExists: Boolean(document.querySelector('.privacy-choice')),
        elements: ['.allocation-layout', '.chapter-gallery', '.gallery-stage', '.gallery-figure-wrap', '.gallery-dossier', '.chapter-sizing', '.sizing-tile-ledger', '.chapter-care', '.closing-allocation'].map(box),
        headingInsets: ['.chapter-allocation', '.chapter-gallery', '.chapter-sizing', '.chapter-care'].map(headingInset),
        dossierStyle: style('.gallery-dossier'),
        sizingToggleStyle: style('.sizing-controls button.is-active'),
        careGeometry: (() => { const intro = document.querySelector('.care-intro')?.getBoundingClientRect(); const list = document.querySelector('.care-layout ul')?.getBoundingClientRect(); const stamp = document.querySelector('.care-stamp')?.getBoundingClientRect(); const rows = [...document.querySelectorAll('.care-layout li')].map((row) => { const r = row.getBoundingClientRect(); return { top: Math.round(r.top), bottom: Math.round(r.bottom), height: Math.round(r.height) }; }); return { introListBottomDelta: intro && list ? Math.round(intro.bottom - list.bottom) : null, rowHeights: rows.map((row) => row.height), stampAfterRows: Boolean(stamp && list && stamp.top >= list.bottom) }; })(),
      };
    })()`);
    const sizingInteraction = await evaluate(`(async () => {
      const tiles = [...document.querySelectorAll('.sizing-tile-ledger article')];
      const target = tiles.find((tile) => tile.querySelector('header b')?.textContent?.trim() === '34');
      target?.click();
      await new Promise((resolve) => setTimeout(resolve, 240));
      const selected = tiles.find((tile) => tile.classList.contains('is-selected'));
      const enquiry = document.querySelector('.chapter-allocation .allocation-record');
      return {
        selectedSize: selected?.querySelector('header b')?.textContent?.trim(),
        selectedPressed: selected?.getAttribute('aria-pressed'),
        enquirySize: enquiry?.querySelector('span')?.textContent?.trim(),
        whatsappHas34: enquiry?.getAttribute('href')?.includes(encodeURIComponent('Size: 34')),
      };
    })()`);
    const galleryInteraction = await evaluate(`(async () => {
      const frame = document.querySelector('.gallery-figure-wrap');
      const stage = document.querySelector('.gallery-stage');
      const dossierControls = document.querySelector('.gallery-dossier .gallery-controls');
      const selectorStrip = document.querySelector('.gallery-pills');
      const selectorButtons = [...document.querySelectorAll('.gallery-pills button')];
      const firstSelector = selectorButtons[0]?.getBoundingClientRect();
      const secondSelector = selectorButtons[1]?.getBoundingClientRect();
      const selectorStyle = selectorStrip ? getComputedStyle(selectorStrip) : null;
      const base = {
        frameWidth: Math.round(frame?.getBoundingClientRect().width ?? 0),
        frameHeight: Math.round(frame?.getBoundingClientRect().height ?? 0),
        stageHeight: Math.round(stage?.getBoundingClientRect().height ?? 0),
        desktopControlsVisible: Boolean(dossierControls && dossierControls.getBoundingClientRect().width > 0 && dossierControls.getBoundingClientRect().height > 0 && getComputedStyle(dossierControls).visibility !== 'hidden'),
        selectorContinuous: Boolean(selectorStyle && Number.parseFloat(selectorStyle.columnGap) === 0 && firstSelector && secondSelector && Math.abs(firstSelector.right - secondSelector.left) <= 1),
      };
      const nextFrame = async () => {
        const caption = document.querySelector('.gallery-stage figcaption')?.textContent;
        let gestureTriggered = false;
        if (innerWidth >= 768) {
          document.querySelector('.gallery-controls button:last-child')?.click();
        } else if (frame && typeof Touch === 'function' && typeof TouchEvent === 'function') {
          const rect = frame.getBoundingClientRect();
          const startX = rect.left + rect.width * .72;
          const endX = rect.left + rect.width * .28;
          const y = rect.top + rect.height * .5;
          const touch = (x) => new Touch({ identifier: 1, target: frame, clientX: x, clientY: y, screenX: x, screenY: y, pageX: x + scrollX, pageY: y + scrollY, radiusX: 1, radiusY: 1, rotationAngle: 0, force: .5 });
          frame.dispatchEvent(new TouchEvent('touchstart', { bubbles: true, cancelable: true, touches: [touch(startX)], targetTouches: [touch(startX)], changedTouches: [] }));
          frame.dispatchEvent(new TouchEvent('touchend', { bubbles: true, cancelable: true, touches: [], targetTouches: [], changedTouches: [touch(endX)] }));
          gestureTriggered = true;
        }
        await new Promise((resolve) => setTimeout(resolve, 48));
        const frameHeldWhilePreparing = frame?.getAttribute('aria-busy') === 'true' && document.querySelectorAll('.gallery-stage figure').length >= 1;
        await new Promise((resolve) => setTimeout(resolve, 1600));
        const captions = [...document.querySelectorAll('.gallery-stage figcaption')].map((element) => element.textContent);
        const committed = captions.some((value) => value !== caption) && frame?.getAttribute('aria-busy') === 'false';
        return { frameHeldWhilePreparing, committed, gestureTriggered };
      };
      const handoff = await nextFrame();
      if (innerWidth >= 768) return { ...base, handoff, mobile: null };
      const open = document.querySelector('.gallery-info-toggle');
      const swipeHint = document.querySelector('.gallery-swipe-hint');
      const swipeHintStyle = swipeHint ? getComputedStyle(swipeHint) : null;
      const mobileSource = document.querySelector('.gallery-stage source[media="(max-width: 640px)"]');
      const mobileDefaults = {
        arrowControlsRemoved: document.querySelectorAll('.gallery-mobile-nav button').length === 0,
        swipeHintVisible: Boolean(swipeHintStyle && Number.parseFloat(swipeHintStyle.opacity) >= .99 && swipeHintStyle.pointerEvents === 'none'),
        optimizedSource: Boolean(mobileSource?.srcset.includes('/manus-storage/') && matchMedia(mobileSource.media).matches),
      };
      if (!open) return { ...base, handoff, mobile: { opened: false, restored: false, fixedFrame: false, hintHidden: false, hintRestored: false, infoBorderless: false, ...mobileDefaults } };
      open.click();
      await new Promise((resolve) => setTimeout(resolve, 220));
      const overlay = document.querySelector('.gallery-mobile-info');
      const overlayBox = overlay?.getBoundingClientRect();
      const fixedFrame = Boolean(overlayBox && Math.abs(Math.round(overlayBox.width) - base.frameWidth) <= 2 && Math.abs(Math.round(overlayBox.height) - base.frameHeight) <= 2);
      const hintHidden = Number.parseFloat(getComputedStyle(document.querySelector('.gallery-swipe-hint')).opacity) <= 0.05;
      const infoBorderless = Number.parseFloat(getComputedStyle(document.querySelector('.gallery-info-toggle')).borderTopWidth) === 0;
      const hide = document.querySelector('.gallery-info-toggle');
      hide?.click();
      await new Promise((resolve) => setTimeout(resolve, 240));
      const hintRestored = Number.parseFloat(getComputedStyle(document.querySelector('.gallery-swipe-hint')).opacity) >= 0.99;
      return { ...base, handoff, mobile: { opened: Boolean(overlay), restored: !document.querySelector('.gallery-mobile-info'), fixedFrame, hintHidden, hintRestored, infoBorderless, ...mobileDefaults } };
    })()`);
    const lookup = Object.fromEntries(metric.elements.map((item) => [item.selector, item]));
    const compact = viewport.width < 768;
    const expectedColumns = viewport.width >= 1200 ? 12 : viewport.width >= 768 ? 8 : 4;
    const checks = {
      noHorizontalOverflow: metric.scrollWidth === viewport.width,
      normalFlowChapters: metric.chapterCount === 4 && metric.chapterPositions.every((position) => position === "relative"),
      expectedGridColumns: lookup[".allocation-layout"].columns === expectedColumns,
      galleryHasSixEvidenceFrames: metric.galleryPills === 6,
      galleryHasTwoStepControls: metric.galleryControls === 2,
      galleryLayoutMatchesViewport: compact ? lookup[".gallery-stage"].columns === 1 : lookup[".gallery-stage"].columns === 2,
      galleryImageIsReadable: lookup[".gallery-figure-wrap"].width >= Math.floor(viewport.width * (compact ? 0.8 : 0.35)),
      dossierHasContrastSurface: metric.dossierStyle.background !== "rgba(0, 0, 0, 0)" && metric.dossierStyle.color !== metric.dossierStyle.background,
      sizingPresentationIsReadable: metric.sizingTiles.length === 5 && lookup[".sizing-tile-ledger"].width >= Math.floor(viewport.width * (compact ? 0.8 : 0.4)),
      sizingDesktopTileDeployment: compact || JSON.stringify(metric.sizingTiles.map(({ column, row }) => ({ column, row }))) === JSON.stringify([{ column: '1', row: 'auto' }, { column: '1', row: 'auto' }, { column: '1', row: 'auto' }, { column: '1', row: 'auto' }, { column: '1', row: 'auto' }]),
      sizingDesktopGridIsEqual: compact || (() => { const selected = metric.sizingTiles.filter((tile) => tile.selected); const standard = metric.sizingTiles.filter((tile) => !tile.selected); const baseline = standard[0]; return Boolean(metric.sizingTiles.length === 5 && selected.length === 1 && standard.length === 4 && baseline && standard.every((tile) => tile.width === baseline.width && tile.height === baseline.height && tile.measurementColumns === 5) && selected[0].width >= baseline.width && selected[0].height >= baseline.height && selected[0].measurementColumns === 5); })(),
      mobileSizingTilesAreCompact: !compact || metric.sizingTiles.every((tile) => tile.measurementColumns === 6 && tile.height >= 120 && tile.height <= 130),
      sizingSelectionUpdatesEnquiry: Boolean(sizingInteraction.selectedSize === '34' && sizingInteraction.selectedPressed === 'true' && sizingInteraction.enquirySize === 'SIZE 34' && sizingInteraction.whatsappHas34),
      sizingTileContentIsCentered: compact || metric.sizingTiles.every((tile) => Math.abs(tile.identifierCenterOffset ?? 999) <= 2 && Math.abs(tile.measurementCenterOffset ?? 999) <= 2),
      sizingFitsDesktopViewport: compact || lookup[".chapter-sizing"].height <= viewport.height,
      sizingToggleHasContrast: metric.sizingToggleStyle.background !== metric.sizingToggleStyle.color && metric.sizingToggleStyle.background !== 'rgba(0, 0, 0, 0)',
      desktopCareRowsAreCompactAndAligned: compact || Boolean(metric.careGeometry.rowHeights.length === 4 && metric.careGeometry.rowHeights.every((height) => height === metric.careGeometry.rowHeights[0] && height <= 88) && Math.abs(metric.careGeometry.introListBottomDelta ?? 999) <= 16),
      mobileCareStampFollowsRows: !compact || metric.careGeometry.stampAfterRows,
      headerSafeEntries: metric.headingInsets.every((inset) => inset >= metric.header.height + (compact ? 24 : 40)),
      desktopLookbookIsCompact: compact || galleryInteraction.stageHeight <= Math.ceil(viewport.height * 0.6),
      desktopDossierControlsVisible: compact || galleryInteraction.desktopControlsVisible,
      desktopSelectorStripIsContinuous: compact || galleryInteraction.selectorContinuous,
      seamlessGalleryHandoffWorks: Boolean(galleryInteraction.handoff?.frameHeldWhilePreparing && galleryInteraction.handoff?.committed),
      mobileSwipeAndDisclosureWork: !compact || Boolean(galleryInteraction.handoff?.gestureTriggered && galleryInteraction.mobile?.opened && galleryInteraction.mobile?.restored && galleryInteraction.mobile?.fixedFrame && galleryInteraction.mobile?.arrowControlsRemoved && galleryInteraction.mobile?.swipeHintVisible && galleryInteraction.mobile?.infoBorderless && galleryInteraction.mobile?.hintHidden && galleryInteraction.mobile?.hintRestored && galleryInteraction.mobile?.optimizedSource),
      noObsoleteConsentSurface: !metric.privacyChoiceExists,
    };
    const screenshots = [];
    for (const selector of [".chapter-allocation", ".chapter-gallery", ".chapter-sizing", ".chapter-care"]) {
      const y = await evaluate(`(() => { const r = document.querySelector('${selector}').getBoundingClientRect(); return Math.round(r.top + scrollY + 8); })()`);
      await evaluate(`window.scrollTo({ top: ${y}, behavior: 'instant' }); new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))`);
      const screen = await cdp("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
      const file = `${viewport.name}-${selector.slice(1)}.png`;
      await writeFile(`${outDir}/${file}`, Buffer.from(screen.data, "base64"));
      screenshots.push(file);
      if (compact && selector === ".chapter-gallery") {
        await evaluate(`document.querySelector('.gallery-info-toggle')?.click(); new Promise((resolve) => setTimeout(resolve, 240))`);
        const infoScreen = await cdp("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
        const infoFile = `${viewport.name}-chapter-gallery-info.png`;
        await writeFile(`${outDir}/${infoFile}`, Buffer.from(infoScreen.data, "base64"));
        screenshots.push(infoFile);
        await evaluate(`document.querySelector('.gallery-info-toggle')?.click(); new Promise((resolve) => setTimeout(resolve, 240))`);
      }
    }
    findings.push({ viewport, metric, sizingInteraction, galleryInteraction, checks, passed: Object.values(checks).every(Boolean), screenshots });
  }
  await writeFile(`${outDir}/results.json`, JSON.stringify(findings, null, 2));
  console.log(JSON.stringify(findings, null, 2));
  const failures = findings.flatMap((result) => Object.entries(result.checks).filter(([, value]) => !value).map(([check]) => `${result.viewport.name}: ${check}`));
  if (failures.length) throw new Error(`Layout regression checks failed:\n${failures.join("\n")}`);
  socket.close();
} finally {
  chrome.kill("SIGTERM");
}
