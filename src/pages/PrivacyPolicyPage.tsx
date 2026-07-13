import { Link } from "react-router-dom";
import { CalendarCheck, Mail, Phone, MapPin } from "lucide-react";
import { useSeo, breadcrumbSchema } from "@/lib/seo";

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
      {/* HERO */}
      <section className="relative py-24 flex items-center bg-mhts-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-mhts-charcoal via-mhts-charcoal/95 to-mhts-charcoal/80" />
        <div className="container mx-auto px-4 relative z-10">
          <p className="text-mhts-white/60 uppercase tracking-[0.3em] text-sm mb-4 font-body">
            Legal
          </p>
          <h1 className="text-3xl md:text-5xl font-light tracking-wide text-mhts-white mb-4 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-mhts-white/70 text-lg max-w-xl font-body">
            Last updated: 12 July 2026
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl space-y-12 text-foreground/80 font-body leading-relaxed">
          <div>
            <h2 className="text-2xl text-mhts-charcoal font-light tracking-wide mb-4">
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
            <h2 className="text-2xl text-mhts-charcoal font-light tracking-wide mb-4">
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
            <h2 className="text-2xl text-mhts-charcoal font-light tracking-wide mb-4">
              How we use your data
            </h2>
            <p className="mb-4">We use the information you give us to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to your enquiry and answer your questions</li>
              <li>Arrange and manage consultations and appointments</li>
              <li>
                Send you newsletter updates and offers — but only if you've opted in to
                receive them
              </li>
            </ul>
            <p className="mt-4">
              We never sell your personal data to third parties, and we won't use it for
              anything beyond what's described here.
            </p>
          </div>

          <div>
            <h2 className="text-2xl text-mhts-charcoal font-light tracking-wide mb-4">
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
            <h2 className="text-2xl text-mhts-charcoal font-light tracking-wide mb-4">
              Cookies and analytics
            </h2>
            <p className="mb-4">
              Our online booking calendar (provided by Trafft) sets cookies once you accept
              them via the cookie banner on this site, including Google Ads remarketing
              cookies that may be used to show you relevant ads on other websites. These
              cookies are only set after you actively accept them — if you decline, the
              booking widget won't load, and you can still reach us by phone or email
              instead.
            </p>
            <p>
              We also use Google Analytics 4 (GA4) to understand how visitors use this site
              — for example, which pages are popular and how people navigate around — so we
              can keep improving it. Like the booking widget, GA4 only loads and sets cookies
              once you accept via the cookie banner; if you decline, it never loads. You can
              change your mind at any time by clearing your browser's cookies for this site,
              which will bring the banner back on your next visit.
            </p>
          </div>

          <div>
            <h2 className="text-2xl text-mhts-charcoal font-light tracking-wide mb-4">
              How long we keep your data
            </h2>
            <p>
              We keep enquiry and contact form submissions for as long as reasonably needed
              to respond to you and, where relevant, to keep a record of past clients and
              appointments — typically no longer than 24 months from your last contact with
              us. If you've subscribed to our newsletter, we'll keep your email address
              until you unsubscribe or ask us to remove it.
            </p>
          </div>

          <div>
            <h2 className="text-2xl text-mhts-charcoal font-light tracking-wide mb-4">
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
            <h2 className="text-2xl text-mhts-charcoal font-light tracking-wide mb-4">
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
                  href="mailto:georgesbarbers1991@gmail.com"
                  className="hover:text-mhts-slate transition-colors"
                >
                  georgesbarbers1991@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-mhts-light">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide mb-8">
            Ready to get started?
          </h2>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 bg-mhts-charcoal text-mhts-white font-medium px-8 py-3 rounded-sm hover:bg-mhts-charcoal/90 transition-colors font-body tracking-wide"
          >
            <CalendarCheck className="w-4 h-4" /> Book Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
