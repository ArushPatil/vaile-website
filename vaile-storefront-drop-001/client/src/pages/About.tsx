/* VAILE Field Dossier: a wide, evidence-led studio record with stock paper, lichen fields, oxide markers, and generous reading measure. */
import { ArrowDown, ArrowRight, ArrowUpRight, CircleDot } from "lucide-react";
import { Link } from "wouter";
import { EditorialPageFrame, PageMeta } from "@/components/EditorialPageFrame";

const studioPrinciples = [
  ["01", "ONE GARMENT, DEEPLY", "We would rather continue a useful conversation with one trouser than scatter attention across a crowded seasonal rack."],
  ["02", "UTILITY WITHOUT NOISE", "Every pocket, reinforcement, and piece of hardware has to answer to movement before it answers to styling."],
  ["03", "PATINA IS EVIDENCE", "The garment is not completed by the studio. It is completed slowly by a commute, a shift, a rehearsal, a ride, and a thousand ordinary decisions."],
];

const workingRecords = [
  ["MATERIAL", "Canvas before concept", "A heavyweight duck canvas establishes the hand, the drape, and the honest resistance that Drop 001 needs."],
  ["CONSTRUCTION", "Reinforcement where repetition lives", "Double knees, stress-point hardware, and practical pocket architecture are considered as a system rather than surface detail."],
  ["USE", "Made for overlap", "The trouser is designed for the part of life where workwear, personal uniform, and daily movement stop being separate categories."],
];

const archiveRows = [
  ["2022", "THE QUESTION", "What would a trouser look like if its entire brief was to remain useful long after the first good outfit?"],
  ["2023", "THE PATTERN", "A relaxed straight leg, a measured rise, and room through the seat and thigh became the working silhouette."],
  ["2024", "THE MATERIAL", "Duck canvas, solid hardware, and a tightly considered construction language became the first field record."],
  ["NEXT", "THE WEAR ARCHIVE", "Future note: owner photographs, repair stories, and long-term wear studies will live here as the edition earns its history."],
];

function FutureBay({ label, title, copy }: { label: string; title: string; copy: string }) {
  return (
    <article className="future-bay">
      <span className="future-bay__marker"><CircleDot size={14} /> {label}</span>
      <h3>{title}</h3>
      <p>{copy}</p>
      <span className="future-bay__status">FUTURE FIELD NOTE</span>
    </article>
  );
}

