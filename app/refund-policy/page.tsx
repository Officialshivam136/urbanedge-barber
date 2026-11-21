import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site";

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-[#112119] text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <span className="text-xs font-bold tracking-[0.25em] text-[#d4b26f] uppercase font-sans">
          Transparency & Trust
        </span>
        <h1 className="font-condensed text-4xl sm:text-5xl font-bold uppercase tracking-tight text-white mt-1 mb-8">
          Booking Token & Refund Policy
        </h1>

        <div className="prose prose-invert max-w-none space-y-6 text-sm text-[#c5d4cd] leading-relaxed">
          <p>
            At {siteConfig.name}, we believe in complete fairness and respect for our clients&apos; time and our craftsmen&apos;s schedules.
          </p>

          <h2 className="font-condensed text-2xl font-bold uppercase text-white tracking-wide pt-4">
            1. The ₹50 Reservation Token
          </h2>
          <p>
            A nominal booking amount of ₹{siteConfig.bookingAmountInr} is collected at the time of reserving a slot online. This is not an extra charge; it is an advance token that is deducted in full from the final price of your service when you pay at the salon counter.
          </p>

          <h2 className="font-condensed text-2xl font-bold uppercase text-white tracking-wide pt-4">
            2. Rescheduling Policy
          </h2>
          <p>
            Life happens! You may reschedule your appointment free of charge up to <strong>2 hours prior</strong> to your scheduled time slot. You can do this by messaging our WhatsApp concierge at {siteConfig.phone} with your reference number. Your ₹{siteConfig.bookingAmountInr} token will automatically transfer to your new date and time.
          </p>

          <h2 className="font-condensed text-2xl font-bold uppercase text-white tracking-wide pt-4">
            3. Cancellations & Refunds
          </h2>
          <p>
            If you cancel your appointment at least 2 hours before the booked time, your ₹{siteConfig.bookingAmountInr} booking token is eligible for a 100% refund processed back to your original payment method within 5–7 banking days, or you may choose to convert it into a store credit coupon valid indefinitely.
          </p>

          <h2 className="font-condensed text-2xl font-bold uppercase text-white tracking-wide pt-4">
            4. No-Shows & Late Cancellations
          </h2>
          <p>
            If a client fails to attend the scheduled appointment without prior notice (&ldquo;No-Show&rdquo;) or cancels with less than 2 hours notice, the ₹{siteConfig.bookingAmountInr} booking token is forfeited to compensate the allocated barber for reserved chair time.
          </p>

          <h2 className="font-condensed text-2xl font-bold uppercase text-white tracking-wide pt-4">
            5. Discrepancy & Assistance
          </h2>
          <p>
            If you experienced an accidental double payment or a deduction during an aborted checkout, please send a screenshot of the transaction ID to our concierge at {siteConfig.email} or WhatsApp {siteConfig.phone}. We will rectify and refund the erroneous charge within 24 hours.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
