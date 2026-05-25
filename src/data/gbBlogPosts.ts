export interface GBBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  date: string; // ISO YYYY-MM-DD
  readTime: string;
  content: string; // markdown
}

export const gbBlogPosts: GBBlogPost[] = [
  {
    slug: "skin-fade-amersham-complete-guide",
    title: "Skin Fade Haircuts in Amersham: The Complete Guide to Getting It Right",
    excerpt:
      "The skin fade has become one of the most popular haircuts in the UK, and it is easy to see why. Clean, sharp, versatile and suitable for almost every hair type, it works just as well in the office as it does on a night out.",
    metaDescription:
      "Everything you need to know about skin fades in Amersham. What they are, the different types, how to ask for one, how long they last, and where to get the best skin fade near you.",
    date: "2026-05-25",
    readTime: "12 min read",
    content: "",
  },
  {
    slug: "ear-piercing-amersham-complete-local-guide",
    title: "Ear Piercing in Amersham: The Complete Guide to Georges Barbers",
    excerpt:
      "Everything you need to know about ear piercing in Amersham — where to go, what to expect, aftercare advice, children's piercings and why Georges Barbers has been the trusted local choice since 1991.",
    metaDescription:
      "Everything you need to know about ear piercing in Amersham. Where to go, what to expect, aftercare advice, children's piercings and why Georges Barbers has been the trusted local choice since 1991.",
    date: "2026-05-25",
    readTime: "12 min read",
    content: "",
  },
  {
    slug: "georges-barbers-amersham-original-barbershop-since-1991",
    title:
      "Georges Barbers Amersham: Your Complete Guide to the Area's Most Trusted Barbershop",
    excerpt:
      "Everything you need to know about Georges Barbers in Amersham — services, pricing, walk-in availability, ear piercing, and why locals have trusted us since 1991.",
    metaDescription:
      "Everything you need to know about Georges Barbers in Amersham. Services, pricing, walk-in availability, ear piercing, and why locals have trusted us since 1991.",
    date: "2026-05-25",
    readTime: "12 min read",
    content: "",
  },
];
