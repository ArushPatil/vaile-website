/* Field Manual chapters: a continuous workwear narrative with desktop-only stack sheets and a deliberate mobile reading flow. */
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Copy, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";

const assets = { hero: "/images/5-desktop.jpg", heroMobile: "/images/vaile-hero-mobile.webp", front: "/images/1-desktop.jpg", side: "/images/2-desktop.jpg", detail: "/images/3-desktop.jpg", mark: "/images/logo.png" };
const shots = [
  { id: "01", title: "FRONT PROFILE", desktop: "/images/1-desktop.jpg", mobile: "/images/1-mobile.jpg", alt: "VAILE Drop 001 black duck canvas pants front full standing view" },
  { id: "02", title: "LATERAL DRAPE", desktop: "/images/2-desktop.jpg", mobile: "/images/2-mobile.jpg", alt: "VAILE Drop 001 black duck canvas pants side profile view" },
  { id: "03", title: "HARDWARE & POCKETS", desktop: "/images/3-desktop.jpg", mobile: "/images/3-mobile.jpg", alt: "VAILE Drop 001 canvas pocket and rivet hardware" },
  { id: "04", title: "FIELD STRIDE", desktop: "/images/10_warm-desktop.jpg", mobile: "/images/10_warm-mobile.jpg", alt: "VAILE Drop 001 black duck canvas pants field movement view" },
  { id: "05", title: "SEATED BREAK", desktop: "/images/6-desktop.jpg", mobile: "/images/6-mobile.jpg", alt: "VAILE Drop 001 seated canvas break" },
  { id: "06", title: "STRIDE IN MOTION", desktop: "/images/9-desktop.jpg", mobile: "/images/9-mobile.jpg", alt: "VAILE Drop 001 walking silhouette" },
];
const sizes = ["30", "32", "34", "36", "38"];

function Head({ index, title, note }: { index: string; title: string; note: string }) {
  return <header className="chapter-head"><span>{index}</span><div><h2>{title}</h2><p>{note}</p></div></header>;
}

