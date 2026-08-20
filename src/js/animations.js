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



  // Liquid Acquire Card entrance
  const acquireCard = document.querySelector('.acquire__card');
  if (acquireCard) {
    gsap.from(acquireCard, {
      opacity: 0,
      y: 28,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: acquireCard,
        start: 'top 85%',
        once: true,
      },
    });
  }

  // Manifesto Bento Liquid Cards reveal
  const manifesto = document.querySelector('.manifesto');
  if (manifesto) {
    gsap.from('.manifesto__card', {
      opacity: 0,
      y: 24,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: manifesto,
        start: 'top 85%',
        once: true,
      },
    });
  }

  // Dispatch Liquid Card reveal
  const dispatchCard = document.querySelector('.dispatch__card');
  if (dispatchCard) {
    gsap.from(dispatchCard, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: dispatchCard,
        start: 'top 88%',
        once: true,
      },
    });
  }
}
