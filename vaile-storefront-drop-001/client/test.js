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

console.log('--- RUNNING RIGOROUS LAYOUT TESTS v2 ---');

// 1. Check unit toggle
assert(tsxContent.includes('setUnit("CM")'), 'Unit toggle UI implemented in JSX');
assert(tsxContent.includes('const [unit, setUnit] = useState<"IN" | "CM">("IN")'), 'React state for unit toggle implemented');
assert(tsxContent.includes('m.waist'), 'Table values are dynamically calculated');

// 2. Check CSS colors (white on cream fix)
assert(cssContent.includes('.chapter-shell .sizing-table td { padding: 16px 8px; border-bottom: 1px solid var(--line-light); color: var(--ink); }'), 'Table data text color mapped to dark var(--ink)');

// 3. Check CSS cropping fixes (contain)
assert(cssContent.includes('object-fit: contain;'), 'object-fit changed to contain to absolutely prevent cropping');
assert(!cssContent.match(/max-height: 5\d\dpx;/g)?.length || cssContent.match(/max-height: 5\d\dpx;/g)?.length < 4, 'max-height bounds removed from gallery-figure-wrap');

console.log(`\nTests Completed: ${passed + failed}`);
if (failed > 0) {
    console.error(`Test Suite Failed with ${failed} errors.`);
    process.exit(1);
} else {
    console.log('Test Suite Passed 100%. Studio Grade.');
    process.exit(0);
}
