/* VAILE — Deep Dive: technical garment record, evidence-led sections, no placeholder scaffolding on live pages. */
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Ruler, Shield, Wrench } from "lucide-react";
import { Link } from "wouter";
import { EditorialPageFrame, PageMeta } from "@/components/EditorialPageFrame";

const buildLedger = [
  ["01", "CANVAS", "12 oz duck canvas", "A dense plain weave chosen for a structured fall, a dry hand, and a surface that gains character instead of disguise."],
  ["02", "DOUBLE KNEE", "A working surface, not an accent", "A second layer creates a durable contact zone through the knee while keeping the front profile deliberate and clean."],
  ["03", "HARDWARE", "Stress-point metalwork", "Rivets and fastening hardware are placed where pocket mouths, fly construction, and belt line see the same movement again and again."],
  ["04", "POCKET MAP", "Utility with a clear read", "Pockets are planned around daily carry and access, then kept quiet enough to let the trouser work with the rest of a wardrobe."],
  ["05", "PATTERN", "Relaxed straight architecture", "A measured rise and consistent leg give the body room without collapsing the line from thigh to hem."],
  ["06", "FINISH", "Edition record / 001", "The first allocation is intentionally finite, leaving room to learn from wear before expanding the system."],
];

const wearContexts = [
  ["01", "RIDE / TRANSIT", "For the seat, the stop-start day, and whatever happens after the destination."],
  ["02", "STUDIO / MAKING", "For floor work, ladders, tables, and the quiet friction of a long project."],
  ["03", "LOAD-IN / REHEARSAL", "For carrying equipment, moving through venues, and standing under bright lights."],
  ["04", "WEEKEND / DISTANCE", "For travel days when a small bag and one dependable trouser are the right amount."],
];

const fitChecks = [
  "You want a relaxed straight leg rather than a tapered or skinny fit.",
  "You prefer substantial canvas that softens, marks, and develops with wear.",
  "You move between sitting, standing, riding, walking, and making.",
  "You value direct sizing support over an anonymous one-click purchase.",
];

export default function DeepDive() {
  return (
    <EditorialPageFrame active="/deep-dive">
      <PageMeta title="Deep Dive — VAILE Drop 001 Technical Notes" description="A technical deep dive into VAILE Drop 001: duck canvas, double-knee construction, hardware, fit, and field use contexts." canonical="https://vaile.studio/deep-dive" />
      <main id="main" className="editorial-page field-dossier deep-dossier">
        <section className="editorial-hero dossier-hero deep-dossier__hero">
          <div className="editorial-hero__visual"><img src="/images/vaile-canvas-double-knee-study.jpg" alt="Close study of heavyweight duck canvas and double-knee construction" /></div>
          <div className="editorial-hero__copy">
            <p className="eyebrow">DROP 001 / TECHNICAL RECORD</p>
            <h1>What it is<br /><em>made to do.</em></h1>
            <p className="hero-dek">A closer record of the material, reinforcement, hardware, and pattern decisions behind the first VAILE trouser.</p>
            <a className="scroll-cue" href="#build"><span>OPEN THE BUILD LEDGER</span><ArrowDown size={16} /></a>
          </div>
          <span className="editorial-hero__index">D / 01 — DROP 001</span>
        </section>

        <section id="build" className="technical-ledger dossier-section">
          <div className="technical-ledger__head"><p className="eyebrow">01 — MATERIAL, PATTERN, BUILD</p><h2>Built in layers.<br /><span>Read in detail.</span></h2><p>Drop 001 is designed from the outside in. The canvas establishes the hand. The pattern determines the movement. Reinforcement and hardware make sure the useful parts remain useful.</p></div>
          <div className="technical-ledger__rows">{buildLedger.map(([number, label, title, copy]) => <article key={number}><span>{number}</span><div><p>{label}</p><h3>{title}</h3><small>{copy}</small></div><ArrowRight size={18} /></article>)}</div>
        </section>

        <section className="construction-field dossier-section">
          <div className="construction-field__visual"><img src="/images/vaile-hardware-bench-study.jpg" alt="Material study: workwear hardware, duck canvas, and pocket construction" /><span>CONSTRUCTION STUDY / DROP 001</span></div>
          <div className="construction-field__copy">
            <p className="eyebrow">02 — WHY THE KNEE IS DOUBLED</p>
            <h2>Reinforce the part<br />that meets the day.</h2>
            <p>The double knee is not a costume reference. It is a purposeful second layer placed where kneeling, crouching, riding, and repeated contact add up. Its value is tactile as much as technical: a firmer front plane, a more resolved silhouette, and a place that is allowed to show use.</p>
            <div className="construction-stats"><span><Shield size={16} /><b>2 LAYERS</b><small>AT THE KNEE</small></span><span><Ruler size={16} /><b>12 OZ</b><small>DUCK CANVAS</small></span><span><Wrench size={16} /><b>RIVET SET</b><small>STRESS POINTS</small></span></div>
          </div>
        </section>

        <section className="wear-index dossier-section">
          <div className="wear-index__head"><div><p className="eyebrow">03 — FIELD USE INDEX</p><h2>More than<br /><em>one way in.</em></h2></div><p>Drop 001 is not a costume for a single identity. The brief was a trouser that earns its place at the intersection of work, transit, making, and movement.</p></div>
          <div className="wear-index__grid">{wearContexts.map(([number, title, copy]) => <article key={number} className="wear-card"><span>{number}</span><div><p>{title}</p><h3>{title}</h3><small>{copy}</small></div><ArrowUpRight size={17} /></article>)}</div>
        </section>

        <section className="fit-dossier dossier-section">
          <div className="fit-dossier__title"><p className="eyebrow">04 — THE HONEST FIT</p><h2>Start with<br /><span>how you move.</span></h2><p>The right fit begins with the demands of a real day, not a flattering product description.</p></div>
          <div className="fit-dossier__checks">
            <ul>{fitChecks.map((check) => <li key={check}><Check size={16} /><span>{check}</span></li>)}</ul>
            <Link className="dossier-link" href="/#sizing"><span>COMPARE YOUR MEASUREMENTS</span><ArrowUpRight size={17} /></Link>
          </div>
        </section>

        <section className="dossier-close dossier-close--lichen">
          <p className="eyebrow">DROP 001 / PRIVATE ENQUIRY</p>
          <h2>Read enough?<br /><em>Wear it out.</em></h2>
          <p>Fifty numbered pairs, direct sizing support, and a record that stays open as the garment moves into real life.</p>
          <a className="dark-record" href="https://wa.me/918951066881?text=Hello%20VAILE%2C%20I%20would%20like%20to%20enquire%20about%20Edition%20001." target="_blank" rel="noopener noreferrer"><span>START A PRIVATE ENQUIRY</span><ArrowUpRight size={17} /></a>
        </section>
      </main>
    </EditorialPageFrame>
  );
}
