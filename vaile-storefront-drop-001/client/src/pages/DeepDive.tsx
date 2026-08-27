/* VAILE — Deep Dive: Materials, Fit, Construction & Real-World Use */
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { EditorialPageFrame, PageMeta } from "@/components/EditorialPageFrame";

const fabricDetails = [
  { label: "RAW MATERIAL", value: "100% Long-Staple Cotton", note: "Breathable natural fiber that softens beautifully with wear" },
  { label: "FABRIC WEIGHT", value: "12 oz/yd² (Heavyweight)", note: "Substantial structure with clean drape and wind resistance" },
  { label: "WEAVE STRUCTURE", value: "Dense Plain Weave Canvas", note: "Tough, tightly woven yarn resistant to snags and friction" },
  { label: "FINISHING", value: "Raw & Unwashed", note: "No synthetic softening chemicals or artificial distressing" },
  { label: "SHRINKAGE", value: "Pre-Stabilized (< 1.5%)", note: "Holds its length and silhouette through routine washing" },
  { label: "BREAK-IN", value: "Natural Wear Patina", note: "Molds to your daily movement, creasing and fading uniquely" },
];

const fitFeatures = [
  {
    num: "01",
    title: "CONTOURED WAISTBAND",
    focus: "Sits Naturally at the Waist",
    description: "Shaped with a slightly higher rear rise to sit flush against the lower back. Stays comfortably in place when you're seated, crouching, or riding a bike."
  },
  {
    num: "02",
    title: "RELAXED STRAIGHT LEG",
    focus: "Clean Vertical Line",
    description: "Falls straight from hip to hem with zero artificial taper. Hangs cleanly over both heavy work boots and low-profile sneakers."
  },
  {
    num: "03",
    title: "ROOM THROUGH THE THIGH",
    focus: "Effortless Movement",
    description: "Generously cut through the seat and quadriceps so you can climb stairs, cycle, and move freely without any tight pulling across the fabric."
  },
  {
    num: "04",
    title: "REINFORCED DOUBLE KNEES",
    focus: "Long-Term Durability",
    description: "A full secondary panel of 12oz cotton canvas extends from the thigh to below the knee, providing extra protection and lasting durability."
  }
];

const constructionPoints = [
  {
    title: "SOLID BRASS RIVETS",
    loc: "Pocket Corners & Key Junctions",
    detail: "Hand-set solid brass rivets protect each pocket corner against tears, ensuring heavy everyday loads never blow out the seams."
  },
  {
    title: "42 BAR-TACK REINFORCEMENTS",
    loc: "Belt Loops & Stress Points",
    detail: "High-density industrial bar-tack stitches anchor all belt loops, outseam terminations, and pocket openings against daily strain."
  },
  {
    title: "HEAVY-DUTY CORE THREAD",
    loc: "All Structural Seams",
    detail: "High-tensile poly-core thread wrapped in cotton combines maximum break strength with high resistance to heat, washing, and friction."
  },
  {
    title: "9.5-INCH DEEP CANVAS POCKETS",
    loc: "Front Pocket Bags",
    detail: "Extra-deep pocket bags cut from full-weight cotton canvas rather than fragile thin lining, so keys and tools never wear through."
  }
];

const realWorldUse = [
  {
    num: "01",
    scenario: "DESIGN STUDIOS & SITE VISITS",
    tag: "Studio to Jobsite",
    description: "Sharp and tailored enough for client presentations, yet resilient enough for dusty active workshops, building sites, and hands-on days."
  },
  {
    num: "02",
    scenario: "COMMUTING & TWO-WHEEL TRANSIT",
    tag: "Motorcycle & Urban Cycling",
    description: "The tight canvas weave naturally blocks chilly highway wind, while the relaxed thigh cut ensures zero binding across hours in the saddle."
  },
  {
    num: "03",
    scenario: "WORKSHOP & DAILY CREATIVE WORK",
    tag: "Bench Work & Floor Assembly",
    description: "Generous canvas pockets keep notebooks, markers, and tools close at hand without sagging or pulling the trousers down."
  },
  {
    num: "04",
    scenario: "TRAVEL & EXTENDED TRANSIT",
    tag: "Long-Haul Stability",
    description: "Unlike synthetic trousers that wrinkle or stretch denim that bags out at the knees, 12oz cotton canvas holds its crisp drape through 14-hour flights."
  }
];

