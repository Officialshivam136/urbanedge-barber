"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Clock, Scissors, Sparkles, Check, ArrowRight } from "lucide-react";
import { services } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

type CategoryFilter = "all" | "hair" | "shave" | "beard" | "package" | "treatment";

export default function ServicesSection() {
  const [filter, setFilter] = useState<CategoryFilter>("all");

  const filteredServices =
    filter === "all" ? services : services.filter((s) => s.category === filter);

  return (
    <section id="services" className="relative py-24 bg-[#0e1a14] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[1.5px] bg-[#d4b26f]" />
              <span className="text-xs font-semibold tracking-[0.25em] text-[#d4b26f] uppercase font-sans">
                Curated Menu
              </span>
            </div>
            <h2 className="font-condensed text-4xl sm:text-6xl font-bold tracking-tight uppercase">
              Services & Pricing
            </h2>
            <p className="mt-2 text-base text-[#9ab1a4] font-sans max-w-lg">
              Every appointment includes complimentary beverage, consultation, and hot towel wrap.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All" },
              { id: "hair", label: "Haircuts" },
              { id: "shave", label: "Shaves" },
              { id: "beard", label: "Beard" },
              { id: "package", label: "Ritual Packages" },
              { id: "treatment", label: "Grooming & Facials" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id as CategoryFilter)}
                className={`px-4 py-2 text-xs font-condensed uppercase tracking-wider transition-all duration-200 ${
                  filter === cat.id
                    ? "bg-[#c8b28d] text-[#112119] font-bold shadow-md"
                    : "bg-[#172a21] text-[#b8c6be] hover:bg-[#20372c] hover:text-white border border-white/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-[#14261e] border border-white/10 hover:border-[#d4b26f]/50 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-condensed text-2xl font-bold uppercase tracking-wide text-white group-hover:text-[#d4b26f] transition-colors">
                        {service.name}
                      </h3>
                      {service.isPopular && (
                        <span className="px-2 py-0.5 bg-[#d4b26f]/20 border border-[#d4b26f]/40 text-[#edd8aa] text-[10px] font-bold tracking-wider uppercase">
                          Popular
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-xs text-[#8ca396] font-mono">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#d4b26f]" />
                        {service.durationMinutes} Mins
                      </span>
                      {service.studentDiscountEligible && (
                        <span className="text-[#d4b26f] font-semibold">
                          • 20% Student Discount eligible
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-condensed text-3xl font-extrabold text-[#d4b26f]">
                      {formatPrice(service.price)}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-sm text-[#b2c2b9] leading-relaxed font-sans">
                  {service.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-[#7f9589] font-sans">
                  ₹50 booking token online · Balance at shop
                </span>

                <Link
                  href={`/book?service=${service.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#c8b28d]/20 hover:bg-[#c8b28d] text-[#edd8aa] hover:text-[#112119] border border-[#c8b28d]/40 font-condensed font-bold text-xs tracking-wider uppercase transition-all"
                >
                  <span>Book Slot</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
