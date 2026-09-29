import { Link } from "react-router-dom";
import { CalendarCheck, Mail, Phone, MapPin } from "lucide-react";
import { useSeo, breadcrumbSchema } from "@/lib/seo";
import { CtaPair } from "@/components/mhts/CtaButtons";
import { SNAP_STOP_DEEP_CLASS } from "@/lib/sectionSnap";

// The contents list, in page order. Each label is the section's own heading.
const sections = [
  { id: "who-we-are", label: "Who we are" },
  { id: "what-data-we-collect", label: "What data we collect" },
  { id: "how-we-use-your-data", label: "How we use your data" },
  { id: "third-party-services-we-use", label: "Third-party services we use" },
  { id: "cookies-and-analytics", label: "Cookies and analytics" },
  { id: "how-long-we-keep-your-data", label: "How long we keep your data" },
  { id: "your-rights", label: "Your rights" },
  { id: "contact-us-about-your-data", label: "Contact us about your data" },
];

const PrivacyPolicyPage = () => {
  useSeo({
    title: "Privacy Policy | Men's Hair To Stay",
    description:
      "How Men's Hair To Stay collects, uses and protects your personal data, including contact forms, newsletter sign-ups and our online booking widget.",
    canonicalPath: "/privacy-policy",
    jsonLd: breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Privacy Policy", path: "/privacy-policy" },
    ]),
  });

  return (
    <div className="mhts-theme">
      {/* Batch 4b. A policy is a document, so it is set as one: a quiet sand
          header, a contents list that stays beside the text on a desktop, and
          the sections in a reading column with a rule between each. The words
          are unchanged. */}
      {/* HERO */}
      <section className="border-b border-mhts-stone bg-mhts-sand py-12 md:py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <p className="mb-4 inline-block rounded-full bg-mhts-red-tint px-3 py-1 font-body text-xs font-semibold uppercase tracking-[0.2em] text-mhts-red-deep">
            Legal
          </p>
          <h1 className="mb-4 text-3xl leading-tight text-mhts-ink md:text-5xl">
            Privacy Policy
          </h1>
          <p className="max-w-xl font-body text-lg text-muted-foreground">
            Last updated: 12 July 2026
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[240px_1fr] lg:gap-16">
        <nav aria-label="On this page" className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
          <ol className="space-y-1 border-l-2 border-mhts-stone">
            {sections.map((sec) => (
              <li key={sec.id}>
                <a
                  href={`#${sec.id}`}
                  className="-ml-0.5 block border-l-2 border-transparent py-1.5 pl-4 font-body text-sm text-foreground/75 transition-colors hover:border-mhts-red hover:text-mhts-red-deep"
                >
                  {sec.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        {/* On a phone each paragraph and list is a stop, so no Page Down skips
            one. */}
        <div className={`max-w-3xl divide-y divide-mhts-stone font-body leading-relaxed text-foreground/80 [&>div]:py-9 [&>div:first-child]:pt-0 ${SNAP_STOP_DEEP_CLASS}`}>
          <div>
            <h2 id="who-we-are" className="mb-4 scroll-mt-28 text-2xl text-mhts-ink">
              Who we are
            </h2>
            <p>
              Men's Hair To Stay is a hair replacement and scalp micropigmentation studio
              based at 11 Chesham Road, Amersham, HP6 5HN. This policy explains what personal
              data we collect when you use this website, why we collect it, and how it's
              handled.
            </p>
          </div>

          <div>
            <h2 id="what-data-we-collect" className="mb-4 scroll-mt-28 text-2xl text-mhts-ink">
              What data we collect
            </h2>
            <p className="mb-4">
              When you fill in our contact form, enquiry form, or newsletter sign-up, we
              collect the information you provide, which may include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your name</li>
              <li>Your email address</li>
              <li>Your phone number</li>
              <li>Any message or details you include about your enquiry</li>
            </ul>
            <p className="mt-4">
              We don't collect any information beyond what you choose to submit through
              these forms.
            </p>
          </div>

          <div>
            <h2 id="how-we-use-your-data" className="mb-4 scroll-mt-28 text-2xl text-mhts-ink">
              How we use your data
            </h2>
            <p className="mb-4">We use the information you give us to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to your enquiry and answer your questions</li>
              <li>Arrange and manage consultations and appointments</li>
              <li>
                Send you newsletter updates and offers, but only if you've opted in to
                receive them
              </li>
            </ul>
            <p className="mt-4">
              We never sell your personal data to third parties, and we won't use it for
              anything beyond what's described here.
            </p>
          </div>

          <div>
            <h2 id="third-party-services-we-use" className="mb-4 scroll-mt-28 text-2xl text-mhts-ink">
              Third-party services we use
            </h2>
            <p className="mb-4">
              To run this website and its booking and enquiry features, we rely on a small
              number of trusted third-party services:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-mhts-charcoal">Formspree</strong> processes
                submissions from our contact and newsletter forms and delivers them to us
                by email.
              </li>
              <li>
                <strong className="text-mhts-charcoal">Trafft</strong> powers our online
                booking calendar, so you can request a free consultation directly from this
                site.
              </li>
            </ul>
            <p className="mt-4">
              These providers process data on our behalf and are only used for the purposes
              described above.
            </p>
          </div>

          <div>
            <h2 id="cookies-and-analytics" className="mb-4 scroll-mt-28 text-2xl text-mhts-ink">
              Cookies and analytics
            </h2>
            <p className="mb-4">
              Our online booking calendar (provided by Trafft) sets cookies once you accept
              them via the cookie banner on this site, including Google Ads remarketing
              cookies that may be used to show you relevant ads on other websites. These
              cookies are only set after you actively accept them, if you decline, the
              booking widget won't load, and you can still reach us by phone or email
              instead.
            </p>
            <p>
              We also use Google Analytics 4 (GA4) to understand how visitors use this site, for example, which pages are popular and how people navigate around, so we
              can keep improving it. Like the booking widget, GA4 only loads and sets cookies
              once you accept via the cookie banner; if you decline, it never loads. You can
              change your mind at any time by clearing your browser's cookies for this site,
              which will bring the banner back on your next visit.
            </p>
            <p>
              The Google Maps that shows where the studio is also sets cookies, so it is
              held back in the same way. Until you accept, we show a drawn map and the
              address instead and nothing is requested from Google. If you decline, the
              map never loads and the link to Google Maps opens in a new tab only if you
              choose to use it.
            </p>
          </div>

          <div>
            <h2 id="how-long-we-keep-your-data" className="mb-4 scroll-mt-28 text-2xl text-mhts-ink">
              How long we keep your data
            </h2>
            <p>
              We keep enquiry and contact form submissions for as long as reasonably needed
              to respond to you and, where relevant, to keep a record of past clients and
              appointments, typically no longer than 24 months from your last contact with
              us. If you've subscribed to our newsletter, we'll keep your email address
              until you unsubscribe or ask us to remove it.
            </p>
          </div>

          <div>
            <h2 id="your-rights" className="mb-4 scroll-mt-28 text-2xl text-mhts-ink">
              Your rights
            </h2>
            <p>
              You can ask us at any time to tell you what personal data we hold about you,
              to correct it, or to delete it. You can also withdraw consent to newsletter
              emails whenever you like. To make any of these requests, just get in touch
              using the details below.
            </p>
          </div>

          <div>
            <h2 id="contact-us-about-your-data" className="mb-4 scroll-mt-28 text-2xl text-mhts-ink">
              Contact us about your data
            </h2>
            <div className="bg-mhts-light border border-border rounded-sm p-6 space-y-3 not-prose">
              <p className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-mhts-charcoal shrink-0" /> 11 Chesham Road,
                Amersham, HP6 5HN
              </p>
              <p className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-mhts-charcoal shrink-0" />
                <a href="tel:07947878087" className="hover:text-mhts-slate transition-colors">
                  07947 878087
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-mhts-charcoal shrink-0" />
                <a
                  href="mailto:info@menshairtostay.co.uk"
                  className="hover:text-mhts-slate transition-colors"
                >
                  info@menshairtostay.co.uk
                </a>
              </p>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-mhts-deep py-14 md:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(70%_120%_at_50%_100%,hsl(var(--mhts-red)/0.25),transparent_65%)]" />
        <div className="container relative mx-auto px-4 text-center">
          <h2 className="mb-8 text-3xl text-white md:text-4xl">
            Ready to get started?
          </h2>
          <CtaPair size="lg" tone="dark" label="Book Free Consultation" className="justify-center" />
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
