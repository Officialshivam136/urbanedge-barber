"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Scissors,
  Calendar,
  Clock,
  User,
  Phone,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RefreshCw,
  Search,
  MessageCircle,
  ArrowLeft,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Booking, BookingStatus } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

export default function AdminDashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      if (data.success && data.bookings) {
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error("Failed to load admin bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdateStatus = (ref: string, newStatus: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.referenceNumber === ref ? { ...b, status: newStatus } : b))
    );
  };

  // Filtered List
  const filtered = bookings.filter((b) => {
    const matchesSearch =
      b.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customerPhone.includes(searchQuery) ||
      b.barberName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === "ALL" || b.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Analytics Metrics
  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter((b) => b.status === "CONFIRMED").length;
  const tokensCollected = confirmedBookings * siteConfig.bookingAmountInr;
  const projectedRevenue = bookings.reduce(
    (acc, b) => (b.status === "CONFIRMED" || b.status === "COMPLETED" ? acc + b.servicePrice : acc),
    0
  );

  return (
    <main className="min-h-screen bg-[#0e1a14] text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#d4b26f]">
                Live Concierge Terminal
              </span>
            </div>
            <h1 className="font-condensed text-4xl sm:text-5xl font-bold uppercase tracking-tight text-white">
              Shop Bookings & Front Desk
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchBookings}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#172b21] hover:bg-[#213b2e] border border-white/10 text-white text-xs font-mono uppercase tracking-wider rounded-sm transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
            <Link
              href="/book"
              className="px-5 py-2 bg-[#c8b28d] text-[#112119] font-condensed font-bold text-sm uppercase tracking-wider shadow-md hover:bg-[#d8c3a0] transition-colors"
            >
              + New Walk-In / Slot
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#14261e] border border-white/10 p-5 rounded-sm">
            <span className="text-xs text-[#8ca195] font-mono uppercase">Total Reservations</span>
            <div className="font-condensed text-3xl font-extrabold text-white mt-1">
              {totalBookings}
            </div>
          </div>

          <div className="bg-[#14261e] border border-white/10 p-5 rounded-sm">
            <span className="text-xs text-[#8ca195] font-mono uppercase">Confirmed Chairs</span>
            <div className="font-condensed text-3xl font-extrabold text-[#25D366] mt-1">
              {confirmedBookings}
            </div>
          </div>

          <div className="bg-[#14261e] border border-white/10 p-5 rounded-sm">
            <span className="text-xs text-[#8ca195] font-mono uppercase">₹50 Tokens Collected</span>
            <div className="font-condensed text-3xl font-extrabold text-[#d4b26f] mt-1">
              {formatPrice(tokensCollected)}
            </div>
          </div>

          <div className="bg-[#14261e] border border-white/10 p-5 rounded-sm">
            <span className="text-xs text-[#8ca195] font-mono uppercase">Projected Salon Revenue</span>
            <div className="font-condensed text-3xl font-extrabold text-white mt-1">
              {formatPrice(projectedRevenue)}
            </div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-[#14261e] border border-white/10 p-4 rounded-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#8ba093] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reference, customer or barber..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0d1813] border border-white/10 rounded-sm pl-9 pr-4 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#d4b26f]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {["ALL", "CONFIRMED", "PENDING_PAYMENT", "COMPLETED", "NO_SHOW", "CANCELLED"].map(
              (st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider rounded-sm transition-colors ${
                    filterStatus === st
                      ? "bg-[#c8b28d] text-[#112119] font-bold"
                      : "bg-[#0d1813] text-[#8ca195] hover:text-white"
                  }`}
                >
                  {st.replace("_", " ")}
                </button>
              )
            )}
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-[#14261e] border border-white/10 rounded-sm overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#101e18] text-[#8ca195] font-mono uppercase tracking-wider border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">Ref & Customer</th>
                  <th className="py-3 px-4">Service & Fee</th>
                  <th className="py-3 px-4">Barber</th>
                  <th className="py-3 px-4">Date & Slot</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#8ca195] font-mono">
                      No matching appointments found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((b) => (
                    <tr key={b.referenceNumber} className="hover:bg-[#182c23] transition-colors">
                      <td className="py-3.5 px-4">
                        <Link
                          href={`/booking/${b.referenceNumber}`}
                          className="font-mono font-bold text-[#d4b26f] hover:underline block"
                        >
                          {b.referenceNumber}
                        </Link>
                        <span className="font-semibold text-white text-sm block">
                          {b.customerName}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#8ea396]">
                          <span>{b.customerPhone}</span>
                          <a
                            href={`https://wa.me/${b.customerPhone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#25D366] hover:underline flex items-center gap-0.5"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>WA</span>
                          </a>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-medium text-white block">{b.serviceName}</span>
                        <div className="flex items-center gap-2 font-mono text-[#edd8aa] mt-0.5">
                          <span>Total: {formatPrice(b.servicePrice)}</span>
                          <span className="text-[#8ca195]">
                            (Token: {formatPrice(b.bookingAmountPaid)})
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-medium text-white">
                        {b.barberName}
                      </td>

                      <td className="py-3.5 px-4 font-mono">
                        <span className="text-white block">{b.date}</span>
                        <span className="text-[#d4b26f]">{b.timeSlot}</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase ${
                            b.status === "CONFIRMED"
                              ? "bg-green-900/40 text-green-300 border border-green-500/30"
                              : b.status === "COMPLETED"
                              ? "bg-blue-900/40 text-blue-300 border border-blue-500/30"
                              : b.status === "NO_SHOW"
                              ? "bg-red-900/40 text-red-300 border border-red-500/30"
                              : "bg-yellow-900/40 text-yellow-300 border border-yellow-500/30"
                          }`}
                        >
                          {b.status.replace("_", " ")}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {b.status !== "COMPLETED" && (
                            <button
                              onClick={() => handleUpdateStatus(b.referenceNumber, "COMPLETED")}
                              className="px-2 py-1 bg-green-800/40 hover:bg-green-700/60 text-green-200 rounded text-[11px] font-medium"
                              title="Mark Completed"
                            >
                              Done
                            </button>
                          )}
                          {b.status !== "NO_SHOW" && (
                            <button
                              onClick={() => handleUpdateStatus(b.referenceNumber, "NO_SHOW")}
                              className="px-2 py-1 bg-red-800/40 hover:bg-red-700/60 text-red-200 rounded text-[11px] font-medium"
                              title="Mark No Show"
                            >
                              No-Show
                            </button>
                          )}
                          <Link
                            href={`/booking/${b.referenceNumber}`}
                            className="px-2 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-[11px]"
                          >
                            Pass
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
