/* VAILE — Deep Dive: Technical Specifications, Material Science & Situational Contexts */
import { ArrowDown, ArrowUpRight, Compass, Layers, Shield, Wrench } from "lucide-react";
import { Link } from "wouter";
import { EditorialPageFrame, PageMeta } from "@/components/EditorialPageFrame";

const textileSpecs = [
  { label: "RAW FIBER", value: "100% Long-Staple Ring-Spun Cotton", note: "High tensile single yarn with minimal pilling" },
  { label: "WEAVE ARCHITECTURE", value: "Dense Plain Weave (Canvas Duck)", note: "Tight 1-over-1 balanced orthogonal yarn interlocking" },
  { label: "FABRIC WEIGHT", value: "12.0 oz/yd² (407 GSM)", note: "Heavyweight structural fall with natural wind resistance" },
  { label: "YARN COUNT", value: "10s × 10s Double Ply", note: "Plied core structure for superior puncture resistance" },
  { label: "FINISHING PROCESS", value: "Loom-State Dry Calendered", note: "Zero synthetic softeners or artificial distressing" },
  { label: "WARP RESIDUAL SHRINK", value: "< 1.5% Controlled", note: "Sanforized stabilization prevents post-wash inseam loss" },
  { label: "AGING TRAJECTORY", value: "Mechanical Honeycombing & Whiskering", note: "Softens at flex points while retaining foundational structure" },
];

const patternKinematics = [
  {
    num: "01",
    title: "MID-HIGH ARTICULATED RISE",
    focus: "Saddle & Seat Stability",
    description: "The waistband is calibrated with a contoured rear pitch that sits securely on the iliac crest. When seated, crouching, or leaning forward over handlebars, the waistband remains anchored without rear gaping or lower-back draft."
  },
  {
    num: "02",
    title: "STRAIGHT-FALL KINEMATICS",
    focus: "Zero Artificial Taper",
    description: "The leg pattern drops plumb from the lower hip through the knee to the hem. This prevents the calf binding common in modern tapered trousers and ensures an effortless, natural break over work boots and low-profile footwear alike."
  },
  {
    num: "03",
    title: "2.5\" QUADRICEPS EASE",
    focus: "Rotational Freedom",
    description: "We engineered 2.5 inches of calculated volume through the thigh circumference. This allows the wearer to mount a bicycle, climb ladders, and step into deep lunges without the fabric binding against the knee or straining the pocket mouths."
  },
  {
    num: "04",
    title: "DUAL-PLANE DOUBLE KNEE",
    focus: "Reinforced Contact Zone",
    description: "A full secondary layer of 12oz duck canvas extends from the mid-thigh to below the tibial crest. Top-stitched with heavy core-spun thread and reinforced with clean stress-mitigation corners."
  }
];

const hardwareLedger = [
  {
    title: "SOLID BRASS COUNTERSUNK RIVETS",
    loc: "Pocket Mouth Corners & Stress Vertices",
    detail: "Custom machined solid brass rivets with flat rear washers. Positioned at high-shear junction points to permanently prevent seam tearing under heavy pocket loads."
  },
  {
    title: "42 HIGH-DENSITY BAR-TACKS",
    loc: "Belt Loops, Crotch Gusset, Pocket Flanges",
    detail: "Heavy 28-stitch industrial bar-tacking secures every belt loop top and bottom, outseam terminations, and pocket entries against cyclic fatigue."
  },
  {
    title: "TEX-80 CORE-SPUN THREAD",
    loc: "All Structural & Flat-Felled Seams",
    detail: "Polyester continuous filament core wrapped in long-staple cotton. Combines the tensile breaking strength of synthetic fiber with the heat and UV resistance of cotton."
  },
  {
    title: "9.5\" DEEP COTTON DUCK POCKET BAGS",
    loc: "Front Symmetrical Pocket Architecture",
    detail: "Deep utility pockets cut from the same durable 12oz canvas rather than fragile poplin, ensuring daily pocket knives, tools, and heavy phones never wear through."
  }
];

