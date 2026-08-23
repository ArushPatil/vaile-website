/**
 * Vaile Quarry Specimen: a measured alternating dark–light editorial rhythm,
 * with Cairn Teal signals, local paper fragments, and low-key scroll scene transitions.
 */
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const assets = {
  hero: "/images/5-desktop.jpg",
  lookOne: "/images/1-desktop.jpg",
  closeOne: "/images/3-desktop.jpg",
  mark: "/images/logo.png",
  archiveStamp: "/images/logo.png",
  paperScrap: "/images/4-desktop.jpg",
};

const sizes = ["30", "32", "34", "36", "38"];
const navItems = [
  { label: "Details", href: "#details" },
  { label: "Fit", href: "#fit" },
  { label: "Care", href: "#care" },
];

const campaignSlots = [
  { index: "01", category: "CAMPAIGN CONTACT / EXTERIOR", title: "Unexposed Field", note: "Exterior contact plate / held in the archive", tone: "stone", plate: "PLATE / 6×7 / 01" },
  { index: "02", category: "STUDIO CONTACT / MODEL", title: "Unexposed Studio", note: "Studio contact plate / held in the archive", tone: "paper", plate: "PLATE / 6×7 / 02" },
  { index: "03", category: "CONSTRUCTION CONTACT / DETAIL", title: "Unexposed Detail", note: "Material contact plate / held in the archive", tone: "charcoal", plate: "PLATE / 6×7 / 03" },
];

const campaignSlideVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 26 : -26 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -26 : 26 }),
};

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.14, margin: "0px 0px -7% 0px" });
  return <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }} transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}>{children}</motion.div>;
}

