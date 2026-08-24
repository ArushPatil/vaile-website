/* Field Manual direction: grounded product proof, dense useful information, prominent pricing, and model carousel. */
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Copy, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";

const assets = {
  hero: "/images/5-desktop.jpg",
  heroMobile: "/images/vaile-hero-mobile.webp",
  front: "/images/1-desktop.jpg",
  detail: "/images/3-desktop.jpg",
  mark: "/images/logo.png",
};

const modelShots = [
  {
    id: "01",
    title: "FRONT PROFILE",
    spec: "Straight leg block / natural drop over footwear",
    desktop: "/images/1-desktop.jpg",
    mobile: "/images/1-mobile.jpg",
    alt: "VAILE Drop 001 black duck canvas pants front full standing view",
  },
  {
    id: "02",
    title: "LATERAL DRAPE",
    spec: "Side profile showing relaxed seat and structured leg line",
    desktop: "/images/2-desktop.jpg",
    mobile: "/images/2-mobile.jpg",
    alt: "VAILE Drop 001 black duck canvas pants side profile view",
  },
  {
    id: "03",
    title: "HARDWARE & POCKETS",
    spec: "Cairn-tone copper rivets and reinforced tool pocketing",
    desktop: "/images/3-desktop.jpg",
    mobile: "/images/3-mobile.jpg",
    alt: "VAILE Drop 001 canvas pocket, rivet hardware, and belt loop construction",
  },
  {
    id: "04",
    title: "REAR YOKE & SEAT",
    spec: "Structured back rise with double-needle reinforced bar-tacks",
    desktop: "/images/4-desktop.jpg",
    mobile: "/images/4-mobile.jpg",
    alt: "VAILE Drop 001 back pocket and outseam details",
  },
  {
    id: "05",
    title: "SEATED BREAK",
    spec: "12oz canvas break and knee articulation in seated posture",
    desktop: "/images/6-desktop.jpg",
    mobile: "/images/6-mobile.jpg",
    alt: "VAILE Drop 001 seated view showing natural canvas break",
  },
  {
    id: "06",
    title: "STRIDE IN MOTION",
    spec: "Dynamic fabric drape during active movement and outdoor wear",
    desktop: "/images/9-desktop.jpg",
    mobile: "/images/9-mobile.jpg",
    alt: "VAILE Drop 001 walking silhouette and movement",
  },
];

const sizes = ["30", "32", "34", "36", "38"];

