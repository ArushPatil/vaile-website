import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { EditorialPageFrame, PageMeta, PlaceholderNote } from "@/components/EditorialPageFrame";

const principles = [
  ["01", "ONE GARMENT, DEEPLY", "We put the attention of a collection into a single trouser: one pattern, one material language, one long conversation with wear."],
  ["02", "UTILITY WITHOUT NOISE", "Every seam, rivet, and pocket earns its place. The result is quiet from a distance and specific up close."],
  ["03", "AGE IS PART OF THE DESIGN", "A VAILE garment is not finished at the studio. It gathers evidence from the road, the stage, the curb, and the workday."],
];

const timeline = [
  { year: "2022", label: "THE QUESTION", text: "What if one pair of pants could carry the focus, patience, and material honesty usually spread across a whole season?" },
  { year: "2023", label: "THE PATTERN", text: "First prototypes built around a relaxed straight leg, a clean break, and room for a real day in motion." },
  { year: "2024", label: "THE MATERIAL", text: "12 oz duck canvas, solid hardware, and an intentionally small run became the first VAILE field system." },
  { year: "2026", label: "DROP 001", text: "Fifty numbered pairs. Built in Bangalore. Released through direct, considered conversation." },
];

export default function About() {
  return (
    <EditorialPageFrame active="/about">
      <PageMeta title="About VAILE — The Studio Behind Drop 001" description="VAILE is an independent garment studio building durable, considered trousers for actual wear. Read the story behind Drop 001." canonical="https://vaile.studio/about" />
      <main id="main" className="editorial-page about-page">
        <section className="editorial-hero about-hero">
          <div className="editorial-hero__visual"><img src="/images/4.webp" alt="Close view of VAILE duck canvas garment construction" /></div>
          <div className="editorial-hero__copy">
            <p className="eyebrow">ABOUT VAILE / STUDIO NOTE 001</p>
            <h1>Built around<br /><em>one good pair.</em></h1>
            <p className="hero-dek">VAILE is a small garment studio interested in the long middle of a product’s life: the thousand ordinary moments that turn material into something personal.</p>
            <a className="scroll-cue" href="#story"><span>READ THE RECORD</span><ArrowDown size={15} /></a>
          </div>
          <span className="editorial-hero__index">A / 01</span>
        </section>

        <section id="story" className="editorial-band about-intro">
          <div className="band-index">01 — ORIGIN</div>
          <div className="about-intro__copy">
            <h2>Not seasonal.<br /><span>Situational.</span></h2>
            <p>VAILE started with a practical frustration: most trousers are asked to perform in one narrow context. They look right, but bind on a bike. They move well, but collapse at the knee. They wear out exactly where they matter.</p>
            <p>Drop 001 is our answer in progress. A studied, limited trouser made for the overlap between street and workshop, rehearsal and commute, daily uniform and personal style.</p>
            <PlaceholderNote>PLACEHOLDER STUDIO NOTE — Replace this paragraph with the founder’s voice, studio location, or a short origin story when ready.</PlaceholderNote>
          </div>
        </section>

        <section className="about-image-spread" aria-label="VAILE studio images">
          <figure className="about-image-spread__large"><img src="/images/9.webp" alt="VAILE trousers shown in a worn-in studio setting" /><figcaption>FIELD NOTE / MATERIAL IN CONTEXT</figcaption></figure>
          <div className="about-image-spread__side"><figure><img src="/images/3.webp" alt="Detail of VAILE pocket and hardware" /><figcaption>DETAIL / 03</figcaption></figure><p>Designed in the open. Refined through friction.</p></div>
        </section>

        <section className="principles-sheet">
          <header className="editorial-section-head"><span>02</span><div><p className="eyebrow">WORKING PRINCIPLES</p><h2>A slower kind<br />of confidence.</h2></div></header>
          <div className="principles-grid">{principles.map(([number, title, text]) => <article key={number}><b>{number}</b><h3>{title}</h3><p>{text}</p></article>)}</div>
        </section>

        <section className="timeline-sheet">
          <header className="editorial-section-head"><span>03</span><div><p className="eyebrow">STUDIO TIMELINE / PLACEHOLDER</p><h2>The record<br />so far.</h2></div></header>
          <div className="timeline-list">{timeline.map((item) => <article key={item.year}><span>{item.year}</span><div><h3>{item.label}</h3><p>{item.text}</p></div><ArrowUpRight size={18} /></article>)}</div>
        </section>

        <section className="about-close">
          <p className="eyebrow">THE NEXT CHAPTER</p>
          <h2>See the garment<br /><em>under pressure.</em></h2>
          <div className="about-close__actions"><Link className="dark-record" href="/deep-dive"><span>READ THE DEEP DIVE</span><ArrowUpRight size={17} /></Link><Link className="text-link" href="/#gallery">VIEW THE LOOKBOOK →</Link></div>
        </section>
      </main>
    </EditorialPageFrame>
  );
}
