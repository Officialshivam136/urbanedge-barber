import React from "react";
import Image from "next/image";
import { galleryImages } from "@/lib/data";

export default function GallerySection() {
  return (
    <section id="gallery" className="relative py-24 bg-[#112119] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[1.5px] bg-[#d4b26f]" />
              <span className="text-xs font-semibold tracking-[0.25em] text-[#d4b26f] uppercase font-sans">
                Visual Sanctuary
              </span>
            </div>
            <h2 className="font-condensed text-4xl sm:text-6xl font-bold tracking-tight uppercase">
              The Craft & Space
            </h2>
            <p className="mt-2 text-base text-[#9fb3a7] font-sans max-w-lg">
              A glimpse into the daily artistry, vintage chairs, and calm atmosphere at URBANEDGE.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((img, index) => (
            <div
              key={index}
              className="group relative h-72 sm:h-80 overflow-hidden bg-black/40 border border-white/10 hover:border-[#d4b26f]/60 transition-all duration-300"
            >
              <Image
                src={img.url}
                alt={img.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center filter grayscale contrast-[1.1] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-mono tracking-widest text-[#d4b26f] uppercase">
                  {img.category}
                </span>
                <h4 className="font-condensed text-xl font-bold text-white uppercase tracking-wide">
                  {img.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
