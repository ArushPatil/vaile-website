/* Single point of change for launch configuration: production domain.
   WhatsApp redirection is handled securely via Cloudflare Pages Function (/chat)
   so phone numbers are never exposed to web crawlers or scrapers. */
export const SITE_URL = "https://vaile-website.pages.dev";

export function buildWhatsAppEnquiryUrl(itemTitle: string, size: string, initials: string): string {
  const normalizedInitials = initials.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 3);
  const params = new URLSearchParams({
    item: itemTitle,
    size: size,
    initials: normalizedInitials || "VAILE",
  });

  return `/chat?${params.toString()}`;
}
