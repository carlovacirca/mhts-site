import { useState } from "react";
import { useSeo, breadcrumbSchema, localBusinessSchema } from "@/lib/seo";
import { Link } from "react-router-dom";
import { z } from "zod";
import { MapPin, Phone, Mail, CalendarCheck, ShieldCheck, Award, Lock } from "lucide-react";
import OpeningHours from "@/components/OpeningHours";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import StudioMap from "@/components/mhts/StudioMap";
import { BookButton, CallButton } from "@/components/mhts/CtaButtons";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";
import { Reveal } from "@/lib/motion";
import { SNAP_BEFORE_FOOTER_CLASS, SNAP_PHONE_CLASS } from "@/lib/sectionSnap";
import ResponsiveImage from "@/components/ResponsiveImage";
import studioPhoto from "@/assets/mhts-consultation-room-hero.jpg";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  service: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const services = [
  "Free Consultation",
  "Hair Systems",
  "Scalp Micropigmentation (SMP)",
  "Hair System Maintenance",
  "Thinning Hair / Crown Coverage",
  "Other / Not Sure",
];

const serviceAreas = [
  "Amersham",
  "Chesham",
  "High Wycombe",
  "Beaconsfield",
  "Chalfont St Giles",
  "Buckinghamshire",
];

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useSeo({
    title: "Contact Hair Replacement Clinic | Amersham",
    description:
      "Contact Men's Hair To Stay in Amersham. Phone, email, or visit our studio. Hair systems, SMP, and maintenance services. Buckinghamshire area.",
    canonicalPath: "/contact",
    jsonLd: [
      localBusinessSchema,
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ]),
    ],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    const subject = encodeURIComponent(`Contact from ${result.data.name}`);
    const body = encodeURIComponent(
      `Name: ${result.data.name}\nEmail: ${result.data.email}\nPhone: ${result.data.phone || ", "}\nService: ${result.data.service || ", "}\n\n${result.data.message}`
    );
    window.location.href = `mailto:info@menshairtostay.co.uk?subject=${subject}&body=${body}`;
    toast({ title: "Opening your email app", description: "Your message has been prepared. Send it to complete your enquiry." });
  };

  return (
    <div className="mhts-theme">
      {/* Batch 4b. Contact is laid out as a switchboard: the studio beside
          the heading, the phone as the first and largest way in (it is how
          most first visits reach the studio), then email and the visit, the
          hours beside the map, and the towns as chips. */}
      {/* HERO */}
      <section className="relative overflow-clip bg-mhts-deep">
        <div className="absolute inset-0 bg-[radial-gradient(55%_90%_at_0%_0%,hsl(var(--mhts-red)/0.22),transparent_70%)]" />
        <div className="container relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-8 md:grid-cols-[1.2fr_0.8fr] md:py-20">
          <div>
            <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.3em] text-mhts-red-light">Get in Touch</p>
            <h1 className="text-3xl leading-tight text-white md:text-5xl">
              Contact Men's Hair To Stay, Hair Replacement Specialist in Amersham
            </h1>
            <div className="my-4 h-1 w-14 rounded-full bg-mhts-red md:my-6" />
            <p className="font-body text-[15px] leading-snug text-white/80 md:text-base md:leading-relaxed">
              Speak with our specialist team about hair systems, scalp micropigmentation (SMP), thinning hair treatments and maintenance. Free, confidential consultations for men experiencing hair loss across Amersham, Chesham, High Wycombe, Beaconsfield and the wider Buckinghamshire area.
            </p>
            {/* Phone only: Call and Email in the first screen, with the words
                of the Phone and Email cards (which are the desktop's second
                band, display:none here). There is no WhatsApp number to add. */}
            <div className="mt-6 grid gap-5 md:hidden">
              <div>
                <h2 className="text-xl text-white">Phone</h2>
                <p className="mt-1 font-body text-sm text-white/75">Call to book a hair replacement consultation or ask about hair systems, SMP and maintenance.</p>
                <a href={`tel:${PHONE_TEL}`} data-cta="call" className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-mhts-red px-5 py-3.5 font-body text-lg font-semibold text-white transition-colors hover:bg-mhts-red-deep">
                  <Phone className="h-5 w-5" aria-hidden="true" /> {PHONE_DISPLAY}
                </a>
              </div>
              <div>
                <h2 className="text-xl text-white">Email</h2>
                <p className="mt-1 font-body text-sm text-white/75">Send us a confidential enquiry and our specialist team will reply within one working day.</p>
                <a href={`mailto:${EMAIL}`} className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-white/30 px-5 py-3.5 font-body font-semibold text-white transition-colors hover:border-white">
                  <Mail className="h-5 w-5" aria-hidden="true" /> Email Us
                </a>
              </div>
            </div>
          </div>
          <Reveal as="figure" from="right" className="hidden md:block">
            <ResponsiveImage
              src={studioPhoto}
              alt="The private consultation room at the Amersham studio"
              className="aspect-[4/5] w-full rounded-2xl object-cover shadow-2xl"
              sizes="40vw"
            />
          </Reveal>
        </div>
      </section>

      {/* CONTACT GRID. From md up. On a phone its three cards are spread over
          the screens they belong to: Phone and Email in the hero, the visit
          beside the form. */}
      <section className="hidden bg-mhts-sand py-8 md:block md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.25fr_1fr_1fr] md:gap-5">
            <article className="flex flex-col rounded-2xl bg-mhts-red p-8 text-white">
              <span className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-white/15" aria-hidden="true">
                <Phone className="h-6 w-6 text-white" />
              </span>
              <h2 className="text-2xl text-white">Phone</h2>
              <p className="mt-3 flex-1 font-body text-sm text-white">Call to book a hair replacement consultation or ask about hair systems, SMP and maintenance.</p>
              <a href="tel:07947878087" data-cta="call" className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 font-body text-lg font-semibold text-mhts-red-deep transition-colors hover:bg-mhts-sand">
                <Phone className="w-5 h-5" /> 07947 878087
              </a>
            </article>

            <article className="flex flex-col rounded-2xl border border-mhts-stone bg-card p-8">
              <span className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-mhts-red-tint" aria-hidden="true">
                <Mail className="h-6 w-6 text-mhts-red" />
              </span>
              <h2 className="text-xl text-mhts-ink">Email</h2>
              <p className="mt-3 flex-1 font-body text-sm text-foreground/75">Send us a confidential enquiry and our specialist team will reply within one working day.</p>
              <a href="mailto:info@menshairtostay.co.uk" className="mt-5 inline-flex items-center justify-center gap-2 rounded-md border border-mhts-stone-deep px-5 py-2.5 font-body text-sm font-semibold text-mhts-ink transition-colors hover:border-mhts-red hover:text-mhts-red-deep">
                <Mail className="w-4 h-4" /> Email Us
              </a>
            </article>

            <article className="flex flex-col rounded-2xl border border-mhts-stone bg-card p-8">
              <span className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-mhts-red-tint" aria-hidden="true">
                <MapPin className="h-6 w-6 text-mhts-red" />
              </span>
              <h2 className="text-xl text-mhts-ink">Visit Our Studio</h2>
              <p className="mt-3 flex-1 font-body text-sm text-foreground/75">11 Chesham Road, Amersham HP6 5HN. Discreet, private hair replacement clinic in Buckinghamshire.</p>
              <div className="mt-5 grid gap-2">
                <BookButton size="sm" label="Book a visit" />
                <CallButton size="sm" label={`Call ${PHONE_DISPLAY}`} />
              </div>
            </article>
          </div>

        </div>
      </section>

      {/* FORM */}
      <section className="bg-card py-8 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-6 text-center md:mb-10">
            <h2 className="text-3xl text-mhts-ink md:text-4xl">Get in Touch</h2>
            <div className="mx-auto mt-5 h-1 w-14 rounded-full bg-mhts-red" />
            <p className="text-foreground/75 font-body mt-5">All enquiries are 100% confidential. No obligation, no pressure.</p>
          </div>
          {/* FORM TEMPORARILY DISABLED, pending Formspree integration. Restore this block once a Formspree form ID is wired up; handleSubmit/contactSchema/form state above are left intact for a quick restore.
          <form onSubmit={handleSubmit} noValidate className="bg-card border border-border rounded-sm p-6 md:p-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} required className="mt-1.5" />
                {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} required className="mt-1.5" />
                {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={30} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="service">Service Interested In</Label>
                <select
                  id="service"
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="mt-1.5 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select a service…</option>
                  {services.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div>
              <Label htmlFor="message">Message *</Label>
              <Textarea id="message" rows={5} maxLength={1000} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required className="mt-1.5" />
              {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
            </div>
            <p className="text-xs text-mhts-slate font-body">
              Your details are kept private and used only to respond to your enquiry. We never share your information with third parties.
            </p>
            <Button type="submit" className="bg-mhts-charcoal text-mhts-white hover:bg-mhts-navy rounded-sm px-8 py-6 font-body tracking-wide">
              Send Message
            </Button>
          </form>
          */}
          <div className="rounded-2xl border border-mhts-stone bg-mhts-sand p-8 text-center md:p-10">
            <p className="text-foreground/80 font-body leading-relaxed mb-6">
              Call or email us directly and our specialist team will get back to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:07947878087" data-cta="call" className="inline-flex items-center justify-center gap-2 rounded-md bg-mhts-red px-6 py-3 font-body font-semibold text-white transition-colors hover:bg-mhts-red-deep">
                <Phone className="w-4 h-4" /> Call 07947 878087
              </a>
              <a href="mailto:info@menshairtostay.co.uk" className="inline-flex items-center justify-center gap-2 break-all rounded-md border border-mhts-stone-deep bg-card px-6 py-3 font-body font-semibold text-mhts-ink transition-colors hover:border-mhts-red hover:text-mhts-red-deep">
                <Mail className="w-4 h-4" /> info@menshairtostay.co.uk
              </a>
            </div>
          </div>
          {/* Phone only: the visit card, from the desktop's contact band. */}
          <article className="mt-5 rounded-2xl border border-mhts-stone bg-card p-6 md:hidden">
            <h2 className="flex items-center gap-2 text-xl text-mhts-ink">
              <MapPin className="h-5 w-5 text-mhts-red" aria-hidden="true" /> Visit Our Studio
            </h2>
            <p className="mt-2 font-body text-sm text-foreground/75">11 Chesham Road, Amersham HP6 5HN. Discreet, private hair replacement clinic in Buckinghamshire.</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <BookButton size="sm" label="Book a visit" />
              <CallButton size="sm" label="Call" />
            </div>
          </article>
        </div>
      </section>

      {/* MAP */}
      <section className="bg-mhts-sand py-8 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-5 md:mb-8">
            <h2 className="text-3xl text-mhts-ink md:text-4xl">Find Our Amersham Studio</h2>
            <div className="mt-4 h-1 w-14 rounded-full bg-mhts-red md:mt-5" />
            <p className="text-foreground/75 font-body mt-4 md:mt-5">11 Chesham Road, Amersham HP6 5HN, easy parking, discreet entrance.</p>
          </div>
          {/* Google's embed sets cookies, so it waits for Accept like GA4 and
              the booking calendar already did. Before that the reader gets the
              address, a drawn map and a way out to Google Maps, rather than a
              grey rectangle. See docs/HEALTH-CHECK.md finding 16. */}
          <div className="grid items-start gap-4 md:grid-cols-[1.4fr_1fr] md:gap-6">
            <StudioMap compact />
            {/* Hours */}
            <div>
              <h3 className="mb-2 text-mhts-ink md:mb-4">Studio Opening Hours</h3>
              <OpeningHours />
            </div>
          </div>
        </div>
      </section>

      {/* Phone: the towns and why choose us are one screen. */}
      <div className={`${SNAP_PHONE_CLASS} md:contents`}>
      {/* SERVICE AREAS */}
      <section className="bg-card pb-4 pt-6 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl text-mhts-ink md:text-4xl">Hair Replacement Across Buckinghamshire</h2>
          <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-mhts-red md:mt-5" />
          <p className="mx-auto mt-3 max-w-2xl font-body text-[15px] leading-snug text-foreground/80 md:mt-5 md:text-base md:leading-relaxed">
            Our Amersham hair replacement clinic welcomes clients from across Buckinghamshire and the surrounding area for hair systems, scalp micropigmentation, thinning hair treatments and ongoing maintenance.
          </p>
          <ul className="mt-4 grid grid-cols-3 gap-1.5 md:mt-8 md:flex md:flex-wrap md:justify-center md:gap-3">
            {serviceAreas.map((a) => (
              <li key={a} className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-mhts-stone bg-mhts-sand px-1 py-1 font-body text-xs text-mhts-ink md:px-4 md:py-2 md:text-sm"><MapPin className="hidden h-3.5 w-3.5 text-mhts-red md:block" aria-hidden="true" />{a}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="relative overflow-clip bg-mhts-deep pb-8 pt-5 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(60%_90%_at_100%_100%,hsl(var(--mhts-red)/0.2),transparent_70%)]" />
        <div className="container relative mx-auto px-4 max-w-6xl">
          <div className="mb-4 text-center md:mb-12">
            <h2 className="text-2xl text-white md:text-4xl">Why Choose Men's Hair To Stay</h2>
            <div className="mx-auto mt-4 h-1 w-14 rounded-full bg-mhts-red md:mt-5" />
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-6">
            {[
              { icon: ShieldCheck, title: "Free Consultations", desc: "Confidential, no-obligation hair loss assessment with a specialist, no pressure to proceed." },
              { icon: Award, title: "Specialist Expertise", desc: "Years of experience fitting hair systems, performing SMP and supporting men through hair loss." },
              { icon: Lock, title: "100% Confidential", desc: "Discreet private studio in Amersham. Your details and visits are kept completely confidential." },
            ].map((c) => (
              // Phone: a compact row, icon beside the words. From md up: as before.
              <article key={c.title} className="grid grid-cols-[auto_1fr] gap-x-4 md:block md:rounded-2xl md:border md:border-white/10 md:bg-white/5 md:p-8 md:text-center">
                <span className="row-span-2 grid h-10 w-10 place-items-center rounded-full bg-mhts-red-light/15 md:mx-auto md:mb-4 md:h-12 md:w-12" aria-hidden="true">
                  <c.icon className="h-5 w-5 text-mhts-red-light md:h-6 md:w-6" />
                </span>
                <h3 className="text-base text-white md:text-lg">{c.title}</h3>
                <p className="mt-1 font-body text-sm leading-snug text-white/80 md:mt-3 md:leading-relaxed">{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      </div>

      {/* RELATED LINKS */}
      {/* On a phone this row of links shares the footer's screen. */}
      <section className={`${SNAP_BEFORE_FOOTER_CLASS} border-t border-white/10 bg-mhts-deep py-4 md:py-12`}>
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2 font-body text-xs uppercase tracking-[0.2em] text-white/60 md:mb-5">Explore More</p>
          {/* Phone: a line of links, short enough to share the footer's
              screen. From md up: the pills, as before. */}
          <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 font-body text-sm md:gap-3">
            {[
              { to: "/book", label: "Book an Appointment" },
              { to: "/services", label: "View Our Services" },
              { to: "/how-it-works", label: "How Hair Replacement Works" },
              { to: "/gallery", label: "Before & After Gallery" },
              { to: "/faq", label: "Hair Replacement FAQs" },
            ].map((l, i) => (
              <span key={l.to} className="inline-flex items-center gap-2">
                {i > 0 && <span aria-hidden="true" className="text-white/40 md:hidden">·</span>}
                <Link
                  to={l.to}
                  className="text-white/85 underline underline-offset-4 transition-colors hover:border-white hover:text-white md:rounded-full md:border md:border-white/20 md:px-4 md:py-2 md:no-underline"
                >
                  {l.label}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
