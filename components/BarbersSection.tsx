import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Scissors, Award } from "lucide-react";
import { barbers } from "@/lib/data";

export default function BarbersSection() {
  return (
    <section id="barbers" className="relative py-24 bg-[#0e1a14] overflow-hidden">
      {/* Giant Stylized Watermark Letter "B" on the right */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none select-none text-white/[0.03] text-[28rem] font-condensed font-black leading-none z-0">
        B
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-[1.5px] bg-[#d4b26f]" />
            <span className="text-xs font-semibold tracking-[0.25em] text-[#d4b26f] uppercase font-sans">
              Our Barbers
            </span>
          </div>

          <h2 className="font-condensed text-4xl sm:text-6xl font-bold tracking-tight text-white uppercase">
            Masters of Modern Style
          </h2>

          <p className="mt-3 text-base sm:text-lg text-[#a8b5ad] max-w-xl font-sans">
            Skilled hands. True passion. Meet the artists behind your look.
          </p>
        </div>

        {/* 3 Barber Cards Grid matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {barbers.map((barber) => (
            <div
              key={barber.id}
              className="group bg-[#15271f] border border-white/10 hover:border-[#d4b26f]/60 transition-all duration-300 flex flex-col overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1.5"
            >
              {/* Image Frame */}
              <div className="relative w-full h-80 sm:h-96 overflow-hidden bg-black/40">
                <Image
                  src={barber.image}
                  alt={barber.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center filter grayscale contrast-[1.1] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#15271f] via-transparent to-black/20" />

                {barber.badge && (
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#112119]/90 border border-[#d4b26f]/40 text-[#edd8aa] text-[11px] font-semibold tracking-wider uppercase backdrop-blur-sm">
                      <Award className="w-3 h-3 text-[#d4b26f]" />
                      {barber.badge}
                    </span>
                  </div>
                )}

                <div className="absolute bottom-4 right-4 flex items-center gap-1 px-2.5 py-1 bg-black/70 backdrop-blur-sm rounded text-white text-xs font-semibold">
                  <Star className="w-3.5 h-3.5 fill-[#d4b26f] text-[#d4b26f]" />
                  <span>{barber.rating}</span>
                  <span className="text-white/50 text-[10px]">({barber.reviewsCount})</span>
                </div>
              </div>

              {/* Barber Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-condensed text-2xl font-bold uppercase tracking-wide text-white group-hover:text-[#d4b26f] transition-colors">
                    {barber.name}
                  </h3>
                  <p className="text-xs font-semibold tracking-wider text-[#d4b26f] uppercase mt-0.5">
                    {barber.title}
                  </p>
                  <p className="text-xs text-[#9bb0a4] mt-2 font-mono">
                    Specialty: {barber.specialty}
                  </p>
                  <p className="text-sm text-[#b8c5bd] mt-3 font-sans line-clamp-2">
                    {barber.bio}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-[#8b9e93]">
                    {barber.experience}
                  </span>
                  <Link
                    href={`/book?barber=${barber.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#c8b28d]/20 hover:bg-[#c8b28d] text-[#edd8aa] hover:text-[#112119] border border-[#c8b28d]/40 font-condensed font-bold text-xs tracking-wider uppercase transition-all duration-200"
                  >
                    <Scissors className="w-3.5 h-3.5" />
                    <span>Book with {barber.name.split(" ")[0]}</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