export default function About() {
  return (
    <EditorialPageFrame active="/about">
      <PageMeta title="About VAILE — The Studio Behind Drop 001" description="VAILE is an independent garment studio building durable, considered trousers for actual wear. Read the story behind Drop 001." canonical="https://vaile.studio/about" />
      <main id="main" className="editorial-page field-dossier about-dossier">
        <section className="editorial-hero dossier-hero about-dossier__hero">
          <div className="editorial-hero__visual"><img src="/images/vaile-field-dossier-hero.jpg" alt="Original VAILE field study showing heavyweight canvas trousers in an open industrial landscape" /></div>
          <div className="editorial-hero__copy">
            <p className="eyebrow">ABOUT VAILE / FIELD DOSSIER 001</p>
            <h1>Built around<br /><em>one good pair.</em></h1>
            <p className="hero-dek">VAILE is a small garment studio interested in the long middle of a product’s life: the thousand ordinary moments that turn material into something personal.</p>
            <a className="scroll-cue" href="#position"><span>OPEN THE STUDIO RECORD</span><ArrowDown size={16} /></a>
          </div>
          <span className="editorial-hero__index">A / 01 — STUDIO</span>
        </section>

        <section id="position" className="dossier-position dossier-section">
          <div className="dossier-rail"><span>01</span><p>POSITION / NOT A SEASON</p></div>
          <div className="dossier-position__lead">
            <p className="eyebrow">THE SHORT VERSION</p>
            <h2>Not seasonal.<br /><span>Situational.</span></h2>
          </div>
          <div className="dossier-position__copy">
            <p>VAILE started with a practical frustration: most trousers are asked to perform in one narrow context. They look right but bind on a bike. They move well but lose their structure. They carry utility loudly when the better answer is quiet specificity.</p>
            <p>Drop 001 is our answer in progress. It is a limited, studied trouser for the overlap between workshop and street, rehearsal and commute, private uniform and public life.</p>
            <div className="dossier-callout"><span>STUDIO PREMISE</span><b>Clothes become more useful when the brief leaves space for the person wearing them.</b></div>
          </div>
          <div className="dossier-position__future">
            <FutureBay label="A / 02" title="Founder’s note" copy="Reserved for the voice, place, and practical frustration that started VAILE." />
            <FutureBay label="A / 03" title="Studio map" copy="Reserved for a future record of the places, people, and processes behind each edition." />
          </div>
        </section>

        <section className="dossier-record dossier-section">
          <div className="dossier-record__title"><p className="eyebrow">02 — THE WORKING RECORD</p><h2>A trouser is a<br />chain of decisions.</h2></div>
          <div className="dossier-record__grid">
            {workingRecords.map(([label, title, copy], index) => <article key={label} className="record-card"><span>0{index + 1} / {label}</span><h3>{title}</h3><p>{copy}</p><ArrowRight size={17} /></article>)}
          </div>
        </section>

        <section className="dossier-portrait dossier-section">
          <div className="dossier-portrait__visual"><div className="future-image future-image--portrait"><span>FUTURE IMAGE BAY / STUDIO PROCESS</span><b>Material, pattern, and real-world wear—documented as the record grows.</b></div></div>
          <div className="dossier-portrait__copy">
            <p className="eyebrow">THE WAY WE WORK</p>
            <h2>Specific enough<br />to be useful.</h2>
            <p>We build fewer garments so we can stay with the choices that matter. A pocket is tested as a place for the things you actually carry. A double knee is considered as a working surface. A rivet is placed where a seam sees repetition.</p>
            <p>The result should look uncomplicated from across the room and deliberate when it is close enough to inspect.</p>
            <Link className="dossier-link" href="/deep-dive"><span>READ THE DROP 001 TECHNICAL RECORD</span><ArrowUpRight size={17} /></Link>
          </div>
        </section>

        <section className="dossier-principles dossier-section">
          <div className="dossier-rail dossier-rail--light"><span>03</span><p>WORKING PRINCIPLES</p></div>
          <div className="dossier-principles__head"><h2>A slower kind<br /><em>of confidence.</em></h2><p>VAILE is not trying to speak louder than the wearer's life. It is trying to hold up inside it.</p></div>
          <div className="dossier-principles__grid">{studioPrinciples.map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </section>

        <section className="dossier-archive dossier-section">
          <div className="dossier-archive__intro"><p className="eyebrow">04 — THE RECORD, SO FAR</p><h2>Keep the story<br />open-ended.</h2><p>The first drop is a starting point, not a finished mythology. Future material tests, repairs, owner notes, and additional field studies can be added without disturbing the core record.</p></div>
          <div className="dossier-archive__ledger">{archiveRows.map(([year, title, copy]) => <article key={year}><span>{year}</span><div><h3>{title}</h3><p>{copy}</p></div><ArrowUpRight size={17} /></article>)}</div>
        </section>

        <section className="dossier-close">
          <p className="eyebrow">NEXT / THE TECHNICAL RECORD</p>
          <h2>See what holds<br /><em>the line.</em></h2>
          <p>Canvas, double knees, hardware, pocket map, and the choices that make Drop 001 more than a silhouette.</p>
          <Link className="dark-record" href="/deep-dive"><span>OPEN THE DEEP DIVE</span><ArrowUpRight size={17} /></Link>
        </section>
      </main>
    </EditorialPageFrame>
  );
}
