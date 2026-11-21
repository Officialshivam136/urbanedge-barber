import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#112119] text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <span className="text-xs font-bold tracking-[0.25em] text-[#d4b26f] uppercase font-sans">
          Data Protection
        </span>
        <h1 className="font-condensed text-4xl sm:text-5xl font-bold uppercase tracking-tight text-white mt-1 mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-invert max-w-none space-y-6 text-sm text-[#c5d4cd] leading-relaxed">
          <p>
            {siteConfig.legalName} (&ldquo;{siteConfig.name}&rdquo;) values your privacy and is dedicated to safeguarding the personal data you share when booking appointments or contacting our shop.
          </p>

          <h2 className="font-condensed text-2xl font-bold uppercase text-white tracking-wide pt-4">
            1. Information We Collect
          </h2>
          <p>
            When you reserve an appointment via our web portal or WhatsApp, we collect your name, contact phone number, optional email address for digital receipts, and any grooming preferences or notes you provide.
          </p>

          <h2 className="font-condensed text-2xl font-bold uppercase text-white tracking-wide pt-4">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>To hold your appointment chair with your chosen barber.</li>
            <li>To transmit appointment reminders, schedule confirmations, or invoice passes via WhatsApp or SMS.</li>
            <li>To customize grooming treatments based on past haircut preferences or notes.</li>
          </ul>

          <h2 className="font-condensed text-2xl font-bold uppercase text-white tracking-wide pt-4">
            3. Payment Data Security
          </h2>
          <p>
            We do not store or process payment card numbers or UPI PINs on our servers. Online booking token payments (₹50) are encrypted and processed through RBI-authorized payment aggregators (such as Razorpay) complying with PCI-DSS standards.
          </p>

          <h2 className="font-condensed text-2xl font-bold uppercase text-white tracking-wide pt-4">
            4. Data Retention & Third Parties
          </h2>
          <p>
            We never sell, rent, or trade your contact details with external advertising agencies. Your records are solely maintained for salon scheduling, customer relationship management, and tax compliance.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
