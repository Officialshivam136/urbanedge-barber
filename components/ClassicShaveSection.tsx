import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export default function ClassicShaveSection() {
  return (
    <section className="relative py-20 bg-[#112119] border-t border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Large Photo */}
          <div className="lg:col-span-7 relative h-[420px] sm:h-[500px] overflow-hidden rounded-sm group shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1200&q=80"
              alt="Classic hot towel shave ritual at URBANEDGE"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center filter contrast-[1.05] brightness-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white/90">
              <span className="text-xs font-mono tracking-widest uppercase bg-black/60 px-3 py-1.5 backdrop-blur-md">
                Eucalyptus & Sandalwood Ritual
              </span>
              <span className="font-condensed text-xl font-bold tracking-wider text-[#d4b26f]">
                ₹350 · 30 Mins
              </span>
            </div>
          </div>

          {/* Right Content Block matching reference design */}
          <div className="lg:col-span-5 flex flex-col justify-center lg:pl-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#d4b26f]" />
              <span className="text-xs font-semibold tracking-[0.25em] text-[#d4b26f] uppercase font-sans">
                Signature Experience
              </span>
            </div>

            <h2 className="font-condensed text-4xl sm:text-6xl font-bold tracking-tight text-white uppercase leading-[0.95]">
              Classic Shave
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#b0beba] font-sans leading-relaxed">
              Relaxing hot towel shave with premium organic products. An unhurried 30-minute ritual designed to refresh skin and clear the mind.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-[#ccd6d1]">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#d4b26f] flex-shrink-0" />
                <span>Pre-shave botanical essential oils massage</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#d4b26f] flex-shrink-0" />
                <span>Dual steamed eucalyptus hot towel wrap</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#d4b26f] flex-shrink-0" />
                <span>Feather-edge straight razor finish & cooling balm</span>
              </li>
            </ul>

            <div className="mt-8 flex items-center gap-5">
              <Link
                href="/book?service=classic-hot-towel-shave"
                className="inline-flex items-center gap-3 font-condensed text-lg font-bold tracking-wider uppercase text-[#edd8aa] hover:text-white transition-colors group"
              >
                <span>Learn More & Book</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-[#d4b26f]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
