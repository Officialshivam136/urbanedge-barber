import React from "react";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function TestimonialsSection() {
  return (
    <section className="relative py-24 bg-[#0d1a14] border-t border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#d4b26f] uppercase font-sans">
            Client Words
          </span>
          <h2 className="font-condensed text-4xl sm:text-6xl font-bold tracking-tight uppercase mt-2">
            Praise From Gentlemen
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#9ab0a3] font-sans">
            Over 1,000+ five-star grooming experiences since 2015.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-[#14261e] border border-white/10 p-8 flex flex-col justify-between relative hover:border-[#d4b26f]/40 transition-colors shadow-lg"
            >
              <Quote className="w-8 h-8 text-[#d4b26f]/20 absolute top-6 right-6" />

              <div>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#d4b26f] text-[#d4b26f]"
                    />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-[#c4d2cb] font-sans italic leading-relaxed">
                  &ldquo;{t.review}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <h4 className="font-condensed text-lg font-bold uppercase text-white tracking-wide">
                  {t.name}
                </h4>
                <p className="text-xs text-[#899f92] font-mono">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
