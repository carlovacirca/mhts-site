import { Phone, Mail, MapPin } from "lucide-react";

const HomeHeader = () => (
  <div className="bg-foreground text-background text-sm py-3 px-4">
    <div className="container mx-auto flex flex-wrap justify-between items-center gap-2">
      <div className="flex items-center gap-4">
        <a href="tel:01234567890" className="flex items-center gap-1.5 hover:text-gb-gold transition-colors">
          <Phone className="w-3.5 h-3.5" /> 01234 567 890
        </a>
        <a href="mailto:info@georgesbarbers.co.uk" className="hidden sm:flex items-center gap-1.5 hover:text-gb-gold transition-colors">
          <Mail className="w-3.5 h-3.5" /> info@georgesbarbers.co.uk
        </a>
      </div>
      <span className="flex items-center gap-1.5">
        <MapPin className="w-3.5 h-3.5 shrink-0" /> 11 Chesham Road, Amersham HP6 5HN
      </span>
    </div>
  </div>
);

export default HomeHeader;
