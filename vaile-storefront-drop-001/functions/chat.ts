interface Env {
  WHATSAPP_PHONE_NUMBER?: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const size = url.searchParams.get("size") || "32";
  const initials = (url.searchParams.get("initials") || "")
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .slice(0, 3);
  const item = url.searchParams.get("item") || "VAILE — DROP 001";

  // Use environment variable if set in Cloudflare dashboard, or default to configured studio number
  const phone = context.env.WHATSAPP_PHONE_NUMBER || "918951066881";

  const message = `Hello VAILE,\n\nI would like to enquire about:\n• Item: ${item}\n• Size: ${size}\n• Initials: ${initials || "VAILE"}\n\nPlease share availability and allocation details.`;

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return Response.redirect(whatsappUrl, 302);
};
