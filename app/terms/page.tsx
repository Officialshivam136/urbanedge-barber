import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#112119] text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <span className="text-xs font-bold tracking-[0.25em] text-[#d4b26f] uppercase font-sans">
          Legal Agreement
        </span>
        <h1 className="font-condensed text-4xl sm:text-5xl font-bold uppercase tracking-tight text-white mt-1 mb-8">
          Terms of Service
        </h1>

        <div className="prose prose-invert max-w-none space-y-6 text-sm text-[#c5d4cd] leading-relaxed">
          <p>
            Welcome to {siteConfig.legalName} (&ldquo;{siteConfig.name}&rdquo;). By accessing our website, booking an appointment, or utilizing our grooming services at {siteConfig.address.full}, you agree to comply with and be bound by the following terms and conditions.
          </p>

          <h2 className="font-condensed text-2xl font-bold uppercase text-white tracking-wide pt-4">
            1. Appointment Reservations & Booking Token
          </h2>
          <p>
            To eliminate unnecessary waiting times and respect the dedicated schedules of our master barbers, online reservations require a non-refundable booking token of ₹{siteConfig.bookingAmountInr} per slot. This entire token is credited towards your final service bill at the shop.
          </p>

          <h2 className="font-condensed text-2xl font-bold uppercase text-white tracking-wide pt-4">
            2. Punctuality & Grace Period
          </h2>
          <p>
            We allocate uninterrupted appointment windows for every client. If you arrive more than 15 minutes past your booked time without prior notice, we reserve the right to release your reserved chair to waiting patrons to avoid disrupting subsequent clients.
          </p>

          <h2 className="font-condensed text-2xl font-bold uppercase text-white tracking-wide pt-4">
            3. Student Privileges
          </h2>
          <p>
            The 20% Student Discount applies strictly Monday through Thursday on standard haircut services. Patrons claiming this rate must present a valid, unexpired school or college photo ID card at the reception counter before billing.
          </p>

          <h2 className="font-condensed text-2xl font-bold uppercase text-white tracking-wide pt-4">
            4. GST & Billing Compliance
          </h2>
          <p>
            All services rendered are inclusive of applicable Goods and Services Tax (GST). Our registered GSTIN is {siteConfig.gstin}. A formal tax invoice will be provided upon settlement of the remaining balance at our counter.
          </p>

          <h2 className="font-condensed text-2xl font-bold uppercase text-white tracking-wide pt-4">
            5. Contact Information
          </h2>
          <p>
            For any inquiries or clarifications, reach our concierge at {siteConfig.email} or call {siteConfig.phone}.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
