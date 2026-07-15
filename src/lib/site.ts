/**
 * Site-wide config the owner edits in one place.
 *
 * ⚠️ MEDICAL PROVIDER — confirm and fill these before publishing the
 * /medical-card page. Do NOT publish a real practice's name, phone, or
 * booking link until verified with the provider.
 */
export const MEDICAL_PROVIDER = {
  confirmed: false, // flip to true once the details below are verified
  name: "[Provider name — confirm]",
  practice: "[Practice name — confirm]",
  location: "Western New York",
  phone: "[Phone — confirm]",
  bookingUrl: "", // e.g. https://... — leave empty to hide the button
  blurb:
    "A trusted local provider we work with to help Western New York patients get certified for New York's medical cannabis program.",
};
