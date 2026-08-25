/* VAILE Field Manual: a continuous workwear narrative where each section obeys shared Swiss-grid anchors and mobile product proof stays image-first. */
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Copy, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

const assets = { hero: "/images/5.webp", heroMobile: "/images/vaile-hero-mobile.webp", front: "/images/1.webp", side: "/images/2.webp", detail: "/images/3.webp", mark: "/images/logo.png" };
const shots = [
  { id: "01", title: "FRONT PROFILE", proof: "SILHOUETTE", detail: "Relaxed straight leg / natural break", insight: "Enough room to move, enough structure to hold its line. Designed to wear in, not pose in.", desktop: "/images/1.webp", mobile: "/images/1.webp", alt: "VAILE Drop 001 black duck canvas pants front full standing view" },
  { id: "02", title: "LATERAL DRAPE", proof: "FIT", detail: "Wear true to size / clean side fall", insight: "The side profile maintains a steady fall through the leg with room to move and a clean break over the shoe.", desktop: "/images/2.webp", mobile: "/images/2.webp", alt: "VAILE Drop 001 black duck canvas pants side profile view" },
  { id: "03", title: "HARDWARE & POCKETS", proof: "CONSTRUCTION", detail: "Layered storage / reinforced stress points", insight: "Dense 12oz duck canvas and rivet hardware give the utility pockets structure without breaking the line of the trouser.", desktop: "/images/3.webp", mobile: "/images/3.webp", alt: "VAILE Drop 001 canvas pocket and rivet hardware" },
  { id: "04", title: "FIELD STRIDE", proof: "MATERIAL", detail: "12oz duck canvas / character through wear", insight: "The canvas begins stable, then softens gradually at the flex points. It earns character through use rather than surface treatment.", desktop: "/images/10_warm.webp", mobile: "/images/10_warm.webp", alt: "VAILE Drop 001 black duck canvas pants field movement view" },
  { id: "05", title: "SEATED BREAK", proof: "MOBILITY", detail: "Seat and thigh room / no forced sizing up", insight: "The pattern holds comfort through the seat and thigh during long wear without asking you to size up for movement.", desktop: "/images/6.webp", mobile: "/images/6.webp", alt: "VAILE Drop 001 seated canvas break" },
  { id: "06", title: "STRIDE IN MOTION", proof: "HEM", detail: "Clear over footwear / no artificial taper", insight: "The hem is calibrated to fall naturally across boots and sneakers, retaining a clear opening without collapsing around the shoe.", desktop: "/images/9.webp", mobile: "/images/9.webp", alt: "VAILE Drop 001 walking silhouette" },
];
const sizes = ["30", "32", "34", "36", "38"];

function Head({ index, title, note }: { index: string; title: string; note: string }) {
  return <header className="chapter-head"><span>{index}</span><div><h2>{title}</h2><p>{note}</p></div></header>;
}

