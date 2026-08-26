import { ArrowUpRight, Check, MoveDown, Ruler, Shield, Wind } from "lucide-react";
import { Link } from "wouter";
import { EditorialPageFrame, PageMeta, PlaceholderNote } from "@/components/EditorialPageFrame";

const specs = [
  ["01", "FABRIC", "12 oz duck canvas", "Dense plain weave with enough structure to hold a clean line, and enough give to become yours."],
  ["02", "PATTERN", "Relaxed straight leg", "A measured rise and steady leg from thigh to hem. Built to sit over boots, sneakers, and the movement between."],
  ["03", "REINFORCEMENT", "Stress-point hardware", "Solid metal rivets and buttons at the places that take the most repetition: pockets, fly, and belt line."],
  ["04", "FINISH", "Numbered run of 50", "Each pair is finished, checked, and identified as part of the first VAILE edition."],
];

const audiences = [
  { no: "01", title: "MOTORCYCLE RIDERS", tag: "MOTION / WEATHER", copy: "Room through the seat and thigh for a riding position, with a structured canvas that takes road dust, garage hours, and repeated movement." },
  { no: "02", title: "MUSICIANS", tag: "STAGE / TRANSIT", copy: "Comfort for load-in, rehearsal, and a long set. The line stays composed when the day moves from van to venue to street." },
  { no: "03", title: "SKATERS", tag: "IMPACT / EASE", copy: "A forgiving fit that does not ask you to choose between a clean silhouette and the ability to drop, push, and get back up." },
  { no: "04", title: "STREETWEAR", tag: "PROPORTION / PATINA", copy: "A neutral, architectural base for oversized layers, sharp footwear, and the personal styling that happens after the garment leaves us." },
  { no: "05", title: "WORKWEAR", tag: "DURABILITY / ROUTINE", copy: "The original brief: a dependable daily trouser that can take tools, friction, and a full shift without turning into disposable uniform." },
];

const fitChecks = ["You want a relaxed straight fit, not a tapered or skinny leg.", "You like substantial fabric that softens and marks with wear.", "You move between sitting, standing, riding, walking, and making.", "You are comfortable with direct sizing support and a limited-run product."];

export default function DeepDive() {
  return (
    <EditorialPageFrame active="/deep-dive">
      <PageMeta title="Deep Dive — VAILE Drop 001 Technical Notes" description="A technical deep dive into VAILE Drop 001: 12 oz duck canvas, articulated pattern work, hardware, fit, and who the trouser is made for." canonical="https://vaile.studio/deep-dive" />
      <main id="main" className="editorial-page deep-dive-page">
        <section className="editorial-hero deep-hero">
          <div className="editorial-hero__copy">
            <p className="eyebrow">DROP 001 / TECHNICAL RECORD</p>
            <h1>What it is<br /><em>made to do.</em></h1>
            <p className="hero-dek">A closer look at the material, architecture, and people behind the first VAILE trouser.</p>
            <a className="scroll-cue" href="#material"><span>OPEN THE RECORD</span><MoveDown size={15} /></a>
          </div>
          <div className="editorial-hero__visual"><img src="/images/2.webp" alt="VAILE Drop 001 trousers shown in profile" /></div>
          <span className="editorial-hero__index">D / 01</span>
        </section>

        <section id="material" className="technical-overview">
          <div className="technical-overview__intro"><p className="eyebrow">01 — MATERIAL &amp; BUILD</p><h2>Hard-wearing<br /><span>by design.</span></h2><p>Drop 001 is designed from the outside in. The material establishes the hand, the pattern establishes the movement, and the hardware keeps both honest.</p><PlaceholderNote>PLACEHOLDER TECHNICAL NOTE — Add exact mill, dye, stitch-count, or wash-test data here when the production sheet is finalized.</PlaceholderNote></div>
          <div className="spec-ledger">{specs.map(([no, label, value, text]) => <article key={no}><span>{no}</span><div><p>{label}</p><h3>{value}</h3><span>{text}</span></div></article>)}</div>
        </section>

        <section className="technical-image-band"><figure><img src="/images/6.webp" alt="VAILE Drop 001 trousers in a seated position" /><figcaption>FIELD TEST / SEATED POSITION</figcaption></figure><div><p className="eyebrow">THE PATTERN IS THE PRODUCT</p><h2>Ease where<br />the body asks.</h2><p>The relaxed straight profile is not an absence of shape. It is a deliberate balance: enough room at the seat and thigh to move, a considered rise for comfort, and a leg that falls cleanly without chasing a trend.</p><div className="micro-stats"><span><Ruler size={15} /><b>32″</b><small>STANDARD INSEAM</small></span><span><Wind size={15} /><b>360°</b><small>FULL-DAY MOVEMENT</small></span><span><Shield size={15} /><b>12 OZ</b><small>DUCK CANVAS</small></span></div></div></section>

        <section className="audience-sheet">
          <header className="editorial-section-head"><span>02</span><div><p className="eyebrow">WHO IT IS FOR / FIELD USES</p><h2>Five ways<br />to wear in.</h2></div></header>
          <p className="audience-lead">The pants are made for people whose clothes have to hold up across contexts. Not a costume for one identity, but a dependable base for the work, culture, and movement already in your life.</p>
          <div className="audience-grid">{audiences.map((item) => <article key={item.no} className={item.no === "01" ? "audience-card audience-card--feature" : "audience-card"}><span className="audience-card__no">{item.no}</span><div><p>{item.tag}</p><h3>{item.title}</h3><span>{item.copy}</span></div><ArrowUpRight size={17} /></article>)}</div>
        </section>

        <section className="fit-check-sheet">
          <div className="fit-check-sheet__visual"><img src="/images/1.webp" alt="Front view of VAILE Drop 001 trousers" /><span>FIT CHECK / FRONT PROFILE</span></div>
          <div className="fit-check-sheet__copy"><p className="eyebrow">03 — IS IT FOR YOU?</p><h2>Start with<br /><span>the honest fit.</span></h2><p>Edition 01 is intentionally specific. If the following sounds like your wardrobe, the trouser will likely earn its place in it.</p><ul>{fitChecks.map((check) => <li key={check}><Check size={15} /><span>{check}</span></li>)}</ul><Link className="dark-record" href="/#sizing"><span>COMPARE YOUR MEASUREMENTS</span><ArrowUpRight size={17} /></Link></div>
        </section>

        <section className="deep-close"><p className="eyebrow">DROP 001 / LIMITED ALLOCATION</p><h2>Read enough?<br /><em>Wear it out.</em></h2><p>Fifty numbered pairs, available through a private enquiry. We will help you choose a size and answer the questions the page cannot.</p><a className="dark-record" href="https://wa.me/918951066881?text=Hello%20VAILE%2C%20I%20would%20like%20to%20enquire%20about%20Edition%20001." target="_blank" rel="noopener noreferrer"><span>START A PRIVATE ENQUIRY</span><ArrowUpRight size={17} /></a></section>
      </main>
    </EditorialPageFrame>
  );
}
