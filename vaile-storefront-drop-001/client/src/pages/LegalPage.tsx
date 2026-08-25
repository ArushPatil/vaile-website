/** VAILE legal shell: clear policy text aligned with the storefront's restrained editorial system. */
import type { ReactNode } from "react";

type LegalPageProps = {
  eyebrow: string;
  title: string;
  lead: string;
  children: ReactNode;
};

export default function LegalPage({ eyebrow, title, lead, children }: LegalPageProps) {
  return (
    <main id="main" className="legal-page">
      <header className="legal-page__header">
        <a href="/" className="legal-page__brand" aria-label="Return to Vaile storefront">
          <img src="/images/logo.png" alt="" style={{ width: 18, height: 18, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
          <span>VAILE</span>
          <small>/ 001</small>
        </a>
        <a href="/" className="legal-page__return">BACK TO STOREFRONT</a>
      </header>

      <section className="legal-page__hero">
        <p className="legal-page__eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="legal-page__lead">{lead}</p>
      </section>

      <aside className="legal-page__notice" aria-label="Required business details">
        <span>IMPLEMENTATION NOTE</span>
        <p>
          Before publishing this legal copy, replace every bracketed item with the relevant verified business detail and have the final text reviewed for the jurisdictions where VAILE operates and sells.
        </p>
      </aside>

      <article className="legal-page__document">{children}</article>

      <footer className="legal-page__footer">
        <span>VAILE · DROP 001 · 12 OZ DUCK CANVAS</span>
        <div>
          <a href="/terms">TERMS</a>
          <a href="/privacy">PRIVACY</a>
        </div>
      </footer>
    </main>
  );
}
