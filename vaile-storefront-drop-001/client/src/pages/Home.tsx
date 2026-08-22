/**
 * Vaile Quarry Specimen neutral material system: charcoal, bone, weathered paper and signal clay.
 * The palette stays image-agnostic while color appears only at editorial and allocation moments.
 */
import { AnimatePresence, motion, useInView, useScroll, useSpring } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Check, ChevronDown, Copy, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";

const assets = {
  hero: "/manus-storage/duck-canvas-05_73ef0bd8.jpg",
  lookOne: "/manus-storage/duck-canvas-01_740a9ac7.jpg",
  lookTwo: "/manus-storage/duck-canvas-02_2ceea2d9.jpg",
  closeOne: "/manus-storage/duck-canvas-03_894dfdb0.jpg",
  closeTwo: "/manus-storage/duck-canvas-06_978e729c.jpg",
  grain: "/manus-storage/duck-canvas-grain-editorial_4ea19f4e.jpg",
  paper: "/manus-storage/duck-canvas-paper-fiber_b0e794ac.jpg",
  hardware: "/manus-storage/duck-canvas-copper-hardware_dbf587d9.jpg",
  mark: "/manus-storage/vaile-logo_a0e37931.png",
};

const sizes = ["30", "32", "34", "36", "38"];

const campaignSlots = [
  { index: "01", category: "CAMPAIGN CONTACT / EXTERIOR", title: "Unexposed Field", note: "Exterior contact plate / held in the archive", tone: "stone", plate: "PLATE / 6×7 / 01" },
  { index: "02", category: "STUDIO CONTACT / MODEL", title: "Unexposed Studio", note: "Studio contact plate / held in the archive", tone: "paper", plate: "PLATE / 6×7 / 02" },
  { index: "03", category: "CONSTRUCTION CONTACT / DETAIL", title: "Unexposed Detail", note: "Material contact plate / held in the archive", tone: "charcoal", plate: "PLATE / 6×7 / 03" },
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.14, margin: "0px 0px -7% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
      transition={{ duration: 0.78, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ index, label, dark = false }: { index: string; label: string; dark?: boolean }) {
  return (
    <div className={`section-label ${dark ? "section-label--light" : ""}`}>
      <span>{index}</span>
      <span className="section-label__rule" />
      <span>{label}</span>
    </div>
  );
}

function useHashScroll() {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>("a[href^='#']");
      if (!anchor) return;
      const destination = document.querySelector(anchor.getAttribute("href") || "");
      if (!destination) return;
      event.preventDefault();
      destination.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("32");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [campaignApi, setCampaignApi] = useState<CarouselApi>();
  const [activeCampaignSlide, setActiveCampaignSlide] = useState(0);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  useHashScroll();

  useEffect(() => {
    let timer: number;
    const runLoader = () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setIsLoading(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setIsLoading(false), prefersReducedMotion ? 0 : 1550);
    };
    runLoader();
    window.addEventListener("pageshow", runLoader);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pageshow", runLoader);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!campaignApi) return;
    const updateActiveSlide = () => setActiveCampaignSlide(campaignApi.selectedScrollSnap());
    updateActiveSlide();
    campaignApi.on("select", updateActiveSlide);
    return () => {
      campaignApi.off("select", updateActiveSlide);
    };
  }, [campaignApi]);

  const allocationMessage = `VAILE — DROP 001\n\nI would like to request a private allocation.\nPreferred waist: ${selectedSize}\n\nPlease share availability and next steps.`;
  const allocationHref = `https://wa.me/918951066881?text=${encodeURIComponent(allocationMessage)}`;

  const copyAllocationMessage = async () => {
    await navigator.clipboard?.writeText(allocationMessage);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="page-loader"
            role="status"
            aria-label="Loading Vaile"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.42, ease: [0.23, 1, 0.32, 1] } }}
          >
            <motion.div
              className="page-loader__core"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.48, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="page-loader__mark-wrap"><img src={assets.mark} alt="" className="page-loader__mark" /></div>
              <p>VAILE</p>
              <span>DROP 001 / 12 OZ DUCK CANVAS</span>
              <div className="page-loader__line"><i /></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.main
        className={isLoading ? "site-shell is-loading" : "site-shell"}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
      >
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />

      <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
        <a href="#top" className="brand-lockup" aria-label="Vaile home">
          <img src={assets.mark} alt="" className="brand-mark" />
          <span>VAILE</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#specimen">Specimen</a>
          <a href="#construction">Construction</a>
          <a href="#allocation">Allocation</a>
        </nav>
        <a href={allocationHref} target="_blank" rel="noreferrer" className="header-allocation">
          <span>REQUEST ALLOCATION / WHATSAPP</span>
          <ArrowUpRight size={14} strokeWidth={1.5} />
        </a>
        <button className="menu-trigger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <Menu size={23} strokeWidth={1.5} />
        </button>
      </header>

      <a href={allocationHref} target="_blank" rel="noreferrer" className="mobile-allocation">
        <span>REQUEST ALLOCATION</span><ArrowUpRight size={14} strokeWidth={1.5} />
      </a>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
          >
            <div className="mobile-menu__top">
              <div className="brand-lockup brand-lockup--light">
                <img src={assets.mark} alt="" className="brand-mark brand-mark--light" />
                <span>VAILE</span>
              </div>
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={28} strokeWidth={1.5} /></button>
            </div>
            <div className="mobile-menu__links">
              {["Specimen", "Construction", "Allocation"].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.07, duration: 0.45 }}
                >
                  <span>0{index + 1}</span>{item}
                </motion.a>
              ))}
            </div>
            <p>DROP 001 / 50 PIECES ONLY</p>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="hero" id="top">
        <img src={assets.hero} alt="Low-angle campaign view of the black duck canvas pants" className="hero__image" />
        <div className="hero__veil" />
        <div className="hero__topline">
          <span>DROP 001</span>
          <span>12 OZ DUCK CANVAS</span>
          <span>EDITION OF 50</span>
        </div>
        <div className="hero__content">
          <p className="eyebrow eyebrow--light">A PRIVATE WORKWEAR STUDY</p>
          <h1>BUILT FOR THE<br /><em>WEAR</em> YOU<br />HAVEN’T MET YET.</h1>
          <a href={allocationHref} target="_blank" rel="noreferrer" className="hero__cta">REQUEST ALLOCATION / WHATSAPP <ArrowUpRight size={20} strokeWidth={1.3} /></a>
        </div>
        <div className="hero__footnote">
          <span>SCROLL TO OBSERVE</span>
          <ChevronDown size={15} strokeWidth={1.4} />
        </div>
      </section>

      <section className="intro" id="specimen">
        <div className="intro__grain" style={{ backgroundImage: `url(${assets.grain})` }} />
        <div className="intro__rail" aria-hidden="true">VAILE &nbsp; — &nbsp; FIELD STUDY</div>
        <div className="intro__main">
          <Reveal><SectionLabel index="01" label="THE SPECIMEN" dark /></Reveal>
          <Reveal delay={0.1}>
            <h2>Not a costume.<br />A <em>working</em> silhouette.</h2>
          </Reveal>
          <Reveal className="intro__copy" delay={0.18}>
            <p>Cut from durable 12oz duck canvas, DROP 001 is designed as the trouser you keep reaching for. A quiet uniform with a built-in opinion.</p>
            <p>The first edition is capped at 50 pieces. Allocation happens privately, one conversation at a time.</p>
            <div className="intro__price">
              <span>PRIVATE ALLOCATION / PER PIECE</span>
              <strong>₹6,200 INR <small>/ $100 USD</small></strong>
            </div>
          </Reveal>
        </div>
        <Reveal className="intro__edition" delay={0.22}>
          <span>EDITION</span>
          <strong>01<br /><small>/ 50</small></strong>
          <span>LIMITED RUN</span>
        </Reveal>
      </section>

      <section className="lookbook">
        <div className="lookbook__lead">
          <img src={assets.lookOne} alt="Front campaign view of the black duck canvas pants outdoors" />
          <div className="image-tag image-tag--dark"><span>FIG. 01</span><span>FRONT / FIELD</span></div>
        </div>
        <div className="lookbook__aside">
          <Reveal>
            <p className="lookbook__quote">“Made to take the long way<br />home.”</p>
          </Reveal>
          <div className="lookbook__microcopy">12 OZ DUCK CANVAS / RELAXED LEG<br />LAYERED POCKETING / FIELD READY</div>
          <div className="lookbook__chapter">02<br /><span>WORN<br />OUTSIDE</span></div>
        </div>
      </section>

      <section className="material-note" style={{ backgroundImage: `linear-gradient(90deg, rgba(238, 237, 232, .97), rgba(238, 237, 232, .84)), url(${assets.paper})` }}>
        <Reveal><SectionLabel index="02" label="MATERIAL NOTE" /></Reveal>
        <Reveal delay={0.08}>
          <p className="material-note__headline">Canvas carries a record.<br />The marks are <em>the point.</em></p>
        </Reveal>
        <Reveal className="material-note__card" delay={0.14}>
          <div><span>FABRIC</span><strong>12 OZ<br />DUCK CANVAS</strong></div>
          <div><span>COLOUR</span><strong>INK<br />BLACK</strong></div>
          <div><span>RUN</span><strong>50<br />PIECES</strong></div>
        </Reveal>
      </section>

      <section className="construction" id="construction">
        <div className="construction__image-wrap">
          <img src={assets.closeOne} alt="Close-up of black canvas fabric, belt loop and copper rivet" className="construction__primary-image" />
          <div className="image-tag image-tag--light"><span>FIG. 02</span><span>HARDWARE / DETAIL</span></div>
        </div>
        <div className="construction__story">
          <Reveal><SectionLabel index="03" label="CONSTRUCTION" /></Reveal>
          <Reveal delay={0.08}><h2>Where it<br /><em>counts.</em></h2></Reveal>
          <Reveal delay={0.14}>
            <div className="construction__items">
              <article><span>01</span><div><h3>Heavy canvas</h3><p>Dense 12oz cotton gives the silhouette structure from the first wear.</p></div></article>
              <article><span>02</span><div><h3>Rivet set</h3><p>Copper-toned hardware catches the light and anchors the high-stress points.</p></div></article>
              <article><span>03</span><div><h3>Utility pockets</h3><p>Layered pockets and a relaxed leg keep the design working after the photo ends.</p></div></article>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="detail-spread">
        <div className="detail-spread__left">
          <img src={assets.lookTwo} alt="Back view of the duck canvas pants in dry brush" />
          <div className="image-tag image-tag--dark"><span>FIG. 03</span><span>BACK / FIELD</span></div>
        </div>
        <div className="detail-spread__right">
          <img src={assets.closeTwo} alt="Close view of the side utility pocket and copper rivets" />
          <div className="detail-spread__caption"><span>DISCREET BY DEFAULT.</span><span>BUILT WITH INTENT.</span></div>
        </div>
      </section>

      <section className="campaign-gallery" id="campaign">
        <div className="campaign-gallery__head">
          <Reveal><SectionLabel index="04" label="CAMPAIGN INDEX" /></Reveal>
          <Reveal delay={0.08}><p>A contact-sheet index for campaign, studio, and construction studies.</p></Reveal>
        </div>
        <Reveal className="campaign-gallery__carousel" delay={0.12}>
          <Carousel opts={{ loop: true, watchResize: false }} setApi={setCampaignApi} className="campaign-carousel">
            <CarouselContent className="campaign-carousel__track">
              {campaignSlots.map((slot) => (
                <CarouselItem key={slot.index} className="campaign-carousel__item">
                  <article className={`campaign-slot campaign-slot--${slot.tone}`}>
                    <span className="campaign-slot__index">{slot.index}</span>
                    <div className="campaign-slot__grid" aria-hidden="true" />
                    <div className="campaign-slot__content">
                      <span>{slot.category}</span>
                      <h3>{slot.title}</h3>
                      <p>{slot.note}</p>
                    </div>
                    <div className="campaign-slot__measurements"><span>{slot.plate}</span><span>UNEXPOSED / VAILE ARCHIVE</span></div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="campaign-carousel__controls">
              <CarouselPrevious className="campaign-carousel__arrow campaign-carousel__arrow--previous" />
              <span>{String(activeCampaignSlide + 1).padStart(2, "0")} / {String(campaignSlots.length).padStart(2, "0")}</span>
              <CarouselNext className="campaign-carousel__arrow campaign-carousel__arrow--next" />
            </div>
          </Carousel>
        </Reveal>
      </section>

      <section className="fit-guide" id="fit">
        <div className="fit-guide__rail" aria-hidden="true">VAILE &nbsp; — &nbsp; FIT CARD &nbsp; — &nbsp; DROP 001</div>
        <div className="fit-guide__content">
          <Reveal><SectionLabel index="05" label="FIT GUIDE" /></Reveal>
          <Reveal delay={0.08}>
            <h2>Room to<br /><em>move in.</em></h2>
          </Reveal>
          <Reveal className="fit-guide__intro" delay={0.12}>
            <p>The intended silhouette is easy and straight: room through the leg, a clean line over footwear, and enough ease to live in.</p>
            <p>For the most accurate decision, send your usual waist and preferred fit through the private allocation line. Exact garment measurements can be confirmed before allocation.</p>
          </Reveal>
          <Reveal className="fit-card" delay={0.16}>
            <div className="fit-card__head"><span>DROP 001 / FIT REFERENCE</span><span>12 OZ CANVAS</span></div>
            <div className="fit-card__rows">
              <article><span>PROFILE</span><strong>RELAXED, STRAIGHT LEG</strong></article>
              <article><span>WEAR TRUE</span><strong>YOUR USUAL WAIST FOR AN EASY FIT</strong></article>
              <article><span>SIZE UP</span><strong>FOR EXTRA ROOM THROUGH THE SEAT + LEG</strong></article>
              <article><span>CONFIRM</span><strong>WAIST / RISE / THIGH / HEM / INSEAM VIA WHATSAPP</strong></article>
            </div>
            <div className="fit-card__sizes"><span>AVAILABLE WAIST TAGS</span><div>{sizes.map((size) => <b key={size}>{size}</b>)}</div></div>
          </Reveal>
        </div>
      </section>

      <section className="object-study">
        <img src={assets.hardware} alt="Still life of canvas and copper garment hardware" className="object-study__image" />
        <div className="object-study__shade" />
        <Reveal className="object-study__content">
          <p className="eyebrow eyebrow--light">DROP 001 / OBJECT STUDY</p>
          <h2>Every point<br />of contact, <em>considered.</em></h2>
        </Reveal>
        <div className="object-study__note">BLACK CANVAS / COPPER HARDWARE / WORKED IN</div>
      </section>

      <section className="care-note" id="care">
        <div className="care-note__lead">
          <Reveal><SectionLabel index="06" label="CANVAS CARE" dark /></Reveal>
          <Reveal delay={0.08}><h2>Wear hard.<br /><em>Care softly.</em></h2></Reveal>
          <Reveal delay={0.14}><p>Duck canvas will gain character with use. Keep the fibres in better condition by treating heat, bleach, and heavy washing as the exception—not the routine.</p></Reveal>
        </div>
        <Reveal className="care-note__guide" delay={0.14}>
          <div className="care-note__guide-top"><span>CARE NOTES</span><span>12 OZ DUCK CANVAS</span></div>
          <div className="care-list">
            <article><span>01</span><div><h3>Spot clean first</h3><p>Address small marks with a soft damp cloth and mild detergent before reaching for a full wash.</p></div></article>
            <article><span>02</span><div><h3>Wash cold, gently</h3><p>Fasten the waist, turn the pants inside out, then hand wash or use a gentle cold cycle with mild detergent.</p></div></article>
            <article><span>03</span><div><h3>Skip bleach + high heat</h3><p>Keep harsh bleach and hot drying away from the cotton canvas to help reduce colour loss, shrinkage, and early wear.</p></div></article>
            <article><span>04</span><div><h3>Shape, then hang dry</h3><p>Smooth the garment while damp and hang dry. If you want a crisper finish, use a warm iron inside out.</p></div></article>
          </div>
          <p className="care-note__fineprint">The care label inside the garment always takes precedence.</p>
        </Reveal>
      </section>

      <section className="allocation" id="allocation">
        <div className="allocation__top">
          <Reveal><SectionLabel index="07" label="PRIVATE ALLOCATION" /></Reveal>
          <Reveal delay={0.08}><p className="allocation__pre">Preference first.<br />Availability confirmed privately.</p></Reveal>
        </div>
        <div className="allocation__grid">
          <Reveal className="allocation__statement" delay={0.1}>
            <h2>Record your<br /><em>preference.</em></h2>
            <p>Name a preferred waist, then open an allocation note. Availability is confirmed privately.</p>
          </Reveal>
          <Reveal className="allocation__panel" delay={0.16}>
            <div className="allocation__panel-top"><span>VAILE / DROP 001</span><span>PRIVATE ALLOCATION</span></div>
            <div className="allocation__price"><span>FINAL PRICE</span><strong>₹6,200 INR <small>/ $100 USD</small></strong></div>
            <p className="allocation__label">PREFERRED WAIST</p>
            <div className="size-grid" role="radiogroup" aria-label="Preferred waist size">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={selectedSize === size ? "size-option is-selected" : "size-option"}
                  onClick={() => setSelectedSize(size)}
                  role="radio"
                  aria-checked={selectedSize === size}
                >
                  {size}
                </button>
              ))}
            </div>
            <p className="allocation__fineprint">Your preference is not a reservation. Final availability is confirmed in the private allocation conversation.</p>
            <a href={allocationHref} target="_blank" rel="noreferrer" className="allocation__button">
              <span>OPEN ALLOCATION NOTE</span><ArrowUpRight size={18} strokeWidth={1.4} />
            </a>
            <button type="button" className="copy-button" onClick={copyAllocationMessage}>
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "NOTE COPIED" : "COPY ALLOCATION NOTE"}
            </button>
          </Reveal>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-footer__masthead"><span>VAILE</span><img src={assets.mark} alt="" /><span>001</span></div>
        <div className="site-footer__info">
          <span>VAILE / DROP 001 / 12 OZ DUCK CANVAS</span>
          <span>EDITION OF 50</span>
          <a href="#top">BACK TO TOP <ArrowUpRight size={13} /></a>
        </div>
      </footer>
      </motion.main>
    </>
  );
}
