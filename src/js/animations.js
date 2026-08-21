/* ================================================================
   VAILE — GSAP Animations
   Mobile-Optimized Parallax & Hardware-Accelerated Scroll Locks
   ================================================================ */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  requestAnimationFrame(() => {
    initPageLoad();
    initScrollEffects();
  });
}

// ----------------------------------------------------------------
// PAGE LOAD CHOREOGRAPHY
// ----------------------------------------------------------------
function initPageLoad() {
  const tl = gsap.timeline({
    defaults: {
      ease: 'power3.out',
    },
  });

  // Nav drops down
  tl.from('.nav', {
    y: '-100%',
    duration: 0.6,
    ease: 'power2.out',
  });

  // Masthead enters purely centered with zero positional movement
  tl.from(
    '.masthead__text',
    {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    },
    '-=0.2'
  );
}

// ----------------------------------------------------------------
// SCROLL EFFECTS & RESPONSIVE MULTI-LAYER PARALLAX
// ----------------------------------------------------------------
function initScrollEffects() {
  // Editorial Stream Tiles Parallax
  const allTiles = document.querySelectorAll('.editorial-stream .tile');

  // MatchMedia for Desktop vs Mobile Performance Tuning
  ScrollTrigger.matchMedia({
    // Desktop (>= 768px): Full 8% parallax with smooth inertia scrub
    '(min-width: 768px)': function () {
      allTiles.forEach((tile) => {
        const img = tile.querySelector('.tile__image');
        if (!img) return;

        gsap.fromTo(
          img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: tile,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        );
      });
    },

    // Mobile (< 768px): Lightweight 4% parallax for high-framerate touch response
    '(max-width: 767px)': function () {
      allTiles.forEach((tile) => {
        const img = tile.querySelector('.tile__image');
        if (!img) return;

        gsap.fromTo(
          img,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: tile,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.3,
            },
          }
        );
      });
    },
  });
}
