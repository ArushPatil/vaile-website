/* VAILE — About: The Atelier & Founding Chronicle */
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { EditorialPageFrame, PageMeta } from "@/components/EditorialPageFrame";

const chronicleMilestones = [
  {
    phase: "PHASE 01",
    year: "2022",
    title: "The Structural Failure Analysis",
    subtitle: "Deconstructing eighteen pairs of work trousers",
    desc: "VAILE started with a simple, frustrating realization: modern trousers look right on a showroom hanger, but bind during a commute, blow out at the pocket rivets, and disintegrate within six months of real friction. We cut apart 18 vintage and contemporary pairs to map exact failure points across the crotch, outseam, and pocket junctions."
  },
  {
    phase: "PHASE 02",
    year: "2023",
    title: "Fourteen Pattern Iterations",
    subtitle: "Refining the line between workshop and street",
    desc: "Over 14 months of physical sampling on diverse bodies, we drafted fourteen complete pattern blocks. The goal was rigorous: engineer enough ease through the seat and quadriceps for motorcycle saddles, floor work, and long transit days, without compromising the clean, sharp vertical fall from hip to hem."
  },
  {
    phase: "PHASE 03",
    year: "2024",
    title: "The Canvas Quest & Mill Selection",
    subtitle: "Rejecting synthetic blends for loom-state purity",
    desc: "We rejected three commercial canvas mills that offered chemical-softened, pre-distressed textiles. We chose an unyielding 12oz 100% cotton duck canvas—firm, dry to the touch, and structured—so that every crease, honeycomb, and fade is authentic evidence earned by the wearer."
  },
  {
    phase: "PHASE 04",
    year: "2025",
    title: "Drop 001: Fifty Numbered Pairs",
    subtitle: "A finite edition allocated person-to-person",
    desc: "Rather than mass-producing hundreds of unmonitored units, Drop 001 is intentionally limited to 50 numbered pairs. Hand-inspected, reinforced with solid brass rivets, and allocated person-to-person to build real relationships with our first cohort of owners."
  }
];

const studioTenets = [
  {
    index: "01",
    label: "SINGLE-GARMENT OBSESSION",
    title: "Depth over seasonal noise",
    copy: "We refuse the fast-fashion calendar. We would rather spend three years engineering one pair of trousers that lasts a decade than three months releasing twenty disposable styles."
  },
  {
    index: "02",
    label: "PATINA IS PROOF",
    title: "The wearer completes the design",
    copy: "The garment is not finished when it leaves our studio. It is finished slowly by a daily commute, workshop friction, rain, repairs, and a thousand ordinary decisions."
  },
  {
    index: "03",
    label: "FORM FOLLOWS KINEMATICS",
    title: "Utility before styling",
    copy: "Every pocket depth, bar-tack coordinate, and seam allowance answers to body mechanics and weight distribution before it answers to aesthetics."
  },
  {
    index: "04",
    label: "FINITE ALLOCATIONS",
    title: "Accountability in every stitch",
    copy: "Strict 50-pair editions ensure complete quality control, direct sizing consultation, and an open feedback loop as each trouser enters real-world service."
  }
];

