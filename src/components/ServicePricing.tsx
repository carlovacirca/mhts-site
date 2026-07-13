import { CheckCircle2 } from "lucide-react";

export interface PricingRow {
  name: string;
  price: string;
  note?: string;
  onClick?: () => void;
}

interface ServicePricingProps {
  rows: PricingRow[];
}

const ServicePricing = ({ rows }: ServicePricingProps) => (
  <section className="py-16 bg-mhts-light">
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="text-center mb-10">
        <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">
          Pricing
        </p>
        <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">
          What It Costs
        </h2>
        <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
      </div>

      <div className="bg-card border border-border rounded-sm divide-y divide-border overflow-hidden">
        {rows.map((r) => {
          const content = (
            <>
              <div>
                <p className="text-mhts-charcoal font-medium tracking-wide">{r.name}</p>
                {r.note && (
                  <p className="text-muted-foreground text-xs font-body mt-0.5">{r.note}</p>
                )}
              </div>
              <span className="text-mhts-charcoal font-semibold font-body whitespace-nowrap">
                {r.price}
              </span>
            </>
          );

          return r.onClick ? (
            <button
              key={r.name}
              type="button"
              onClick={r.onClick}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 px-6 py-4 w-full text-left cursor-pointer hover:bg-mhts-light transition-colors"
            >
              {content}
            </button>
          ) : (
            <div key={r.name} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 px-6 py-4">
              {content}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-start gap-3 bg-card border border-mhts-slate/30 rounded-sm p-5">
        <CheckCircle2 className="w-5 h-5 text-mhts-charcoal shrink-0 mt-0.5" />
        <p className="text-sm text-foreground/80 font-body leading-relaxed">
          <strong className="text-mhts-charcoal">Your initial consultation is always free</strong> —
          no obligation, no pressure. We'll assess your hair loss and confirm exact pricing for
          your treatment plan before you commit to anything.
        </p>
      </div>
    </div>
  </section>
);

export default ServicePricing;
