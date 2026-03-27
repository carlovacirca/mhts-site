import { motion } from "framer-motion";
import { Scissors, Star, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import OpeningHours from "@/components/OpeningHours";
import gbHero from "@/assets/gb-hero.jpg";

const GBAbout = () => (
  <div className="gb-theme">
    {/* Hero */}
    <section className="relative h-[50vh] min-h-[400px] flex items-center">
      <img src={gbHero} alt="Georges Barbers" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gb-green/70" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-5xl font-display text-gb-gold mb-4">Georges Barbers</h1>
          <p className="text-background/90 text-lg max-w-xl mx-auto font-body">
            Traditional gents barbershop & ear piercing studio — proudly serving the Amersham community.
          </p>
        </motion.div>
      </div>
    </section>

    {/* About */}
    <section className="py-16 bg-gb-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <SectionHeading title="Welcome to Georges" subtitle="Where tradition meets community" brand="gb" />
          <div className="prose prose-lg mx-auto text-center font-body text-foreground/80 space-y-4">
            <p>
              Georges Barbers has been a cornerstone of the Amersham community, offering classic cuts and professional ear piercing in a warm, welcoming atmosphere.
            </p>
            <p>
              Our experienced barbers take pride in delivering quality grooming services for men and boys of all ages. Walk-ins are always welcome — no appointment needed.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Quick info */}
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <OpeningHours brand="gb" />
          <div className="bg-gb-cream rounded-lg p-6 flex flex-col justify-center">
            <h3 className="font-display text-lg text-gb-green mb-4 font-semibold">Quick Links</h3>
            <div className="space-y-3 font-body">
              <Link to="/georges-barbers/services" className="flex items-center gap-2 text-gb-green hover:text-gb-gold transition-colors">
                <Scissors className="w-4 h-4" /> View Our Services
              </Link>
              <Link to="/georges-barbers/pricing" className="flex items-center gap-2 text-gb-green hover:text-gb-gold transition-colors">
                <Star className="w-4 h-4" /> See Pricing
              </Link>
              <Link to="/georges-barbers/book" className="flex items-center gap-2 text-gb-green hover:text-gb-gold transition-colors">
                <Clock className="w-4 h-4" /> Book or Walk In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default GBAbout;
