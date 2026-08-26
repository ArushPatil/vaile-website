# VAILE Audit Reconciliation — Working Notes

## Visual checks completed

| Viewport | Current observations |
|---|---|
| 1440 × 900 | The page presents as a continuous scroll rather than sticky stacked chapters. The header remains isolated from section text in the captured view. The care, lookbook, size, allocation, and closing sections all render. The closing request control is centered and spans the content width. |
| 390 × 844 | The layout stays within the viewport with no visible horizontal overflow. Dedicated lookbook controls are available, the sizing cards stack legibly, and the care section reflows. The compact header and sub-12px editorial labels remain visually small. |

## Initial audit implications

The screenshots provide evidence that the prior stacked-chapter issue is no longer visible and that the desktop/mobile layouts are now structurally responsive. They do not by themselves verify routing, SEO, headers, source-level accessibility, media byte size, or deployed-host configuration; those items require source and runtime inspection.

## Source and runtime findings

| Area | Current finding |
|---|---|
| Metadata and no-JS fallback | The viewport no longer blocks zoom. Canonical, Open Graph, Twitter card, favicon, Apple touch icon, hero preloads, Organization JSON-LD, a skip-link element, and a `noscript` message now exist. |
| Routing and errors | The app defines `/`, `/privacy`, `/terms`, and a fallback Not Found route. The error boundary no longer renders an error stack. Static redirect rules explicitly return 404 for missing image paths before the SPA fallback. |
| Crawl configuration | `robots.txt` and the sitemap use `vaile-website.pages.dev`; the sitemap contains only `/`, `/privacy`, and `/terms`. |
| Media | The active source uses WebP gallery files, but the served public directory still contains many 0.34–1.0 MB JPEGs and duplicate/unreferenced image variants. Asset cleanup and responsive derivatives remain unverified. |
| Lookbook | Dedicated controls work and direct-selection stress tests settle cleanly. Pointer events on the figure are disabled, making controls authoritative. The source still contains a drag handler, but it is functionally inert; this is a code-cleanup, not current interaction, concern. |

## Additional viewport checks

| Viewport | Current observations |
|---|---|
| 1920 × 900 | The page uses the available width without the prior right-drifting closing CTA. The care section remains legible as a structured field, but small monospace labels are still intentionally tiny. The hero retains the same headless, full-bleed fashion crop. |
| 375 × 812 | No horizontal overflow was visible. The lookbook uses dedicated arrow controls and retains an image-first mobile treatment. Several utility labels, the header conversion link, and hero eyebrow/CTA remain materially smaller than 12px. |

## Visual evidence summary

Four full-page captures were taken at 1440×900, 1920×900, 390×844, and 375×812. They substantiate the layout-specific classifications in the final reconciliation but cannot independently validate CDN headers, production host behaviour, or conversion metrics.

## Live interaction measurements

At the active 1280×1100 preview, there is no horizontal overflow (`scrollWidth` equals `clientWidth`). The fixed header measures 64px. The hamburger, header conversion link, hero CTA, and desktop gallery controls measure at least 44px in height; the gallery controls are 157×48px. Each major section has a 112px `scroll-margin-top`, so the prior anchor-under-header finding is resolved. The skip-link target `#main` is absent from the rendered page, leaving the skip link itself non-functional.

## Post-implementation verification note

The revised copy and accessibility scale are present in the current preview, and unsupported low-stock language is gone. However, the first optimized-media pass exposed an implementation fault: managed `/manus-storage/` hero and lookbook URLs render as blank areas in the development preview. This must be corrected before final verification; the source photography has been retained in the external static-asset workspace for recovery.

The local preview bridge is now active: the same managed-storage URLs resolve to optimized media from the external asset workspace during development, and the hero image is visible again after the server restart. Production retains the durable managed-storage URLs rather than bundling the campaign photography into the project.

## Priority implementation verification

| Viewport | Verified result |
|---|---|
| 1440 × 900 | Responsive hero and lookbook images load; the stock-neutral size selector, clear enquiry copy, readable labels, consolidated care guidance, and full-width closing enquiry control all render without overlap. |
| 390 × 844 | Responsive images load; mobile header, hero CTA, lookbook controls, sizing controls, and utility labels are visibly larger and remain within the viewport. The previous low-stock label and scarcity claims are absent. |

The production build succeeds. Its `dist` output contains only the three small local brand icons, a standalone `404.html`, explicit static redirect rules, and managed-storage references for campaign media. The build still reports a 666KB pre-gzip JavaScript chunk warning; that bundle-splitting concern is separate from the prioritized image-delivery work completed here.

The terms route now uses the same `#main` target as the storefront, and its rendered page contains the new enquiry language without the former `FIELD ARCHIVE` footer wording.

## Heading restoration verification

The original storefront headings are restored in the live desktop view: “One run. Fifty pairs.”, “FIELD EVIDENCE / SIX VIEWS”, “Engineered dimensions.”, “Keep the wear. Skip the damage.”, and “Choose a waist. Start the note.” The routing, media, accessibility, stock-neutral sizing, and simplified body copy remain intact.

