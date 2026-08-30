/* VAILE editorial storefront: clear product language, button-led image navigation, and accessible product decisions. */
/* VAILE Field Dossier home: minimal primary navigation with a measured lichen-panel menu reveal and readable motion hierarchy. */
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { TouchEvent as ReactTouchEvent } from "react";
import { Link } from "wouter";
import { buildWhatsAppEnquiryUrl } from "@/lib/site";

const assets = {
  hero: {
    mobile: "/images/vaile-hero-mobile.webp",
    desktop: "/images/5.webp",
  },
  mark: "/images/logo.png",
};

const shots = [
  { id: "01", title: "FRONT PROFILE", proof: "SILHOUETTE", detail: "Relaxed straight leg · natural break", insight: "A relaxed straight fit that moves easily and keeps a clean line from hip to hem.", desktop: "/images/1.webp", mobile: "/images/1.webp", alt: "VAILE Drop 001 black duck canvas pants, front view" },
  { id: "02", title: "SIDE PROFILE", proof: "FIT", detail: "Balanced shape through the leg", insight: "The side profile holds a steady fall through the leg with room to move and a clean break over the shoe.", desktop: "/images/2.webp", mobile: "/images/2.webp", alt: "VAILE Drop 001 black duck canvas pants, side view" },
  { id: "03", title: "POCKETS & HARDWARE", proof: "DETAILS", detail: "Utility pockets · reinforced stress points", insight: "Dense canvas and brass rivets give the utility pockets structure while keeping the trouser easy to wear.", desktop: "/images/3.webp", mobile: "/images/3.webp", alt: "VAILE Drop 001 canvas pocket and brass rivet detail" },
  { id: "04", title: "MOVEMENT", proof: "FABRIC", detail: "12 oz duck canvas · softens with wear", insight: "The fabric begins with structure and gradually softens where the garment moves with you.", desktop: "/images/10_warm.webp", mobile: "/images/10_warm.webp", alt: "VAILE Drop 001 duck canvas trousers in motion" },
  { id: "05", title: "SEATED FIT", proof: "COMFORT", detail: "Ease through the seat and thigh", insight: "The pattern keeps comfort through the seat and thigh during a full day of wear without changing the intended fit.", desktop: "/images/6.webp", mobile: "/images/6.webp", alt: "VAILE Drop 001 black duck canvas pants in a seated position" },
  { id: "06", title: "HEM", proof: "FINISH", detail: "Clean break over footwear", insight: "The hem falls naturally across boots and sneakers without tapering too aggressively around the shoe.", desktop: "/images/9.webp", mobile: "/images/9.webp", alt: "VAILE Drop 001 black duck canvas pants while walking" },
];

const sizes = ["30", "32", "34", "36", "38"];
const menuEase = [0.23, 1, 0.32, 1] as const;
const menuItems = [
  { kind: "anchor", label: "Home", href: "#top" },
  { kind: "route", label: "About Us", href: "/about" },
  { kind: "route", label: "Deep Dive", href: "/deep-dive" },
] as const;