export default function DeepDive() {
  return (
    <EditorialPageFrame active="/deep-dive">
      <PageMeta
        title="Deep Dive — VAILE Drop 001 Materials, Fit & Craft"
        description="A detailed look at VAILE Drop 001: 12oz cotton duck canvas, relaxed straight cut, solid brass hardware, and real-world versatility."
        canonical="https://vaile.studio/deep-dive"
      />
      <main id="main" className="editorial-page field-dossier deep-dossier">
        {/* HERO */}
        <section className="editorial-hero dossier-hero deep-dossier__hero">
          <div className="editorial-hero__visual">
            <img
              src="/images/vaile-canvas-double-knee-study.jpg"
              alt="VAILE Drop 001 cotton canvas and double-knee detail"
            />
          </div>
          <div className="editorial-hero__copy">
            <p className="eyebrow">PRODUCT DETAILS</p>
            <h1>Materials, fit,<br /><em>and craft.</em></h1>
            <p className="hero-dek">
              A clear look at everything that goes into Drop 001: from the weight of our pure cotton canvas to the reinforcement on every pocket.
            </p>
            <a className="scroll-cue" href="#fabric">
              <span>EXPLORE THE DETAILS</span>
              <ArrowDown size={16} />
            </a>
          </div>
          <span className="editorial-hero__index">SPECIFICATIONS</span>
        </section>

        {/* SECTION 01: THE FABRIC */}
        <section id="fabric" className="tech-spec-section dossier-section">
          <div className="tech-spec-header">
            <div className="dossier-rail">
              <span>01</span>
              <p>THE MATERIAL</p>
            </div>
            <p className="eyebrow">FABRIC OVERVIEW</p>
            <h2>12oz Pure Cotton Canvas.<br /><span>Durable, breathable, raw.</span></h2>
            <p className="section-dek">
              We chose a heavyweight 100% cotton duck canvas that holds its structure, blocks the wind, and softens naturally with every wash.
            </p>
          </div>

          <div className="tech-data-table-wrap">
            <table className="tech-data-table">
              <thead>
                <tr>
                  <th>PROPERTY</th>
                  <th>SPECIFICATION</th>
                  <th>WHY IT MATTERS</th>
                </tr>
              </thead>
              <tbody>
                {fabricDetails.map((spec) => (
                  <tr key={spec.label}>
                    <td className="spec-label-cell">{spec.label}</td>
                    <td className="spec-val-cell">{spec.value}</td>
                    <td className="spec-note-cell">{spec.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 02: THE FIT */}
        <section className="tech-kinematics-section dossier-section">
          <div className="kinematics-intro">
            <div className="dossier-rail dossier-rail--light">
              <span>02</span>
              <p>THE SILHOUETTE</p>
            </div>
            <h2>Cut for movement.<br /><em>Tailored for daily life.</em></h2>
            <p className="kinematics-dek">
              Designed to feel easy when you're sitting, walking, or riding, while keeping a sharp, clean vertical drape.
            </p>
          </div>

          <div className="kinematics-layout">
            <div className="kinematics-visual">
              <img
                src="/images/1.webp"
                alt="VAILE Drop 001 straight leg fit"
              />
              <div className="kinematics-badge">
                <span>THE CUT</span>
                <strong>RELAXED STRAIGHT FIT</strong>
              </div>
            </div>

            <div className="kinematics-cards">
              {fitFeatures.map((f) => (
                <article key={f.num} className="kinematic-item">
                  <div className="item-header">
                    <span className="item-num">{f.num}</span>
                    <span className="item-focus">{f.focus}</span>
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 03: HARDWARE & CONSTRUCTION */}
        <section className="tech-hardware-section dossier-section">
          <div className="hardware-header">
            <div className="dossier-rail">
              <span>03</span>
              <p>CONSTRUCTION</p>
            </div>
            <p className="eyebrow">REINFORCEMENTS</p>
            <h2>Reinforced where<br /><span>it matters most.</span></h2>
            <p className="section-dek">
              We placed solid brass metalwork and dense bar-tack stitching at every high-stress point on the garment.
            </p>
          </div>

          <div className="hardware-grid">
            {constructionPoints.map((item, i) => (
              <div key={item.title} className="hardware-card">
                <div className="hw-index">DETAIL 0{i + 1}</div>
                <h3>{item.title}</h3>
                <p className="hw-location">{item.loc}</p>
                <p className="hw-detail">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 04: REAL WORLD USE */}
        <section className="tech-situations-section dossier-section">
          <div className="situations-header">
            <div className="dossier-rail">
              <span>04</span>
              <p>VERSATILITY</p>
            </div>
            <p className="eyebrow">WHERE TO WEAR</p>
            <h2>Made for real days.<br /><span>In and out of the studio.</span></h2>
            <p className="section-dek">
              Drop 001 is versatile enough to transition across work, travel, and downtime without feeling out of place.
            </p>
          </div>

          <div className="situations-grid">
            {realWorldUse.map((item) => (
              <article key={item.num} className="situation-card">
                <div className="situation-header">
                  <span className="situation-num">{item.num}</span>
                  <span className="situation-tag">{item.tag}</span>
                </div>
                <h3>{item.scenario}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* SECTION 05: CLOSING */}
        <section className="dossier-close dossier-close--lichen">
          <p className="eyebrow">EDITION 001</p>
          <h2>Fifty numbered pairs.<br /><em>Made to last a decade.</em></h2>
          <p>
            Reach out directly on WhatsApp for personal sizing advice, questions, or to request your pair.
          </p>
          <div className="close-actions">
            <a
              className="dark-record"
              href="https://wa.me/918951066881?text=Hello%20VAILE%2C%20I%20would%20like%20to%20enquire%20about%20Edition%20001."
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>ENQUIRE ON WHATSAPP</span>
              <ArrowUpRight size={17} />
            </a>
            <Link className="dark-record dark-record--secondary" href="/about">
              <span>READ OUR STORY</span>
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </section>
      </main>
    </EditorialPageFrame>
  );
}
