import { spawn } from "node:child_process";

const baseUrl = process.env.EDITORIAL_TEST_URL ?? "http://127.0.0.1:3001";
const port = 9556;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const checks = [];
const chrome = spawn("chromium", ["--headless=new", `--remote-debugging-port=${port}`, "--no-sandbox", "--disable-gpu", "--hide-scrollbars", "about:blank"], { stdio: "ignore" });
try {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try { await fetch(`http://127.0.0.1:${port}/json/version`); break; } catch { await sleep(100); }
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
  for (const page of [
    { path: "/about", title: "About VAILE", required: ["one good pair", "WORKING PRINCIPLES", "STUDIO TIMELINE"] },
    { path: "/deep-dive", title: "Deep Dive", required: ["12 oz duck canvas", "MOTORCYCLE RIDERS", "MUSICIANS", "SKATERS", "STREETWEAR", "WORKWEAR"] },
  ]) {
    for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
      await cdp("Emulation.setDeviceMetricsOverride", { width: viewport.width, height: viewport.height, deviceScaleFactor: 1, mobile: viewport.width < 768, screenWidth: viewport.width, screenHeight: viewport.height });
      await cdp("Page.navigate", { url: `${baseUrl}${page.path}` });
      await sleep(600);
      const result = await evaluate(`(() => {
        const text = document.body.innerText.toLowerCase();
        const menu = document.querySelector('.header-menu');
        menu?.click();
        return new Promise((resolve) => setTimeout(() => resolve({
          title: document.title,
          hasRequired: ${JSON.stringify(page.required)}.every((item) => text.includes(item.toLowerCase())),
          hasImages: document.querySelectorAll('img').length >= 3 && [...document.images].every((img) => img.complete && img.naturalWidth > 0),
          menuLinks: ['/about', '/deep-dive'].every((href) => [...document.querySelectorAll('#editorial-menu a')].some((link) => link.getAttribute('href') === href)),
          noOverflow: document.documentElement.scrollWidth <= innerWidth,
          menuVisible: Boolean(document.querySelector('#editorial-menu')),
        }), 280));
      })()`);
      const pageLabel = `${page.path} @ ${viewport.width}px`;
      checks.push({ page: pageLabel, pass: result.title.includes(page.title) && result.hasRequired && result.hasImages && result.menuLinks && result.noOverflow && result.menuVisible, result });
    }
  }
  console.log(JSON.stringify(checks, null, 2));
  if (checks.some((item) => !item.pass)) throw new Error("Editorial page smoke checks failed");
} finally {
  chrome.kill("SIGTERM");
}
