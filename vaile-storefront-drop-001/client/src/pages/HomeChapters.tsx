/* Field Manual chapters: a continuous workwear narrative with desktop-only stack sheets and a deliberate mobile reading flow. */
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Copy, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

const assets = { hero: "/images/5.webp", heroMobile: "/images/vaile-hero-mobile.webp", front: "/images/1.webp", side: "/images/2.webp", detail: "/images/3.webp", mark: "/images/logo.png" };
const shots = [
  { id: "01", title: "FRONT PROFILE", insight: "A relaxed straight leg. Enough room to move, enough structure to hold its line. Designed to wear in, not pose in.", desktop: "/images/1.webp", mobile: "/images/1.webp", alt: "VAILE Drop 001 black duck canvas pants front full standing view" },
  { id: "02", title: "LATERAL DRAPE", insight: "Wear true to size for an easy fit. The side profile maintains a clean, straight fall with a natural break over the shoe.", desktop: "/images/2.webp", mobile: "/images/2.webp", alt: "VAILE Drop 001 black duck canvas pants side profile view" },
  { id: "03", title: "HARDWARE & POCKETS", insight: "Dense 12oz duck canvas with layered storage. Rivet hardware anchors the high-stress points without breaking the line of the leg.", desktop: "/images/3.webp", mobile: "/images/3.webp", alt: "VAILE Drop 001 canvas pocket and rivet hardware" },
  { id: "04", title: "FIELD STRIDE", insight: "The uniform gets better with use. The heavy canvas earns character slowly, starting stable and softening at flex points.", desktop: "/images/10_warm.webp", mobile: "/images/10_warm.webp", alt: "VAILE Drop 001 black duck canvas pants field movement view" },
  { id: "05", title: "SEATED BREAK", insight: "The pattern is engineered to prevent restriction during heavy movement, maintaining comfort through the seat and thigh without needing to size up.", desktop: "/images/6.webp", mobile: "/images/6.webp", alt: "VAILE Drop 001 seated canvas break" },
  { id: "06", title: "STRIDE IN MOTION", insight: "Clear over a shoe. The hem width is calibrated to fall naturally across boots and sneakers alike, avoiding artificial taper.", desktop: "/images/9.webp", mobile: "/images/9.webp", alt: "VAILE Drop 001 walking silhouette" },
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

  useEffect(() => { if (!loading) return; const t = window.setTimeout(() => { setLoading(false); try { sessionStorage.setItem("vaile_has_loaded", "1"); } catch {} }, reducedMotion ? 0 : 900); return () => window.clearTimeout(t); }, [loading, reducedMotion]);
  useEffect(() => { document.body.style.overflow = menuOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [menuOpen]);
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
        <a className="header-action" href={href} target="_blank" rel="noreferrer"><span>OPEN</span><b>ALLOCATION RECORD</b><ArrowUpRight size={15} /></a>
      </header>
      <AnimatePresence>{menuOpen && <motion.nav className="manual-menu" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.36 }}><div><button onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X size={25} /></button><p>VAILE / DROP 001</p></div><a onClick={() => setMenuOpen(false)} href="#allocation">Allocation</a><a onClick={() => setMenuOpen(false)} href="#gallery">Lookbook</a><a onClick={() => setMenuOpen(false)} href="#sizing">Size Chart</a><a onClick={() => setMenuOpen(false)} href="#care">Care</a></motion.nav>}</AnimatePresence>

      <section className="manual-hero" id="top"><picture><source media="(max-width: 480px)" srcSet={assets.heroMobile} type="image/webp" /><img src={assets.hero} alt="Black duck canvas pants worn outdoors" fetchPriority="high" decoding="async" /></picture><div className="hero-copy"><p>DROP 001 / 50 PAIRS</p><h1>Made for<br />actual wear.</h1><span>12oz duck canvas / private allocation</span></div><a href="#allocation" className="hero-index">01 — GET THE DETAILS</a></section>

        <section id="allocation" className="chapter chapter-allocation">
          <div className="allocation-layout"><div className="allocation-copy"><Head index="01" title="One run. Fifty pairs." note="Choose your usual waist. We confirm availability and next steps directly on WhatsApp." /><dl className="allocation-facts"><div><dt>FABRIC</dt><dd>12oz cotton duck canvas</dd></div><div><dt>PRICE</dt><dd>₹6,200 INR / $100 USD</dd></div><div><dt>FORMAT</dt><dd>Private WhatsApp allocation / 50 pairs</dd></div></dl><p className="chapter-bridge">A size starts a note. Availability is confirmed person to person.</p></div><aside className="allocation-card"><p className="card-price-eyebrow">FINAL PRICE / DROP 001</p><div className="card-price-row"><strong>₹6,200 <small>INR</small></strong><span>$100 USD</span></div><p className="card-size-label">SELECT PREFERRED WAIST</p><div className="size-grid" role="radiogroup" aria-label="Preferred waist size">{sizes.map((item) => <button key={item} className={size === item ? "is-selected" : ""} onClick={() => setSize(item)} role="radio" aria-checked={size === item} aria-label={`Waist size ${item}`}>{item}</button>)}</div><a className="allocation-record" href={href} target="_blank" rel="noopener noreferrer" aria-label="Send allocation request on WhatsApp (opens in new tab)"><span>RECORD / 001 — WAIST {size}</span><b>SEND REQUEST</b><ArrowUpRight size={17} /></a><button className="copy-note" onClick={copy}>{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? "COPIED TO CLIPBOARD" : "COPY REQUEST NOTE"}</button></aside></div>
        </section>

        <section id="gallery" className="chapter chapter-gallery"><div className="gallery-ribbon"><header className="gallery-header"><div><span>02 — FIELD EVIDENCE / SIX VIEWS</span><h2>Lookbook <em>/ 001</em></h2></div><div className="gallery-controls"><b>FIGURE {shot.id} / 0{shots.length}</b><div><button onClick={() => setActive((active + shots.length - 1) % shots.length)} aria-label="Previous model shot"><ChevronLeft size={16} /></button><button onClick={() => setActive((active + 1) % shots.length)} aria-label="Next model shot"><ChevronRight size={16} /></button></div></div></header><div className="gallery-stage"><div className="gallery-figure-wrap" style={{ backgroundColor: "var(--stock)" }}><AnimatePresence mode="wait"><motion.figure key={shot.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2} onDragEnd={(e, { offset, velocity }) => { const swipe = Math.abs(offset.x) * velocity.x; if (swipe < -100) setActive((active + 1) % shots.length); else if (swipe > 100) setActive((active + shots.length - 1) % shots.length); }}><picture><source media="(max-width: 640px)" srcSet={shot.mobile} /><img src={shot.desktop} alt={shot.alt} loading="lazy" /></picture><figcaption>SPECIMEN {shot.id} / DROP 001</figcaption></motion.figure></AnimatePresence></div><div className="gallery-caption" aria-live="polite"><div><span>FIG. {shot.id}</span><h3>{shot.title}</h3></div><p>{shot.insight}</p></div></div><div className="gallery-pills">{shots.map((item, index) => <button key={item.id} className={active === index ? "is-active" : ""} onClick={() => setActive(index)} aria-label={`View figure ${item.id}: ${item.title}`}>{item.id}</button>)}</div></div></section>

        <section id="sizing" className="chapter chapter-sizing"><div className="sizing-layout"><div className="sizing-copy"><Head index="03" title="Engineered dimensions." note="All measurements taken flat. We recommend comparing these against a well-fitting pair of your own trousers." /></div><div className="sizing-table-wrap"><div className="sizing-controls"><button className={unit === "IN" ? "is-active" : ""} onClick={() => setUnit("IN")}>INCHES</button><button className={unit === "CM" ? "is-active" : ""} onClick={() => setUnit("CM")}>CENTIMETERS</button></div><table className="sizing-table"><thead><tr><th>SIZE</th><th>WAIST</th><th>RISE</th><th>THIGH</th><th>KNEE</th><th>HEM</th><th>INSEAM</th></tr></thead><tbody>{Object.entries(measurements).map(([s, m]) => <tr key={s}><td>{s}{s === "38" && " (LOW STOCK)"}</td><td>{fmt(m.waist)}</td><td>{fmt(m.rise)}</td><td>{fmt(m.thigh)}</td><td>{fmt(m.knee)}</td><td>{fmt(m.hem)}</td><td>{fmt(m.inseam)}</td></tr>)}</tbody></table><p className="sizing-unit-note">MEASUREMENTS IN {unit === "IN" ? "INCHES" : "CENTIMETERS"}. TOLERANCE +/- {unit === "IN" ? "0.5" : "1.3"}</p></div></div></section>

        <section id="care" className="chapter chapter-care"><div className="care-layout"><div><Head index="04" title="Keep the wear. Skip the damage." note="Care reference / clean only when needed." /><p>Duck canvas earns character slowly. Spot clean first; wash cold only when it needs it; hang dry. Skip bleach and high heat.</p></div><ul><li><b>01</b><span>Spot clean first</span></li><li><b>02</b><span>Wash cold, gently</span></li><li><b>03</b><span>Hang dry</span></li><li><b>04</b><span>Iron inside out, warm</span></li></ul><aside className="care-stamp"><span>SPECIMEN CARE / 001</span><b>12OZ COTTON DUCK</b><p>COLD WASH ONLY / DO NOT DRY CLEAN</p></aside></div></section>
      <section className="closing-allocation"><p>DROP 001 / 50 PAIRS</p><h2>Choose a waist.<br />Start the note.</h2><div><span>₹6,200 INR / $100 USD</span><a className="allocation-record" href={href} target="_blank" rel="noopener noreferrer" aria-label="Send allocation request on WhatsApp (opens in new tab)"><span>RECORD / 001 — WAIST {size}</span><b>SEND REQUEST</b><ArrowUpRight size={19} /></a></div></section>
      <footer className="manual-footer"><a href="/" className="manual-brand"><img src={assets.mark} alt="VAILE logo" /><span className="brand-wordmark"><span className="kerning-v">V</span><span className="kerning-a">A</span>ILE</span><small>001</small></a><div><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link><span>12oz duck canvas</span></div></footer>
    </main>
  </>;
}
