import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Scissors, Star, Users, ArrowRight } from "lucide-react";
import gbHero from "@/assets/gb-hero.jpg";
import mhtsHero from "@/assets/mhts-hero.jpg";

const HomePage = () => (
  <div>
    {/* Hero */}
    <section className="relative min-h-[85vh] flex items-center">
      <div className="absolute inset-0 bg-foreground" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-background mb-4 font-display">
            Two Services. <span className="text-gb-gold">One Address.</span>
          </h1>
          <p className="text-background/70 text-lg md:text-xl mb-10 font-body">
            Traditional barbering, body piercing & premium hair replacement — all under one roof in Amersham.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* GB Card */}
            <Link
              to="/georges-barbers"
              className="group relative overflow-hidden rounded-xl aspect-[4/3] flex items-end"
            >
              <img src={gbHero} alt="Georges Barbers interior" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-gb-green/90 via-gb-green/40 to-transparent" />
              <div className="relative p-6 w-full">
                <h2 className="text-2xl font-display text-gb-gold mb-1">Georges Barbers</h2>
                <p className="text-background/80 text-sm mb-3">Barbershop & Body Piercing</p>
                <span className="inline-flex items-center gap-1 text-gb-gold text-sm group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* MHTS Card */}
            <Link
              to="/mens-hair-to-stay"
              className="group relative overflow-hidden rounded-xl aspect-[4/3] flex items-end"
            >
              <img src={mhtsHero} alt="Men's Hair To Stay clinic" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-mhts-charcoal/90 via-mhts-charcoal/40 to-transparent" />
              <div className="relative p-6 w-full">
                <h2 className="text-2xl font-light tracking-wide text-mhts-white mb-1">Men's Hair To Stay</h2>
                <p className="text-background/80 text-sm mb-3">Hair Replacement & SMP</p>
                <span className="inline-flex items-center gap-1 text-mhts-white text-sm group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Features */}
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
          {[
            { icon: Scissors, title: "Expert Craftsmanship", desc: "Skilled barbers and specialist technicians with years of experience." },
            { icon: Star, title: "5-Star Rated", desc: "Trusted by hundreds of clients across Amersham and Buckinghamshire." },
            { icon: Users, title: "Walk-Ins Welcome", desc: "Georges Barbers welcomes walk-ins. MHTS by appointment." },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="p-6"
            >
              <f.icon className="w-8 h-8 mx-auto mb-4 text-gb-gold" />
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Location */}
    <section className="py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-2">Find Us in Amersham</h2>
        <p className="text-muted-foreground mb-8">11 Chesham Road, Amersham HP6 5HN</p>
        <Link to="/contact" className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
          Get Directions <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  </div>
);

export default HomePage;
