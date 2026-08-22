# Vaile Storefront — Drop 001

This directory is a **standalone versioned storefront bundle** added without changing the existing website files in this repository.

## Run locally

From this directory, install dependencies with `pnpm install`, then run `pnpm dev`. Use `pnpm check` to validate types and `pnpm build` for a production build.

## Campaign archive carousel

The campaign index is intentionally designed as an unexposed contact-sheet archive. When final campaign or studio images are ready, replace the entries in `campaignSlots` in `client/src/pages/Home.tsx` with the approved assets while keeping the edition data and archive captions.

## Hosted image references

The current source uses managed image URLs from the existing Vaile build environment. For an external deployment, replace those URLs with assets hosted by your chosen CDN or repository-compatible image source.
