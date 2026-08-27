/* VAILE Field Dossier shell: restrained editorial navigation with only the primary product, studio, and technical record routes. */
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { SITE_URL, WHATSAPP_ENQUIRY_URL as enquiry } from "@/lib/site";

const mark = "/images/logo.png";

// Restored by PageMeta cleanup on unmount so client-side navigation
// back to "/" never inherits a previous route's metadata.
const DEFAULT_HOME_TITLE = "VAILE — Heavyweight Workwear & Garment Architecture";
const DEFAULT_HOME_DESCRIPTION =
  "Heavyweight duck canvas workwear pants with engineered construction, detailed size specifications, and private enquiry.";

const links = [
  { label: "Drop 001", href: "/" },
  { label: "About", href: "/about" },
  { label: "Deep Dive", href: "/deep-dive" },
];

export function PageMeta({ title, description, canonical }: { title: string; description: string; canonical: string }) {
  useEffect(() => {
    document.title = title;
    const descriptionNode = document.querySelector('meta[name="description"]');
    descriptionNode?.setAttribute("content", description);
    let canonicalNode = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalNode) {
      canonicalNode = document.createElement("link");
      canonicalNode.rel = "canonical";
      document.head.appendChild(canonicalNode);
    }
    canonicalNode.href = canonical;
    return () => {
      document.title = DEFAULT_HOME_TITLE;
      descriptionNode?.setAttribute("content", DEFAULT_HOME_DESCRIPTION);
      if (canonicalNode) canonicalNode.href = `${SITE_URL}/`;
    };
  }, [title, description, canonical]);
  return null;
}

export function EditorialPageFrame({ children, active }: { children: ReactNode; active: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (menuOpen) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const go = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("/#")) {
      navigate(href);
      window.setTimeout(() => document.querySelector(href.slice(1))?.scrollIntoView({ behavior: "smooth" }), 40);
    }
  };

  return (
    <div className="manual-shell editorial-page-shell">
      <header className="manual-header" aria-label="Site header">
        <button type="button" className="header-menu" onClick={() => setMenuOpen(true)} aria-label="Open navigation menu" aria-expanded={menuOpen} aria-controls="editorial-menu">
          <Menu size={18} />
        </button>
        <Link className="manual-brand" href="/" aria-label="VAILE home">
          <img src={mark} alt="" />
          <span className="brand-wordmark"><span className="kerning-v">V</span><span className="kerning-a">A</span>ILE</span>
          <small>001</small>
        </Link>
        <a className="header-action" href={enquiry} target="_blank" rel="noopener noreferrer" aria-label="Enquire about VAILE on WhatsApp, opens in a new tab">
          <b>ENQUIRE</b><ArrowUpRight size={15} />
        </a>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav id="editorial-menu" className="manual-menu" role="dialog" aria-modal="true" aria-label="Site navigation" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.32 }}>
            <div>
              <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X size={25} /></button>
              <p>VAILE · DROP 001</p>
            </div>
            {links.map((link) => link.href.startsWith("/#") ? (
              <a key={link.href} href={link.href} onClick={() => go(link.href)}>{link.label}</a>
            ) : (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className={active === link.href ? "is-current" : ""}>{link.label}</Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      {children}

      <footer className="manual-footer editorial-page-footer">
        <Link href="/" className="manual-brand" aria-label="VAILE home">
          <img src={mark} alt="VAILE logo" />
          <span className="brand-wordmark"><span className="kerning-v">V</span><span className="kerning-a">A</span>ILE</span>
          <small>001</small>
        </Link>
        <div className="footer-links">
          <Link href="/about">ABOUT</Link>
          <Link href="/deep-dive">DEEP DIVE</Link>
          <Link href="/terms">TERMS</Link>
          <Link href="/privacy">PRIVACY</Link>
          <a href={enquiry} target="_blank" rel="noopener noreferrer">CONCIERGE</a>
        </div>
      </footer>
    </div>
  );
}

export const PlaceholderNote = ({ children }: { children: ReactNode }) => <span className="placeholder-note">{children}</span>;
