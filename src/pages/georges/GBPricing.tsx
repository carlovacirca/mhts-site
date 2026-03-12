import SectionHeading from "@/components/SectionHeading";

const prices = [
  { service: "Gents Haircut", price: "£15" },
  { service: "Kids Haircut (under 12)", price: "£12" },
  { service: "OAP Haircut", price: "£12" },
  { service: "Hot Towel Shave", price: "£18" },
  { service: "Beard Trim", price: "£8" },
  { service: "Hair & Beard Combo", price: "£20" },
  { service: "Skin Fade", price: "£18" },
  { service: "Body Piercing", price: "From £25" },
];

const GBPricing = () => (
  <div className="gb-theme py-16">
    <div className="container mx-auto px-4">
      <SectionHeading title="Pricing" subtitle="Honest pricing, no hidden extras" brand="gb" />
      <div className="max-w-lg mx-auto bg-gb-cream rounded-xl p-8">
        <div className="space-y-4">
          {prices.map((p) => (
            <div key={p.service} className="flex justify-between items-center border-b border-gb-gold/20 pb-3 last:border-0">
              <span className="font-body text-foreground">{p.service}</span>
              <span className="font-display text-gb-green font-semibold text-lg">{p.price}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-muted-foreground text-sm mt-6 font-body">Walk-ins welcome • No appointment needed</p>
      </div>
    </div>
  </div>
);

export default GBPricing;
