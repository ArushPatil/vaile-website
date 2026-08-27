/* VAILE — About: Our Story & Philosophy */
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { EditorialPageFrame, PageMeta } from "@/components/EditorialPageFrame";
import { SITE_URL } from "@/lib/site";

const journeySteps = [
  {
    step: "01",
    year: "2022",
    title: "Deconstructing the Problem",
    subtitle: "Understanding why everyday trousers fail",
    desc: "We started by examining dozens of vintage and modern trousers, noting where seams pulled, where fabric thinned, and where pocket rivets blew out within months of daily wear."
  },
  {
    step: "02",
    year: "2023",
    title: "Perfecting the Pattern",
    subtitle: "Fourteen rounds of physical sampling",
    desc: "Over 14 months of fittings on different bodies, we refined the rise, thigh room, and leg opening. The goal was simple: complete freedom of movement with a sharp, tailored silhouette."
  },
  {
    step: "03",
    year: "2024",
    title: "Sourcing Pure Canvas",
    subtitle: "Rejecting synthetic blends and fake distressing",
    desc: "We turned down pre-softened, chemically treated fabrics and chose a dense 12oz 100% cotton canvas that feels substantial and breaks in naturally through real-world wear."
  },
  {
    step: "04",
    year: "2025",
    title: "Drop 001",
    subtitle: "Fifty individually numbered pairs",
    desc: "Produced in a small, carefully monitored run. Hand-inspected, reinforced with solid brass rivets, and offered directly to our first cohort of owners."
  }
];

const philosophyPoints = [
  {
    num: "01",
    label: "FOCUS",
    title: "One garment at a time",
    copy: "We refuse the fast-fashion calendar. We would rather spend years perfecting one honest pair of trousers than rush out twenty disposable styles every season."
  },
  {
    num: "02",
    label: "LONGEVITY",
    title: "Made to get better with age",
    copy: "Our trousers are designed to break in over years. Natural creases, softened canvas, and gentle fades are evidence of a well-lived garment."
  },
  {
    num: "03",
    label: "UTILITY",
    title: "Comfort and function first",
    copy: "Every pocket depth, stitch placement, and rivet exists to make daily life more comfortable, long before it answers to aesthetics."
  },
  {
    num: "04",
    label: "CARE",
    title: "Small, personal editions",
    copy: "Strict 50-pair releases allow us to personally oversee quality control, assist with sizing, and stay in direct contact with everyone who wears VAILE."
  }
];

