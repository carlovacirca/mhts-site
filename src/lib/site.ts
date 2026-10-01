// The handful of facts that appear on nearly every page. They were written out
// by hand in the header, the footer, three pages and the structured data, which
// is how the site ended up publishing another business's gmail address in five
// places. One definition each, imported everywhere.

export const PHONE_DISPLAY = "07947 878087";
/** E.164, for tel: links and schema. */
export const PHONE_TEL = "+447947878087";
export const PHONE_INTL = "+44 7947 878087";

/** The MHTS address. Replaced info@menshairtostay.co.uk across the site. */
export const EMAIL = "info@menshairtostay.co.uk";

export const ADDRESS_LINE = "11 Chesham Road, Amersham HP6 5HN";
export const ADDRESS = {
  street: "11 Chesham Road",
  locality: "Amersham",
  postcode: "HP6 5HN",
  region: "Buckinghamshire",
  country: "GB",
} as const;

/** The studio on Google. The only Google listing link this repo has. */
export const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=11+Chesham+Road%2C+Amersham+HP6+5HN";

export const BRAND = "Men's Hair To Stay";

export const SOCIALS = {
  instagram: "https://www.instagram.com/menshairtostay?igsh=d2dmaXJzb210OWZ0",
  facebook: "https://www.facebook.com/share/14XfkPCSNsP/",
  tiktok: "https://tiktok.com/@menshairtostay",
} as const;

/**
 * The hours as the reader sees them, everywhere: the footer, the contact page,
 * the homepage and the booking panel. One wording, from here only.
 */
export const HOURS_OPEN = "Tuesday to Friday, 9:30am to 5pm";
export const HOURS_CLOSED = "Closed Saturday to Monday";
