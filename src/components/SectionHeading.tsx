interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  brand?: "gb" | "mhts";
}

const SectionHeading = ({ title, subtitle, brand }: SectionHeadingProps) => {
  const colorClass = brand === "gb" ? "text-gb-green" : brand === "mhts" ? "text-mhts-charcoal" : "text-foreground";
  const barClass = brand === "gb" ? "bg-gb-gold" : brand === "mhts" ? "bg-mhts-charcoal" : "bg-foreground";

  return (
    <div className="text-center mb-12">
      <h2 className={`text-3xl md:text-4xl font-bold ${colorClass} ${brand === "gb" ? "font-display" : ""}`}>
        {title}
      </h2>
      <div className={`w-16 h-0.5 ${barClass} mx-auto mt-4 mb-3`} />
      {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
};

export default SectionHeading;
