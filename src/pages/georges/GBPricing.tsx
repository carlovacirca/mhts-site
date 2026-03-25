import SectionHeading from "@/components/SectionHeading";

const prices = [
  { service: "Men's Dry Cut", price: "£20" },
  { service: "Seniors 65+ (Mon–Fri)", price: "£15" },
  { service: "Seniors 65+ (Wednesday)", price: "£14.50" },
  { service: "Students 15–25 years old", price: "£18" },
  { service: "Boys 12–14 years old", price: "£16.50" },
  { service: "Boys 5–11 years old", price: "£15" },
  { service: "Boys up to 4 years old", price: "£12" },
  { service: "1 Grade All Over", price: "£14.50" },
  { service: "Saturday & Sunday All Dry Cuts", price: "£22" },
  { service: "Hair Wash", price: "£8.50" },
  { service: "Flat Tops", price: "£25.50" },
  { service: "Beard Trim", price: "£8.50" },
  { service: "Beard Reshape", price: "£10.50" },
  { service: "Ladies Dry Cuts", price: "From £23.50" },
  { service: "Girls", price: "Ask for a price" },
  { service: "Skin Fades", price: "+£5" },
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
