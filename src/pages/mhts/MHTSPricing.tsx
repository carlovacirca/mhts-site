import SectionHeading from "@/components/SectionHeading";

const prices = [
  { service: "Free Consultation", price: "Free" },
  { service: "Scalp Micropigmentation (per session)", price: "From £250" },
  { service: "Hair System (supply & fit)", price: "From £350" },
  { service: "Hair System Maintenance", price: "From £80" },
  { service: "Hair Thickening Treatment", price: "From £120" },
];

const MHTSPricing = () => (
  <div className="mhts-theme py-16">
    <div className="container mx-auto px-4">
      <SectionHeading title="Pricing" subtitle="Transparent pricing for premium services" brand="mhts" />
      <div className="max-w-lg mx-auto bg-mhts-light rounded-xl p-8">
        <div className="space-y-4">
          {prices.map((p) => (
            <div key={p.service} className="flex justify-between items-center border-b border-border pb-3 last:border-0">
              <span>{p.service}</span>
              <span className="font-semibold text-mhts-charcoal text-lg">{p.price}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-muted-foreground text-sm mt-6">
          All treatments require a consultation. Prices may vary based on individual needs.
        </p>
      </div>
    </div>
  </div>
);

export default MHTSPricing;
