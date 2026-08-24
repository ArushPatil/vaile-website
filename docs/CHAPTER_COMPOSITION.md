# VAILE Chapter Composition Overhaul

## Design intent

The Field Manual aesthetic remains unchanged, but the page now progresses as linked workwear chapters instead of a presentation of interchangeable split panels. The desktop stack is retained only where it has enough room to act as a sequence of editorial sheets. Tablet and phone layouts use normal document flow, with each chapter changing density, image treatment, and reading order.

## Verified visual evidence

The first desktop review confirms that the lookbook uses a full evidence band: a wide image field is anchored by a numbered record header, a single caption rail, and index controls rather than a generic image-and-text card. The first 390 px review confirms a different mobile rhythm: utility header, compact record header, full-width image, then caption field. The section no longer collapses into consecutive heading/list blocks.

The mobile fit review identified and corrected one compact-only alignment issue: the desktop ledger marker competed with the fit reference on the same top line. The marker is now desktop-only; on phone widths the chapter begins with a single clear fit reference, moves through the measurement ledger, and then opens into the silhouette image before the next chapter begins.

The desktop care review also prompted a final pacing correction. Its material log, care ledger, and closing stamp now occupy the sheet’s full vertical field, maintaining the intended calm conclusion without leaving the content stranded in a sparse presentation-style block.

## Responsive validation contract

The retained `pnpm test:layout` command now validates the chapter system across 1440, 1024, 768, 430, 390, and 360 px viewports. It requires desktop sheets to remain sticky and every tablet/phone sheet to remain in normal flow. It also verifies zero horizontal overflow, in-flow privacy choice placement, readable gallery/cut/fit/build images, a one-column mobile gallery, and the enlarged header mark’s zero-border, zero-padding treatment.

Both Cloudflare bundles passed the chapter regression matrix, TypeScript validation, production build, source-parity comparison, and whitespace check. The latest compact measurements recorded a 360 px document width at the 360 px viewport, 360 px gallery media, 328 px cut media, 360 px fit media, 328 px construction media, and a 31 px unboxed mark. This verifies that the revised chapter flow remains stable at the smallest target width without relying on sticky behavior.

## Required preservation

The implementation preserves the lichen-green Field Manual palette, Archivo hierarchy, verified ₹6,200 INR / $100 USD price, private WhatsApp allocation interaction, sizing controls, legal links, image alt text, and desktop-only sticky stack. It removes the white box around the black VAILE mark and enlarges that mark proportionally.
