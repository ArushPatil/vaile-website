/* Single point of change for launch configuration: production domain + WhatsApp allocation channel.
   On launch day, update SITE_URL once (e.g. https://vaile.co) and every derived
   canonical URL follows automatically. Change WHATSAPP_PHONE_NUMBER here and every
   enquiry link across the site updates together. */
export const SITE_URL = "https://vaile.co";
export const WHATSAPP_PHONE_NUMBER = "918951066881";

export function buildWhatsAppEnquiryUrl(itemTitle: string, size: string, initials: string): string {
  const normalizedInitials = initials.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 3);

  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
    `Hello VAILE,\n\nI would like to enquire about:\n• Item: ${itemTitle}\n• Size: ${size}\n• Initials: ${normalizedInitials}\n\nPlease share availability and allocation details.`,
  )}`;
}
