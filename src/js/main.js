/* ================================================================
   VAILE — Main JavaScript
   Event Delegation, Size Selection Matrix, Unit Switcher, Mobile Bar
   ================================================================ */

import { initAnimations } from './animations.js';

const WHATSAPP_PHONE = '918951066881';

// ----------------------------------------------------------------
// 1. SIZE CONFIGURATION & ALLOCATION LINK BUILDER
// ----------------------------------------------------------------
export function updateSelectedSize(size, inseam, targetBtn) {
  // Update button states across all size pill instances
  const allButtons = document.querySelectorAll('.size-pill');
  allButtons.forEach((b) => {
    if (b === targetBtn || b.getAttribute('data-size') === size) {
      b.classList.add('active');
      b.setAttribute('aria-checked', 'true');
    } else {
      b.classList.remove('active');
      b.setAttribute('aria-checked', 'false');
    }
  });

  // Update label in desktop CTA button
  const sizeLabel = document.getElementById('selected-size-label');
  if (sizeLabel) {
    sizeLabel.textContent = size;
  }

  // Update label in mobile CTA bar
  const mobileSizeLabel = document.getElementById('mobile-size-label');
  if (mobileSizeLabel) {
    mobileSizeLabel.textContent = size;
  }

  // Update preview line
  const sizePreview = document.getElementById('selected-size-preview');
  if (sizePreview) {
    sizePreview.textContent = `WAIST ${size}" // INSEAM ${inseam || '32.0'}"`;
  }

  // Update WhatsApp links
  const message = encodeURIComponent(
    `Hello VAILE, I would like to request an allocation for Edition 01 Pant in Size ${size}.`
  );
  const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${message}`;

  const allocationBtn = document.getElementById('allocation-btn');
  if (allocationBtn) {
    allocationBtn.href = waUrl;
  }

  const mobileAllocationBtn = document.getElementById('mobile-allocation-btn');
  if (mobileAllocationBtn) {
    mobileAllocationBtn.href = waUrl;
  }
}

// ----------------------------------------------------------------
// 2. MEASUREMENT UNIT SWITCHER (INCHES <-> CENTIMETERS)
// ----------------------------------------------------------------
export function setMeasurementUnit(unit) {
  const unitInBtn = document.getElementById('unit-in');
  const unitCmBtn = document.getElementById('unit-cm');
  const cells = document.querySelectorAll('.matrix-table td[data-in]');

  if (unit === 'cm') {
    if (unitCmBtn) unitCmBtn.classList.add('active');
    if (unitInBtn) unitInBtn.classList.remove('active');
    cells.forEach((td) => {
      const val = td.getAttribute('data-cm');
      if (val) td.textContent = `${val} cm`;
    });
  } else {
    if (unitInBtn) unitInBtn.classList.add('active');
    if (unitCmBtn) unitCmBtn.classList.remove('active');
    cells.forEach((td) => {
      const val = td.getAttribute('data-in');
      if (val) td.textContent = `${val}"`;
    });
  }
}

// ----------------------------------------------------------------
// 3. GLOBAL CLICK & INTERACTION DISPATCHER (EVENT DELEGATION)
// ----------------------------------------------------------------
function setupGlobalDelegation() {
  document.addEventListener('click', (e) => {
    // 1. Size Button Click
    const sizeBtn = e.target.closest('.size-pill');
    if (sizeBtn) {
      e.preventDefault();
      const size = sizeBtn.getAttribute('data-size') || '30';
      const inseam = sizeBtn.getAttribute('data-inseam') || '32.0';
      updateSelectedSize(size, inseam, sizeBtn);
      return;
    }

    // 2. Measurement Unit Toggle Click
    const unitBtn = e.target.closest('.unit-toggle__btn, [data-unit]');
    if (unitBtn) {
      e.preventDefault();
      const unit = unitBtn.getAttribute('data-unit') || (unitBtn.id === 'unit-cm' ? 'cm' : 'in');
      setMeasurementUnit(unit);
      return;
    }

    // 3. Smooth Anchor Jump Links
    const anchor = e.target.closest('a[href^="#"]');
    if (anchor && anchor.getAttribute('href').length > 1) {
      const targetId = anchor.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
}

// ----------------------------------------------------------------
// 4. STUDIO COMMUNIQUÉ DISPATCH FORM
// ----------------------------------------------------------------
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  const input = document.getElementById('newsletter-email');
  const feedback = document.getElementById('newsletter-feedback');

  if (!form || !input) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!input.value || !input.checkValidity()) return;

    if (feedback) {
      feedback.textContent = 'CLIENT EMAIL REGISTERED IN STUDIO ARCHIVE.';
      feedback.style.color = '#008744';
    }

    const originalVal = input.value;
    input.value = '';
    input.placeholder = 'REGISTERED — THANK YOU';
    input.disabled = true;

    setTimeout(() => {
      input.disabled = false;
      input.placeholder = 'CLIENT EMAIL ADDRESS';
      if (feedback) feedback.textContent = '';
    }, 4000);
  });
}

