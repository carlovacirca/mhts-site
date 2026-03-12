import SectionHeading from "@/components/SectionHeading";

const MHTSGallery = () => {
  const placeholders = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="mhts-theme py-16">
      <div className="container mx-auto px-4">
        <SectionHeading title="Transformations" subtitle="Real results from real clients" brand="mhts" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {placeholders.map((i) => (
            <div
              key={i}
              className="aspect-square bg-mhts-light rounded-lg flex items-center justify-center border border-border"
            >
              <span className="text-muted-foreground text-sm">Before & After coming soon</span>
            </div>
          ))}
        </div>
        <p className="text-center text-muted-foreground text-sm mt-8">
          Follow us on Instagram to see our latest transformations
        </p>
      </div>
    </div>
  );
};

export default MHTSGallery;