export default function HomeChapters() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState("32");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(() => { try { return !sessionStorage.getItem("vaile_has_loaded"); } catch { return false; } });
  const reducedMotion = useReducedMotion();
  const message = `VAILE — DROP 001\n\nI would like to request a private allocation.\nPreferred waist: ${size}\nPrice: ₹6,200 INR / $100 USD\n\nPlease share availability and next steps.`;
  const href = `https://wa.me/918951066881?text=${encodeURIComponent(message)}`;
  const shot = shots[active];

  useEffect(() => { if (!loading) return; const t = window.setTimeout(() => { setLoading(false); try { sessionStorage.setItem("vaile_has_loaded", "1"); } catch {} }, reducedMotion ? 0 : 900); return () => window.clearTimeout(t); }, [loading, reducedMotion]);
  useEffect(() => { document.body.style.overflow = menuOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [menuOpen]);
  const copy = async () => { await navigator.clipboard?.writeText(message); setCopied(true); window.setTimeout(() => setCopied(false), 1600); };

  return <>
    <AnimatePresence>{loading && <motion.div className="manual-loader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}><img src={assets.mark} alt="" /><span>VAILE / 001</span></motion.div>}</AnimatePresence>
    <main className={loading ? "manual-shell is-loading chapter-shell" : "manual-shell chapter-shell"}>
      <header className="manual-header">
        <button className="header-menu" onClick={() => setMenuOpen(true)} aria-label="Open VAILE index"><Menu size={18} /></button>
        <a className="manual-brand" href="#top"><img src={assets.mark} alt="" /><span className="brand-wordmark"><span className="kerning-v">V</span><span className="kerning-a">A</span>ILE</span><small>001</small></a>
        <a className="header-action" href={href} target="_blank" rel="noreferrer"><span>OPEN</span><b>ALLOCATION RECORD</b><ArrowUpRight size={15} /></a>
      </header>
      <AnimatePresence>{menuOpen && <motion.nav className="manual-menu" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.36 }}><div><button onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X size={25} /></button><p>VAILE / DROP 001</p></div><a onClick={() => setMenuOpen(false)} href="#allocation">Allocation</a><a onClick={() => setMenuOpen(false)} href="#gallery">Lookbook</a><a onClick={() => setMenuOpen(false)} href="#fit">Fit</a><a onClick={() => setMenuOpen(false)} href="#build">Build</a><a onClick={() => setMenuOpen(false)} href="#care">Care</a></motion.nav>}</AnimatePresence>

      <section className="manual-hero" id="top"><picture><source media="(max-width: 480px)" srcSet={assets.heroMobile} type="image/webp" /><img src={assets.hero} alt="Black duck canvas pants worn outdoors" fetchPriority="high" decoding="async" /></picture><div className="hero-copy"><p>DROP 001 / 50 PAIRS</p><h1>Made for<br />actual wear.</h1><span>12oz duck canvas / private allocation</span></div><a href="#allocation" className="hero-index">01 — GET THE DETAILS</a></section>

      <div className="manual-stack chapter-stack">
        <section id="allocation" className="chapter chapter-allocation" data-stack-item>
          <div className="allocation-layout"><div className="allocation-copy"><Head index="01" title="One run. Fifty pairs." note="Choose your usual waist. We confirm availability and next steps directly on WhatsApp." /><dl className="allocation-facts"><div><dt>FABRIC</dt><dd>12oz cotton duck canvas</dd></div><div><dt>PRICE</dt><dd>₹6,200 INR / $100 USD</dd></div><div><dt>FORMAT</dt><dd>Private WhatsApp allocation / 50 pairs</dd></div></dl><p className="chapter-bridge">A size starts a note. Availability is confirmed person to person.</p></div><aside className="allocation-card"><p className="card-price-eyebrow">FINAL PRICE / DROP 001</p><div className="card-price-row"><strong>₹6,200 <small>INR</small></strong><span>$100 USD</span></div><p className="card-size-label">SELECT PREFERRED WAIST</p><div className="size-grid" role="radiogroup" aria-label="Preferred waist size">{sizes.map((item) => <button key={item} className={size === item ? "is-selected" : ""} onClick={() => setSize(item)} role="radio" aria-checked={size === item}>{item}</button>)}</div><a className="allocation-record" href={href} target="_blank" rel="noreferrer"><span>RECORD / 001 — WAIST {size}</span><b>OPEN ALLOCATION NOTE</b><ArrowUpRight size={17} /></a><button className="copy-note" onClick={copy}>{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? "COPIED TO CLIPBOARD" : "COPY ALLOCATION NOTE"}</button></aside></div>
        </section>

        <section id="gallery" className="chapter chapter-gallery" data-stack-item><div className="gallery-ribbon"><header className="gallery-header"><div><span>FIELD EVIDENCE / SIX VIEWS</span><h2>Lookbook <em>/ 001</em></h2></div><div className="gallery-controls"><b>FIGURE {shot.id} / 0{shots.length}</b><div><button onClick={() => setActive((active + shots.length - 1) % shots.length)} aria-label="Previous model shot"><ChevronLeft size={16} /></button><button onClick={() => setActive((active + 1) % shots.length)} aria-label="Next model shot"><ChevronRight size={16} /></button></div></div></header><div className="gallery-stage"><AnimatePresence mode="wait"><motion.figure key={shot.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}><picture><source media="(max-width: 640px)" srcSet={shot.mobile} /><img src={shot.desktop} alt={shot.alt} loading="lazy" /></picture><figcaption>SPECIMEN {shot.id} / DROP 001</figcaption></motion.figure></AnimatePresence><div className="gallery-caption"><span>FIG. {shot.id}</span><h3>{shot.title}</h3></div></div><div className="gallery-pills">{shots.map((item, index) => <button key={item.id} className={active === index ? "is-active" : ""} onClick={() => setActive(index)} aria-label={`View figure ${item.id}: ${item.title}`}>{item.id}</button>)}</div></div></section>

        <section id="fit" className="chapter chapter-fit" data-stack-item><div className="fit-layout"><div className="fit-main"><Head index="03" title="Fit, without the guesswork." note="Your preferred waist is a starting point. Ask for exact measurements before allocating." /><div className="fit-list"><article><span>PROFILE</span><b>Relaxed straight leg</b></article><article><span>WEAR TRUE</span><b>Your usual waist for an easy fit</b></article><article><span>SIZE UP</span><b>More room through seat and leg</b></article><article><span>CONFIRM</span><b>Waist / rise / thigh / hem / inseam via WhatsApp</b></article></div></div><figure><img src={assets.side} alt="Side profile of VAILE duck canvas trousers" /><figcaption>MEASURE BEFORE ALLOCATION</figcaption></figure></div></section>

        <section id="build" className="chapter chapter-build" data-stack-item><div className="build-layout"><figure><img src={assets.detail} alt="Canvas pocket, rivet and belt-loop detail" /><figcaption>STRESS POINT / RIVET + POCKET</figcaption></figure><div className="build-copy"><Head index="04" title="The points that take the strain." note="Dense canvas, reinforced stress points, useful storage." /><ol><li><b>Heavy canvas</b><span>Dense 12oz cotton gives the garment a stable hand from day one.</span></li><li><b>Rivet set</b><span>Hardware anchors the stress points that get used the most.</span></li><li><b>Layered pockets</b><span>Practical storage without breaking the line of the leg.</span></li></ol></div></div></section>

        <section id="care" className="chapter chapter-care" data-stack-item><div className="care-layout"><div><Head index="05" title="Keep the wear. Skip the damage." note="Care reference / clean only when needed. The garment label always takes priority." /><p>Duck canvas earns character slowly. Spot clean first; wash cold only when it needs it; skip bleach and high heat.</p></div><ul><li><b>01</b><span>Spot clean first</span></li><li><b>02</b><span>Wash cold, gently</span></li><li><b>03</b><span>Hang dry</span></li><li><b>04</b><span>Iron inside out, warm</span></li></ul><aside className="care-stamp"><span>SPECIMEN CARE / 001</span><b>12OZ COTTON DUCK</b><p>COLD WASH ONLY / DO NOT DRY CLEAN</p></aside></div></section>
      </div>
      <section className="closing-allocation"><p>DROP 001 / 50 PAIRS</p><h2>Choose a waist.<br />Start the note.</h2><div><span>₹6,200 INR / $100 USD</span><a className="allocation-record" href={href} target="_blank" rel="noreferrer"><span>RECORD / 001 — WAIST {size}</span><b>OPEN ALLOCATION NOTE</b><ArrowUpRight size={19} /></a></div></section>
      <footer className="manual-footer"><a href="#top" className="manual-brand"><img src={assets.mark} alt="" /><span className="brand-wordmark"><span className="kerning-v">V</span><span className="kerning-a">A</span>ILE</span><small>001</small></a><div><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link><span>12oz duck canvas</span></div></footer>
    </main>
  </>;
}