## Specification validation

The live storefront retains selected size `34` after switching to centimetres, and its keyboard-focusable lookbook advances from frame 01 to frame 02 with `ArrowRight`. The active tab updates correctly and the second product image renders.

The mobile navigation trigger exposes `aria-expanded="true"` when open; its panel is a modal dialog and both the document and body scroll containers are locked.

Following the drawer’s Product link closes the panel, restores the allocation anchor, and returns normal scrolling. The copy-enquiry control writes successfully in the live secure context, displays both a toast and the required `COPIED TO CLIPBOARD ✓` inline confirmation.

Full-page checks at 390px and 768px confirm that the expanded touch targets, button-only lookbook controls, product sizing controls, and closing enquiry panel remain within their responsive grids without horizontal overflow.

The 1440px full-page composition preserves the approved desktop layout. The desktop hero’s managed storage URL responds directly as a valid 1920×1280 WebP image; transient blank placeholders in full-page screenshot capture do not indicate a missing asset.

Live desktop inspection confirms that the hero and first lookbook image have completed loading at their expected 1920×1280 and 1200×1800 dimensions. No client-side interaction errors appeared during validation.

## Final specification validation

The nested storefront TypeScript check now passes. The type correction explicitly stores browser timer identifiers as numeric values, resolving the conflict exposed when the declared Node type definitions are installed for validation. The responsive regression suite also passes at 1440px, 1024px, 768px, 430px, 390px, and 360px when run against the managed preview server. Its care-section assertion was calibrated to the approved enlarged desktop rhythm, and its media assertion now verifies the managed storage path generically rather than relying on a retired asset filename pattern.

The final root production build succeeds and emits `dist/_headers`, `dist/_redirects`, and `dist/404.html`. Known application routes use the SPA shell, while unknown routes receive the standalone 404 response; this intentionally avoids a soft-404 catch-all. The generated HTML contains the revised title, canonical URL, Open Graph and Twitter fields, plus Product/Offer JSON-LD. The current social image URL points to managed storage and is functional in the managed preview, but it is not present in the external GitHub repository; this needs an externally durable asset before a GitHub/Cloudflare deployment can rely on that image tag.

In the live preview, the residual allocation body copy has been normalized to “Choose your size,” while the user-approved headings remain unchanged. The visible menu semantics, keyboard-focusable lookbook, and tab controls remain present after the final source change.

The live console contains no application error after the final update. The `/privacy` SPA route renders its full legal record, title, and return-to-storefront route correctly. The legal text retains placeholder contact and jurisdiction fields, which must be replaced with verified business details before public publication.

The `/terms` SPA route also renders its full legal record and return route correctly. The explicit `/404` SPA route presents the intended “Record not found.” screen. The static Cloudflare catch-all cannot be conclusively exercised through the Vite development server, but the final build includes the standalone `404.html` and redirect policy required to serve it for unknown production paths.

## Mobile lookbook swipe replacement

Mobile lookbook arrow buttons have been removed at the user’s request. The image frame now records a single-finger gesture, accepts a deliberate horizontal movement of at least 56px only when it is clearly more horizontal than vertical, and advances or reverses the image accordingly. Vertical page scrolling remains available through `touch-action: pan-y`; gestures that begin on interactive controls, short movements, diagonal drags, multi-touch inputs, and interactions while the detail sheet or a gallery transition is active are ignored.

The mobile composition retains a non-interactive `SWIPE ← →` cue, which conceals behind the detail sheet and restores when the sheet closes. Desktop previous/next controls and keyboard arrow-key navigation remain available. The TypeScript check, synthetic gesture test within the responsive suite across 360–1440px, 390px full-page screenshot, and production build all pass after this change.

## Approval-gated Task 1 — desktop lookbook stabilization

The gallery now commits an image change immediately rather than waiting on the network preload completion, while adjacent frames are decoded opportunistically in the background. This removes the former asynchronous gate that could leave direct image selection inactive until a later timeout. The desktop dossier’s fit/style record and previous/next controls are now absolutely anchored to fixed baselines within the green panel. Live desktop measurement at 1280px confirms that the controls remain visible at `bottom: 32px` and the detail record at `bottom: 78px` within the same 680px-tall panel, independent of the active image copy length. Type-check, responsive interaction suite, and production build pass; pending user approval before Task 2.

The first anchored implementation exposed an overlap with the gallery tab strip at some desktop capture positions. It has been corrected to a three-row desktop dossier grid: descriptive copy occupies the flexible first row, fit/style data the second row, and the control pair the fixed third row. Each button now centers its text independently while its chevron remains pinned to the outer edge, creating a balanced mirrored pair without content-driven movement.

Live desktop inspection confirms the dossier is a 680px grid panel, with the static fit/style row ending at 879px and the fixed-height control row occupying 891–939px above the panel’s 971px lower edge. The controls no longer overlap the tab strip or leave the dossier during direct image selection.

After the label-alignment correction, each navigation control uses a centered grid label with its chevron independently positioned at the outer edge. This avoids the earlier asymmetry created by `space-between` across unequal label widths while retaining a mirrored left/right visual treatment.

