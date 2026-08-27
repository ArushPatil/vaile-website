/* VAILE — Deep Dive: Technical Specifications, Material Science & Pattern Kinematics */
import { ArrowDown, ArrowUpRight, Check, Compass, Cpu, Layers, Ruler, Shield, Wrench } from "lucide-react";
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

const sizingMatrix = [
  { size: "30", waist: "31.0\"", rise: "11.25\"", thigh: "24.5\"", knee: "19.0\"", hem: "17.5\"", inseam: "31.5\"" },
  { size: "32", waist: "33.0\"", rise: "11.75\"", thigh: "25.5\"", knee: "19.75\"", hem: "18.0\"", inseam: "32.0\"" },
  { size: "34", waist: "35.0\"", rise: "12.25\"", thigh: "26.5\"", knee: "20.5\"", hem: "18.5\"", inseam: "32.0\"" },
  { size: "36", waist: "37.0\"", rise: "12.75\"", thigh: "27.5\"", knee: "21.25\"", hem: "19.0\"", inseam: "32.5\"" },
  { size: "38", waist: "39.0\"", rise: "13.25\"", thigh: "28.5\"", knee: "22.0\"", hem: "19.5\"", inseam: "32.5\"" },
];

export default function DeepDive() {
  return (
    <EditorialPageFrame active="/deep-dive">
      <PageMeta
        title="Deep Dive — VAILE Drop 001 Technical Specifications"
        description="Complete technical specifications for VAILE Drop 001: 12oz duck canvas material science, pattern kinematics, solid hardware, and sizing matrices."
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
              A comprehensive technical record of Drop 001: textile architecture, pattern kinematics, solid brass reinforcement points, and precision dimensional tolerances.
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
            <div className="tech-spec-headline">
              <p className="eyebrow">RAW MATERIAL RECORD</p>
              <h2>12oz 100% Cotton Duck.<br /><span>Loom-state integrity.</span></h2>
              <p className="section-dek">
                Drop 001 is built from a custom 12oz plain weave cotton duck selected for its high yarn density, firm structural drape, and resistance to cyclic friction.
              </p>
            </div>
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
            <div className="hardware-headline">
              <p className="eyebrow">STRESS-POINT ANCHORING</p>
              <h2>Anchored where<br /><span>repetition lives.</span></h2>
              <p className="section-dek">
                Every seam, bar-tack, and rivet is mapped to the physiological contact zones where trousers typically fail.
              </p>
            </div>
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

        {/* SECTION 04: DIMENSIONAL TOLERANCES & FLAT MEASUREMENTS */}
        <section className="tech-sizing-section dossier-section">
          <div className="sizing-header">
            <div className="dossier-rail">
              <span>04</span>
              <p>DIMENSIONAL SPECIFICATIONS</p>
            </div>
            <div className="sizing-headline">
              <p className="eyebrow">PRECISION SIZING MATRIX</p>
              <h2>All measurements taken flat.<br /><span>Tolerance ±0.5 inches.</span></h2>
              <p className="section-dek">
                Compare these exact flat dimensions against a pair of well-fitting non-stretch trousers in your current wardrobe.
              </p>
            </div>
          </div>

          <div className="spec-matrix-wrap">
            <table className="spec-matrix-table">
              <thead>
                <tr>
                  <th>WAIST SIZE</th>
                  <th>WAIST (FLAT)</th>
                  <th>FRONT RISE</th>
                  <th>THIGH (AT CROTCH)</th>
                  <th>KNEE (14" DOWN)</th>
                  <th>LEG OPENING (HEM)</th>
                  <th>INSEAM</th>
                </tr>
              </thead>
              <tbody>
                {sizingMatrix.map((r) => (
                  <tr key={r.size}>
                    <td className="size-badge-cell">SIZE {r.size}</td>
                    <td>{r.waist}</td>
                    <td>{r.rise}</td>
                    <td>{r.thigh}</td>
                    <td>{r.knee}</td>
                    <td>{r.hem}</td>
                    <td>{r.inseam}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
