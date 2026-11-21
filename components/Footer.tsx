import React from "react";
import Link from "next/link";
import { Scissors, Instagram, Facebook, Twitter, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-[#09130e] text-[#8ea396] border-t border-white/10 pt-16 pb-12 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#d4b26f] flex items-center justify-center text-[#112119]">
                <Scissors className="w-4 h-4 -rotate-45" />
              </div>
              <span className="font-condensed text-2xl font-bold tracking-wider text-white">
                {siteConfig.name}
              </span>
            </div>

            <p className="text-sm text-[#a4b8ad] max-w-sm leading-relaxed">
              {siteConfig.description}
            </p>

            <div className="flex items-center gap-3 pt-2 text-white/80">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-white/5 hover:bg-[#d4b26f] hover:text-[#112119] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-white/5 hover:bg-[#d4b26f] hover:text-[#112119] flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-white/5 hover:bg-[#d4b26f] hover:text-[#112119] flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-condensed text-sm font-bold tracking-widest uppercase text-white">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:text-[#d4b26f] transition-colors">
                  Services & Pricing
                </a>
              </li>
              <li>
                <a href="#barbers" className="hover:text-[#d4b26f] transition-colors">
                  Our Master Barbers
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#d4b26f] transition-colors">
                  About URBANEDGE
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#d4b26f] transition-colors">
                  Shop Gallery
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#d4b26f] transition-colors">
                  Contact & Hours
                </a>
              </li>
            </ul>
          </div>

          {/* Reservations */}
          <div className="space-y-3">
            <h4 className="font-condensed text-sm font-bold tracking-widest uppercase text-white">
              Reservations
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/book" className="hover:text-[#d4b26f] transition-colors">
                  Book Slot Online (₹50 Token)
                </Link>
              </li>
              <li>
                <Link href="/book?service=student-cut" className="hover:text-[#d4b26f] transition-colors">
                  Student Cut (20% Off)
                </Link>
              </li>
              <li>
                <Link href="/book?service=classic-hot-towel-shave" className="hover:text-[#d4b26f] transition-colors">
                  Classic Hot Towel Shave
                </Link>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition-colors"
                >
                  Book via WhatsApp Concierge
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="font-condensed text-sm font-bold tracking-widest uppercase text-white">
              Policies & GST
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="hover:text-[#d4b26f] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#d4b26f] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-[#d4b26f] transition-colors">
                  ₹50 Token & Refund Policy
                </Link>
              </li>
              <li className="pt-2 text-[11px] text-[#718578]">
                <div className="flex items-center gap-1.5 text-white/90 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#d4b26f]" />
                  <span>GSTIN: {siteConfig.gstin}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between text-[#6b7e72] gap-4">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
          <p className="text-[11px]">
            Designed for the modern gentleman · Handcrafted in Bengaluru
          </p>
        </div>
      </div>
    </footer>
  );
}
