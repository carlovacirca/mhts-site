import { Phone, Mail, MapPin } from "lucide-react";

const HomeHeader = () => (
  <div className="bg-foreground text-background text-sm py-3 px-4">
    <div className="container mx-auto flex flex-wrap justify-between items-center gap-2">
      <div className="flex items-center gap-4 flex-wrap">
        <a href="tel:01494432131" className="flex items-center gap-1.5 hover:text-gb-gold transition-colors">
          <Phone className="w-3.5 h-3.5" /> <span className="font-semibold">Georges:</span> 01494 432131
        </a>
        <a href="tel:07947878087" className="flex items-center gap-1.5 hover:text-mhts-light transition-colors">
          <Phone className="w-3.5 h-3.5" /> <span className="font-semibold">MHTS:</span> 07947 878087
        </a>
      </div>
      <span className="flex items-center gap-1.5">
        <MapPin className="w-3.5 h-3.5 shrink-0" /> 11 Chesham Road, Amersham HP6 5HN
      </span>
    </div>
  </div>
);

export default HomeHeader;
