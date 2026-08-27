/* Single point of change for launch configuration: production domain + WhatsApp allocation channel.
   On launch day, update SITE_URL once (e.g. https://vaile.co) and every derived
   canonical URL follows automatically. Change WHATSAPP_PHONE_NUMBER here and every
   enquiry link across the site updates together. */
export const SITE_URL = "https://vaile-website.pages.dev";
export const WHATSAPP_PHONE_NUMBER = "918951066881";

export const WHATSAPP_ENQUIRY_URL = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
  "Hello VAILE,\n\nI would like to enquire about Edition 001.",
)}`;

export function buildWhatsAppEnquiryUrl(itemTitle: string, size: string): string {
  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
    `Hello VAILE,\n\nI would like to enquire about:\n• Item: ${itemTitle}\n• Size: ${size}\n\nPlease share availability and allocation details.`,
  )}`;
}