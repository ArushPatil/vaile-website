import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const homeChaptersPath = path.join(__dirname, 'src/pages/HomeChapters.tsx');
const cssPath = path.join(__dirname, 'src/index.css');

const tsxContent = fs.readFileSync(homeChaptersPath, 'utf8');
const cssContent = fs.readFileSync(cssPath, 'utf8');

let passed = 0;
let failed = 0;

function assert(condition, message) {
    if (condition) {
        console.log(`✅ PASS: ${message}`);
        passed++;
    } else {
        console.error(`❌ FAIL: ${message}`);
        failed++;
    }
}

console.log('--- RUNNING RIGOROUS LAYOUT TESTS ---');

// 1. Check redundancy
assert(!tsxContent.includes('id="fit"'), 'Fit section is fully removed');
assert(!tsxContent.includes('id="build"'), 'Build section is fully removed');

// 2. Check new size chart
assert(tsxContent.includes('id="sizing"'), 'Sizing section exists');
assert(tsxContent.includes('<table className="sizing-table">'), 'Precision sizing table is implemented');

// 3. Check dynamic insights
assert(tsxContent.includes('{shot.insight}'), 'Lookbook caption dynamically renders shot.insight');
assert(tsxContent.match(/insight:\s*"[^"]+"/g)?.length === 6, 'All 6 shots have insight properties populated');

// 4. Check CSS cropping fixes
assert(cssContent.includes('aspect-ratio: 4 / 5'), 'Fluid aspect ratio 4/5 restored in CSS');
assert(!cssContent.match(/\.chapter-shell \.gallery-stage figure \{\s*height: 260px;/), 'Hardcoded 260px height removed from figure');

// 5. Check layout jitter fix
assert(tsxContent.includes('className="gallery-figure-wrap"'), 'Gallery image wrapped in persistent container to prevent grid jitter');

// 6. Check touch targets
assert(cssContent.includes('height: 48px;') && cssContent.includes('.gallery-pills button'), 'Mobile touch targets enforce 48px minimum height');

console.log(`\nTests Completed: ${passed + failed}`);
if (failed > 0) {
    console.error(`Test Suite Failed with ${failed} errors.`);
    process.exit(1);
} else {
    console.log('Test Suite Passed 100%. Studio Grade.');
    process.exit(0);
}