function SectionHead({ number, title, note }: { number: string; title: string; note?: string }) {
  return (
    <div className="section-head">
      <span>{number}</span>
      <h2>{title}</h2>
      {note && <p>{note}</p>}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("32");
  const [activeSlide, setActiveSlide] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(() => {
    try {
      return !sessionStorage.getItem("vaile_has_loaded");
    } catch {
      return false;
    }
  });

  const reducedMotion = useReducedMotion();
  const allocationMessage = `VAILE — DROP 001\n\nI would like to request a private allocation.\nPreferred waist: ${selectedSize}\nPrice: ₹6,200 INR / $100 USD\n\nPlease share availability and next steps.`;
  const allocationHref = `https://wa.me/918951066881?text=${encodeURIComponent(allocationMessage)}`;

  useEffect(() => {
    if (!isLoading) return;
    const timer = window.setTimeout(() => {
      setIsLoading(false);
      try {
        sessionStorage.setItem("vaile_has_loaded", "1");
      } catch {}
    }, reducedMotion ? 0 : 900);
    return () => window.clearTimeout(timer);
  }, [isLoading, reducedMotion]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const copyNote = async () => {
    await navigator.clipboard?.writeText(allocationMessage);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % modelShots.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + modelShots.length) % modelShots.length);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="manual-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <img src={assets.mark} alt="" />
            <span>VAILE / 001</span>
          </motion.div>
        )}
      </AnimatePresence>

      <main className={isLoading ? "manual-shell is-loading" : "manual-shell"}>
        <header className="manual-header">
          <button className="header-menu" onClick={() => setMenuOpen(true)} aria-label="Open VAILE index">
            <Menu size={18} />
          </button>
          <a className="manual-brand" href="#top">
            <img src={assets.mark} alt="" />
            <span className="brand-wordmark">
              <span className="kerning-v">V</span>
              <span className="kerning-a">A</span>ILE
            </span>
            <small>001</small>
          </a>
          <a className="header-action" href={allocationHref} target="_blank" rel="noreferrer">
            <span>OPEN</span>
            <b>ALLOCATION RECORD</b>
            <ArrowUpRight size={15} />
          </a>
        </header>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              className="manual-menu"
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(0 0 0% 0)" }}
              exit={{ clipPath: "inset(0 0 100% 0)" }}
              transition={{ duration: 0.36 }}
            >
              <div>
                <button onClick={() => setMenuOpen(false)} aria-label="Close navigation">
                  <X size={25} />
                </button>
                <p>VAILE / DROP 001</p>
              </div>
              <a onClick={() => setMenuOpen(false)} href="#allocation">
                Allocation
              </a>
              <a onClick={() => setMenuOpen(false)} href="#gallery">
                Gallery
              </a>
              <a onClick={() => setMenuOpen(false)} href="#fit">
                Fit
              </a>
              <a onClick={() => setMenuOpen(false)} href="#build">
                Build
              </a>
              <a onClick={() => setMenuOpen(false)} href="#care">
                Care
              </a>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* 00: HERO */}
        <section className="manual-hero" id="top">
          <picture>
            <source media="(max-width: 480px)" srcSet={assets.heroMobile} type="image/webp" />
            <img src={assets.hero} alt="Black duck canvas pants worn outdoors" fetchPriority="high" decoding="async" />
          </picture>
          <div className="hero-copy">
            <p>DROP 001 / 50 PAIRS</p>
            <h1>
              Made for<br />actual wear.
            </h1>
            <span>12oz duck canvas / private allocation</span>
          </div>
          <a href="#allocation" className="hero-index">
            01 — GET THE DETAILS
          </a>
        </section>

        {/* STACK CONTAINER */}
        <div className="editorial-stack manual-stack">
          {/* 01: ALLOCATION & PRICING */}
          <section className="allocation-sheet" id="allocation" data-stack-item>
            <div className="allocation-inner">
              <div className="allocation-copy">
                <SectionHead
                  number="01"
                  title="One run. Fifty pairs."
                  note="Choose your usual waist. We confirm availability and complete your order directly on WhatsApp."
                />
                <div className="allocation-facts">
                  <span>FABRIC</span>
                  <b>12oz cotton duck canvas</b>
                  <span>PRICE</span>
                  <b className="fact-price">₹6,200 INR / $100 USD (Tax incl.)</b>
                  <span>FORMAT</span>
                  <b>Private allocation / 50 total</b>
                  <span>DISPATCH</span>
                  <b>Worldwide tracked delivery</b>
                </div>
              </div>

              <div className="allocation-card">
                <div className="card-price-block">
                  <div className="card-price-eyebrow">FINAL PRICE / DROP 001</div>
                  <div className="card-price-row">
                    <div className="card-price-primary">
                      <span className="curr">₹</span>
                      <span className="num">6,200</span>
                      <span className="iso">INR</span>
                    </div>
                    <div className="card-price-secondary">
                      <span className="usd">$100 USD</span>
                      <span className="tax">ALL TAXES INCLUDED</span>
                    </div>
                  </div>
                </div>

                <div className="card-size-section">
                  <p className="card-size-label">SELECT PREFERRED WAIST</p>
                  <div className="size-grid" role="radiogroup" aria-label="Preferred waist size">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        className={selectedSize === size ? "is-selected" : ""}
                        onClick={() => setSelectedSize(size)}
                        role="radio"
                        aria-checked={selectedSize === size}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <a className="allocation-record" href={allocationHref} target="_blank" rel="noreferrer">
                  <span>RECORD / 001 — WAIST {selectedSize}</span>
                  <b>OPEN ALLOCATION NOTE</b>
                  <ArrowUpRight size={17} />
                </a>

                <button className="copy-note" onClick={copyNote}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "COPIED TO CLIPBOARD" : "COPY ALLOCATION NOTE"}
                </button>
              </div>
            </div>
          </section>

          {/* 02: PRODUCT MODEL SHOT CAROUSEL */}
          <section className="gallery-sheet" id="gallery" data-stack-item>
            <div className="gallery-inner">
              <div className="gallery-header">
                <div className="gallery-meta">
                  <span className="gallery-kicker">MODEL SPECIMEN RECORD</span>
                  <h2>
                    Lookbook <em>/ 001</em>
                  </h2>
                </div>
                <div className="gallery-controls">
                  <span className="gallery-counter">
                    FIGURE {modelShots[activeSlide].id} / 0{modelShots.length}
                  </span>
                  <div className="gallery-nav-buttons">
                    <button onClick={prevSlide} aria-label="Previous model shot">
                      <ChevronLeft size={18} />
                    </button>
                    <button onClick={nextSlide} aria-label="Next model shot">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="gallery-viewer">
                <div className="gallery-slide-wrap">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                    className="gallery-slide"
                  >
                    <picture>
                      <source media="(max-width: 640px)" srcSet={modelShots[activeSlide].mobile} />
                      <img
                        src={modelShots[activeSlide].desktop}
                        alt={modelShots[activeSlide].alt}
                        loading="lazy"
                      />
                    </picture>
                    <div className="gallery-caption">
                      <span className="caption-tag">FIG. {modelShots[activeSlide].id}</span>
                      <b>{modelShots[activeSlide].title}</b>
                      <p>{modelShots[activeSlide].spec}</p>
                    </div>
                  </motion.div>
                </div>

                <div className="gallery-pills">
                  {modelShots.map((shot, idx) => (
                    <button
                      key={shot.id}
                      className={`gallery-pill ${activeSlide === idx ? "is-active" : ""}`}
                      onClick={() => setActiveSlide(idx)}
                      aria-label={`View figure ${shot.id}: ${shot.title}`}
                    >
                      <span>0{idx + 1}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 03: THE CUT / PROOF SPREAD */}
          <section className="proof-spread" data-stack-item>
            <div className="proof-image">
              <img src={assets.front} alt="Full-length outdoor view of black duck canvas pants" />
            </div>
            <div className="proof-copy">
              <p className="kicker">THE CUT</p>
              <h2>
                Easy through<br />the leg. Clear<br />over a shoe.
              </h2>
              <p>
                It is a straight, relaxed work pant: enough room to move, enough structure to hold its line. The
                silhouette is designed to wear in, not pose in.
              </p>
              <div className="proof-quote">“A uniform should get better with use.”</div>
            </div>
          </section>

          {/* 04: FIT SHEET */}
          <section className="fit-sheet" id="fit" data-stack-item>
            <div className="fit-inner">
              <SectionHead
                number="02"
                title="Fit, without the guesswork."
                note="Your preferred waist is a starting point. Ask for exact measurements before allocating."
              />
              <div className="fit-list">
                <article>
                  <span>PROFILE</span>
                  <b>Relaxed straight leg</b>
                </article>
                <article>
                  <span>WEAR TRUE</span>
                  <b>Your usual waist for an easy fit</b>
                </article>
                <article>
                  <span>SIZE UP</span>
                  <b>More room through seat and leg</b>
                </article>
                <article>
                  <span>CONFIRM</span>
                  <b>Waist / rise / thigh / hem / inseam via WhatsApp</b>
                </article>
              </div>
            </div>
          </section>

          {/* 05: BUILD SPREAD */}
          <section className="build-spread" id="build" data-stack-item>
            <div className="build-copy">
              <SectionHead
                number="03"
                title="The points that take the strain."
                note="Construction reference / dense canvas, reinforced stress points, useful storage."
              />
              <ol>
                <li>
                  <b>Heavy canvas</b>
                  <span>Dense 12oz cotton gives the garment a stable hand from day one.</span>
                </li>
                <li>
                  <b>Rivet set</b>
                  <span>Hardware anchors the stress points that get used the most.</span>
                </li>
                <li>
                  <b>Layered pockets</b>
                  <span>Practical storage without breaking the line of the leg.</span>
                </li>
              </ol>
            </div>
            <div className="build-image">
              <img src={assets.detail} alt="Canvas pocket, rivet and belt-loop detail" />
            </div>
          </section>

          {/* 06: CARE SHEET */}
          <section className="care-sheet" id="care" data-stack-item>
            <div className="care-inner">
              <div>
                <SectionHead
                  number="04"
                  title="Keep the wear. Skip the damage."
                  note="Care reference / clean only when needed. The garment label always takes priority."
                />
                <p>
                  Duck canvas earns character slowly. Spot clean first; wash cold only when it needs it; skip bleach
                  and high heat.
                </p>
              </div>
              <ul>
                <li>
                  <b>01</b>
                  <span>Spot clean first</span>
                </li>
                <li>
                  <b>02</b>
                  <span>Wash cold, gently</span>
                </li>
                <li>
                  <b>03</b>
                  <span>Hang dry</span>
                </li>
                <li>
                  <b>04</b>
                  <span>Iron inside out, warm</span>
                </li>
              </ul>
            </div>
          </section>
        </div>

        {/* CLOSING ALLOCATION */}
        <section className="closing-allocation">
          <p>DROP 001 / 50 PAIRS</p>
          <h2>
            Choose a waist.<br />Start the note.
          </h2>
          <div className="closing-action-wrap">
            <div className="closing-price-tag">₹6,200 INR / $100 USD</div>
            <a className="allocation-record" href={allocationHref} target="_blank" rel="noreferrer">
              <span>RECORD / 001 — WAIST {selectedSize}</span>
              <b>OPEN ALLOCATION NOTE</b>
              <ArrowUpRight size={19} />
            </a>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="manual-footer">
          <a href="#top" className="manual-brand">
            <img src={assets.mark} alt="" />
            <span className="brand-wordmark">
              <span className="kerning-v">V</span>
              <span className="kerning-a">A</span>ILE
            </span>
            <small>001</small>
          </a>
          <div className="footer-links">
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
            <span>12oz duck canvas</span>
          </div>
        </footer>
      </main>
    </>
  );
}
