"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Scissors, Menu, X, Phone, Clock } from "lucide-react";
import { siteConfig } from "@/lib/site";

function getShopStatus() {
  const now = new Date();
  const day = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // Monday - Thursday (1-4): 09:00 AM - 09:00 PM (540 to 1260 mins)
  // Friday (5): 09:00 AM - 09:30 PM (540 to 1290 mins)
  // Saturday - Sunday (6, 0): 08:30 AM - 09:30 PM (510 to 1290 mins)

  let openMinutes = 540; // 09:00 AM
  let closeMinutes = 1260; // 09:00 PM
  let openTimeStr = "9 AM";
  let closeTimeStr = "9 PM";

  if (day === 5) {
    // Friday
    openMinutes = 540;
    closeMinutes = 1290;
    closeTimeStr = "9:30 PM";
  } else if (day === 0 || day === 6) {
    // Weekend
    openMinutes = 510; // 08:30 AM
    closeMinutes = 1290;
    openTimeStr = "8:30 AM";
    closeTimeStr = "9:30 PM";
  }

  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

  return {
    isOpen,
    openTimeStr,
    closeTimeStr,
  };
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopStatus, setShopStatus] = useState(getShopStatus);

  useEffect(() => {
    setShopStatus(getShopStatus());
    const interval = setInterval(() => {
      setShopStatus(getShopStatus());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#112119]/90 backdrop-blur-md border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo with Floating Open/Closed Tag */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded bg-[#d4b26f] flex items-center justify-center text-[#112119] shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
            <Scissors className="w-5 h-5 -rotate-45" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2.5">
              <span className="font-condensed text-2xl sm:text-3xl font-extrabold tracking-wider text-white group-hover:text-[#d4b26f] transition-colors">
                {siteConfig.name}
              </span>

              {/* Floating Status Tag Attached to URBANEDGE */}
              <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border shadow-lg backdrop-blur-md transition-all hover:scale-105 ${
                  shopStatus.isOpen
                    ? "bg-[#143323]/90 border-[#25D366]/50 text-[#25D366]"
                    : "bg-[#2b1d12]/90 border-[#e5a93c]/50 text-[#e5a93c]"
                }`}
                title={
                  shopStatus.isOpen
                    ? `URBANEDGE is Open Today until ${shopStatus.closeTimeStr}`
                    : `URBANEDGE is Closed. Reopens at ${shopStatus.openTimeStr}`
                }
              >
                <span className="relative flex h-2 w-2">
                  {shopStatus.isOpen && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
                  )}
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      shopStatus.isOpen ? "bg-[#25D366]" : "bg-[#e5a93c]"
                    }`}
                  />
                </span>
                <span>{shopStatus.isOpen ? "OPEN" : "CLOSED"}</span>
                <span className="hidden sm:inline text-white/50 text-[9px] font-normal">
                  • {shopStatus.isOpen ? `till ${shopStatus.closeTimeStr}` : `opens ${shopStatus.openTimeStr}`}
                </span>
              </div>
            </div>

            <span className="text-[10px] tracking-[0.25em] text-[#d4b26f] uppercase font-sans font-semibold -mt-1">
              Barber & Lounge
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold tracking-[0.2em] uppercase text-[#e1e5e2]">
          <a
            href="#services"
            className="hover:text-[#d4b26f] transition-colors py-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#d4b26f] hover:after:w-full after:transition-all"
          >
            Services
          </a>
          <a
            href="#barbers"
            className="hover:text-[#d4b26f] transition-colors py-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#d4b26f] hover:after:w-full after:transition-all"
          >
            Barbers
          </a>
          <a
            href="#about"
            className="hover:text-[#d4b26f] transition-colors py-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#d4b26f] hover:after:w-full after:transition-all"
          >
            About
          </a>
          <a
            href="#gallery"
            className="hover:text-[#d4b26f] transition-colors py-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#d4b26f] hover:after:w-full after:transition-all"
          >
            Gallery
          </a>
          <a
            href="#contact"
            className="hover:text-[#d4b26f] transition-colors py-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#d4b26f] hover:after:w-full after:transition-all"
          >
            Contact
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
            className="hidden lg:flex items-center gap-2 text-xs font-semibold tracking-wider text-[#d4b26f] hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{siteConfig.phone}</span>
          </a>

          <Link
            href="/book"
            className="px-6 py-2.5 bg-[#c8b28d] hover:bg-[#d8c3a0] text-[#112119] font-condensed font-bold text-sm tracking-wider uppercase transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href="/book"
            className="px-3.5 py-1.5 bg-[#c8b28d] text-[#112119] font-condensed font-bold text-xs tracking-wider uppercase"
          >
            Book
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-[#d4b26f] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d1a14] border-b border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          {/* Shop Status Indicator in Mobile Menu */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs text-[#8ca395] font-mono uppercase">Live Status:</span>
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase border ${
                shopStatus.isOpen
                  ? "bg-[#143323] border-[#25D366]/40 text-[#25D366]"
                  : "bg-[#2b1d12] border-[#e5a93c]/40 text-[#e5a93c]"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${shopStatus.isOpen ? "bg-[#25D366]" : "bg-[#e5a93c]"}`} />
              <span>{shopStatus.isOpen ? "OPEN NOW" : "CLOSED NOW"}</span>
            </div>
          </div>

          <nav className="flex flex-col space-y-4 text-sm font-semibold tracking-widest uppercase text-white/90">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d4b26f] py-1 border-b border-white/5"
            >
              Services & Pricing
            </a>
            <a
              href="#barbers"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d4b26f] py-1 border-b border-white/5"
            >
              Our Master Barbers
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d4b26f] py-1 border-b border-white/5"
            >
              About The Shop
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d4b26f] py-1 border-b border-white/5"
            >
              Craft Gallery
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d4b26f] py-1 border-b border-white/5"
            >
              Hours & Location
            </a>
          </nav>

          <div className="pt-4 flex flex-col gap-3">
            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 bg-[#c8b28d] text-[#112119] font-condensed font-bold text-base tracking-wider uppercase"
            >
              Book Your Appointment (₹50)
            </Link>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2.5 border border-[#25D366] text-[#25D366] font-semibold text-xs tracking-wider uppercase hover:bg-[#25D366] hover:text-white transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
