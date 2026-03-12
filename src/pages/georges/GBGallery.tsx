import SectionHeading from "@/components/SectionHeading";

const GBGallery = () => {
  const placeholders = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="gb-theme py-16">
      <div className="container mx-auto px-4">
        <SectionHeading title="Gallery" subtitle="Cuts, fades & piercings from the chair" brand="gb" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {placeholders.map((i) => (
            <div
              key={i}
              className="aspect-square bg-gb-cream rounded-lg flex items-center justify-center border border-gb-gold/20"
            >
              <span className="text-muted-foreground text-sm font-body">Photo coming soon</span>
            </div>
          ))}
        </div>
        <p className="text-center text-muted-foreground text-sm mt-8 font-body">
          Follow us on Instagram for our latest work
        </p>
      </div>
    </div>
  );
};

export default GBGallery;