export default function HomeChapters() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState("32");
  const [active, setActive] = useState(0);
  const [showGalleryInfo, setShowGalleryInfo] = useState(false);
  const [galleryTransitioning, setGalleryTransitioning] = useState(false);
  const activeGalleryRef = useRef(0);
  const galleryTransitionRef = useRef(false);
  const [copied, setCopied] = useState(false);
  const [unit, setUnit] = useState<"IN" | "CM">("IN");
  const [loading, setLoading] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    try { return !sessionStorage.getItem("vaile_has_loaded"); } catch { return false; }
  });

  const measurements = {
    "30": { waist: 31.0, rise: 11.5, thigh: 12.5, knee: 9.5, hem: 8.5, inseam: 32 },
    "32": { waist: 33.0, rise: 12.0, thigh: 13.0, knee: 9.75, hem: 8.75, inseam: 32 },
    "34": { waist: 35.0, rise: 12.5, thigh: 13.5, knee: 10.0, hem: 9.0, inseam: 32 },
    "36": { waist: 37.0, rise: 13.0, thigh: 14.0, knee: 10.5, hem: 9.25, inseam: 32 },
    "38": { waist: 39.0, rise: 13.5, thigh: 14.5, knee: 11.0, hem: 9.5, inseam: 32 },
  };

  const fmt = (val: number) => unit === "CM" ? (val * 2.54).toFixed(1) : val.toString().includes('.') ? val.toFixed(2).replace(/0$/, '') : val.toString();
  const reducedMotion = useReducedMotion();
  const message = `VAILE — DROP 001\n\nI would like to request a private allocation.\nPreferred waist: ${size}\nPrice: ₹6,200 INR / $100 USD\n\nPlease share availability and next steps.`;
  const href = `https://wa.me/918951066881?text=${encodeURIComponent(message)}`;
  const shot = shots[active];
  const gallerySource = (index: number) => {
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches) return shots[index].mobile;
    return shots[index].desktop;
  };
  const preloadGalleryImage = (index: number) => new Promise<void>((resolve) => {
    if (typeof window === "undefined") { resolve(); return; }
    const image = new Image();
    let settled = false;
    const complete = () => {
      if (settled) return;
      settled = true;
      if (typeof image.decode === "function") image.decode().catch(() => undefined).finally(resolve);
      else resolve();
    };
    image.onload = complete;
    image.onerror = () => resolve();
    image.src = gallerySource(index);
    if (image.complete) complete();
  });
  const selectGallery = async (index: number) => {
    if (galleryTransitionRef.current || index === activeGalleryRef.current) return;
    galleryTransitionRef.current = true;
    setGalleryTransitioning(true);
    await preloadGalleryImage(index);
    activeGalleryRef.current = index;
    setShowGalleryInfo(false);
    setActive(index);
    window.setTimeout(() => { galleryTransitionRef.current = false; setGalleryTransitioning(false); }, reducedMotion ? 0 : 220);
  };
  const moveGallery = (direction: 1 | -1) => {
    const next = (activeGalleryRef.current + direction + shots.length) % shots.length;
    void selectGallery(next);
  };

  useEffect(() => { if (!loading) return; const t = window.setTimeout(() => { setLoading(false); try { sessionStorage.setItem("vaile_has_loaded", "1"); } catch {} }, reducedMotion ? 0 : 900); return () => window.clearTimeout(t); }, [loading, reducedMotion]);
  useEffect(() => { document.body.style.overflow = menuOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [menuOpen]);
  useEffect(() => {
    activeGalleryRef.current = active;
    const next = (active + 1) % shots.length;
    const previous = (active + shots.length - 1) % shots.length;
    void preloadGalleryImage(next);
    void preloadGalleryImage(previous);
  }, [active]);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      toast.success("Request template copied to clipboard.");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error("Failed to copy. Please manually copy the message or use the WhatsApp link directly.");
    }
  };

  return <>
    <AnimatePresence>{loading && <motion.div className="manual-loader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}><img src={assets.mark} alt="" /><span>VAILE / 001</span></motion.div>}</AnimatePresence>
    <main className={loading ? "manual-shell is-loading chapter-shell" : "manual-shell chapter-shell"}>
      <header className="manual-header">
        <button className="header-menu" onClick={() => setMenuOpen(true)} aria-label="Open VAILE index"><Menu size={18} /></button>
        <a className="manual-brand" href="#top"><img src={assets.mark} alt="" /><span className="brand-wordmark"><span className="kerning-v">V</span><span className="kerning-a">A</span>ILE</span><small>001</small></a>
        <a className="header-action" href={href} target="_blank" rel="noreferrer" aria-label="Open a VAILE allocation inquiry on WhatsApp"><b>ALLOCATION INQUIRY</b><ArrowUpRight size={15} /></a>
      </header>
      <AnimatePresence>{menuOpen && <motion.nav className="manual-menu" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.36 }}><div><button onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X size={25} /></button><p>VAILE / DROP 001</p></div><a onClick={() => setMenuOpen(false)} href="#allocation">Allocation</a><a onClick={() => setMenuOpen(false)} href="#gallery">Lookbook</a><a onClick={() => setMenuOpen(false)} href="#sizing">Size Chart</a><a onClick={() => setMenuOpen(false)} href="#care">Care</a></motion.nav>}</AnimatePresence>

      <section className="manual-hero" id="top"><picture><source media="(max-width: 480px)" srcSet={assets.heroMobile} type="image/webp" /><img src={assets.hero} alt="Black duck canvas pants worn outdoors" fetchPriority="high" decoding="async" /></picture><div className="hero-copy"><p>DROP 001 / ONLY 50 PAIRS</p><h1>Made for<br />actual wear.</h1><span>12oz duck canvas / private allocation</span></div><a href="#allocation" className="hero-index"><span>GET THE DETAILS</span><span className="hero-index__arrow" aria-hidden="true">↓</span></a></section>

        <section id="allocation" className="chapter chapter-allocation">
          <div className="allocation-layout"><div className="allocation-copy"><header className="allocation-head"><span>01</span><h2>One run. Fifty pairs.</h2><p>Choose your usual waist. We confirm availability and next steps directly on WhatsApp.</p></header><dl className="allocation-facts"><div><dt>FABRIC</dt><dd>12oz duck canvas double knee pants</dd></div><div><dt>HARDWARE</dt><dd>Solid brass hardware on stress points</dd></div><div><dt>FIT</dt><dd>Proprietary relaxed straight fit</dd></div></dl></div><aside className="allocation-card"><p className="card-price-eyebrow">FINAL PRICE / DROP 001</p><div className="card-price-row"><strong>₹6,200 <small>INR</small></strong><span>$100 USD</span></div><p className="card-size-label">SELECT PREFERRED WAIST</p><div className="size-grid" role="radiogroup" aria-label="Preferred waist size">{sizes.map((item) => <button key={item} className={size === item ? "is-selected" : ""} onClick={() => setSize(item)} role="radio" aria-checked={size === item} aria-label={`Waist size ${item}`}>{item}</button>)}</div><a className="allocation-record" href={href} target="_blank" rel="noopener noreferrer" aria-label="Send allocation request on WhatsApp (opens in new tab)"><span>RECORD / 001 — WAIST {size}</span><b>SEND REQUEST</b><ArrowUpRight size={17} /></a><button className="copy-note" onClick={copy}>{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? "COPIED TO CLIPBOARD" : "COPY REQUEST NOTE"}</button></aside></div>
        </section>

        <section id="gallery" className="chapter chapter-gallery"><div className="gallery-ribbon"><header className="gallery-header"><div><span><b>02</b><i> — FIELD EVIDENCE / SIX VIEWS</i></span><h2>Lookbook <em>/ 001</em></h2></div><b className="gallery-figure-count">FIGURE {shot.id} / 0{shots.length}</b></header><div className="gallery-stage"><div className="gallery-figure-wrap" aria-busy={galleryTransitioning}><AnimatePresence initial={false}><motion.figure key={`image-${shot.id}`} className={showGalleryInfo ? "is-hidden" : ""} initial={{ opacity: 0 }} animate={{ opacity: showGalleryInfo ? 0 : 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.2 }} drag={showGalleryInfo || galleryTransitioning ? false : "x"} dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2} onDragEnd={(e, { offset, velocity }) => { const swipe = Math.abs(offset.x) * velocity.x; if (swipe < -100) moveGallery(1); else if (swipe > 100) moveGallery(-1); }}><picture><source media="(max-width: 640px)" srcSet={shot.mobile} type="image/webp" /><img src={shot.desktop} alt={shot.alt} width="1333" height="2000" loading="lazy" decoding="async" /></picture><figcaption>FRAME {shot.id} / DROP 001</figcaption></motion.figure></AnimatePresence><AnimatePresence>{showGalleryInfo && <motion.aside key={`info-${shot.id}`} className="gallery-mobile-info" aria-label={`${shot.title} product information`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.18 }}><button type="button" className="gallery-info-toggle" onClick={() => setShowGalleryInfo(false)} aria-label="Hide product information"><span aria-hidden="true">i</span><b>TAP TO HIDE</b></button><div className="gallery-mobile-info__copy"><span>{shot.proof} / {shot.id}</span><h3>{shot.title}</h3><p>{shot.insight}</p></div><dl><div><dt>READING</dt><dd>{shot.detail}</dd></div><div><dt>DROP</dt><dd>001 / 50 PAIRS</dd></div></dl></motion.aside>}</AnimatePresence>{!showGalleryInfo && <button type="button" className="gallery-info-toggle" onClick={() => setShowGalleryInfo(true)} aria-label={`Show information for ${shot.title}`} aria-expanded="false"><span aria-hidden="true">i</span><b>TAP FOR MORE INFO</b></button>}<div className={`gallery-mobile-nav${showGalleryInfo ? " is-concealed" : ""}`}><button type="button" onClick={moveGallery.bind(null, -1)} disabled={galleryTransitioning} aria-label="Previous lookbook view"><ChevronLeft size={16} /></button><button type="button" onClick={moveGallery.bind(null, 1)} disabled={galleryTransitioning} aria-label="Next lookbook view"><ChevronRight size={16} /></button></div></div><aside className="gallery-dossier" aria-live="polite"><div><span>{shot.proof} / {shot.id}</span><h3>{shot.title}</h3><p>{shot.insight}</p></div><dl><div><dt>READING</dt><dd>{shot.detail}</dd></div><div><dt>DROP</dt><dd>001 / 50 PAIRS</dd></div></dl><div className="gallery-controls"><button onClick={moveGallery.bind(null, -1)} disabled={galleryTransitioning} aria-label="Previous model shot"><ChevronLeft size={16} /><span>PREVIOUS</span></button><button onClick={moveGallery.bind(null, 1)} disabled={galleryTransitioning} aria-label="Next model shot"><span>NEXT</span><ChevronRight size={16} /></button></div></aside></div><div className="gallery-pills">{shots.map((item, index) => <button key={item.id} className={active === index ? "is-active" : ""} onClick={() => void selectGallery(index)} disabled={galleryTransitioning} aria-label={`View figure ${item.id}: ${item.title}`}><span>{item.id}</span><small>{item.proof}</small></button>)}</div></div></section>

        <section id="sizing" className="chapter chapter-sizing"><div className="sizing-layout"><header className="sizing-copy"><span>03</span><h2>Engineered dimensions.</h2><p>All measurements taken flat. We recommend comparing these against a well-fitting pair of your own trousers.</p><div className="sizing-controls"><button className={unit === "IN" ? "is-active" : ""} onClick={() => setUnit("IN")}>INCHES</button><button className={unit === "CM" ? "is-active" : ""} onClick={() => setUnit("CM")}>CENTIMETERS</button></div><p className="sizing-unit-note sizing-unit-note--desktop">MEASUREMENTS IN {unit === "IN" ? "INCHES" : "CENTIMETERS"}. TOLERANCE +/- {unit === "IN" ? "0.5" : "1.3"}</p></header><div className="sizing-tile-ledger" aria-label={`Full ${unit === "IN" ? "inch" : "centimeter"} garment measurements`}><p>FULL GRADE / {unit === "IN" ? "INCHES" : "CENTIMETERS"}</p>{Object.entries(measurements).map(([s, m]) => <article key={s}><header><b>{s}</b><span>{s === "38" ? "LOW STOCK" : "WAIST"} {fmt(m.waist)}</span></header><dl><div><dt>RISE</dt><dd>{fmt(m.rise)}</dd></div><div><dt>THIGH</dt><dd>{fmt(m.thigh)}</dd></div><div><dt>KNEE</dt><dd>{fmt(m.knee)}</dd></div><div><dt>HEM</dt><dd>{fmt(m.hem)}</dd></div><div><dt>INSEAM</dt><dd>{fmt(m.inseam)}</dd></div></dl></article>)}</div><p className="sizing-unit-note sizing-unit-note--mobile">MEASUREMENTS IN {unit === "IN" ? "INCHES" : "CENTIMETERS"}. TOLERANCE +/- {unit === "IN" ? "0.5" : "1.3"}</p></div></section>

        <section id="care" className="chapter chapter-care"><div className="care-layout"><div className="care-copy"><header className="care-header"><span>04</span><h2>Keep the wear. Skip the damage.</h2><p>Care reference / clean only when needed.</p></header><p className="care-intro">Duck canvas earns character slowly. Spot clean first; wash cold only when it needs it; hang dry. Skip bleach and high heat.</p></div><aside className="care-stamp"><span>SPECIMEN CARE / 001</span><b>12OZ COTTON DUCK</b><p>COLD WASH ONLY / DO NOT DRY CLEAN</p></aside><ul><li><b>01</b><span>Spot clean first</span></li><li><b>02</b><span>Wash cold, gently</span></li><li><b>03</b><span>Hang dry</span></li><li><b>04</b><span>Iron inside out, warm</span></li></ul></div></section>
      <section className="closing-allocation"><p>DROP 001 / 50 PAIRS</p><h2>Choose a waist.<br />Start the note.</h2><div><span>₹6,200 INR / $100 USD</span><a className="allocation-record" href={href} target="_blank" rel="noopener noreferrer" aria-label="Send allocation request on WhatsApp (opens in new tab)"><span>RECORD / 001 — WAIST {size}</span><b>SEND REQUEST</b><ArrowUpRight size={19} /></a></div></section>
      <footer className="manual-footer"><a href="/" className="manual-brand"><img src={assets.mark} alt="VAILE logo" /><span className="brand-wordmark"><span className="kerning-v">V</span><span className="kerning-a">A</span>ILE</span><small>001</small></a><div><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link><span>12oz duck canvas</span></div></footer>
    </main>
  </>;
}