const situationalApplications = [
  {
    num: "01",
    scenario: "ARCHITECTURE & SITE INSPECTION",
    tag: "Boardroom to Jobsite",
    description: "Engineered for designers who move between drafting tables, client presentations, and active job sites. The crisp straight fall maintains a refined architectural silhouette, while the 12oz duck canvas resists gypsum dust, structural steel scuffs, and ladder friction."
  },
  {
    num: "02",
    scenario: "TWO-WHEEL & COMMUTER TRANSIT",
    tag: "Motorcycle & Urban Cycle",
    description: "The contoured rear rise stays anchored to prevent lower back exposure on motorcycles, café racers, and road bikes. The tight plain weave acts as a natural windbreak against highway draft, while 2.5\" thigh ease prevents knee binding across miles of saddle time."
  },
  {
    num: "03",
    scenario: "INDUSTRIAL DESIGN & PROTOTYPING",
    tag: "Floor Assembly & Bench Work",
    description: "From clay modeling and 3D printing to CNC machine shop setups. The 9.5-inch heavy canvas pocket bags securely house brass calipers, steel rules, and marking tools without pocket-corner blowout or sagging."
  },
  {
    num: "04",
    scenario: "LONG-HAUL TRANSIT & TRAVEL UNIFORM",
    tag: "Extended Transit Stability",
    description: "Unlike synthetic trousers that crease permanently or denim that bags out at the knees after hours seated in airplane cabins, dense cotton duck canvas holds its structured drape across 14-hour flights, looking sharp the moment you land."
  }
];

