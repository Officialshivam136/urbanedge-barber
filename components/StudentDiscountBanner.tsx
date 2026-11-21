import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, ArrowRight, Clock, ShieldCheck } from "lucide-react";

export default function StudentDiscountBanner() {
  return (
    <section className="relative py-20 bg-[#112119] border-b border-white/10 overflow-hidden">
      {/* Stylized Giant Watermark "C" on bottom-right matching reference */}
      <div className="absolute right-6 -bottom-16 pointer-events-none select-none text-white/[0.04] text-[24rem] font-condensed font-black leading-none z-0">
        C
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#172a21] border border-[#d4b26f]/30 rounded-sm overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 items-center">
          {/* Content Column */}
          <div className="p-8 sm:p-12 md:col-span-7 lg:col-span-8 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 bg-[#d4b26f]/20 rounded text-[#d4b26f]">
                <GraduationCap className="w-5 h-5" />
              </span>
              <span className="text-xs font-bold tracking-[0.25em] text-[#d4b26f] uppercase font-sans">
                Student Privilege Card
              </span>
            </div>

            <h2 className="font-condensed text-4xl sm:text-6xl font-bold tracking-tight text-white uppercase leading-[0.95]">
              Student Cut Discount <br className="hidden sm:inline" />
              <span className="text-[#d4b26f]">20% Off</span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#c8d4ce] font-sans max-w-xl">
              Show your student ID and get 20% off on all haircuts. Keep your sharp fade and clean look without breaking your allowance.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-wider text-[#edd8aa]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/40 border border-white/10">
                <Clock className="w-3.5 h-3.5 text-[#d4b26f]" />
                Monday – Thursday
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/40 border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-[#d4b26f]" />
                Valid Photo ID Required
              </span>
            </div>

            <div className="mt-8">
              <Link
                href="/book?service=student-cut"
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#c8b28d] hover:bg-[#d8c3a0] text-[#112119] font-condensed font-bold text-base tracking-wider uppercase transition-all shadow-md hover:-translate-y-0.5"
              >
                <span>Claim 20% Off Cut (₹360)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Photo Column */}
          <div className="relative md:col-span-5 lg:col-span-4 h-72 md:h-full min-h-[340px] bg-black/40">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
              alt="Young student with modern clean haircut at URBANEDGE"
              fill
              sizes="(max-width: 768px) 100vw, 35vw"
              className="object-cover object-center filter grayscale contrast-[1.1] hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#172a21] via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
