import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";

const services = [
  { name: "Gents Haircut", desc: "Classic cuts, fades, scissor work — tailored to your style." },
  { name: "Kids Haircut", desc: "Friendly, patient service for younger gents." },
  { name: "Beard Trim & Shape", desc: "Expert beard grooming and sculpting." },
  { name: "Hair & Beard Combo", desc: "Full grooming session — haircut plus beard trim." },
  { name: "Ear Piercing", desc: "Professional ear piercing in a clean, sterile environment. Appointment required — walk-ins not accepted for piercings." },
];

const GBServices = () => (
  <div className="gb-theme py-16">
    <div className="container mx-auto px-4">
      <SectionHeading title="Our Services" subtitle="Classic grooming & professional piercing" brand="gb" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {services.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-gb-cream rounded-lg p-6 border border-gb-gold/20 hover:border-gb-gold/50 transition-colors"
          >
            <h3 className="font-display text-lg text-gb-green font-semibold mb-2">{s.name}</h3>
            <p className="text-muted-foreground text-sm font-body">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default GBServices;
