import { CheckCircle2 } from "lucide-react";

// The "What It Costs" block on the four category pages. The wording is Carlo's
// to change in batch 6 (decision #20) and is untouched here, word for word.
// Batch 4b changed the layout only: the heading and the free consultation note
// sit to the left of the list from md up, instead of stacked above and below
// it in a narrow grey column.

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
  <section id="pricing" className="scroll-mt-24 bg-mhts-sand py-14 md:py-20">
    <div className="container mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-[0.85fr_1.15fr] md:gap-12">
      <div>
        <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-mhts-red-deep">
          Pricing
        </p>
        <h2 className="text-3xl text-mhts-ink md:text-4xl">
          What It Costs
        </h2>
        <div className="mt-6 flex items-start gap-3 rounded-xl border-l-4 border-mhts-red bg-card p-5">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-mhts-red" aria-hidden="true" />
          <p className="font-body text-sm leading-relaxed text-foreground/80">
            <strong className="text-mhts-ink">Your initial consultation is always free</strong>, no obligation, no pressure. We'll assess your hair loss and confirm exact pricing for
            your treatment plan before you commit to anything.
          </p>
        </div>
      </div>

      <div className="self-start divide-y divide-mhts-stone overflow-hidden rounded-xl border border-mhts-stone bg-card">
        {rows.map((r) => {
          const content = (
            <>
              <div>
                <p className="font-semibold text-mhts-ink">{r.name}</p>
                {r.note && (
                  <p className="mt-0.5 font-body text-xs text-muted-foreground">{r.note}</p>
                )}
              </div>
              <span className="whitespace-nowrap font-body font-semibold text-mhts-red-deep">
                {r.price}
              </span>
            </>
          );

          return r.onClick ? (
            <button
              key={r.name}
              type="button"
              onClick={r.onClick}
              className="flex w-full cursor-pointer flex-col gap-1 px-6 py-4 text-left transition-colors hover:bg-mhts-sand sm:flex-row sm:items-center sm:justify-between sm:gap-4"
            >
              {content}
            </button>
          ) : (
            <div key={r.name} className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              {content}
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default ServicePricing;
