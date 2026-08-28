/* VAILE Field Dossier shell: restrained editorial navigation with only the primary product, studio, and technical record routes. */
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "wouter";
import { SITE_URL } from "@/lib/site";

// Menu choreography constants copied verbatim from HomeChapters so both shells animate identically.
const menuEase = [0.23, 1, 0.32, 1] as const;
const menuDuration = (reducedMotion: boolean) => (reducedMotion ? 0 : 0.42);
const mark = "/images/logo.png";

// Restored by PageMeta cleanup on unmount so client-side navigation
// back to "/" never inherits a previous route's metadata.
const DEFAULT_HOME_TITLE = "VAILE — Heavyweight Workwear & Garment Architecture";
const DEFAULT_HOME_DESCRIPTION =
  "Heavyweight duck canvas workwear pants with engineered construction, detailed size specifications, and private enquiry.";

const links = [
  { label: "Home", href: "/" },
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
  const menuRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousDocOverflow = document.documentElement.style.overflow;
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousDocOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [active]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Focus trap: keyboard focus lives inside the open dialog and returns to the
  // opener on close — matching the homepage-shell a11y bar without touching home.
  useEffect(() => {
    if (!menuOpen || !menuRef.current) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusables = () =>
      Array.from(menuRef.current?.querySelectorAll<HTMLElement>("button, a[href]") ?? []);
    focusables()[0]?.focus();
    const onTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const list = focusables();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onTab);
    return () => {
      window.removeEventListener("keydown", onTab);
      previouslyFocused?.focus?.();
    };
  }, [menuOpen]);

  const reducedMotionQuery =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className="manual-shell editorial-page-shell">
      <header className="manual-header" aria-label="Site header">
        <button type="button" className="header-menu" onClick={() => setMenuOpen(true)} aria-label="Toggle navigation menu" aria-expanded={menuOpen} aria-controls="mobile-menu">
          <Menu size={18} />
        </button>
        <Link className="manual-brand" href="/" aria-label="VAILE home">
          <img src={mark} alt="" />
          <span className="brand-wordmark"><span className="kerning-v">V</span><span className="kerning-a">A</span>ILE</span>
          <small>001</small>
        </Link>
        <Link className="header-action" href="/#enquiry" aria-label="Go to the VAILE enquiry form">
          <b>ENQUIRE</b><ArrowUpRight size={15} />
        </Link>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav ref={menuRef} id="mobile-menu" className="manual-menu" role="dialog" aria-modal="true" aria-label="Site navigation" initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }} animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }} exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }} transition={{ duration: menuDuration(reducedMotionQuery), ease: menuEase }}>
            <motion.div initial={{ opacity: 0, y: reducedMotionQuery ? 0 : -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotionQuery ? 0 : -6 }} transition={{ duration: reducedMotionQuery ? 0 : 0.24, delay: reducedMotionQuery ? 0 : 0.08, ease: menuEase }}>
              <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X size={25} /></button>
              <p>VAILE · DROP 001</p>
            </motion.div>
            {links.map((link, index) => (
              <motion.div key={link.href} initial={{ opacity: 0, y: reducedMotionQuery ? 0 : 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotionQuery ? 0 : -8 }} transition={{ duration: reducedMotionQuery ? 0 : 0.28, delay: reducedMotionQuery ? 0 : 0.16 + index * 0.06, ease: menuEase }}>
                <Link href={link.href} onClick={() => setMenuOpen(false)} className={active === link.href ? "is-current" : ""}>{link.label}</Link>
              </motion.div>
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
        <div>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
      </footer>
    </div>
  );
}

export const PlaceholderNote = ({ children }: { children: ReactNode }) => <span className="placeholder-note">{children}</span>;
