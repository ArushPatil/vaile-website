/* Field Manual direction: grounded product proof, dense useful information, and mobile-first editorial rhythm. */
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const assets = {
  hero: "/images/5-desktop.jpg",
  heroMobile: "/images/vaile-hero-mobile.webp",
  front: "/images/1-desktop.jpg",
  detail: "/images/3-desktop.jpg",
  mark: "/images/logo.png",
};
const sizes = ["30", "32", "34", "36", "38"];

function SectionHead({ number, title, note }: { number: string; title: string; note?: string }) {
  return <div className="section-head"><span>{number}</span><h2>{title}</h2>{note && <p>{note}</p>}</div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("32");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(() => { try { return !sessionStorage.getItem("vaile_has_loaded"); } catch { return false; } });
  const reducedMotion = useReducedMotion();
  const allocationMessage = `VAILE — DROP 001\n\nI would like to request a private allocation.\nPreferred waist: ${selectedSize}\n\nPlease share availability and next steps.`;
  const allocationHref = `https://wa.me/918951066881?text=${encodeURIComponent(allocationMessage)}`;

  useEffect(() => { if (!isLoading) return; const timer = window.setTimeout(() => { setIsLoading(false); try { sessionStorage.setItem("vaile_has_loaded", "1"); } catch {} }, reducedMotion ? 0 : 900); return () => window.clearTimeout(timer); }, [isLoading, reducedMotion]);
  useEffect(() => { document.body.style.overflow = menuOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [menuOpen]);
  const copyNote = async () => { await navigator.clipboard?.writeText(allocationMessage); setCopied(true); window.setTimeout(() => setCopied(false), 1600); };

  return <>
    <AnimatePresence>{isLoading && <motion.div className="manual-loader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .25 }}><img src={assets.mark} alt="" /><span>VAILE / 001</span></motion.div>}</AnimatePresence>
    <main className={isLoading ? "manual-shell is-loading" : "manual-shell"}>
      <header className="manual-header"><button className="header-menu" onClick={() => setMenuOpen(true)} aria-label="Open VAILE index"><Menu size={20} /></button><a className="manual-brand" href="#top"><img src={assets.mark} alt="" /><span>VAILE</span><small>001</small></a><a className="header-action" href={allocationHref} target="_blank" rel="noreferrer"><span>OPEN</span><b>ALLOCATION RECORD</b><ArrowUpRight size={15} /></a></header>
      <AnimatePresence>{menuOpen && <motion.nav className="manual-menu" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: .36 }}><div><button onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X size={25} /></button><p>VAILE / DROP 001</p></div><a onClick={() => setMenuOpen(false)} href="#allocation">Allocation</a><a onClick={() => setMenuOpen(false)} href="#fit">Fit</a><a onClick={() => setMenuOpen(false)} href="#build">Build</a><a onClick={() => setMenuOpen(false)} href="#care">Care</a></motion.nav>}</AnimatePresence>

      <section className="manual-hero" id="top"><picture><source media="(max-width: 480px)" srcSet={assets.heroMobile} type="image/webp" /><img src={assets.hero} alt="Black duck canvas pants worn outdoors" fetchPriority="high" decoding="async" /></picture><div className="hero-copy"><p>DROP 001 / 50 PAIRS</p><h1>Made for<br />actual wear.</h1><span>12oz duck canvas / private allocation</span></div><a href="#allocation" className="hero-index">01 — GET THE DETAILS</a></section>

      <div className="editorial-stack manual-stack">
        <section className="allocation-sheet" id="allocation" data-stack-item><div className="allocation-copy"><SectionHead number="01" title="One run. Fifty pairs." note="Choose your usual waist. We will confirm availability and next steps directly on WhatsApp." /><div className="allocation-facts"><span>FABRIC</span><b>12oz cotton duck canvas</b><span>PRICE</span><b>₹6,200 INR / $100 USD</b><span>FORMAT</span><b>Private allocation</b></div></div><div className="allocation-card"><p>SELECT PREFERRED WAIST</p><div className="size-grid" role="radiogroup" aria-label="Preferred waist size">{sizes.map(size => <button key={size} className={selectedSize === size ? "is-selected" : ""} onClick={() => setSelectedSize(size)} role="radio" aria-checked={selectedSize === size}>{size}</button>)}</div><a className="allocation-record" href={allocationHref} target="_blank" rel="noreferrer"><span>RECORD / 001</span><b>OPEN WHATSAPP NOTE</b><ArrowUpRight size={18} /></a><button className="copy-note" onClick={copyNote}>{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? "COPIED" : "COPY NOTE"}</button></div></section>

        <section className="proof-spread" data-stack-item><div className="proof-image"><img src={assets.front} alt="Full-length outdoor view of black duck canvas pants" /></div><div className="proof-copy"><p className="kicker">THE CUT</p><h2>Easy through<br />the leg. Clear<br />over a shoe.</h2><p>It is a straight, relaxed work pant: enough room to move, enough structure to hold its line. The silhouette is designed to wear in, not pose in.</p><div className="proof-quote">“A uniform should get better with use.”</div></div></section>

        <section className="fit-sheet" id="fit" data-stack-item><SectionHead number="02" title="Fit, without the guesswork." note="Your preferred waist is a starting point. Ask for measurements before allocating." /><div className="fit-list"><article><span>PROFILE</span><b>Relaxed straight leg</b></article><article><span>WEAR TRUE</span><b>Your usual waist for an easy fit</b></article><article><span>SIZE UP</span><b>More room through seat and leg</b></article><article><span>CONFIRM</span><b>Waist / rise / thigh / hem / inseam via WhatsApp</b></article></div></section>

        <section className="build-spread" id="build" data-stack-item><div className="build-copy"><SectionHead number="03" title="The points that take the strain." note="Construction reference / dense canvas, reinforced stress points, useful storage." /><ol><li><b>Heavy canvas</b><span>Dense 12oz cotton gives the garment a stable hand from day one.</span></li><li><b>Rivet set</b><span>Hardware anchors the stress points that get used the most.</span></li><li><b>Layered pockets</b><span>Practical storage without breaking the line of the leg.</span></li></ol></div><div className="build-image"><img src={assets.detail} alt="Canvas pocket, rivet and belt-loop detail" /></div></section>

        <section className="care-sheet" id="care" data-stack-item><div><SectionHead number="04" title="Keep the wear. Skip the damage." note="Care reference / clean only when needed. The garment label always takes priority." /><p>Duck canvas earns character slowly. Spot clean first; wash cold only when it needs it; skip bleach and high heat.</p></div><ul><li><b>01</b><span>Spot clean first</span></li><li><b>02</b><span>Wash cold, gently</span></li><li><b>03</b><span>Hang dry</span></li><li><b>04</b><span>Iron inside out, warm</span></li></ul></section>
      </div>
      <section className="closing-allocation"><p>DROP 001 / 50 PAIRS</p><h2>Choose a waist.<br />Start the note.</h2><a className="allocation-record" href={allocationHref} target="_blank" rel="noreferrer"><span>RECORD / 001</span><b>OPEN ALLOCATION NOTE</b><ArrowUpRight size={19} /></a></section>
      <footer className="manual-footer"><a href="#top" className="manual-brand"><img src={assets.mark} alt="" /><span>VAILE</span><small>001</small></a><div><a href="/terms">Terms</a><a href="/privacy">Privacy</a><span>12oz duck canvas</span></div></footer>
    </main>
  </>;
}
