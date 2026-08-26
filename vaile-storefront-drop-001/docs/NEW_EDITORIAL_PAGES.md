# VAILE Editorial Pages

The storefront now includes two fully routed editorial pages: `/about` and `/deep-dive`. Both pages use the existing VAILE visual system: Archivo display typography, DM Mono metadata labels, stock/pale paper surfaces, lichen green panels, oxide accents, numbered records, image-led composition, and the shared fixed header and footer.

## Page coverage

The About Us page presents the studio origin, working principles, a replaceable timeline, field imagery, and a link into the technical record. The Deep Dive page presents the Drop 001 material and construction ledger, pattern and movement notes, measurable fit cues, and audience-specific sections for motorcycle riders, musicians, skaters, streetwear, and workwear.

The text is intentionally organized in source-level content arrays and page sections so it can be edited without reworking the layout. Visible `PLACEHOLDER` notes identify the two areas where founder voice or finalized production-sheet details can be substituted later. Existing `/images/1.webp`, `/images/2.webp`, `/images/3.webp`, `/images/4.webp`, `/images/6.webp`, and `/images/9.webp` assets are reused as responsive-safe placeholder/editorial imagery.

## Navigation and indexing

The hamburger menu on the homepage now links to About Us and Deep Dive. The new shared editorial shell exposes the same routes in its drawer and footer, with Product / Home, Lookbook, Size guide, Terms, Privacy, and Concierge escape paths. The sitemap at `public/sitemap.xml` contains both new URLs. Each page updates its document title, description, and canonical URL on route mount.

## Verification

From `vaile-storefront-drop-001`, run `npm run check` for TypeScript verification, `npm run build` for the production bundle, `npm run test:layout` for the established multi-viewport homepage regression suite, and `npm run test:editorial` for route metadata, required-content, image-load, hamburger-link, and desktop/mobile overflow smoke checks. The layout test accepts both the repository’s local WebP mobile sources and uploaded storage-backed sources as valid optimized assets.
