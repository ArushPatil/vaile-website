/**
 * Vaile Quarry Specimen privacy control: a restrained field-note banner that
 * remembers only a necessary consent preference and loads analytics after opt-in.
 */
import { useEffect, useState } from "react";

const CONSENT_KEY = "vaile-analytics-consent";

function loadAnalytics() {
  if (document.querySelector("script[data-vaile-analytics]")) return;

  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
  const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;
  if (!endpoint || !websiteId) return;

  const script = document.createElement("script");
  script.defer = true;
  script.src = `${endpoint}/umami`;
  script.dataset.websiteId = websiteId;
  script.dataset.vaileAnalytics = "accepted";
  document.head.appendChild(script);
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const choice = window.localStorage.getItem(CONSENT_KEY);
    if (choice === "accepted") loadAnalytics();
    if (!choice) setVisible(true);
  }, []);

  const choose = (choice: "accepted" | "rejected") => {
    window.localStorage.setItem(CONSENT_KEY, choice);
    if (choice === "accepted") loadAnalytics();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside className="privacy-choice" role="region" aria-label="Privacy choices">
      <div className="privacy-choice__copy">
        <span>PRIVACY CHOICE / 001</span>
        <p>
          VAILE can use optional analytics to understand page use. Choosing necessary only keeps analytics disabled; a necessary local preference records your choice.
        </p>
      </div>
      <div className="privacy-choice__actions">
        <a href="/privacy">READ PRIVACY</a>
        <button type="button" className="privacy-choice__reject" onClick={() => choose("rejected")}>NECESSARY ONLY</button>
        <button type="button" className="privacy-choice__accept" onClick={() => choose("accepted")}>ALLOW ANALYTICS</button>
      </div>
    </aside>
  );
}
