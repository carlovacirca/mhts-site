import SectionHeading from "@/components/SectionHeading";

const services = [
  { service: "Free Consultation" },
  { service: "Scalp Micropigmentation (SMP)" },
  { service: "Non-Surgical Hair System" },
  { service: "Hair System Maintenance" },
];

const MHTSPricing = () => (
  <div className="mhts-theme py-16">
    <div className="container mx-auto px-4">
      <SectionHeading title="Our Services" subtitle="Specialist treatments tailored to you" brand="mhts" />
      <div className="max-w-lg mx-auto bg-mhts-light rounded-xl p-8">
        <div className="space-y-4">
          {services.map((p) => (
            <div key={p.service} className="border-b border-border pb-3 last:border-0">
              <span>{p.service}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-muted-foreground text-sm mt-6">
          All treatments begin with a free consultation. Contact us to discuss your needs.
        </p>
      </div>
    </div>
  </div>
);

export default MHTSPricing;
