# VAILE Responsive Layout Overhaul

**Scope:** Desktop-only editorial stacking, normal-flow mobile presentation, product-image framing, geometric overflow protection, privacy-choice placement, and verified product facts.

## What changed

The Field Manual design system remains intact: lichen-green surfaces, Archivo-led headings, record-style allocation controls, product proof, and the private WhatsApp allocation model are unchanged. The implementation now separates the desktop editorial interaction from the mobile reading experience instead of attempting to make one sticky mechanism serve every device.

| Area | Desktop, 901 px and above | Tablet and phone, 900 px and below |
|---|---|---|
| Editorial sheets | The six product sheets use the reversible sticky stack. | Every product section is normal document flow; no sticky sheet remains. |
| Proof/build composition | Balanced two-column composition with fixed editorial image ratios. | Real one-column inner grids, with full-width proof and construction images below or above their related copy. |
| Header | Fixed Field Manual record header. | Compact fixed header; the menu wordmark and allocation record scale down without forcing lateral overflow. |
| Privacy choice | In document flow after the storefront rather than over active product content. | The same in-flow choice pattern, with stacked actions and normal page scrolling. |

## Product-fact correction

The unsupported claims `Tax incl.`, `ALL TAXES INCLUDED`, and `Worldwide tracked delivery` were removed. The storefront now states only the verified price, **₹6,200 INR / $100 USD**, and the established **Private WhatsApp allocation / 50 pairs** format. This restores consistency with the existing Terms, which leave tax, duty, shipping, and delivery confirmation open until allocation.

## Regression command

Each storefront bundle has a `test:layout` command:

```bash
pnpm test:layout
```

The command expects that bundle’s Vite development server to be running at `http://localhost:5173`. It checks the following across **1440, 1024, 768, 430, 390, and 360 px** viewports:

1. Desktop sheets are sticky, while every mobile/tablet sheet is normal flow.
2. The document’s scroll width equals the viewport width.
3. The privacy choice is not fixed over live content.
4. Proof and build images retain readable width.
5. Compact proof/build layouts resolve to a single column.

## Validated results

`pnpm check` and `pnpm build` passed in both Cloudflare bundles. The regression probe passed at all six target viewport sizes. The 360 px viewport reports a 360 px scroll width, proof media at 328 px width, build media at 328 px width, normal-flow mobile sections, and an in-flow privacy choice. The desktop probe confirms sticky ownership for every editorial stack item.

## Deliberate constraint

This work fixes layout, scale, position, image framing, and interaction geometry. It does not replace the approved Field Manual visual language or alter the product, price, sizing, WhatsApp number, carousel behavior, legal routes, or bundle-specific Cloudflare build output.
