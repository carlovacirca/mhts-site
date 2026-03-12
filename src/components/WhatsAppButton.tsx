import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/441234567890"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-whatsapp hover:brightness-110 text-background rounded-full p-4 shadow-lg transition-all hover:scale-105"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle className="w-6 h-6" />
  </a>
);

export default WhatsAppButton;
