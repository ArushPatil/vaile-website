# VAILE Swiss Grid System

## Purpose

This document replaces the previous unstructured chapter-layout approach. The storefront now uses a responsive Swiss-grid system to give every chapter a measured start, explicit columns, shared baseline rhythm, and a fixed-header-safe entry point. The objective is clarity: images, type, product facts, and allocation actions must be aligned as parts of one information system—not positioned as isolated presentation fragments.

## Grid contract

| Viewport range | Columns | Outer margin | Gutter | Flow behavior |
|---|---:|---:|---:|---|
| 1200 px and above | 12 | 72 px minimum, fluid to a 1296 px container | 24 px | Complete desktop sheets may stack |
| 768–1199 px | 8 | 32 px | 16 px | Normal document flow only |
| 480–767 px | 4 | 20 px | 12 px | Normal document flow only |
| 479 px and below | 4 | 16 px | 12 px | Normal document flow only |

The system uses a 4 px micro-unit, an 8 px baseline, and structural values limited to `8, 16, 24, 32, 48, 64, 96, 128` px. The fixed header measures 64 px on tablet/desktop and 56 px on phone. Every chapter begins below a header-safe offset of header height plus 32 px on phone or 48 px at tablet and above.

## Chapter spans

| Chapter | Large-screen span | Compact-flow rule |
|---|---|---|
| Allocation | Copy `1–7`; allocation record `9–12` | Facts then allocation record in the complete four-column field |
| Lookbook | Title `1–6`; controls `10–12`; image `1–8`; caption `9–12` | Header, image, caption, and index in a measured sequence |
| Cut | Type `1–4`; portrait `6–9`; quote `11–12` | Type, image, quote; each owns the four-column field |
| Fit | Ledger `2–8`; silhouette `10–12` | Ledger, then image, with no secondary marker collision |
| Build | Detail image `1–5`; construction record `7–12` | Construction record, then image |
| Care | Copy `1–5`; care ledger `7–10`; stamp `11–12` | Copy, ledger, stamp in one continuous sequence |

## Non-negotiable rules

The stylesheet must not use negative offsets, arbitrary transforms, or absolute positioning to repair a normal-flow layout problem. Evidence images must occupy named spans with their caption aligned to the same span. Sticky treatment begins only at 1200 px and applies to complete chapters; intermediate widths and all phones remain normal flow. The header-safe entry rule applies to anchor targets, headings, captions, controls, and images.

## Validation record

The prior chapter release was re-audited from screenshots and found to have heading/header collisions, inconsistent insets, image/copy misalignment, and non-systemic spacing. The Swiss-grid rebuild was then tested from fresh desktop, tablet, and phone renders at 1440, 1024, 768, 430, 390, and 360 px.

The retained `pnpm test:layout` command now verifies zero horizontal overflow, in-flow privacy choice placement, desktop-only sticky behavior from 1200 px, normal flow below that threshold, readable evidence media, unboxed logo geometry, expected 12/8/4 column counts, header-safe heading entries, and measured chapter padding. The command, TypeScript check, production build, source parity check, and whitespace check passed for both Cloudflare bundles.

## Research basis

Swiss/International Typographic Style is based on mathematical grid systems, sans-serif typography, objective photography, and asymmetric composition used to improve clear communication.[1] Müller-Brockmann’s reference work treats the grid as a flexible framework and documents systems from 8 to 32 fields.[2] The responsive translation used here follows the same principle: every section answers to a shared structure, while compact screens use a defined spacing scale and type hierarchy rather than a scaled-down print poster.[3]

## References

[1] [Poster House, *The Swiss Grid*](https://swissgrid.posterhouse.org/)

[2] [Niggli / Draw Down, *Grid Systems in Graphic Design*](https://draw-down.com/products/grid-systems-in-graphic-design)

[3] [Swiss Themes, *Swiss Design Principles for Web Designers*](https://swissthemes.design/insights/swiss-design-for-web-designers)
