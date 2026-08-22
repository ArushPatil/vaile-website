# Vaile Storefront — Drop 001

This directory is a **standalone versioned storefront bundle** added without changing the existing website files in this repository.

## Run locally

From this directory, install dependencies with `pnpm install`, then run `pnpm dev`. Use `pnpm check` to validate types and `pnpm build` for a production build.

## Campaign archive carousel

The campaign index is intentionally designed as an unexposed contact-sheet archive. When final campaign or studio images are ready, replace the entries in `campaignSlots` in `client/src/pages/Home.tsx` with the approved assets while keeping the edition data and archive captions.

## Cloudflare Pages image assets

The bundle now carries optimized portable images in `client/public/images/`, so Cloudflare Pages serves them from `/images/...` with no reliance on the build environment’s managed asset paths.

When final photography is ready, replace the matching files in `client/public/images/` while preserving the filenames, or update the `assets` map in `client/src/pages/Home.tsx`. The expected files are `hero.webp`, `look-one.webp`, `look-two.webp`, `close-one.webp`, `close-two.webp`, `hardware.webp`, `grain.webp`, `paper.webp`, and `vaile-logo.png`.
