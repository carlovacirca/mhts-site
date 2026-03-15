import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Award, Clock } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import OpeningHours from "@/components/OpeningHours";
import mhtsHero from "@/assets/mhts-hero.jpg";

const MHTSAbout = () => (
  <div className="mhts-theme">
    {/* Hero */}
    <section className="relative h-[50vh] min-h-[400px] flex items-center">
      <img src={mhtsHero} alt="Men's Hair To Stay" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-mhts-charcoal/75" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-5xl font-light tracking-wide text-mhts-white mb-4">Men's Hair To Stay</h1>
          <p className="text-mhts-white/80 text-lg max-w-xl mx-auto">
            Premium hair replacement, scalp micropigmentation & hair systems in Amersham.
          </p>
        </motion.div>
      </div>
    </section>

    {/* About */}
    <section className="py-16 bg-mhts-light">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <SectionHeading title="Confidence Restored" subtitle="Specialist solutions for hair loss" brand="mhts" />
        <div className="space-y-4 text-foreground/80">
          <p>
            Men's Hair To Stay offers discreet, professional hair replacement solutions. Whether you're exploring scalp micropigmentation (SMP) or non-surgical hair systems, our specialists deliver natural-looking results.
          </p>
          <p>
            Every consultation is private and personalised. We understand the impact hair loss can have on confidence — and we're here to help.
          </p>
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { icon: Shield, title: "Confidential", desc: "Private consultations in a discreet environment." },
            { icon: Award, title: "Specialist Trained", desc: "Advanced techniques for natural results." },
            { icon: Clock, title: "By Appointment", desc: "Dedicated time slots for every client." },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center p-6 bg-mhts-light rounded-lg"
            >
              <f.icon className="w-8 h-8 mx-auto mb-4 text-mhts-charcoal" />
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Hours */}
    <section className="py-16 bg-mhts-light">
      <div className="container mx-auto px-4 max-w-md">
        <OpeningHours brand="mhts" />
      </div>
    </section>
  </div>
);

export default MHTSAbout;
