# Vaile Storefront — Drop 001

This directory is a **standalone versioned storefront bundle** added without changing the existing website files in this repository.

## Run locally

From this directory, install dependencies with `pnpm install`, then run `pnpm dev`. Use `pnpm check` to validate types and `pnpm build` for a production build.

## Campaign archive carousel

The campaign index is intentionally designed as an unexposed contact-sheet archive. When final campaign or studio images are ready, replace the entries in `campaignSlots` in `client/src/pages/Home.tsx` with the approved assets while keeping the edition data and archive captions.

## Cloudflare Pages image assets

This Cloudflare Pages deployment already serves its working campaign image set from the repository root at `public/images/`. The bundle therefore uses those established `/images/...` paths rather than managed build-environment URLs or a second asset directory.

When final photography is ready, replace the corresponding files in the repository root’s `public/images/` directory while preserving the established filenames, or update the `assets` map in `client/src/pages/Home.tsx`.