// ----------------------------------------------------------------
// 5. MOBILE STICKY ACQUIRE BAR ON SCROLL
// ----------------------------------------------------------------
function initMobileBarScroll() {
  const mobileBar = document.getElementById('mobile-acquire-bar');
  const productSection = document.getElementById('product');

  if (!mobileBar || !productSection) return;

  let ticking = false;

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = productSection.getBoundingClientRect();
          // Show bar once the top of the product section enters viewport
          if (rect.top <= window.innerHeight * 0.75 && rect.bottom > 100) {
            mobileBar.classList.add('visible');
          } else {
            mobileBar.classList.remove('visible');
          }
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );
}

// ----------------------------------------------------------------
// 6. EDITORIAL MODEL LOOKBOOK CAROUSEL
// ----------------------------------------------------------------
function initLookbookViewer() {
  const track = document.getElementById('lookbook-track');
  const prevBtn = document.getElementById('lookbook-prev');
  const nextBtn = document.getElementById('lookbook-next');
  const counter = document.getElementById('lookbook-counter');
  const dots = document.querySelectorAll('.lookbook-dot');
  const thumbs = document.querySelectorAll('.lookbook-thumb');
  const slides = document.querySelectorAll('.lookbook-slide');

  if (!track || slides.length === 0) return;

  const totalSlides = slides.length;
  let currentIndex = 0;

  function scrollToSlide(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    currentIndex = index;

    const targetSlide = slides[index];
    if (targetSlide) {
      track.scrollTo({
        left: targetSlide.offsetLeft,
        behavior: 'smooth',
      });
    }

    updateUI(index);
  }

  function updateUI(index) {
    currentIndex = index;

    // Update counter
    if (counter) {
      const currentFormatted = String(index + 1).padStart(2, '0');
      const totalFormatted = String(totalSlides).padStart(2, '0');
      counter.textContent = `${currentFormatted} / ${totalFormatted}`;
    }

    // Update dots
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('active');
        dot.setAttribute('aria-selected', 'true');
      } else {
        dot.classList.remove('active');
        dot.setAttribute('aria-selected', 'false');
      }
    });

    // Update thumbs
    thumbs.forEach((thumb, i) => {
      if (i === index) {
        thumb.classList.add('active');
      } else {
        thumb.classList.remove('active');
      }
    });
  }

  // Previous Button
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToSlide(currentIndex - 1);
    });
  }

  // Next Button
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToSlide(currentIndex + 1);
    });
  }

  // Dot Clicks
  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      if (!isNaN(idx)) scrollToSlide(idx);
    });
  });

  // Thumb Clicks
  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = parseInt(thumb.getAttribute('data-index'), 10);
      if (!isNaN(idx)) scrollToSlide(idx);
    });
  });

  // Sync with manual swipe/scroll
  let scrollTimeout = null;
  track.addEventListener(
    'scroll',
    () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const trackScrollLeft = track.scrollLeft;
        let activeIdx = 0;
        let minDiff = Infinity;

        slides.forEach((slide, i) => {
          const diff = Math.abs(slide.offsetLeft - trackScrollLeft);
          if (diff < minDiff) {
            minDiff = diff;
            activeIdx = i;
          }
        });

        if (activeIdx !== currentIndex) {
          updateUI(activeIdx);
        }
      }, 50);
    },
    { passive: true }
  );

  // Keyboard navigation
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollToSlide(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollToSlide(currentIndex + 1);
    }
  });
}

// ----------------------------------------------------------------
// INITIALIZATION
// ----------------------------------------------------------------
function initApp() {
  setupGlobalDelegation();
  initNewsletter();
  initMobileBarScroll();
  initLookbookViewer();
  initAnimations();

  // Initialize default active size
  const activeSizeBtn =
    document.querySelector('.size-pill.active') ||
    document.querySelector('.size-pill[data-size="30"]') ||
    document.querySelector('.size-pill');

  if (activeSizeBtn) {
    const size = activeSizeBtn.getAttribute('data-size') || '30';
    const inseam = activeSizeBtn.getAttribute('data-inseam') || '32.0';
    updateSelectedSize(size, inseam, activeSizeBtn);
  }
}

// Execute immediately if DOM is ready, or on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
