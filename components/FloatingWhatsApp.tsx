"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { siteConfig } from "@/lib/site";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMsg = encodeURIComponent(
    "Hello URBANEDGE! I would like to book a chair or ask a question."
  );

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Friendly Tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#172b21] border border-[#25D366]/40 text-white text-xs px-3.5 py-2 rounded-full shadow-2xl animate-fade-in backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
          <span>Need quick booking? WhatsApp us</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-white/50 hover:text-white ml-1"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={`https://wa.me/${siteConfig.whatsappNumber}?text=${defaultMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with URBANEDGE on WhatsApp"
        className="relative group w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
        
        {/* Glow pulse effect */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-pulse -z-10 group-hover:bg-[#25D366]/50" />
      </a>
    </div>
  );
}
