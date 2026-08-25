/** VAILE terms: clear enquiry language with placeholders for client-supplied legal details. */
import LegalPage from "./LegalPage";
import PageMetadata from "@/components/PageMetadata";

export default function Terms() {
  return (
    <><PageMetadata title="Terms of Service — Vaile" description="Terms governing the VAILE DROP 001 WhatsApp enquiry process." /><LegalPage
      eyebrow="LEGAL RECORD / 01"
      title="Terms of Service"
      lead="These terms govern use of the VAILE website and the WhatsApp enquiry process for DROP 001."
    >
      <p className="legal-page__effective">EFFECTIVE DATE: [INSERT EFFECTIVE DATE]</p>

      <section>
        <h2>1. Who we are</h2>
        <p>
          This website is operated by <strong>[LEGAL BUSINESS NAME]</strong>, of <strong>[BUSINESS ADDRESS]</strong> ("VAILE", "we", "us", or "our"). Questions about these terms may be sent to <a href="mailto:[CONTACT EMAIL]">[CONTACT EMAIL]</a>.
        </p>
      </section>

      <section>
        <h2>2. Private allocation model</h2>
        <p>
          Selecting a size or opening a WhatsApp enquiry is an expression of interest only. It is not a reservation, a completed purchase, an acceptance of an order, or a guarantee that a requested size will be available.
        </p>
        <p>
          Availability, order acceptance, payment instructions, delivery timing, and any required measurements are confirmed directly during the WhatsApp enquiry. VAILE may decline, limit, or cancel an enquiry where permitted by applicable law, including where availability, pricing, payment, shipping, or product information cannot be confirmed.
        </p>
      </section>

      <section>
        <h2>3. Pricing and payment</h2>
        <p>
          The website currently displays DROP 001 at <strong>₹6,200 INR / $100 USD</strong>. Unless we state otherwise in writing during the enquiry, displayed pricing is informational and may exclude applicable taxes, duties, shipping, insurance, or other charges. The final amount, currency, payment method, and payment timing will be confirmed before an order is accepted.
        </p>
      </section>

      <section>
        <h2>4. Product information</h2>
        <p>
          We aim to describe the 12 oz duck canvas trousers accurately. Product photography, colour, grain, texture, and finish may appear differently across displays, lighting conditions, production batches, and normal material variation. Product images and copy are not a promise that every visual characteristic will be identical in every garment.
        </p>
      </section>

      <section>
        <h2>5. Delivery, returns, and cancellations</h2>
        <p>
          Delivery methods, delivery territories, estimated timing, cancellation rights, and return or exchange eligibility will be governed by <strong>[INSERT RETURNS / CANCELLATION POLICY]</strong> and any additional terms confirmed before order acceptance. Nothing in these terms is intended to limit non-excludable consumer rights that apply to you.
        </p>
      </section>

      <section>
        <h2>6. Acceptable use</h2>
        <p>
          You may use the website for lawful personal and commercial-information purposes. You must not interfere with the website, attempt unauthorized access, misuse any enquiry channel, submit false or misleading information, or use VAILE content in a way that infringes our rights or the rights of others.
        </p>
      </section>

      <section>
        <h2>7. Intellectual property</h2>
        <p>
          The VAILE name, visual identity, editorial layout, photographs, text, graphics, and source materials on this website are owned by or licensed to VAILE and are protected by applicable intellectual-property laws. You may not reproduce, modify, distribute, or commercially exploit them without prior written permission, except where applicable law allows otherwise.
        </p>
      </section>

      <section>
        <h2>8. Disclaimers and liability</h2>
        <p>
          To the maximum extent permitted by applicable law, the website is provided on an "as available" basis. We do not guarantee uninterrupted or error-free operation. Nothing in these terms excludes or limits liability that cannot lawfully be excluded or limited, including mandatory consumer protections.
        </p>
      </section>

      <section>
        <h2>9. Governing law and changes</h2>
        <p>
          These terms are governed by the laws of <strong>[INSERT GOVERNING JURISDICTION]</strong>, subject to any mandatory protections available in your place of residence. We may update these terms when our services, enquiry process, or legal obligations change. The effective date above identifies the current version.
        </p>
      </section>
    </LegalPage></>
  );
}
