"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Calendar,
  Clock,
  User,
  Scissors,
  Printer,
  MessageCircle,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Download,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Booking } from "@/lib/types";
import { siteConfig } from "@/lib/site";
import { formatPrice } from "@/lib/utils";

export default function BookingConfirmationPage({
  params,
}: {
  params: Promise<{ ref: string }>;
}) {
  const { ref } = use(params);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBooking() {
      try {
        const res = await fetch(`/api/bookings/${ref}`);
        const data = await res.json();
        if (data.success && data.booking) {
          setBooking(data.booking);
        } else {
          setError(data.error || "Reservation not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load booking details.");
      } finally {
        setLoading(false);
      }
    }

    fetchBooking();
  }, [ref]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#112119] text-white">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-32 text-center">
          <div className="inline-block w-8 h-8 border-2 border-[#d4b26f] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="font-mono text-sm text-[#9ab1a4]">Retrieving appointment receipt...</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !booking) {
    return (
      <main className="min-h-screen bg-[#112119] text-white">
        <Navbar />
        <div className="max-w-xl mx-auto px-4 py-28 text-center">
          <div className="p-8 bg-[#172b21] border border-white/10 rounded-sm">
            <h2 className="font-condensed text-3xl font-bold uppercase text-red-400">
              Reservation Not Found
            </h2>
            <p className="mt-2 text-sm text-[#9ab0a3] font-sans">
              We couldn&apos;t find an appointment matching reference &ldquo;{ref}&rdquo;. Please verify the link or check with the shop concierge.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Link
                href="/book"
                className="px-6 py-2.5 bg-[#c8b28d] text-[#112119] font-condensed font-bold uppercase text-sm"
              >
                Book An Appointment
              </Link>
              <Link
                href="/"
                className="px-6 py-2.5 border border-white/20 text-white font-condensed uppercase text-sm"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // Pre-fill WhatsApp check-in
  const waCheckInUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    `Hello URBANEDGE, checking in regarding my reservation #${booking.referenceNumber} for ${booking.customerName} on ${booking.date} at ${booking.timeSlot}.`
  )}`;

  return (
    <main className="min-h-screen bg-[#112119] text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Printable Pass Container */}
        <div className="bg-[#152820] border border-[#d4b26f]/40 rounded-sm shadow-2xl overflow-hidden print:bg-white print:text-black print:border-black">
          {/* Header Banner */}
          <div className="bg-[#1c362a] border-b border-white/10 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#d4b26f] text-[#112119] flex items-center justify-center flex-shrink-0 shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[11px] font-mono tracking-widest text-[#d4b26f] uppercase">
                  Appointment Confirmed
                </span>
                <h1 className="font-condensed text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                  Chair Reserved
                </h1>
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-white/10 sm:pl-6">
              <span className="text-xs text-[#8ca195] block font-mono">Reference Pass</span>
              <span className="font-mono text-xl sm:text-2xl font-bold text-[#edd8aa] tracking-wider">
                {booking.referenceNumber}
              </span>
            </div>
          </div>

          {/* Core Details */}
          <div className="p-6 sm:p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-white/10">
              {/* Service & Barber */}
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#8da396]">
                    Service Reserved
                  </span>
                  <h3 className="font-condensed text-2xl font-bold uppercase text-white mt-0.5">
                    {booking.serviceName}
                  </h3>
                  {booking.isStudentDiscount && (
                    <span className="inline-block mt-1 text-xs text-[#d4b26f] bg-[#d4b26f]/10 px-2 py-0.5 rounded">
                      20% Student Discount Applied
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#8da396]">
                    Master Barber
                  </span>
                  <p className="font-condensed text-xl font-bold uppercase text-[#edd8aa] mt-0.5">
                    {booking.barberName}
                  </p>
                </div>
              </div>

              {/* Time & Client */}
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#8da396]">
                    Date & Arrival Slot
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-[#d4b26f]" />
                    <span className="font-semibold text-white">{booking.date}</span>
                    <span className="text-[#8da396]">•</span>
                    <Clock className="w-4 h-4 text-[#d4b26f]" />
                    <span className="font-mono font-bold text-[#d4b26f]">{booking.timeSlot}</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#8da396]">
                    Client Details
                  </span>
                  <p className="font-medium text-white text-sm mt-0.5">
                    {booking.customerName} ({booking.customerPhone})
                  </p>
                  {booking.customerEmail && (
                    <p className="text-xs text-[#8da396] font-mono">{booking.customerEmail}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Financial Ledger & Receipt */}
            <div className="bg-[#101e17] border border-white/5 p-6 rounded-sm">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[#d4b26f]">
                  Financial Breakdown
                </span>
                <span className="text-xs text-[#8ba093] font-mono">
                  GSTIN: {siteConfig.gstin}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[#c4d4cc]">
                  <span>Total Service Fee:</span>
                  <span>{formatPrice(booking.servicePrice)}</span>
                </div>

                <div className="flex justify-between text-[#d4b26f] font-semibold">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Booking Amount Settled (Online Token):</span>
                  </span>
                  <span>-{formatPrice(booking.bookingAmountPaid)}</span>
                </div>

                <div className="flex justify-between text-white font-bold text-base pt-3 border-t border-white/10">
                  <span>Balance Payable at Salon Counter:</span>
                  <span className="text-[#edd8aa] font-condensed text-xl">
                    {formatPrice(booking.balanceDueAtShop)}
                  </span>
                </div>
              </div>
            </div>

            {/* Shop Venue & Instructions */}
            <div className="flex flex-col sm:flex-row items-start justify-between gap-6 pt-4 text-xs text-[#9eb2a6]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#d4b26f] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">UrbanEdge Indiranagar</span>
                  <span>{siteConfig.address.full}</span>
                  <span className="text-[#81968a] block mt-0.5">
                    Please arrive 5–10 minutes early to enjoy a complimentary beverage.
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[#d4b26f]">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>Chair held for 15 mins from booked slot time.</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="bg-[#0f1d17] border-t border-white/10 p-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={waCheckInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-black font-condensed font-bold text-sm tracking-wider uppercase transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open in WhatsApp</span>
              </a>

              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 hover:border-[#d4b26f] text-white hover:text-[#d4b26f] font-condensed font-bold text-sm tracking-wider uppercase transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print Pass / Receipt</span>
              </button>
            </div>

            <Link
              href="/book"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#d4b26f] hover:text-white uppercase"
            >
              <span>Book Another Seat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
