import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getFaqsForTags } from "@/data/gbFaqs";

interface GBRelatedFaqsProps {
  tags: string[];
  limit?: number;
}

const GBRelatedFaqs = ({ tags, limit = 4 }: GBRelatedFaqsProps) => {
  const faqs = getFaqsForTags(tags, limit);
  if (!faqs.length) return null;

  return (
    <div>
      <h4 className="font-bold mb-3 text-mhts-charcoal text-sm uppercase tracking-wider">
        Related FAQs
      </h4>
      <Accordion type="single" collapsible className="border border-border rounded-lg bg-mhts-light/40 px-3">
        {faqs.map((f, i) => (
          <AccordionItem key={f.id} value={`faq-${i}`} className="border-b last:border-b-0">
            <AccordionTrigger className="text-sm text-left text-mhts-charcoal hover:no-underline py-3">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default GBRelatedFaqs;