function ScrollScene({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  return <div className={`scroll-scene ${className}`} data-stack-item><motion.div className="scroll-scene__motion" initial={reduceMotion ? false : { opacity: 0.88, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.14 }} transition={{ duration: 0.72, ease: [0.23, 1, 0.32, 1] }}>{children}</motion.div></div>;
}

function SectionLabel({ index, label, dark = false }: { index: string; label: string; dark?: boolean }) {
  return <div className={`section-label ${dark ? "section-label--light" : ""}`}><span>{index}</span><span className="section-label__rule" /><span>{label}</span></div>;
}

function useHashScroll() {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>("a[href^='#']");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#" || href.length <= 1) return;
      try {
        const destination = document.querySelector(href);
        if (!destination) return;
        event.preventDefault();
        destination.scrollIntoView({ behavior: "smooth", block: "start" });
      } catch (_) {}
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("32");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(() => {
    try {
      return !sessionStorage.getItem("vaile_has_loaded");
    } catch (_) {
      return false;
    }
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCampaignSlide, setActiveCampaignSlide] = useState(0);
  const [campaignDirection, setCampaignDirection] = useState(1);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  useHashScroll();

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (!isLoading) return;

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => {
      setIsLoading(false);
      try { sessionStorage.setItem("vaile_has_loaded", "1"); } catch (_) {}
    }, reduced ? 0 : 1200);

    return () => window.clearTimeout(timer);
  }, [isLoading]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const allocationMessage = `VAILE — DROP 001\n\nI would like to request a private allocation.\nPreferred waist: ${selectedSize}\n\nPlease share availability and next steps.`;
  const allocationHref = `https://wa.me/918951066881?text=${encodeURIComponent(allocationMessage)}`;
  const moveCampaignSlide = (direction: 1 | -1) => { setCampaignDirection(direction); setActiveCampaignSlide((current) => (current + direction + campaignSlots.length) % campaignSlots.length); };
  const copyAllocationMessage = async () => { await navigator.clipboard?.writeText(allocationMessage); setCopied(true); window.setTimeout(() => setCopied(false), 1800); };
  const positionArchiveCrosshair = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    event.currentTarget.style.setProperty("--pointer-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
  };

  return <>
    <AnimatePresence>{isLoading && <motion.div className="page-loader" role="status" aria-label="Loading Vaile" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.42, ease: [0.23, 1, 0.32, 1] } }}><motion.div className="page-loader__core" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.48, ease: [0.23, 1, 0.32, 1] }}><div className="page-loader__mark-wrap"><img src={assets.mark} alt="" className="page-loader__mark" /></div><p>VAILE</p><span>DROP 001 / 12 OZ DUCK CANVAS</span><div className="page-loader__line"><i /></div></motion.div></motion.div>}</AnimatePresence>
    <motion.main className={isLoading ? "site-shell is-loading" : "site-shell"} initial={{ opacity: 0 }} animate={{ opacity: isLoading ? 0 : 1 }} transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}><a href="#top" className="brand-lockup" aria-label="Vaile home"><img src={assets.mark} alt="" className="brand-mark" /><span className="brand-name"><span className="brand-name__v">V</span>AILE</span><small>/ 001</small></a><nav className="desktop-nav" aria-label="Primary navigation">{navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav><a href={allocationHref} target="_blank" rel="noreferrer" className="header-allocation"><span>REQUEST ALLOCATION / WHATSAPP</span><ArrowUpRight size={14} strokeWidth={1.5} /></a><button className="menu-trigger" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={23} strokeWidth={1.5} /></button></header>
      <a href={allocationHref} target="_blank" rel="noreferrer" className="mobile-allocation"><span>REQUEST ALLOCATION</span><ArrowUpRight size={14} strokeWidth={1.5} /></a>
      <AnimatePresence>{menuOpen && <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.24 }}><div className="mobile-menu__top"><div className="brand-lockup brand-lockup--light"><img src={assets.mark} alt="" className="brand-mark brand-mark--light" /><span className="brand-name"><span className="brand-name__v">V</span>AILE</span><small>/ 001</small></div><button onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={28} strokeWidth={1.5} /></button></div><div className="mobile-menu__links">{[...navItems, { label: "Allocation", href: "#allocation" }].map((item, index) => <motion.a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + index * 0.07, duration: 0.45 }}><span>0{index + 1}</span>{item.label}</motion.a>)}</div><p>DROP 001 / 50 PIECES ONLY</p></motion.div>}</AnimatePresence>

      <section className="hero" id="top"><img src={assets.hero} alt="Low-angle campaign view of the black duck canvas pants" className="hero__image" /><div className="hero__veil" /><div className="hero__topline"><span>DROP 001</span><span>12 OZ DUCK CANVAS</span><span>EDITION OF 50</span></div><div className="hero__imprint"><img src={assets.mark} alt="" /><span>VAILE / ARCHIVE 001</span></div><div className="hero__content"><p className="eyebrow eyebrow--light">A PRIVATE WORKWEAR STUDY</p><h1>BUILT FOR THE<br /><em>WEAR</em> YOU<br />HAVEN’T MET YET.</h1><a href={allocationHref} target="_blank" rel="noreferrer" className="hero__cta">REQUEST ALLOCATION / WHATSAPP <ArrowUpRight size={20} strokeWidth={1.3} /></a><a href="#allocation" className="hero__scroll-cue"><span>SEE PRICE + SIZE</span><ArrowDown size={15} strokeWidth={1.4} /></a></div></section>

      <div className="editorial-stack">
      <ScrollScene><section className="allocation allocation--early" id="allocation"><div className="allocation__top"><Reveal><SectionLabel index="01" label="PRIVATE ALLOCATION" /></Reveal><Reveal delay={0.08}><p className="allocation__pre">A considered purchase.<br />A direct conversation.</p></Reveal></div><div className="allocation__grid"><Reveal className="allocation__statement" delay={0.1}><h2>Choose your<br /><em>size.</em></h2><p>DROP 001 is limited to 50 pieces. Select a preferred waist, then open a private allocation note for availability and next steps.</p><div className="allocation__edition-line"><span>EDITION</span><strong>01 / 50</strong></div></Reveal><Reveal className="allocation__panel" delay={0.16}><div className="allocation__panel-top"><span>VAILE / DROP 001</span><span>PRIVATE ALLOCATION</span></div><div className="allocation__price"><span>FINAL PRICE</span><strong>₹6,200 INR <small>/ $100 USD</small></strong></div><p className="allocation__label">PREFERRED WAIST</p><div className="size-grid" role="radiogroup" aria-label="Preferred waist size">{sizes.map((size) => <button key={size} type="button" className={selectedSize === size ? "size-option is-selected" : "size-option"} onClick={() => setSelectedSize(size)} role="radio" aria-checked={selectedSize === size}>{size}</button>)}</div><p className="allocation__fineprint">Your preference is not a reservation. Final availability is confirmed in the private allocation conversation.</p><a href={allocationHref} target="_blank" rel="noreferrer" className="allocation__button"><span>OPEN ALLOCATION NOTE</span><ArrowUpRight size={18} strokeWidth={1.4} /></a><button type="button" className="copy-button" onClick={copyAllocationMessage}>{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? "NOTE COPIED" : "COPY ALLOCATION NOTE"}</button></Reveal></div></section></ScrollScene>

      <ScrollScene><section className="campaign-gallery campaign-gallery--dark" id="campaign"><div className="campaign-gallery__head"><Reveal><SectionLabel index="02" label="CAMPAIGN INDEX" dark /></Reveal><Reveal delay={0.08}><p>A contact-sheet index for campaign, studio, and construction studies.</p></Reveal></div><Reveal className="campaign-gallery__carousel" delay={0.12}><div className="campaign-carousel" role="region" aria-roledescription="carousel" aria-label="Vaile campaign archive"><div className="campaign-carousel__track" aria-live="polite"><AnimatePresence initial={false} mode="wait" custom={campaignDirection}>{(() => { const slot = campaignSlots[activeCampaignSlide]; return <motion.article key={slot.index} className={`campaign-slot campaign-slot--${slot.tone}`} custom={campaignDirection} variants={campaignSlideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.36, ease: [0.23, 1, 0.32, 1] }} onPointerMove={positionArchiveCrosshair} onPointerLeave={(event) => { event.currentTarget.style.setProperty("--pointer-x", "50%"); event.currentTarget.style.setProperty("--pointer-y", "50%"); }}><span className="campaign-slot__index">{slot.index}</span><div className="campaign-slot__grid" aria-hidden="true" /><div className="campaign-slot__content"><span>{slot.category}</span><h3>{slot.title}</h3><p>{slot.note}</p></div><div className="campaign-slot__measurements"><span>{slot.plate}</span><span>UNEXPOSED / VAILE ARCHIVE</span></div></motion.article>; })()}</AnimatePresence></div><div className="campaign-carousel__controls"><button type="button" className="campaign-carousel__arrow" onClick={() => moveCampaignSlide(-1)} aria-label="Previous archive plate"><ArrowLeft size={16} /></button><span>{String(activeCampaignSlide + 1).padStart(2, "0")} / {String(campaignSlots.length).padStart(2, "0")}</span><button type="button" className="campaign-carousel__arrow" onClick={() => moveCampaignSlide(1)} aria-label="Next archive plate"><ArrowRight size={16} /></button></div></div></Reveal></section></ScrollScene>

      <ScrollScene><section className="fit-guide" id="fit"><div className="fit-guide__rail" aria-hidden="true">VAILE &nbsp; — &nbsp; FIT CARD &nbsp; — &nbsp; DROP 001</div><div className="fit-guide__content"><Reveal><SectionLabel index="03" label="FIT GUIDE" /></Reveal><Reveal delay={0.08}><h2>Room to<br /><em>move in.</em></h2></Reveal><Reveal className="fit-guide__intro" delay={0.12}><p>The intended silhouette is easy and straight: room through the leg, a clean line over footwear, and enough ease to live in.</p><p>Send your usual waist and preferred fit through the private allocation line. Exact garment measurements can be confirmed before allocation.</p></Reveal><Reveal className="fit-card" delay={0.16}><div className="fit-card__head"><span>DROP 001 / FIT REFERENCE</span><span>12 OZ CANVAS</span></div><div className="fit-card__rows"><article><span>PROFILE</span><strong>RELAXED, STRAIGHT LEG</strong></article><article><span>WEAR TRUE</span><strong>YOUR USUAL WAIST FOR AN EASY FIT</strong></article><article><span>SIZE UP</span><strong>FOR EXTRA ROOM THROUGH THE SEAT + LEG</strong></article><article><span>CONFIRM</span><strong>WAIST / RISE / THIGH / HEM / INSEAM VIA WHATSAPP</strong></article></div><div className="fit-card__sizes"><span>AVAILABLE WAIST TAGS</span><div>{sizes.map((size) => <b key={size}>{size}</b>)}</div></div></Reveal></div></section></ScrollScene>

      <ScrollScene><section className="construction construction--dark"><div className="construction__image-wrap detail-inspector"><img src={assets.closeOne} alt="Close-up of black canvas fabric, belt loop and copper rivet" className="construction__primary-image" /><div className="image-tag image-tag--dark image-tag--magnetic"><span>FIG. 02</span><span>HARDWARE / DETAIL</span></div><span className="detail-inspector__cue" aria-hidden="true">INSPECT</span></div><div className="construction__story"><Reveal><SectionLabel index="04" label="CONSTRUCTION" dark /></Reveal><Reveal delay={0.08}><h2>Where it<br /><em>counts.</em></h2></Reveal><Reveal delay={0.14}><div className="construction__items"><article><span>01</span><div><h3>Heavy canvas</h3><p>Dense 12oz cotton gives the silhouette structure from the first wear.</p></div></article><article><span>02</span><div><h3>Rivet set</h3><p>Cairn-toned hardware cues anchor high-stress points.</p></div></article><article><span>03</span><div><h3>Utility pockets</h3><p>Layered pockets and a relaxed leg keep the design working after the photo ends.</p></div></article></div></Reveal></div></section></ScrollScene>

      <ScrollScene><section className="care-note care-note--light" id="care"><div className="care-note__lead"><Reveal><SectionLabel index="05" label="CANVAS CARE" /></Reveal><Reveal delay={0.08}><h2>Wear hard.<br /><em>Care softly.</em></h2></Reveal><Reveal delay={0.14}><p>Duck canvas will gain character with use. Treat heat, bleach, and heavy washing as the exception—not the routine.</p></Reveal></div><Reveal className="care-note__guide" delay={0.14}><div className="care-note__guide-top"><span>CARE NOTES</span><span>12 OZ DUCK CANVAS</span></div><div className="care-list"><article><span>01</span><div><h3>Spot clean first</h3><p>Address small marks with a soft damp cloth and mild detergent before a full wash.</p></div></article><article><span>02</span><div><h3>Wash cold, gently</h3><p>Fasten the waist, turn inside out, then hand wash or use a gentle cold cycle.</p></div></article><article><span>03</span><div><h3>Skip bleach + high heat</h3><p>Keep harsh bleach and hot drying away from the canvas to reduce early wear.</p></div></article><article><span>04</span><div><h3>Shape, then hang dry</h3><p>Smooth the garment while damp and hang dry. Use a warm iron inside out if desired.</p></div></article></div><p className="care-note__fineprint">The care label inside the garment always takes precedence.</p></Reveal></section></ScrollScene>

      <ScrollScene><section className="lookbook lookbook--dark" id="details"><div className="lookbook__lead detail-inspector"><img src={assets.lookOne} alt="Front campaign view of the black duck canvas pants outdoors" /><div className="image-tag image-tag--dark image-tag--magnetic"><span>FIG. 03</span><span>FIELD / FRONT</span></div><span className="detail-inspector__cue" aria-hidden="true">INSPECT</span></div><div className="lookbook__aside"><Reveal><SectionLabel index="06" label="THE SPECIMEN" dark /></Reveal><Reveal delay={0.08}><p className="lookbook__quote">A working silhouette, made for the long way home.</p></Reveal><div className="lookbook__microcopy">12 OZ DUCK CANVAS / RELAXED LEG<br />LAYERED POCKETING / FIELD READY</div></div></section></ScrollScene>

      </div>
      <section className="release-panel" aria-label="End of field study"><div className="release-panel__line" /><p>END OF FIELD STUDY / 001</p><span>VAILE ARCHIVE / 12 OZ DUCK CANVAS</span></section>
      <footer className="site-footer"><div className="site-footer__inner"><div className="site-footer__masthead"><span className="site-footer__word"><span className="site-footer__v">V</span>AILE</span><img src={assets.mark} alt="" /><span>001</span></div><div className="site-footer__grid"><div className="site-footer__col site-footer__col--left"><nav className="site-footer__legal" aria-label="Legal"><span>LEGAL</span><a href="/terms">TERMS</a><a href="/privacy">PRIVACY</a></nav><a href="#top" className="site-footer__back-to-top">BACK TO TOP <ArrowUpRight size={13} strokeWidth={1.5} /></a></div><div className="site-footer__col site-footer__col--right"><span>DROP 001 / 50 PIECES</span><span>12 OZ DUCK CANVAS</span></div></div></div></footer>
    </motion.main>
  </>;
}
