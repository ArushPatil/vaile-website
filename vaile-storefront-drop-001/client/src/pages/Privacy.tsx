/** VAILE privacy notice: documents the current website and WhatsApp enquiry flow. */
import LegalPage from "./LegalPage";
import PageMetadata from "@/components/PageMetadata";

export default function Privacy() {
  return (
    <><PageMetadata title="Privacy Policy — Vaile" description="How VAILE handles information connected to the DROP 001 website and WhatsApp enquiries." /><LegalPage
      eyebrow="LEGAL RECORD / 02"
      title="Privacy Policy"
      lead="This notice explains how VAILE handles information connected to the website and WhatsApp enquiries."
    >
      <p className="legal-page__effective">EFFECTIVE DATE: [INSERT EFFECTIVE DATE]</p>

      <section>
        <h2>1. Controller and contact</h2>
        <p>
          <strong>[LEGAL BUSINESS NAME]</strong>, of <strong>[BUSINESS ADDRESS]</strong>, is responsible for the personal information described in this policy. For privacy questions, requests, or complaints, contact <a href="mailto:[CONTACT EMAIL]">[CONTACT EMAIL]</a>.
        </p>
      </section>

      <section>
        <h2>2. Information we may collect</h2>
        <p>
          Depending on how you use VAILE, we may process the information you provide in a WhatsApp enquiry, such as your name, phone number, preferred waist, fit questions, delivery details, and correspondence. The storefront itself does not currently load third-party analytics. Hosting providers may still process limited technical information, such as IP address and browser request data, to deliver and secure the website under their own documented practices.
        </p>
      </section>

      <section>
        <h2>3. WhatsApp allocation conversations</h2>
        <p>
          The site opens WhatsApp with an editable enquiry message that includes your selected preferred waist. Once you choose to continue in WhatsApp, your use of that service is also governed by WhatsApp's own terms and privacy practices. VAILE uses information you provide in that conversation to respond to enquiries, confirm availability, discuss sizing, administer accepted orders, and provide customer support.
        </p>
      </section>

      <section>
        <h2>4. Why we use information</h2>
        <p>
          We use information to operate and secure the website, respond to enquiries, communicate about an order, meet legal or accounting obligations, prevent misuse, and understand how the storefront performs. The legal basis or equivalent justification for each use depends on the applicable law and may include taking steps requested by you before a contract, performing a contract, complying with legal obligations, pursuing legitimate interests, or your consent where required.
        </p>
      </section>

      <section>
        <h2>5. Sharing and service providers</h2>
        <p>
          We may share information with providers that help us operate the storefront, host the website, communicate through WhatsApp, process a confirmed order, deliver goods, obtain professional advice, or meet legal obligations. We do not sell personal information in exchange for money. If the meaning of "sale" or "sharing" under your local law is broader, <strong>[INSERT JURISDICTION-SPECIFIC DISCLOSURE IF REQUIRED]</strong>.
        </p>
      </section>

      <section>
        <h2>6. Browser storage and analytics</h2>
        <p>
          VAILE does not currently load third-party analytics or set a storefront analytics preference. The site may use a session-only browser value to avoid replaying its opening loader during the same visit; that value is not used for cross-site tracking or advertising. Before adding analytics, cookies, pixels, or another storage-based service, update this notice and implement any consent controls required where VAILE operates or receives visitors.
        </p>
      </section>

      <section>
        <h2>7. Retention and security</h2>
        <p>
          We retain personal information only for as long as reasonably necessary for the purposes described here, including handling enquiries, administering accepted orders, resolving disputes, and meeting legal obligations. We use reasonable administrative, technical, and organizational measures to protect information, but no internet transmission or storage system can be guaranteed completely secure.
        </p>
      </section>

      <section>
        <h2>8. Your rights</h2>
        <p>
          Depending on your location, you may have rights to request access, correction, deletion, restriction, portability, or objection in relation to your personal information, and to withdraw consent where processing relies on consent. You may also have the right to complain to a relevant regulator. To make a request, contact <a href="mailto:[CONTACT EMAIL]">[CONTACT EMAIL]</a>. We may need to verify your identity before responding.
        </p>
      </section>

      <section>
        <h2>9. International transfers and updates</h2>
        <p>
          Information may be processed in countries other than the country where you live when service providers, communications platforms, hosting, or delivery partners operate internationally. Where applicable law requires safeguards for those transfers, we will use an appropriate mechanism. We may update this policy as our services or legal obligations change; the effective date above identifies the current version.
        </p>
      </section>
    </LegalPage></>
  );
}