export default function HomeChapters() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState("32");
  const [initials, setInitials] = useState("");
  const [active, setActive] = useState(0);
  const [showGalleryInfo, setShowGalleryInfo] = useState(false);
  const [galleryTransitioning, setGalleryTransitioning] = useState(false);
  const activeGalleryRef = useRef(0);
  const galleryTransitionRef = useRef(false);
  const galleryRequestRef = useRef(0);
  const galleryReleaseTimerRef = useRef<number | null>(null);
  const galleryTouchStartRef = useRef<{ x: number; y: number } | null>(null);
  const initialsInputRef = useRef<HTMLInputElement>(null);
  const [unit, setUnit] = useState<"IN" | "CM">("IN");
  const [loading, setLoading] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    try {
      return !sessionStorage.getItem("vaile_has_loaded");
    } catch {
      return false;
    }
  });

  const measurements = {
    "30": { waist: 31.0, rise: 11.5, thigh: 12.5, knee: 9.5, hem: 8.5, inseam: 32 },
    "32": { waist: 33.0, rise: 12.0, thigh: 13.0, knee: 9.75, hem: 8.75, inseam: 32 },
    "34": { waist: 35.0, rise: 12.5, thigh: 13.5, knee: 10, hem: 9, inseam: 32 },
    "36": { waist: 37.0, rise: 13.0, thigh: 14.0, knee: 10.5, hem: 9.25, inseam: 32 },
    "38": { waist: 39.0, rise: 13.5, thigh: 14.5, knee: 11, hem: 9.5, inseam: 32 },
  };

  const reducedMotion = useReducedMotion();
  const menuDuration = reducedMotion ? 0 : 0.42;
  const hasInitials = initials.length > 0;
  const href = buildWhatsAppEnquiryUrl("VAILE — DROP 001", size, initials);
  const shot = shots[active];
  const fmt = (value: number) => unit === "CM" ? (value * 2.54).toFixed(1) : Number.isInteger(value) ? value.toString() : value.toString();
  const gallerySource = (index: number) => {
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches) return shots[index].mobile;
    return shots[index].desktop;
  };

  const preloadGalleryImage = (index: number) => {
    if (typeof window === "undefined") return;
    const image = new Image();
    image.decoding = "async";
    image.src = gallerySource(index);
    if ("decode" in image) void image.decode().catch(() => undefined);
  };

  const selectGallery = (index: number) => {
    const nextIndex = (index + shots.length) % shots.length;
    if (nextIndex === activeGalleryRef.current && !galleryTransitionRef.current) return;
    const requestId = ++galleryRequestRef.current;
    activeGalleryRef.current = nextIndex;
    galleryTransitionRef.current = true;
    setGalleryTransitioning(true);
    setShowGalleryInfo(false);
    setActive(nextIndex);
    preloadGalleryImage(nextIndex);
    if (galleryReleaseTimerRef.current) window.clearTimeout(galleryReleaseTimerRef.current);
    galleryReleaseTimerRef.current = window.setTimeout(() => {
      if (requestId !== galleryRequestRef.current) return;
      galleryTransitionRef.current = false;
      setGalleryTransitioning(false);
    }, reducedMotion ? 0 : 180);
  };

  const moveGallery = (direction: 1 | -1) => selectGallery((activeGalleryRef.current + direction + shots.length) % shots.length);

  const selectChartSize = (nextSize: string) => setSize(nextSize);
  const updateInitials = (value: string) => setInitials(value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 3));
  const requireInitials = (event: React.MouseEvent<HTMLElement>) => {
    if (hasInitials) return;
    event.preventDefault();
    initialsInputRef.current?.focus();
    initialsInputRef.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
  };

  const beginGallerySwipe = (event: ReactTouchEvent<HTMLDivElement>) => {
    if (showGalleryInfo || event.touches.length !== 1 || (event.target as HTMLElement).closest("button, a, input, select, textarea")) {
      galleryTouchStartRef.current = null;
      return;
    }
    const touch = event.touches[0];
    galleryTouchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const completeGallerySwipe = (event: ReactTouchEvent<HTMLDivElement>) => {
    const start = galleryTouchStartRef.current;
    galleryTouchStartRef.current = null;
    if (!start || showGalleryInfo || galleryTransitionRef.current || event.changedTouches.length !== 1) return;

    const end = event.changedTouches[0];
    const deltaX = end.clientX - start.x;
    const deltaY = end.clientY - start.y;
    const isDeliberateHorizontalSwipe = Math.abs(deltaX) >= 56 && Math.abs(deltaX) > Math.abs(deltaY) * 1.35;
    if (!isDeliberateHorizontalSwipe) return;

    moveGallery(deltaX < 0 ? 1 : -1);
  };

  useEffect(() => {
    if (!loading) return;
    const timer = window.setTimeout(() => {
      setLoading(false);
      try {
        sessionStorage.setItem("vaile_has_loaded", "1");
      } catch {
        // Session storage is optional enhancement only.
      }
    }, reducedMotion ? 0 : 900);
    return () => window.clearTimeout(timer);
  }, [loading, reducedMotion]);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousDocumentOverflow = document.documentElement.style.overflow;
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  useEffect(() => {
    activeGalleryRef.current = active;
    preloadGalleryImage((active + 1) % shots.length);
    preloadGalleryImage((active + shots.length - 1) % shots.length);
  }, [active]);

  useEffect(() => () => {
    if (galleryReleaseTimerRef.current) window.clearTimeout(galleryReleaseTimerRef.current);
  }, []);

  useEffect(() => {
    // When the page loads or refreshes, ALWAYS begin at the very top (Hero section).
    window.scrollTo(0, 0);

    let frameId: number | null = null;
    const handleHashChange = () => {
      if (window.location.hash !== "#enquiry") return;
      frameId = window.requestAnimationFrame(() => {
        const target = document.getElementById("enquiry");
        const header = document.querySelector<HTMLElement>(".chapter-shell .manual-header");
        if (!target) return;
        const headerOffset = (header?.getBoundingClientRect().height ?? 0) + 20;
        const targetTop = window.scrollY + target.getBoundingClientRect().top - headerOffset;
        window.scrollTo({ top: targetTop, behavior: reducedMotion ? "auto" : "smooth" });
      });
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [reducedMotion]);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            className="manual-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          >
            <motion.div
              className="manual-loader__lockup"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <img src={assets.mark} alt="" />
              <span className="manual-loader__wordmark"><span className="kerning-v">V</span><span className="kerning-a">A</span>ILE</span>
              <small className="manual-loader__edition">001</small>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="main" className={loading ? "manual-shell is-loading chapter-shell" : "manual-shell chapter-shell"}>
        <header className="manual-header">
          <button type="button" className="header-menu" onClick={() => setMenuOpen(true)} aria-label="Toggle navigation menu" aria-expanded={menuOpen} aria-controls="mobile-menu">
            <Menu size={18} />
          </button>
          <Link className="manual-brand" href="/" aria-label="VAILE home">
            <img src={assets.mark} alt="" />
            <span className="brand-wordmark"><span className="kerning-v">V</span><span className="kerning-a">A</span>ILE</span>
            <small>001</small>
          </Link>
          <a
            className="header-action"
            href="#enquiry"
            onClick={(e) => {
              const target = document.getElementById("enquiry");
              if (target) {
                e.preventDefault();
                const header = document.querySelector<HTMLElement>(".chapter-shell .manual-header");
                const headerOffset = (header?.getBoundingClientRect().height ?? 0) + 20;
                const targetTop = window.scrollY + target.getBoundingClientRect().top - headerOffset;
                window.scrollTo({ top: targetTop, behavior: reducedMotion ? "auto" : "smooth" });
                if (window.history.replaceState) {
                  window.history.replaceState(null, "", window.location.pathname);
                }
              }
            }}
            aria-label="Go to the VAILE enquiry form"
          >
            <b>ENQUIRE</b><ArrowUpRight size={15} />
          </a>
        </header>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav id="mobile-menu" className="manual-menu" role="dialog" aria-modal="true" aria-label="Site navigation" initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }} animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }} exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }} transition={{ duration: menuDuration, ease: menuEase }}>
              <motion.div initial={{ opacity: 0, y: reducedMotion ? 0 : -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotion ? 0 : -6 }} transition={{ duration: reducedMotion ? 0 : 0.24, delay: reducedMotion ? 0 : 0.08, ease: menuEase }}>
                <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X size={25} /></button>
                <p>VAILE · DROP 001</p>
              </motion.div>
              {menuItems.map((item, index) => (
                <motion.div key={item.href} initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }} transition={{ duration: reducedMotion ? 0 : 0.28, delay: reducedMotion ? 0 : 0.16 + index * 0.06, ease: menuEase }}>
                  {item.kind === "anchor" ? <a className="is-current" onClick={() => setMenuOpen(false)} href={item.href} aria-current="page">{item.label}</a> : <Link onClick={() => setMenuOpen(false)} href={item.href}>{item.label}</Link>}
                </motion.div>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>

        <section className="manual-hero" id="top">
          <picture>
            <source media="(max-width: 640px)" srcSet={assets.hero.mobile} type="image/webp" />
            <img src={assets.hero.desktop} alt="Black duck canvas trousers worn outdoors" width="1920" height="1280" sizes="100vw" loading="eager" fetchPriority="high" decoding="async" />
          </picture>
          <div className="hero-copy">
            <p>DROP 001</p>
            <h1>Made for<br />actual wear.</h1>
            <span>12oz cotton duck canvas · private enquiry</span>
          </div>
          <a href="#allocation" className="hero-index"><span>VIEW DETAILS</span><span className="hero-index__arrow" aria-hidden="true">↓</span></a>
        </section>

        <section id="allocation" className="chapter chapter-allocation">
          <div className="allocation-layout">
            <div className="allocation-copy">
              <header className="allocation-head">
                <span>01</span>
                <h2>One run. Fifty pairs.</h2>
                <p>Choose your size to start a private WhatsApp enquiry. We’ll confirm current availability and next steps.</p>
              </header>
              <dl className="allocation-facts">
                <div><dt>FABRIC</dt><dd>12oz cotton duck canvas</dd></div>
                <div><dt>HARDWARE</dt><dd>Solid brass at stress points</dd></div>
                <div><dt>FIT</dt><dd>Relaxed straight leg</dd></div>
              </dl>
            </div>
            <aside id="enquiry" className="allocation-card">
              <p className="card-price-eyebrow">PRICE</p>
              <div className="card-price-row"><strong>₹6,200 <small>INR</small></strong><span>$100 USD</span></div>
              <p className="card-size-label">CHOOSE YOUR SIZE <span aria-hidden="true">/</span> <a className="size-chart-link" href="#sizing">VIEW SIZE CHART</a></p>
              <div className="size-grid" role="radiogroup" aria-label="Preferred size">
                {sizes.map((item) => <button type="button" key={item} className={size === item ? "is-selected" : ""} onClick={() => setSize(item)} role="radio" aria-checked={size === item} aria-label={`Size ${item}`}>{item}</button>)}
              </div>
              <label className="initials-field" htmlFor="enquiry-initials">
                <span><b>YOUR INITIALS</b><em>REQUIRED</em></span>
                <span className="initials-field__entry"><input ref={initialsInputRef} id="enquiry-initials" type="text" inputMode="text" autoComplete="off" maxLength={3} value={initials} onChange={(event) => updateInitials(event.target.value)} placeholder="ABC" aria-describedby="initials-note" /><small>{initials.length}/3</small></span>
                <i id="initials-note">UP TO THREE LETTERS</i>
              </label>
              {hasInitials ? (
                <a className="allocation-record allocation-record--ready" href={href} target="_blank" rel="noopener noreferrer" aria-label="Start a WhatsApp enquiry, opens in a new tab">
                  <span>SIZE {size}</span><b>START AN ENQUIRY</b><ArrowUpRight size={17} />
                </a>
              ) : (
                <button type="button" disabled tabIndex={-1} className="allocation-record is-awaiting-initials" aria-disabled="true" onClick={requireInitials} aria-label="Enter initials before starting an enquiry">
                  <span>SIZE {size}</span><b>START AN ENQUIRY</b><ArrowUpRight size={17} />
                </button>
              )}
            </aside>
          </div>
        </section>

        <section id="gallery" className="chapter chapter-gallery">
          <div className="gallery-ribbon">
            <header className="gallery-header">
              <div><span><b>02</b><i> — FIELD EVIDENCE / SIX VIEWS</i></span><h2>Lookbook <em>/ 001</em></h2></div>
              <b className="gallery-figure-count">FIGURE {shot.id} / 0{shots.length}</b>
            </header>
            <div className="gallery-stage" tabIndex={0} onKeyDown={(event) => {
              if (event.key === "ArrowLeft") { event.preventDefault(); moveGallery(-1); }
              if (event.key === "ArrowRight") { event.preventDefault(); moveGallery(1); }
            }} aria-label="Lookbook carousel. On mobile, swipe left or right to change images. Use left and right arrow keys when using a keyboard.">
              <div id="lookbook-panel" className="gallery-figure-wrap" aria-busy={galleryTransitioning} onTouchStart={beginGallerySwipe} onTouchEnd={completeGallerySwipe} onTouchCancel={() => { galleryTouchStartRef.current = null; }}>
                <AnimatePresence initial={false}>
                  <motion.figure key={`image-${shot.id}`} className={showGalleryInfo ? "is-hidden" : ""} initial={{ opacity: 0 }} animate={{ opacity: showGalleryInfo ? 0 : 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.2 }}>
                    <picture><source media="(max-width: 640px)" srcSet={shot.mobile} type="image/webp" /><img src={shot.desktop} alt={shot.alt} width="1200" height="1800" sizes="(max-width: 767px) 100vw, (max-width: 1199px) 58vw, 560px" loading={active === 0 ? "eager" : "lazy"} decoding="async" /></picture>
                    <figcaption>FRAME {shot.id} / DROP 001</figcaption>
                  </motion.figure>
                </AnimatePresence>
                <AnimatePresence>
                  {showGalleryInfo && (
                    <motion.aside key={`info-${shot.id}`} className="gallery-mobile-info" aria-label={`${shot.title} product information`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.18 }}>
                      <button type="button" className="gallery-info-toggle" onClick={() => setShowGalleryInfo(false)} aria-label="Hide product information"><span aria-hidden="true">i</span><b>HIDE DETAILS</b></button>
                      <div className="gallery-mobile-info__copy"><span>{shot.proof} / {shot.id}</span><h3>{shot.title}</h3><p>{shot.insight}</p></div>
                      <dl><div><dt>FIT</dt><dd>{shot.detail}</dd></div><div><dt>STYLE</dt><dd>DROP 001</dd></div></dl>
                    </motion.aside>
                  )}
                </AnimatePresence>
                {!showGalleryInfo && <button type="button" className="gallery-info-toggle" onClick={() => setShowGalleryInfo(true)} aria-label={`Show details for ${shot.title}`} aria-expanded="false"><span aria-hidden="true">i</span><b>DETAILS</b></button>}
                <span className={`gallery-swipe-hint${showGalleryInfo ? " is-concealed" : ""}`} aria-hidden="true">SWIPE ← →</span>
              </div>
              <aside className="gallery-dossier" aria-live="polite">
                <div><span>{shot.proof} / {shot.id}</span><h3>{shot.title}</h3><p>{shot.insight}</p></div>
                <dl><div><dt>FIT</dt><dd>{shot.detail}</dd></div><div><dt>STYLE</dt><dd>DROP 001</dd></div></dl>
                <div className="gallery-controls">
                  <button type="button" onClick={() => moveGallery(-1)} aria-label="Previous lookbook view"><ChevronLeft size={16} /><span>PREVIOUS</span></button>
                  <button type="button" onClick={() => moveGallery(1)} aria-label="Next lookbook view"><span>NEXT</span><ChevronRight size={16} /></button>
                </div>
              </aside>
            </div>
            <div className="gallery-pills" role="tablist" aria-label="Lookbook views">
              {shots.map((item, index) => <button type="button" key={item.id} className={active === index ? "is-active" : ""} onClick={() => selectGallery(index)} role="tab" aria-selected={active === index} aria-controls="lookbook-panel" aria-label={`View look ${item.id}: ${item.title}`}><span>{item.id}</span><small>{item.proof}</small></button>)}
            </div>
          </div>
        </section>

        <section id="sizing" className="chapter chapter-sizing">
          <div className="sizing-layout">
            <header className="sizing-copy">
              <span>03</span><h2>Engineered dimensions.</h2><p>Measured flat. Compare these against a pair you already own for the best reference.</p>
              <div className="sizing-controls" role="tablist" aria-label="Measurement units">
                <button type="button" role="tab" className={unit === "IN" ? "is-active" : ""} onClick={() => setUnit("IN")} aria-selected={unit === "IN"}>INCHES</button>
                <button type="button" role="tab" className={unit === "CM" ? "is-active" : ""} onClick={() => setUnit("CM")} aria-selected={unit === "CM"}>CENTIMETRES</button>
              </div>
              <p className="sizing-unit-note sizing-unit-note--desktop">ALL MEASUREMENTS IN {unit === "IN" ? "INCHES" : "CENTIMETRES"}. TOLERANCE ± {unit === "IN" ? "0.5" : "1.3"}.</p>
            </header>
            <div className="sizing-tile-ledger" aria-label={`Full ${unit === "IN" ? "inch" : "centimetre"} garment measurements`}>
              <p>MEASUREMENTS / {unit === "IN" ? "INCHES" : "CENTIMETRES"}</p>
              {Object.entries(measurements).map(([waist, measurement]) => (
                <article key={waist} className={size === waist ? "is-selected" : ""} role="button" tabIndex={0} aria-pressed={size === waist} aria-label={`Select size ${waist} for your enquiry`} onClick={() => selectChartSize(waist)} onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    selectChartSize(waist);
                  }
                }}>
                  <header><b>{waist}</b><span>WAIST <em>{fmt(measurement.waist)}</em></span></header>
                  <dl><div className="measurement-waist"><dt>WAIST</dt><dd>{fmt(measurement.waist)}</dd></div><div><dt>RISE</dt><dd>{fmt(measurement.rise)}</dd></div><div><dt>THIGH</dt><dd>{fmt(measurement.thigh)}</dd></div><div><dt>KNEE</dt><dd>{fmt(measurement.knee)}</dd></div><div><dt>HEM</dt><dd>{fmt(measurement.hem)}</dd></div><div><dt>INSEAM</dt><dd>{fmt(measurement.inseam)}</dd></div></dl>
                </article>
              ))}
            </div>
            <p className="sizing-unit-note sizing-unit-note--mobile">ALL MEASUREMENTS IN {unit === "IN" ? "INCHES" : "CENTIMETRES"}. TOLERANCE ± {unit === "IN" ? "0.5" : "1.3"}.</p>
          </div>
        </section>

        <section id="care" className="chapter chapter-care">
          <div className="care-layout">
            <div className="care-copy"><header className="care-header"><span>04</span><h2>Keep the wear. Skip the damage.</h2><p>Simple care for everyday wear.</p></header><p className="care-intro">Spot clean when possible. If washing is needed, wash cold and hang dry. Avoid bleach, high heat, and dry cleaning.</p></div>
            <aside className="care-stamp"><span>CARE / 04</span><b>12 OZ DUCK<br />CANVAS</b><p>COLD WASH · HANG DRY · NO DRY CLEANING</p></aside>
            <ul><li><b>01</b><span>Spot clean first</span></li><li><b>02</b><span>Wash cold, gently</span></li><li><b>03</b><span>Hang dry</span></li><li><b>04</b><span>Avoid bleach and high heat</span></li></ul>
          </div>
        </section>

        <section className="closing-allocation">
          <p>DROP 001</p><h2><span>Choose a size.</span><span>Request</span><span>an allocation.</span></h2>
          <div><span>₹6,200 INR / $100 USD</span><a className="allocation-record allocation-record--gateway" href="#enquiry" aria-label="Go to the primary enquiry form"><span>SIZE {size}</span><b>START AN ENQUIRY</b><ArrowUpRight size={19} /></a></div>
          <aside className="closing-learn" aria-label="Learn more about VAILE">
            <p>WANT TO LEARN MORE?</p>
            <span>Visit <Link href="/about">About</Link> for the studio story or <Link href="/deep-dive">Deep Dive</Link> for the Drop 001 record.</span>
          </aside>
        </section>

        <footer className="manual-footer"><a href="/" className="manual-brand"><img src={assets.mark} alt="VAILE logo" /><span className="brand-wordmark"><span className="kerning-v">V</span><span className="kerning-a">A</span>ILE</span><small>001</small></a><div><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link></div></footer>
      </main>
    </>
  );
}
