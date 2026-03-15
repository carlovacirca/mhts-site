import { Link } from "react-router-dom";
import { Instagram, Facebook, MapPin, Phone, Mail, Clock } from "lucide-react";
import gbLogo from "@/assets/gb-logo.png";
import mhtsLogo from "@/assets/mhts-logo.png";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.78a8.28 8.28 0 0 0 3.76.96V6.69Z" />
  </svg>
);

const Footer = () => (
  <footer className="bg-foreground text-background">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Georges Barbers */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={gbLogo} alt="Georges Barbers" className="h-10 w-10 brightness-200" />
            <h3 className="font-display text-xl text-gb-gold">Georges Barbers</h3>
          </div>
          <p className="text-sm opacity-70 mb-4">Traditional gents barbershop & body piercing studio in Amersham.</p>
          <div className="flex gap-3">
            <a href="https://www.instagram.com/menshairtostay?igsh=d2dmaXJzb210OWZ0" target="_blank" rel="noopener noreferrer" className="hover:text-gb-gold transition-colors" aria-label="Georges Barbers Instagram">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.facebook.com/share/14XfkPCSNsP/" target="_blank" rel="noopener noreferrer" className="hover:text-gb-gold transition-colors" aria-label="Georges Barbers Facebook">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://tiktok.com/@georgesbarbers" target="_blank" rel="noopener noreferrer" className="hover:text-gb-gold transition-colors" aria-label="Georges Barbers TikTok">
              <TikTokIcon />
            </a>
          </div>
        </div>

        {/* Men's Hair To Stay */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={mhtsLogo} alt="Men's Hair To Stay" className="h-10 w-10 brightness-200" />
            <h3 className="text-xl font-light tracking-wide">Men's Hair To Stay</h3>
          </div>
          <p className="text-sm opacity-70 mb-4">Premium hair replacement, SMP & hair systems in Amersham.</p>
          <div className="flex gap-3">
            <a href="https://www.instagram.com/menshairtostay?igsh=d2dmaXJzb210OWZ0" target="_blank" rel="noopener noreferrer" className="hover:text-mhts-light transition-colors" aria-label="MHTS Instagram">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.facebook.com/share/14XfkPCSNsP/" target="_blank" rel="noopener noreferrer" className="hover:text-mhts-light transition-colors" aria-label="MHTS Facebook">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://tiktok.com/@menshairtostay" target="_blank" rel="noopener noreferrer" className="hover:text-mhts-light transition-colors" aria-label="MHTS TikTok">
              <TikTokIcon />
            </a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Visit Us</h3>
          <div className="space-y-2 text-sm opacity-80">
            <p className="flex items-center gap-2"><MapPin className="w-4 h-4 shrink-0" /> 11 Chesham Road, Amersham HP6 5HN</p>
            <p className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0" /> Georges: 01494 432131</p>
            <p className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0" /> MHTS: 07947 878087</p>
            <p className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0" /> info@georgesbarbers.co.uk</p>
          </div>
          <div className="mt-4 flex gap-4">
            <Link to="/georges-barbers" className="text-xs uppercase tracking-wider hover:text-gb-gold transition-colors">Georges</Link>
            <Link to="/mens-hair-to-stay" className="text-xs uppercase tracking-wider hover:text-gb-gold transition-colors">MHTS</Link>
            <Link to="/contact" className="text-xs uppercase tracking-wider hover:text-gb-gold transition-colors">Contact</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10 mt-10 pt-6 text-center text-xs opacity-50">
        © {new Date().getFullYear()} Georges Barbers & Men's Hair To Stay. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
