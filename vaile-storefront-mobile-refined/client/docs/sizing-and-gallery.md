# Studio-Grade Redesign: Sizing & Gallery Insights

## Architecture Changes
This document outlines the structural and aesthetic changes applied to achieve a production-ready, Swiss-design compliant UI.

### 1. Gallery Insights Engine
- **Dynamically Updating Captions**: The `<motion.figure>` wrapper now iterates through a `shots` array augmented with an `insight` field. 
- **Elimination of Redundancy**: Information previously isolated in the "Fit" and "Build" sections has been injected directly into the Lookbook. This achieves a higher Data-Ink ratio, displaying relevant fit and construction details exactly when the user is viewing the corresponding product angle.

### 2. Precision Sizing Chart (Chapter 02)
- Replaced the heavily right-aligned "Fit Silhouette" section with a perfectly balanced, symmetrical 12-column Grid ledger.
- **Hairline Boundaries**: Styled with `1px solid rgba(255, 255, 255, 0.06)` to adhere to the Atelier visual guidelines (zero AI-slop colors).
- **Scale**: Measurements enforce standard Swiss typographic scales (`11px` table data, `9px` headers with `0.12em` tracking).

### 3. Aspect Ratio & Cropping Fix
- Removed naive `max-height` constraints that were causing panoramic cropping on desktop monitors.
- Restored `aspect-ratio: 4 / 5` to ensure the trousers (the actual product) are always visible across all viewports. 
- Implemented `<div className="gallery-figure-wrap">` to stabilize the grid during `<AnimatePresence mode="wait">` transitions, eliminating all horizontal layout jitter.

### 4. Touch Targets
- Mobile pagination pills (`.gallery-pills button`) strictly enforce a `48px` minimum height, satisfying Rule 6 of the Design Doctrine for mobile ergonomics.
