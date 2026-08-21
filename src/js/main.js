/* ================================================================
   VAILE — Main JavaScript
   Robust Event Delegation, Size Matrix, Anatomy Inspector, Unit Switcher
   ================================================================ */

import { initAnimations } from './animations.js';

const WHATSAPP_PHONE = '918951066881';

// ----------------------------------------------------------------
// 1. SIZE CONFIGURATION & ALLOCATION TERMINAL
// ----------------------------------------------------------------
export function updateSelectedSize(size, inseam, targetBtn) {
  // Update button states
  const allButtons = document.querySelectorAll('.size-terminal__btn, .acquire__size-pill, .allocation__size-btn');
  allButtons.forEach((b) => {
    if (b === targetBtn || b.getAttribute('data-size') === size) {
      b.classList.add('active');
      b.setAttribute('aria-checked', 'true');
    } else {
      b.classList.remove('active');
      b.setAttribute('aria-checked', 'false');
    }
  });

  // Update label in terminal
  const sizeLabel = document.getElementById('selected-size-label');
  if (sizeLabel) {
    sizeLabel.textContent = size;
  }

  // Update preview line
  const sizePreview = document.getElementById('terminal-size-preview');
  if (sizePreview) {
    sizePreview.textContent = `WAIST ${size}" // INSEAM ${inseam || '32.0'}"`;
  }

  // Update WhatsApp link
  const allocationBtn = document.getElementById('allocation-btn');
  if (allocationBtn) {
    const message = encodeURIComponent(
      `Hello VAILE, I would like to request an allocation for Edition 01 Pant in Size ${size}.`
    );
    allocationBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${message}`;
  }
}

// ----------------------------------------------------------------
// 2. GARMENT ANATOMY VECTOR INSPECTOR
// ----------------------------------------------------------------
export function setActiveAnatomyFeature(id) {
  const pins = document.querySelectorAll('.anatomy-pin');
  const navBtns = document.querySelectorAll('.anatomy__nav-btn');
  const cards = document.querySelectorAll('.anatomy__card');

  // Update pins in SVG
  pins.forEach((pin) => {
    if (pin.getAttribute('data-pin') === id) {
      pin.classList.add('active');
    } else {
      pin.classList.remove('active');
    }
  });

  // Update tabs
  navBtns.forEach((btn) => {
    if (btn.getAttribute('data-target') === id) {
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    }
  });

  // Update spec cards
  cards.forEach((card) => {
    if (card.id === `spec-card-${id}`) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });
}

// ----------------------------------------------------------------
// 3. MEASUREMENT UNIT SWITCHER (INCHES <-> CENTIMETERS)
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
// 4. GLOBAL CLICK & INTERACTION DISPATCHER (EVENT DELEGATION)
// ----------------------------------------------------------------
function setupGlobalDelegation() {
  document.addEventListener('click', (e) => {
    // 1. Size Button Click
    const sizeBtn = e.target.closest('.size-terminal__btn, .acquire__size-pill, .allocation__size-btn');
    if (sizeBtn) {
      e.preventDefault();
      const size = sizeBtn.getAttribute('data-size') || '30';
      const inseam = sizeBtn.getAttribute('data-inseam') || '32.0';
      updateSelectedSize(size, inseam, sizeBtn);
      return;
    }

    // 2. Anatomy Tab Button Click
    const tabBtn = e.target.closest('.anatomy__nav-btn');
    if (tabBtn) {
      e.preventDefault();
      const id = tabBtn.getAttribute('data-target');
      if (id) setActiveAnatomyFeature(id);
      return;
    }

    // 3. Anatomy SVG Pin Click
    const pin = e.target.closest('.anatomy-pin');
    if (pin) {
      e.preventDefault();
      const id = pin.getAttribute('data-pin');
      if (id) setActiveAnatomyFeature(id);
      return;
    }

    // 4. Measurement Unit Toggle Click
    const unitBtn = e.target.closest('.unit-toggle__btn, [data-unit]');
    if (unitBtn) {
      e.preventDefault();
      const unit = unitBtn.getAttribute('data-unit') || (unitBtn.id === 'unit-cm' ? 'cm' : 'in');
      setMeasurementUnit(unit);
      return;
    }

    // 5. Smooth Anchor Jump Links
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
// 5. STUDIO COMMUNIQUÉ DISPATCH FORM
// ----------------------------------------------------------------
function initDarkDispatch() {
  const form = document.querySelector('.dark-dispatch__form');
  const input = document.getElementById('newsletter-email');
  const btn = document.querySelector('.dark-dispatch__btn');

  if (!form || !input || !btn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!input.value || !input.checkValidity()) return;

    const originalHTML = btn.innerHTML;
    btn.innerHTML = `<span>RECORDED</span><span aria-hidden="true">&check;</span>`;
    btn.style.background = '#22c55e';
    btn.style.color = '#ffffff';
    input.value = '';
    input.placeholder = 'CLIENT EMAIL LOGGED INTO ARCHIVE';
    input.disabled = true;

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      btn.style.color = '';
      input.disabled = false;
      input.placeholder = 'ENTER CLIENT EMAIL ADDRESS...';
    }, 4000);
  });
}

// ----------------------------------------------------------------
// INITIALIZATION
// ----------------------------------------------------------------
function initApp() {
  setupGlobalDelegation();
  initDarkDispatch();
  initAnimations();

  // Initialize default active size
  const activeSizeBtn =
    document.querySelector('.size-terminal__btn.active') ||
    document.querySelector('.size-terminal__btn[data-size="30"]') ||
    document.querySelector('.size-terminal__btn');

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