export default function About() {
  return (
    <EditorialPageFrame active="/about">
      <PageMeta
        title="About VAILE — Our Story & Philosophy"
        description="The story of VAILE: three years of sampling, single-garment focus, and the journey to Drop 001."
        canonical={`${SITE_URL}/about`}
      />
      <main id="main" className="editorial-page field-dossier about-dossier">
        {/* HERO */}
        <section className="editorial-hero dossier-hero about-dossier__hero">
          <div className="editorial-hero__visual">
            <img
              src="/images/vaile-field-dossier-hero.webp"
              alt="VAILE Drop 001 trousers in natural landscape"
              width={2560}
              height={1440}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div className="editorial-hero__copy">
            <p className="eyebrow">ABOUT VAILE</p>
            <h1>One pair.<br /><em>Three years in the making.</em></h1>
            <p className="hero-dek">
              VAILE was founded on a simple frustration with disposable clothing: trousers that look sharp in photos, but bind when you move and fall apart within months. Drop 001 is our response.
            </p>
            <a className="scroll-cue" href="#story">
              <span>READ OUR STORY</span>
              <ArrowDown size={16} />
            </a>
          </div>
          <span className="editorial-hero__index">EDITION 001</span>
        </section>

        {/* SECTION 01: THE STORY */}
        <section id="story" className="about-genesis dossier-section">
          <div className="genesis-header-col">
            <div className="dossier-rail">
              <span>01</span>
              <p>THE BEGINNING</p>
            </div>
            <p className="eyebrow">HOW IT STARTED</p>
            <h2>Born from everyday<br /><span>frustration.</span></h2>
          </div>

          <div className="genesis-body-col">
            <p className="lead-text">
              In 2022, we grew tired of having to choose between fragile fashion trousers that tear when you ride a bike, and stiff workwear that feels too bulky for daily life.
            </p>
            <p>
              We started VAILE to create the one pair of trousers we couldn't find anywhere else: a piece built with the honesty of heavy workwear, tailored with clean modern lines, and made to last years of daily wear.
            </p>
            <div className="atelier-quote">
              <span className="quote-tag">FOUNDING NOTE</span>
              <blockquote>
                “We chose to spend three years making one honest pair of trousers, rather than rushing out twenty styles a season.”
              </blockquote>
              <cite>— Founder’s Notebook, Bangalore Studio</cite>
            </div>
          </div>
        </section>

        {/* SECTION 02: THE JOURNEY */}
        <section className="about-chronicle dossier-section">
          <div className="about-chronicle__header">
            <div className="dossier-rail">
              <span>02</span>
              <p>THE PROCESS</p>
            </div>
            <p className="eyebrow">THE JOURNEY TO DROP 001</p>
            <h2>Fourteen iterations.<br /><span>No shortcuts.</span></h2>
            <p className="section-dek">
              Getting Drop 001 right took three years of physical sampling, real-world wear testing, and uncompromising fabric choices.
            </p>
          </div>

          <div className="chronicle-ledger">
            {journeySteps.map((item) => (
              <article key={item.step} className="chronicle-row">
                <div className="chronicle-meta">
                  <span className="chronicle-phase">STEP {item.step}</span>
                  <strong className="chronicle-year">{item.year}</strong>
                </div>
                <div className="chronicle-content">
                  <h3>{item.title}</h3>
                  <p className="chronicle-subtitle">{item.subtitle}</p>
                  <p className="chronicle-desc">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SECTION 03: PHILOSOPHY */}
        <section className="about-manifesto dossier-section">
          <div className="manifesto-visual">
            <img
              src="/images/vaile-hardware-bench-study.webp"
              alt="VAILE workshop bench and hardware study"
              width={1664}
              height={2080}
              loading="lazy"
              decoding="async"
            />
            <div className="visual-caption">
              <span>WORKSHOP STUDY</span>
              <p>12oz Cotton Canvas / Solid Brass Hardware / Reinforced Knees</p>
            </div>
          </div>

          <div className="manifesto-content">
            <div className="dossier-rail dossier-rail--light">
              <span>03</span>
              <p>OUR PRINCIPLES</p>
            </div>
            <h2>A simpler way<br /><em>of making things.</em></h2>
            <p className="manifesto-dek">
              Four simple commitments guide every garment that leaves our studio.
            </p>

            <div className="tenets-matrix">
              {philosophyPoints.map((p) => (
                <div key={p.num} className="tenet-item">
                  <div className="tenet-header">
                    <span className="tenet-num">{p.num}</span>
                    <span className="tenet-tag">{p.label}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 04: CLOSING & NAVIGATION */}
        <section className="dossier-close dossier-close--dark">
          <p className="eyebrow">EXPLORE DROP 001</p>
          <h2>See how it’s made.<br /><em>Every detail explained.</em></h2>
          <p>
            From the weave of our 12oz canvas to the placement of every solid brass rivet, discover the engineering behind Drop 001.
          </p>
          <div className="close-actions">
            <Link className="dark-record" href="/deep-dive">
              <span>READ THE TECHNICAL DETAILS</span>
              <ArrowUpRight size={17} />
            </Link>
            <Link
              className="dark-record dark-record--secondary"
              href="/#enquiry"
            >
              <span>START AN ENQUIRY</span>
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </section>
      </main>
    </EditorialPageFrame>
  );
}