export default function About() {
  return (
    <EditorialPageFrame active="/about">
      <PageMeta
        title="About VAILE — The Atelier & Founding Chronicle"
        description="The story behind VAILE: three years of pattern sampling, single-garment obsession, and the journey to Drop 001."
        canonical="https://vaile.studio/about"
      />
      <main id="main" className="editorial-page field-dossier about-dossier">
        {/* HERO */}
        <section className="editorial-hero dossier-hero about-dossier__hero">
          <div className="editorial-hero__visual">
            <img
              src="/images/vaile-field-dossier-hero.jpg"
              alt="VAILE atelier field study — heavyweight duck canvas trouser in an industrial landscape"
            />
          </div>
          <div className="editorial-hero__copy">
            <p className="eyebrow">ABOUT VAILE / ATELIER RECORD 001</p>
            <h1>One pair.<br /><em>Three years of refusal.</em></h1>
            <p className="hero-dek">
              VAILE was founded on a simple dissatisfaction with disposable garments. Drop 001 is our response: a single, obsessively engineered trouser built for the long middle of life.
            </p>
            <a className="scroll-cue" href="#genesis">
              <span>READ THE FOUNDING CHRONICLE</span>
              <ArrowDown size={16} />
            </a>
          </div>
          <span className="editorial-hero__index">ATELIER / RECORD 01</span>
        </section>

        {/* SECTION 01: THE GENESIS (Clean 2-Column Swiss Alignment) */}
        <section id="genesis" className="about-genesis dossier-section">
          <div className="genesis-header-col">
            <div className="dossier-rail">
              <span>01</span>
              <p>ATELIER GENESIS / 2022</p>
            </div>
            <p className="eyebrow">THE FOUNDING PREMISE</p>
            <h2>Built from a practical<br /><span>frustration.</span></h2>
          </div>

          <div className="genesis-body-col">
            <p className="lead-text">
              In late 2022, we looked at the modern trouser landscape and saw two extremes: fragile fashion garments that bind the moment you get on a bicycle, and bulky heritage workwear that feels like cardboard with no consideration for modern proportions.
            </p>
            <p>
              We founded VAILE to bridge that divide. We made an intentional, stubborn decision to reject seasonal collections and multi-category expansion. Instead, we committed the studio to one pursuit: crafting the definitive everyday utility trouser.
            </p>
            <div className="atelier-quote">
              <span className="quote-tag">STUDIO MANIFESTO // 2022</span>
              <blockquote>
                “We would rather spend three years engineering one honest pair of trousers than three months releasing twenty mediocre styles.”
              </blockquote>
              <cite>— Founder’s Notebook, Bangalore Workshop</cite>
            </div>
          </div>
        </section>

        {/* SECTION 02: THE SAMPLING CHRONICLE */}
        <section className="about-chronicle dossier-section">
          <div className="about-chronicle__header">
            <div className="dossier-rail">
              <span>02</span>
              <p>THE SAMPLING CHRONICLE</p>
            </div>
            <p className="eyebrow">THE ROAD TO DROP 001</p>
            <h2>Fourteen pattern drafts.<br /><span>Three rejected mills.</span></h2>
            <p className="section-dek">
              Drop 001 was not an overnight idea. It is the cumulative result of 14 physical iterations, continuous stress-testing across workshops and commutes, and uncompromising material sourcing.
            </p>
          </div>

          <div className="chronicle-ledger">
            {chronicleMilestones.map((m) => (
              <article key={m.phase} className="chronicle-row">
                <div className="chronicle-meta">
                  <span className="chronicle-phase">{m.phase}</span>
                  <strong className="chronicle-year">{m.year}</strong>
                </div>
                <div className="chronicle-content">
                  <h3>{m.title}</h3>
                  <p className="chronicle-subtitle">{m.subtitle}</p>
                  <p className="chronicle-desc">{m.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SECTION 03: ATELIER PRINCIPLES & CRAFT STUDY */}
        <section className="about-manifesto dossier-section">
          <div className="manifesto-visual">
            <img
              src="/images/vaile-hardware-bench-study.jpg"
              alt="VAILE material study — hardware bench, rivet placement, and pocket construction"
            />
            <div className="visual-caption">
              <span>ATELIER BENCH STUDY</span>
              <p>12oz Cotton Duck / Solid Brass Hardware / Dual-Plane Knees</p>
            </div>
          </div>

          <div className="manifesto-content">
            <div className="dossier-rail dossier-rail--light">
              <span>03</span>
              <p>WORKING PRINCIPLES</p>
            </div>
            <h2>A slower kind<br /><em>of confidence.</em></h2>
            <p className="manifesto-dek">
              Our four founding tenets govern every pattern adjustment, fabric order, and finishing detail that leaves the bench.
            </p>

            <div className="tenets-matrix">
              {studioTenets.map((t) => (
                <div key={t.index} className="tenet-item">
                  <div className="tenet-header">
                    <span className="tenet-num">{t.index}</span>
                    <span className="tenet-tag">{t.label}</span>
                  </div>
                  <h3>{t.title}</h3>
                  <p>{t.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 04: CLOSING & NAVIGATION */}
        <section className="dossier-close dossier-close--dark">
          <p className="eyebrow">CONTINUE THE RECORD</p>
          <h2>Inspect the build.<br /><em>Every millimeter accounted for.</em></h2>
          <p>
            From yarn density to double-knee load distribution, explore the exact technical specifications behind Drop 001.
          </p>
          <div className="close-actions">
            <Link className="dark-record" href="/deep-dive">
              <span>OPEN TECHNICAL DEEP DIVE</span>
              <ArrowUpRight size={17} />
            </Link>
            <a
              className="dark-record dark-record--secondary"
              href="https://wa.me/918951066881?text=Hello%20VAILE%2C%20I%20would%20like%20to%20enquire%20about%20Edition%20001."
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>DIRECT ATELIER ENQUIRY</span>
              <ArrowUpRight size={17} />
            </a>
          </div>
        </section>
      </main>
    </EditorialPageFrame>
  );
}