export default function DeepDive() {
  return (
    <EditorialPageFrame active="/deep-dive">
      <PageMeta
        title="Deep Dive — VAILE Drop 001 Technical Specifications & Situational Index"
        description="Technical specifications for VAILE Drop 001: 12oz duck canvas material science, pattern kinematics, solid hardware, and versatile situational contexts."
        canonical="https://vaile.studio/deep-dive"
      />
      <main id="main" className="editorial-page field-dossier deep-dossier">
        {/* HERO */}
        <section className="editorial-hero dossier-hero deep-dossier__hero">
          <div className="editorial-hero__visual">
            <img
              src="/images/vaile-canvas-double-knee-study.jpg"
              alt="VAILE Drop 001 macro technical study — 12oz duck canvas and double-knee construction"
            />
          </div>
          <div className="editorial-hero__copy">
            <p className="eyebrow">FIELD DOSSIER / SPECIFICATION 001</p>
            <h1>Garment physics.<br /><em>Material & method.</em></h1>
            <p className="hero-dek">
              A comprehensive technical record of Drop 001: textile architecture, pattern kinematics, solid brass reinforcement points, and extended situational contexts.
            </p>
            <a className="scroll-cue" href="#textile">
              <span>INSPECT THE TECHNICAL LEDGER</span>
              <ArrowDown size={16} />
            </a>
          </div>
          <span className="editorial-hero__index">SPECIFICATION / 01</span>
        </section>

        {/* SECTION 01: TEXTILE ARCHITECTURE & MATERIAL SCIENCE */}
        <section id="textile" className="tech-spec-section dossier-section">
          <div className="tech-spec-header">
            <div className="dossier-rail">
              <span>01</span>
              <p>TEXTILE ARCHITECTURE</p>
            </div>
            <p className="eyebrow">RAW MATERIAL RECORD</p>
            <h2>12oz 100% Cotton Duck.<br /><span>Loom-state integrity.</span></h2>
            <p className="section-dek">
              Drop 001 is built from a custom 12oz plain weave cotton duck selected for its high yarn density, firm structural drape, and resistance to cyclic friction.
            </p>
          </div>

          <div className="tech-data-table-wrap">
            <table className="tech-data-table">
              <thead>
                <tr>
                  <th>SPECIFICATION PROPERTY</th>
                  <th>ENGINEERED METRIC</th>
                  <th>FUNCTIONAL NOTE</th>
                </tr>
              </thead>
              <tbody>
                {textileSpecs.map((spec) => (
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

        {/* SECTION 02: PATTERN KINEMATICS & KINETIC GEOMETRY */}
        <section className="tech-kinematics-section dossier-section">
          <div className="kinematics-intro">
            <div className="dossier-rail dossier-rail--light">
              <span>02</span>
              <p>PATTERN KINEMATICS</p>
            </div>
            <h2>Movement geometry.<br /><em>Calibrated for real days.</em></h2>
            <p className="kinematics-dek">
              The pattern block for Drop 001 was engineered through 14 physical sampling phases to eliminate restriction points across common body movements.
            </p>
          </div>

          <div className="kinematics-layout">
            <div className="kinematics-visual">
              <img
                src="/images/1.webp"
                alt="VAILE Drop 001 front profile standing line"
              />
              <div className="kinematics-badge">
                <span>PATTERN BLOCK // 001</span>
                <strong>RELAXED STRAIGHT CUT</strong>
              </div>
            </div>

            <div className="kinematics-cards">
              {patternKinematics.map((k) => (
                <article key={k.num} className="kinematic-item">
                  <div className="item-header">
                    <span className="item-num">{k.num}</span>
                    <span className="item-focus">{k.focus}</span>
                  </div>
                  <h3>{k.title}</h3>
                  <p>{k.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 03: HARDWARE & STRESS POINT BLUEPRINT */}
        <section className="tech-hardware-section dossier-section">
          <div className="hardware-header">
            <div className="dossier-rail">
              <span>03</span>
              <p>HARDWARE & REINFORCEMENT</p>
            </div>
            <p className="eyebrow">STRESS-POINT ANCHORING</p>
            <h2>Anchored where<br /><span>repetition lives.</span></h2>
            <p className="section-dek">
              Every seam, bar-tack, and rivet is mapped to the physiological contact zones where trousers typically fail.
            </p>
          </div>

          <div className="hardware-grid">
            {hardwareLedger.map((h, i) => (
              <div key={h.title} className="hardware-card">
                <div className="hw-index">0{i + 1} // REINFORCEMENT</div>
                <h3>{h.title}</h3>
                <p className="hw-location">{h.loc}</p>
                <p className="hw-detail">{h.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 04: SITUATIONAL APPLICATION INDEX (REPLACED REDUNDANT SIZE CHART) */}
        <section className="tech-situations-section dossier-section">
          <div className="situations-header">
            <div className="dossier-rail">
              <span>04</span>
              <p>SITUATIONAL CONTEXTS</p>
            </div>
            <p className="eyebrow">BEYOND THE WORKSHOP</p>
            <h2>Engineered for the overlap.<br /><span>Where work & life collide.</span></h2>
            <p className="section-dek">
              Drop 001 is built for lives that don't fit into a single wardrobe category: bridging technical durability with sharp everyday presence.
            </p>
          </div>

          <div className="situations-grid">
            {situationalApplications.map((s) => (
              <article key={s.num} className="situation-card">
                <div className="situation-header">
                  <span className="situation-num">{s.num}</span>
                  <span className="situation-tag">{s.tag}</span>
                </div>
                <h3>{s.scenario}</h3>
                <p>{s.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* SECTION 05: CLOSING & ALLOCATION */}
        <section className="dossier-close dossier-close--lichen">
          <p className="eyebrow">DROP 001 / PRIVATE ALLOCATION</p>
          <h2>Read the specs.<br /><em>Experience the weight.</em></h2>
          <p>
            Fifty numbered pairs worldwide. Private WhatsApp allocation with personal sizing consultation and direct studio support.
          </p>
          <div className="close-actions">
            <a
              className="dark-record"
              href="https://wa.me/918951066881?text=Hello%20VAILE%2C%20I%20would%20like%20to%20enquire%20about%20Edition%20001."
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>START ALLOCATION REQUEST</span>
              <ArrowUpRight size={17} />
            </a>
            <Link className="dark-record dark-record--secondary" href="/about">
              <span>READ THE FOUNDING STORY</span>
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </section>
      </main>
    </EditorialPageFrame>
  );
}
