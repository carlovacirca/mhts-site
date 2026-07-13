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
      `Name: ${result.data.name}\nEmail: ${result.data.email}\nPhone: ${result.data.phone || "—"}\nService: ${result.data.service || "—"}\n\n${result.data.message}`
    );
    window.location.href = `mailto:georgesbarbers1991@gmail.com?subject=${subject}&body=${body}`;
    toast({ title: "Opening your email app", description: "Your message has been prepared. Send it to complete your enquiry." });
  };

  return (
    <div className="mhts-theme">
      {/* HERO */}
      <section className="bg-mhts-charcoal py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <p className="text-mhts-white/60 uppercase tracking-[0.3em] text-xs mb-4 font-body">Get in Touch</p>
          <h1 className="text-3xl md:text-5xl font-light tracking-wide text-mhts-white leading-tight">
            Contact Men's Hair To Stay — Hair Replacement Specialist in Amersham
          </h1>
          <div className="w-12 h-px bg-mhts-white/40 mx-auto my-6" />
          <p className="text-mhts-white/70 font-body leading-relaxed">
            Speak with our specialist team about hair systems, scalp micropigmentation (SMP), thinning hair treatments and maintenance. Free, confidential consultations for men experiencing hair loss across Amersham, Chesham, High Wycombe, Beaconsfield and the wider Buckinghamshire area.
          </p>
        </div>
      </section>

      {/* CONTACT GRID */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="bg-card border border-border rounded-sm p-8 text-center flex flex-col">
              <Phone className="w-7 h-7 text-mhts-charcoal mx-auto mb-4" />
              <h2 className="text-lg text-mhts-charcoal font-medium tracking-wide">Phone</h2>
              <p className="text-foreground/75 font-body text-sm mt-3 flex-1">Call to book a hair replacement consultation or ask about hair systems, SMP and maintenance.</p>
              <a href="tel:07947878087" className="mt-5 inline-flex items-center justify-center gap-2 bg-mhts-charcoal text-mhts-white px-5 py-2.5 rounded-sm hover:bg-mhts-navy transition-colors font-body text-sm">
                <Phone className="w-4 h-4" /> 07947 878087
              </a>
            </article>

            <article className="bg-card border border-border rounded-sm p-8 text-center flex flex-col">
              <Mail className="w-7 h-7 text-mhts-charcoal mx-auto mb-4" />
              <h2 className="text-lg text-mhts-charcoal font-medium tracking-wide">Email</h2>
              <p className="text-foreground/75 font-body text-sm mt-3 flex-1">Send us a confidential enquiry and our specialist team will reply within one working day.</p>
              <a href="mailto:georgesbarbers1991@gmail.com" className="mt-5 inline-flex items-center justify-center gap-2 bg-mhts-charcoal text-mhts-white px-5 py-2.5 rounded-sm hover:bg-mhts-navy transition-colors font-body text-sm break-all">
                <Mail className="w-4 h-4" /> Email Us
              </a>
            </article>

            <article className="bg-card border border-border rounded-sm p-8 text-center flex flex-col">
              <MapPin className="w-7 h-7 text-mhts-charcoal mx-auto mb-4" />
              <h2 className="text-lg text-mhts-charcoal font-medium tracking-wide">Visit Our Studio</h2>
              <p className="text-foreground/75 font-body text-sm mt-3 flex-1">11 Chesham Road, Amersham HP6 5HN. Discreet, private hair replacement clinic in Buckinghamshire.</p>
              <Link to="/book" className="mt-5 inline-flex items-center justify-center gap-2 bg-mhts-charcoal text-mhts-white px-5 py-2.5 rounded-sm hover:bg-mhts-navy transition-colors font-body text-sm">
                <CalendarCheck className="w-4 h-4" /> Book a Visit
              </Link>
            </article>
          </div>

          {/* Hours */}
          <div className="mt-10 max-w-md mx-auto">
            <h3 className="text-center text-mhts-charcoal font-medium tracking-wide mb-4">Studio Opening Hours</h3>
            <OpeningHours />
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="py-16 bg-mhts-light">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">Get in Touch</h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
            <p className="text-foreground/75 font-body mt-5">All enquiries are 100% confidential. No obligation, no pressure.</p>
          </div>
          {/* FORM TEMPORARILY DISABLED — pending Formspree integration. Restore this block once a Formspree form ID is wired up; handleSubmit/contactSchema/form state above are left intact for a quick restore.
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
          <div className="bg-card border border-border rounded-sm p-8 md:p-10 text-center">
            <p className="text-foreground/80 font-body leading-relaxed mb-6">
              Call or email us directly and our specialist team will get back to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:07947878087" className="inline-flex items-center justify-center gap-2 bg-mhts-charcoal text-mhts-white px-6 py-3 rounded-sm hover:bg-mhts-navy transition-colors font-body text-sm">
                <Phone className="w-4 h-4" /> Call 07947 878087
              </a>
              <a href="mailto:georgesbarbers1991@gmail.com" className="inline-flex items-center justify-center gap-2 bg-mhts-charcoal text-mhts-white px-6 py-3 rounded-sm hover:bg-mhts-navy transition-colors font-body text-sm break-all">
                <Mail className="w-4 h-4" /> georgesbarbers1991@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">Find Our Amersham Studio</h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
            <p className="text-foreground/75 font-body mt-5">11 Chesham Road, Amersham HP6 5HN — easy parking, discreet entrance.</p>
          </div>
          <div className="rounded-sm overflow-hidden border border-border">
            <iframe
              src="https://www.google.com/maps?q=11+Chesham+Road+Amersham+HP6+5HN&output=embed"
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Men's Hair To Stay — Amersham studio location"
            />
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="py-16 bg-mhts-light">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">Hair Replacement Across Buckinghamshire</h2>
          <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          <p className="text-foreground/80 font-body mt-5 leading-relaxed max-w-2xl mx-auto">
            Our Amersham hair replacement clinic welcomes clients from across Buckinghamshire and the surrounding area for hair systems, scalp micropigmentation, thinning hair treatments and ongoing maintenance.
          </p>
          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {serviceAreas.map((a) => (
              <li key={a} className="px-4 py-2 bg-card border border-border rounded-sm text-mhts-charcoal text-sm font-body">{a}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">Why Choose Men's Hair To Stay</h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: "Free Consultations", desc: "Confidential, no-obligation hair loss assessment with a specialist — no pressure to proceed." },
              { icon: Award, title: "Specialist Expertise", desc: "Years of experience fitting hair systems, performing SMP and supporting men through hair loss." },
              { icon: Lock, title: "100% Confidential", desc: "Discreet private studio in Amersham. Your details and visits are kept completely confidential." },
            ].map((c) => (
              <article key={c.title} className="bg-card border border-border rounded-sm p-8 text-center">
                <c.icon className="w-7 h-7 text-mhts-charcoal mx-auto mb-4" />
                <h3 className="text-lg text-mhts-charcoal font-medium tracking-wide">{c.title}</h3>
                <p className="text-foreground/75 font-body text-sm mt-3 leading-relaxed">{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED LINKS */}
      <section className="py-16 bg-mhts-charcoal">
        <div className="container mx-auto px-4 text-center">
          <p className="text-mhts-white/50 uppercase tracking-[0.2em] text-xs mb-5 font-body">Explore More</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-body">
            <Link to="/book" className="text-mhts-white/80 hover:text-mhts-white transition-colors">Book an Appointment</Link>
            <Link to="/services" className="text-mhts-white/80 hover:text-mhts-white transition-colors">View Our Services</Link>
            <Link to="/how-it-works" className="text-mhts-white/80 hover:text-mhts-white transition-colors">How Hair Replacement Works</Link>
            <Link to="/gallery" className="text-mhts-white/80 hover:text-mhts-white transition-colors">Before &amp; After Gallery</Link>
            <Link to="/faq" className="text-mhts-white/80 hover:text-mhts-white transition-colors">Hair Replacement FAQs</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
