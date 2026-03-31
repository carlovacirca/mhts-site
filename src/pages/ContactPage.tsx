import SectionHeading from "@/components/SectionHeading";
import OpeningHours from "@/components/OpeningHours";
import { MapPin, Phone, Mail, Home } from "lucide-react";
import { Link } from "react-router-dom";

const ContactPage = () => (
  <div className="py-16">
    <div className="container mx-auto px-4">
      <SectionHeading title="Contact Us" subtitle="11 Chesham Road, Amersham HP6 5HN" />

      <div className="max-w-5xl mx-auto">
        {/* Contact info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card rounded-lg p-6 text-center border border-border">
            <MapPin className="w-6 h-6 mx-auto mb-3 text-gb-green" />
            <h3 className="font-semibold mb-1">Address</h3>
            <p className="text-muted-foreground text-sm">11 Chesham Road<br />Amersham HP6 5HN</p>
          </div>
          <div className="bg-card rounded-lg p-6 text-center border border-border">
            <Phone className="w-6 h-6 mx-auto mb-3 text-gb-green" />
            <h3 className="font-semibold mb-1">Phone</h3>
            <div className="space-y-1">
              <a href="tel:01494432131" className="text-muted-foreground text-sm hover:text-foreground transition-colors block">Georges: 01494 432131</a>
              <a href="tel:07947878087" className="text-muted-foreground text-sm hover:text-foreground transition-colors block">MHTS: 07947 878087</a>
            </div>
          </div>
          <div className="bg-card rounded-lg p-6 text-center border border-border">
            <Mail className="w-6 h-6 mx-auto mb-3 text-gb-green" />
            <h3 className="font-semibold mb-1">Email</h3>
            <a href="mailto:info@georgesbarbers.co.uk" className="text-muted-foreground text-sm hover:text-foreground transition-colors">info@georgesbarbers.co.uk</a>
          </div>
        </div>

        {/* Opening hours side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="font-display text-xl text-gb-green font-semibold mb-4 text-center">Georges Barbers</h3>
            <OpeningHours brand="gb" />
          </div>
          <div>
            <h3 className="text-xl text-mhts-charcoal font-semibold mb-4 text-center">Men's Hair To Stay</h3>
            <OpeningHours brand="mhts" />
          </div>
        </div>

        {/* Google Maps */}
        <div className="rounded-xl overflow-hidden border border-border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2474.5!2d-0.607!3d51.674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s11+Chesham+Road+Amersham+HP6+5HN!5e0!3m2!1sen!2suk!4v1"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Georges Barbers & Men's Hair To Stay location"
          />
        </div>
      </div>
    </div>
  </div>
);

export default ContactPage;
