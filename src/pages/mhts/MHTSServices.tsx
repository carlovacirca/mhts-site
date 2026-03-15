import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";

const services = [
  { name: "Scalp Micropigmentation (SMP)", desc: "Advanced pigmentation technique that replicates natural hair follicles for a fuller, natural look." },
  { name: "Non-Surgical Hair System", desc: "Custom-fitted hair systems matched perfectly to your hair colour, texture and style." },
  { name: "Hair System Maintenance", desc: "Regular maintenance appointments to keep your hair system looking its best." },
  { name: "Hair System Maintenance", desc: "Regular maintenance appointments to keep your hair system looking its best." },
  { name: "Free Consultation", desc: "Confidential, no-obligation consultation to discuss the best solution for you." },
];

const MHTSServices = () => (
  <div className="mhts-theme py-16">
    <div className="container mx-auto px-4">
      <SectionHeading title="Our Services" subtitle="Professional hair replacement solutions" brand="mhts" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {services.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-mhts-light rounded-lg p-6 border border-border hover:border-mhts-charcoal/30 transition-colors"
          >
            <h3 className="text-lg font-semibold text-mhts-charcoal mb-2">{s.name}</h3>
            <p className="text-muted-foreground text-sm">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default MHTSServices;
