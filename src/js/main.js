/* ================================================================
   VAILE — Main JavaScript
   Menu toggle, size selector, scroller, newsletter, and modules
   ================================================================ */

import { initAnimations } from './animations.js';
import { initMoltenMetal } from './moltenMetal.js';

// ----------------------------------------------------------------
// DOM Ready
// ----------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initSizeSelector();
  initLiquidGlassCards();
  initScrollerControls();
  initNewsletterForm();
  initAnimations();

  // Initialize MoltenMetal WebGL Procedural Shader (React Bits)
  const moltenCanvas = document.getElementById('molten-metal-canvas');
  if (moltenCanvas) {
    initMoltenMetal(moltenCanvas, {
      color1: '#9085b9',
      color2: '#2a1145',
      color3: '#FFFFFF',
      colorMode: 'molten',
      speed: 0.35,
      scale: 4,
      detail: 3,
      glow: 1.6,
      coreSize: 0.1,
      swirl: 1,
      fold: -0.2,
      blackPoint: 0.05,
      brightness: 1.3,
      opacity: 1,
      grain: true,
      grainIntensity: 0.05,
      mouseInteraction: false,
      mouseStrength: 0.3,
    });
  }
});

// ----------------------------------------------------------------
// iOS Liquid Glass 3D Tilt & Specular Reflection
// ----------------------------------------------------------------
function initLiquidGlassCards() {
  const cards = document.querySelectorAll('[data-liquid-card]');

  // Interactive 3D glass perspective & specular lens flare
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate realistic glass micro-tilt (-4deg to +4deg)
      const tiltX = ((y - centerY) / centerY) * -3.5;
      const tiltY = ((x - centerX) / centerX) * 3.5;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      card.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    });
  });
}

// ----------------------------------------------------------------
// Mobile Menu Toggle
// ----------------------------------------------------------------
function initMobileMenu() {
  const body = document.body;
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const menuClose = document.querySelector('[data-menu-close]');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!menuToggle || !menuClose || !mobileMenu) return;

  menuToggle.addEventListener('click', () => {
    body.classList.add('state--menu-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuClose.focus();
  });

  menuClose.addEventListener('click', closeMenu);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && body.classList.contains('state--menu-open')) {
      closeMenu();
    }
  });

  // Close when clicking menu links
  mobileMenu.querySelectorAll('.mobile-menu__link').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  function closeMenu() {
    body.classList.remove('state--menu-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.focus();
  }
}

// ----------------------------------------------------------------
// Size Selector & Allocation Link Setup
// ----------------------------------------------------------------
const WHATSAPP_PHONE = '918951066881';

function initSizeSelector() {
  const sizeButtons = document.querySelectorAll('.acquire__size-pill, .allocation__size-btn');
  const sizeLabel = document.getElementById('selected-size-label');
  const allocationBtn = document.getElementById('allocation-btn');

  if (!sizeButtons.length || !allocationBtn) return;

  sizeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Remove active from all
      sizeButtons.forEach((b) => b.classList.remove('active'));
      
      // Activate clicked
      btn.classList.add('active');

      const size = btn.getAttribute('data-size');
      if (sizeLabel) {
        sizeLabel.textContent = size;
      }

      // Update WhatsApp URL with pre-filled size and direct phone destination
      const message = encodeURIComponent(
        `Hello VAILE, I would like to request an allocation for Edition 01 Pant in Size ${size}.`
      );
      allocationBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${message}`;
    });
  });
}



// ----------------------------------------------------------------
// Services Scroller Arrow Controls
// ----------------------------------------------------------------
function initScrollerControls() {
  const track = document.querySelector('[data-scroller-track]');
  const prevBtn = document.querySelector('[data-scroll-prev]');
  const nextBtn = document.querySelector('[data-scroll-next]');

  if (!track || !prevBtn || !nextBtn) return;

  const getScrollAmount = () => {
    const item = track.querySelector('.services-scroller__item');
    if (!item) return 300;
    return item.offsetWidth + parseInt(getComputedStyle(track).gap || '16');
  };

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  });

  const updateArrows = () => {
    const isAtStart = track.scrollLeft <= 10;
    const isAtEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 10;

    prevBtn.style.opacity = isAtStart ? '0' : '1';
    prevBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';
    nextBtn.style.opacity = isAtEnd ? '0' : '1';
    nextBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
  };

  track.addEventListener('scroll', updateArrows, { passive: true });
  updateArrows();

  window.addEventListener('resize', updateArrows, { passive: true });
}

// ----------------------------------------------------------------
// Newsletter Form — Floating Label
// ----------------------------------------------------------------
function initNewsletterForm() {
  const input = document.querySelector('.newsletter__input');
  if (!input) return;

  const field = input.closest('.newsletter__field');
  if (!field) return;

  const updateState = () => {
    if (input.value.trim() !== '') {
      field.classList.add('is-filled');
    } else {
      field.classList.remove('is-filled');
    }
  };

  input.addEventListener('input', updateState);
  input.addEventListener('blur', updateState);
}
