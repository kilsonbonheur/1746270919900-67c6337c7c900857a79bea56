import React from "react";
import { MessageCircle } from "lucide-react";

function WhatsAppButton() {
  const phoneNumber = "971557968372";
  const message = "Hello Kilson Services, I need help with my Dubai visa application.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      id="home_whatsapp-button"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-4 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}

export default WhatsAppButton;
