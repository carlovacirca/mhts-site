interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

const SectionHeading = ({ title, subtitle }: SectionHeadingProps) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-mhts-charcoal">
        {title}
      </h2>
      <div className="w-16 h-0.5 bg-mhts-charcoal mx-auto mt-4 mb-3" />
      {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
};

export default SectionHeading;
