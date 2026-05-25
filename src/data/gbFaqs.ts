export interface GBFaq {
  id: string;
  q: string;
  a: string;
  tags: string[]; // topic tags for matching to blog posts
}

export const gbFaqs: GBFaq[] = [
  {
    id: "walk-in",
    q: "Do I Need an Appointment at Georges Barbers, or Can I Just Walk In?",
    tags: ["general", "haircut", "fade", "piercing", "kids", "welcome"],
    a: `Yes, absolutely! Walk-ins are always welcome at Georges Barbers. You don't need to call ahead or book a time slot—simply visit us at 11 Chesham Road in Amersham whenever it's convenient for you.

Barbering services (haircuts, fades, beard trims, wet shaves) are walk-in only — no appointment necessary. Piercing services (ear piercing, body piercing) require an appointment. Call 01494 432131 to book your piercing appointment.

Open 7 days a week — Monday morning or Sunday afternoon, we're here and ready to serve you.`,
  },
  {
    id: "skin-fade",
    q: "What's the Difference Between a Skin Fade and Other Types of Haircuts?",
    tags: ["fade", "haircut", "welcome"],
    a: `A skin fade is a modern barbering technique that creates a seamless gradient from the longest hair on top down to bare skin (or very short hair) at the sides and back.

Types we offer: low fade, mid fade, high fade, burst fade and temple fade. Each suits different face shapes and styles. A quality skin fade requires sharp clippers, expert blending and an eye for detail — something our experienced barbers have refined over years of practice.`,
  },
  {
    id: "kids",
    q: "Are Your Barbers Good With Children? How Does a Kids' Haircut Work?",
    tags: ["kids", "haircut", "welcome"],
    a: `Yes — one of the things parents appreciate most about Georges Barbers is our genuine skill and patience with children's haircuts.

We work slowly and deliberately, talk to children in a friendly, respectful way, and explain what we're doing. Our barbers have cut the hair of countless children over our 34 years in Amersham. Walk in anytime — no appointment needed.`,
  },
  {
    id: "piercing",
    q: "What Piercing Services Do You Offer, and How Do I Book?",
    tags: ["piercing", "welcome"],
    a: `Georges Barbers operates a professional ear and body piercing studio alongside our barbering services. Services include standard lobe piercings, upper ear piercings (Helix, Tragus, Conch, Daith) and body piercings (nose, lip, eyebrow and more).

We use proper professional technique and sterilised equipment — very different from mall piercing guns. Piercing appointments are required. Call 01494 432131 to book.`,
  },
  {
    id: "hours-location",
    q: "What Are Your Hours, and Where Are You Located in Amersham?",
    tags: ["general", "welcome", "piercing", "fade", "haircut"],
    a: `Georges Barbers is at 11 Chesham Road, Amersham, Buckinghamshire HP6 5HN. Open 7 days a week.

Easy to reach by car (street and nearby car parks), by train (Amersham station is a short walk) or on the Metropolitan Line from London. Walk-ins are always welcome for haircuts, fades, beard trims and shaves. Call 01494 432131 for piercing appointments or to check holiday hours.`,
  },
];

export const getFaqsForTags = (tags: string[], limit = 4): GBFaq[] => {
  const matched = gbFaqs.filter((f) => f.tags.some((t) => tags.includes(t)));
  // Preserve order in gbFaqs for stable display
  return matched.slice(0, limit);
};
