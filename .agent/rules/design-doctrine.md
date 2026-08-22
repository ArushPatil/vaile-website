# Human Design Doctrine & Luxury Atelier Visual Guidelines

## Scope & Philosophy
Apply this design doctrine to all UI, CSS, HTML, SVG illustrations, and typography across VAILE. These rules reflect decades of proven human design systems (Swiss International Typographic Style, Dieter Rams' functionalism, and modern luxury editorial houses: Acne Studios, Maison Margiela, Rick Owens, Kiko Kostadinov).

---

## 1. Grid & Mathematical Proportion (Josef Müller-Brockmann)
- **Base-8 & Base-4 Spacing Scale**: All padding, margins, line heights, and gaps MUST be mathematical multiples of 4px or 8px:
  `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`, `128px`.
  *Never use arbitrary values like `17px`, `23px`, or `37px`.*
- **16-Column Editorial Grid**: Layouts align strictly to vertical grid tracks with zero optical drift.
- **Asymmetric Balance**: Create tension using purposeful whitespace, oversized single numbers, and clean hairline dividers rather than filling every corner with cards.

---

## 2. Typographic Restraint & Hierarchy (Massimo Vignelli)
- **Strict 2-Family Rule**:
  1. Primary: Geometric sans-serif (`Inter`, `-apple-system`, `sans-serif`).
  2. Monospace: Clean technical monospace (`'IBM Plex Mono'`, `monospace`).
  *Never introduce script, novelty, or extra decorative fonts.*
- **Display Headlines**: Large editorial type (`clamp(2rem, 5vw, 4.5rem)`) MUST use tight negative letter-spacing (`-0.03em` to `-0.05em`) and line-heights between `0.95` and `1.15`.
- **Micro-Copy & Metadata**: All tags, specifications, matrix headers, and run counters MUST be uppercase with open tracking (`letter-spacing: 0.06em` to `0.12em`), small size (`10px`–`11px`), and medium font-weight (`500`–`600`).
- **Body Copy**: Set between `13px` and `15px` with relaxed leading (`1.6` to `1.8`) in muted secondary tones (`#888896` to `#a4a4b2`) for effortless reading against deep backgrounds.

---

## 3. Color Discipline & Optical Contrast
- **Monochrome Dominance (90/10 Rule)**:
  - Backgrounds: Obsidian matte black (`#08080a`), deep charcoal card backgrounds (`#0b0b0f`, `#111116`).
  - Hairline Boundaries: `1px solid #16161f` or `1px solid rgba(255, 255, 255, 0.08)`.
  - Foreground: Pure crisp white (`#ffffff`) for active states/titles, muted slate (`#7a7a88`, `#9292a0`) for specs/labels.
- **Zero AI-Slop Color Aesthetics**:
  - ❌ NEVER use purple/violet/cyan radial mesh gradients.
  - ❌ NEVER use glowing neon outline borders or saturated drop shadows.
  - ❌ NEVER use generic glassmorphism blur over colorful backgrounds.

---

## 4. Real Garment Geometry (No Imagined Vectors)
- All technical line drawings, silhouettes, pattern drafts, and SVGs MUST represent authentic pattern-making geometry and true photographic references:
  - Wide straight leg blocks MUST show clean vertical falls with zero artificial taper.
  - Seams (thigh carpenter panels, outseam tool pockets, bar-tacks) must match the real garment.
  - Line weights in SVGs: Primary outlines `1.8px`–`2.0px`, interior construction lines `1.2px`–`1.5px`, tension/stitch markings `1.0px dashed`.

---

## 5. High Data-Ink Ratio (Edward Tufte)
- Present technical information in Swiss-style matrices, archival tables, and clean hairline ledgers.
- Keep UI controls minimalist: Stark high-contrast buttons (`#ffffff` background with `#000000` text on hover/active), flat tabs, and hairline unit toggles (`INCHES` / `CENTIMETERS`).

---

## 6. Interaction & Mobile Ergonomics
- **48px Minimum Touch Targets**: Buttons, pills, and interactive table switches must maintain at least 44px–48px hit areas for mobile fingers.
- **Universal Event Delegation**: Interactive controls must attach via both direct and document-level listeners to prevent race conditions during hydration.
- **Zero Layout Shift (CLS)**: Always declare aspect ratios (`aspect-ratio: 16/9`, `2/3`) and image dimensions.