The final control-row correction adds an explicit single `minmax(0, 1fr)` dossier column and forces the control grid to span it. Live measurement confirms the control row now runs from 837px to 1151px, exactly matching the dossier’s padded inner bounds (expected 836px–1151px), eliminating the left-offset caused by the implicit content-sized grid column.

## Approval-gated Task 2 — CTA position and size-chart prompt

The clipboard feature has been removed from source and the new size-chart prompt correctly updates the URL to `#sizing`. Initial live desktop inspection exposed two remaining presentation defects that require correction before Task 2 can be presented: the loaded allocation card still reports a sticky computed position despite the current static rule, and the prompt’s title is too large for the compact card width. These are being resolved within Task 2; no subsequent task has begun.

Direct DOM inspection confirms the allocation card has no inline `position` style. The discrepancy therefore requires a fresh preview-style load rather than another inline or component-state workaround.

After the fresh preview load, the allocation card correctly computes to `position: static` with `top: auto`. The size-chart prompt is a compact 294px-wide, 56px-high two-line action, with a single-line 15px title and a dedicated 16px arrow column. This replaces the copy-enquiry interaction without collapsing the CTA hierarchy on desktop.

Following user feedback, the secondary action has been reduced to an inline `VIEW SIZE CHART` link on desktop and mobile. The main enquiry action is now visually unambiguous. Live inspection confirms the link is an inline text element with a restrained 1px underline and still navigates directly to `#sizing`.

## Approval-gated Task 3 — Desktop size-chart selection

Desktop size-chart rows are now keyboard-reachable and connect to the shared enquiry size state. Live interaction confirms selecting size 34 updates the selected row’s `aria-pressed` state and the WhatsApp URL to `Size: 34`. The selected visual treatment is not yet winning against a later row-style rule, so its lichen-green expanded rendering is being corrected before Task 3 is presented for approval.

After a fresh preview load, the initial size 32 row renders in the intended lichen-green enlarged state. Selecting size 34 updates the shared selected state and enquiry URL immediately; because the row palette and scale transition over 160ms, the final rendered palette is being verified after the transition completes rather than at the first animation frame.

The settled desktop selection has now been verified: size 34 is rendered in lichen green (`rgb(38, 53, 45)`), carries the intended `scale(1.045)` enlargement and shadow, and remains `aria-pressed="true"`. Both the allocation and closing WhatsApp enquiry controls update to `SIZE 34` with the same selected size embedded in their URLs.

## Approval-gated Task 4 — Mobile size-chart recomposition

The mobile size chart now uses an 84px two-row tile: the size number and its waist reference occupy a compact left rail, while rise, thigh, knee, hem, and inseam sit in a balanced 3×2 measurement grid. The selected tile uses the same lichen-green hierarchy and a restrained `scale(1.018)` emphasis. The final size tile uses the same two-row geometry as every preceding tile rather than expanding vertically. The enhanced responsive suite verifies these mobile constraints and confirms selecting size 34 updates `aria-pressed`, the visible allocation enquiry label, and its WhatsApp URL across all tested viewports.

In response to user feedback that the first compact arrangement was too dense, the mobile tile has been refined into a 100px two-band matrix with a 78px size/waist rail. The first band has three evenly weighted measurement cells (rise, thigh, knee); the second has two deliberately wide cells (hem, inseam). This preserves the requested two-row final tile while creating clearer grouping and quieter negative space. The responsive suite, type-check, and production build pass after the refinement.

## Approval-gated Task 5 — Care-guide stamp redesign

The care guide no longer uses the unbalanced green-and-white outline card. It is now a parchment material card set into a 12-column care ledger with a controlled oxide vertical signal band, a rotated `CARE / 04` label, oversized two-line material specification, and a separated care protocol line. The surrounding lichen care chapter, light typography, and instruction ledger remain intact, so the new warm oxide acts as a restrained material marker rather than a competing brand color. Desktop and 390px mobile captures confirm the stamp is proportionate, legible, and retains the intended section rhythm. Type-check, responsive suite, and production build pass.

## Approval-gated Task 6 — Mobile closing CTA wrap

The closing title now has explicit line control below 768px. It renders as “Choose a size.”, “Request”, and “an allocation.” on separate lines at 390px, using a modestly reduced mobile display scale. At 768px and above, the original two-line heading composition remains: the first phrase on its own line and “Request an allocation.” together on the second. The full 390px storefront capture verifies the requested mobile wrap alongside the completed CTA, sizing, and care refinements.

## Desktop waist restoration

The shared sizing markup now restores the approved desktop placement: each desktop row shows the primary size in the first column with `WAIST` and its value directly beneath it, followed by rise, thigh, knee, hem, and inseam. The duplicate waist measurement is hidden at 768px and above. Below that breakpoint, the header’s waist label is hidden and waist remains the first field in the compact two-band mobile measurement grid. Fresh 1440px and 390px screenshots verify the divergent breakpoint behavior. Type-check, responsive suite, and production build pass.
