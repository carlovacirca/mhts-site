import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewsletterSubscribeBar = () => {
  const [email, setEmail] = useState("");
  return (
    <section className="container mx-auto px-4 pb-20">
      <div className="bg-mhts-light p-6 md:p-8 rounded-lg max-w-3xl">
        <h3 className="font-bold text-lg mb-2 text-mhts-charcoal">Get more expert insights</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Subscribe for tips, guides and exclusive offers.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-background"
          />
          <Button
            className="bg-mhts-charcoal hover:bg-mhts-charcoal/90 text-mhts-white"
            onClick={() => {
              if (email)
                window.location.href = `mailto:georgesbarbers1991@gmail.com?subject=Newsletter%20signup&body=Please%20add%20${email}`;
            }}
          >
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSubscribeBar;
