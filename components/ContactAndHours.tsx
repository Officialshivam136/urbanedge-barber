import React from "react";
import { MapPin, Phone, Mail, Clock, MessageSquare, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site";

export default function ContactAndHours() {
  return (
    <section id="contact" className="relative py-24 bg-[#112119] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Hours & Contact */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-[1.5px] bg-[#d4b26f]" />
                <span className="text-xs font-semibold tracking-[0.25em] text-[#d4b26f] uppercase font-sans">
                  Visit & Connect
                </span>
              </div>
              <h2 className="font-condensed text-4xl sm:text-6xl font-bold tracking-tight uppercase">
                Hours & Location
              </h2>
              <p className="mt-3 text-base text-[#9eb2a6] font-sans max-w-md">
                Walk-ins welcomed when slots permit; reserved appointments receive instant chair priority.
              </p>

              {/* Operating Hours Table */}
              <div className="mt-8 bg-[#172b21] border border-white/10 p-6 rounded-sm space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#d4b26f] border-b border-white/10 pb-3">
                  <Clock className="w-4 h-4" />
                  <span>Shop Timings</span>
                </div>

                <div className="space-y-3">
                  {siteConfig.hours.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between text-sm py-1.5 border-b border-white/5 last:border-0"
                    >
                      <span className="font-medium text-white">{item.days}</span>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[#edd8aa]">{item.time}</span>
                        {item.note && (
                          <span className="text-[10px] text-[#8ea498] bg-black/40 px-2 py-0.5 rounded">
                            {item.note}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info Pills */}
              <div className="mt-8 space-y-4 text-sm text-[#c8d4ce]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#d4b26f] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">UrbanEdge Indiranagar</span>
                    <span>{siteConfig.address.full}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-2">
                  <a
                    href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                    className="flex items-center gap-2 text-white hover:text-[#d4b26f] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#d4b26f]" />
                    <span>{siteConfig.phone}</span>
                  </a>

                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-2 text-white hover:text-[#d4b26f] transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#d4b26f]" />
                    <span>{siteConfig.email}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Action Button */}
            <div className="mt-8">
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                  "Hello URBANEDGE Concierge, I would like to inquire about appointments."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-black font-condensed font-bold text-base tracking-wider uppercase transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Chat Directly on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Embed */}
          <div className="lg:col-span-6 h-[420px] lg:h-auto min-h-[400px] bg-[#14261e] border border-white/10 relative rounded-sm overflow-hidden shadow-2xl">
            <iframe
              src={siteConfig.address.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(110%)" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="URBANEDGE Barbershop Location"
              className="w-full h-full"
            />
            <div className="absolute bottom-4 left-4 bg-[#112119]/90 border border-[#d4b26f]/40 p-3 backdrop-blur-md text-xs">
              <span className="font-bold text-white block">Valet Parking Available</span>
              <span className="text-[#9ab1a5]">Opposite Toit Brewpub, Indiranagar</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
