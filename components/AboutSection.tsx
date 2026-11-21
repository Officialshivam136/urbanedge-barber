import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 bg-[#ded5c3] text-[#1c2420] overflow-hidden">
      {/* Background Barber Scissors Outline Graphic on the Left */}
      <div className="absolute left-[-2rem] top-1/2 -translate-y-1/2 w-96 h-96 opacity-10 pointer-events-none select-none">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full text-[#1c2420]">
          <circle cx="25" cy="75" r="15" />
          <circle cx="75" cy="75" r="15" />
          <path d="M35 65 L70 20" />
          <path d="M65 65 L30 20" />
          <circle cx="50" cy="46" r="3" fill="currentColor" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <span className="text-xs font-bold tracking-[0.25em] text-[#846b48] uppercase font-sans mb-3">
              About Us
            </span>

            <h2 className="font-condensed text-4xl sm:text-6xl font-bold tracking-tight text-[#141b17] uppercase leading-[0.95]">
              Crafted For Confidence
            </h2>

            <p className="mt-5 text-base sm:text-lg text-[#3b4740] font-sans leading-relaxed">
              We blend tradition with trend to deliver more than a service—we deliver confidence. Established in 2015, URBANEDGE was founded on an unapologetic belief: a gentleman&apos;s haircut and shave should never be rushed.
            </p>

            <p className="mt-4 text-sm text-[#4c5b52] font-sans leading-relaxed">
              From our vintage Italian leather barber chairs to bespoke cold brew and hot towel aromatics, every detail is engineered to give you a sanctuary of relaxation and sharp precision.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/book"
                className="px-8 py-3.5 bg-[#17271f] hover:bg-[#0c1611] text-[#f2efe9] font-condensed font-bold text-base tracking-wider uppercase transition-colors shadow-md"
              >
                Read Our Story
              </Link>
            </div>
          </div>

          {/* Center/Right Image Column with Vintage Interior and Vertical Stamp */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-full h-[360px] sm:h-[460px] rounded-sm overflow-hidden shadow-2xl flex-1">
              <Image
                src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=80"
                alt="Vintage barber chairs and brick wall interior at URBANEDGE"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center filter contrast-[1.1] brightness-[0.95]"
              />
              <div className="absolute inset-0 border border-black/10" />
            </div>

            {/* Vertical Stamp: "EST. 2015" matching reference */}
            <div className="hidden sm:flex flex-col items-center justify-center select-none text-[#b3a893] pl-2">
              <span className="font-condensed text-4xl lg:text-5xl font-extrabold tracking-widest uppercase [writing-mode:vertical-rl] rotate-180">
                EST. {siteConfig.establishedYear}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
