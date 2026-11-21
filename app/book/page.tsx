"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Scissors,
  Calendar,
  Clock,
  User,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  CreditCard,
  Sparkles,
  Info,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { services, barbers } from "@/lib/data";
import { siteConfig } from "@/lib/site";
import { formatPrice, generateWhatsAppBookingUrl, getAvailableSlots } from "@/lib/utils";
import { saveBooking } from "@/lib/storage";
import { Booking } from "@/lib/types";

function BookingWizard() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Query parameter presets
  const initialServiceId = searchParams.get("service") || services[0].id;
  const initialBarberId = searchParams.get("barber") || "any";

  const [step, setStep] = useState<number>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServiceId);
  const [selectedBarberId, setSelectedBarberId] = useState<string>(initialBarberId);
  
  // Date selection (next 7 days)
  const today = new Date();
  const availableDates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    return {
      dateString: d.toISOString().split("T")[0],
      dayName: d.toLocaleDateString("en-US", { weekday: "short" }),
      dayNumber: d.getDate(),
      month: d.toLocaleDateString("en-US", { month: "short" }),
      isToday: i === 0,
      isMonThu: [1, 2, 3, 4].includes(d.getDay()), // Mon=1, Thu=4
    };
  });

  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0].dateString);
  const [selectedSlot, setSelectedSlot] = useState<string>("11:00 AM");

  // Form Details
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [isStudent, setIsStudent] = useState<boolean>(false);

  // Loading & Error States
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync state if query params change
  useEffect(() => {
    const sId = searchParams.get("service");
    if (sId && services.some((s) => s.id === sId)) {
      setSelectedServiceId(sId);
      if (sId === "student-cut") {
        setIsStudent(true);
      }
    }
    const bId = searchParams.get("barber");
    if (bId && (bId === "any" || barbers.some((b) => b.id === bId))) {
      setSelectedBarberId(bId);
    }
  }, [searchParams]);

  // Derived objects
  const selectedService = services.find((s) => s.id === selectedServiceId) || services[0];
  const selectedBarber =
    selectedBarberId === "any"
      ? { id: "any", name: "First Available Master Barber", title: "Assigned upon arrival", image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=400&q=80" }
      : barbers.find((b) => b.id === selectedBarberId) || barbers[0];

  // Pricing calculations
  const rawPrice = selectedService.price;
  const isStudentDiscountActive = isStudent && selectedService.studentDiscountEligible;
  const discountAmount = isStudentDiscountActive ? Math.round(rawPrice * 0.2) : 0;
  const finalServicePrice = rawPrice - discountAmount;
  const bookingTokenAmount = siteConfig.bookingAmountInr; // ₹50
  const balanceAtShop = Math.max(0, finalServicePrice - bookingTokenAmount);

  // Slots for chosen date
  const timeSlots = getAvailableSlots(selectedDate);

  // Step 4 Validation
  const canProceedToPayment = name.trim().length >= 2 && phone.trim().length >= 10;

  // Handle WhatsApp Reservation
  const handleWhatsAppBooking = async () => {
    if (!canProceedToPayment) {
      setErrorMessage("Please enter your name and valid 10-digit phone number.");
      return;
    }
    setSubmitting(true);
    setErrorMessage(null);

    try {
      const ref = `UE-${selectedDate.replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newBooking: Booking = {
        id: `book_${Date.now()}`,
        referenceNumber: ref,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        servicePrice: finalServicePrice,
        barberId: selectedBarber.id,
        barberName: selectedBarber.name,
        date: selectedDate,
        timeSlot: selectedSlot,
        customerName: name,
        customerPhone: phone,
        customerEmail: email,
        isStudentDiscount: !!isStudentDiscountActive,
        notes,
        bookingAmountPaid: bookingTokenAmount,
        balanceDueAtShop: balanceAtShop,
        status: "CONFIRMED",
        paymentMethod: "WHATSAPP_CONFIRMED",
        createdAt: new Date().toISOString(),
      };

      saveBooking(newBooking);

      const waUrl = generateWhatsAppBookingUrl({
        referenceNumber: ref,
        serviceName: selectedService.name,
        barberName: selectedBarber.name,
        date: selectedDate,
        timeSlot: selectedSlot,
        customerName: name,
        customerPhone: phone,
        isStudent: isStudentDiscountActive,
      });

      window.open(waUrl, "_blank");
      router.push(`/booking/?ref=${ref}`);
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong. Please check your connection.");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Online ₹50 Token Payment (Razorpay simulation or test mode)
  const handleOnlinePayment = async () => {
    if (!canProceedToPayment) {
      setErrorMessage("Please enter your name and valid 10-digit phone number.");
      return;
    }
    setSubmitting(true);
    setErrorMessage(null);

    try {
      const ref = `UE-${selectedDate.replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newBooking: Booking = {
        id: `book_${Date.now()}`,
        referenceNumber: ref,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        servicePrice: finalServicePrice,
        barberId: selectedBarber.id,
        barberName: selectedBarber.name,
        date: selectedDate,
        timeSlot: selectedSlot,
        customerName: name,
        customerPhone: phone,
        customerEmail: email,
        isStudentDiscount: !!isStudentDiscountActive,
        notes,
        bookingAmountPaid: bookingTokenAmount,
        balanceDueAtShop: balanceAtShop,
        status: "CONFIRMED",
        paymentMethod: "RAZORPAY",
        paymentId: `pay_rzp_${Date.now()}`,
        orderId: `order_rzp_${Date.now()}`,
        createdAt: new Date().toISOString(),
      };

      saveBooking(newBooking);
      router.push(`/booking/?ref=${ref}&paid=true`);
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : "Payment failed. Please try WhatsApp booking.";
      setErrorMessage(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Title & Stepper */}
      <div className="mb-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#a4b8ad] hover:text-[#d4b26f] uppercase mb-4 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-condensed text-4xl sm:text-5xl font-bold uppercase tracking-tight text-white">
              Reserve Your Seat
            </h1>
            <p className="text-sm text-[#9ab0a3] font-sans mt-1">
              Fixed ₹50 reservation token · Deducted from your final bill at the shop
            </p>
          </div>

          {/* Stepper Indicator */}
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-condensed font-bold text-sm transition-all ${
                    step === s
                      ? "bg-[#d4b26f] text-[#112119] ring-4 ring-[#d4b26f]/20"
                      : step > s
                      ? "bg-[#253f32] text-[#d4b26f]"
                      : "bg-[#17271f] text-[#6b7e73]"
                  }`}
                >
                  {step > s ? "✓" : s}
                </div>
                {s < 4 && (
                  <div
                    className={`w-6 sm:w-10 h-[2px] mx-1 ${
                      step > s ? "bg-[#d4b26f]" : "bg-white/10"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Wizard Content & Sticky Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Step Content */}
        <div className="lg:col-span-8 bg-[#14261e] border border-white/10 p-6 sm:p-8 rounded-sm shadow-xl">
          {/* STEP 1: SELECT SERVICE */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold tracking-[0.25em] text-[#d4b26f] uppercase font-sans">
                  Step 1 of 4
                </span>
                <h2 className="font-condensed text-3xl font-bold uppercase text-white tracking-wide mt-1">
                  Select Your Grooming Service
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((service) => {
                  const isSelected = service.id === selectedServiceId;
                  return (
                    <div
                      key={service.id}
                      onClick={() => setSelectedServiceId(service.id)}
                      className={`cursor-pointer p-5 border rounded-sm transition-all relative flex flex-col justify-between ${
                        isSelected
                          ? "bg-[#1c362a] border-[#d4b26f] shadow-lg ring-1 ring-[#d4b26f]"
                          : "bg-[#101d17] border-white/10 hover:border-white/30"
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-condensed text-xl font-bold uppercase text-white">
                            {service.name}
                          </h3>
                          <span className="font-condensed text-xl font-extrabold text-[#d4b26f]">
                            {formatPrice(service.price)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-[#8ca395] font-mono">
                          <Clock className="w-3.5 h-3.5 text-[#d4b26f]" />
                          <span>{service.durationMinutes} Mins</span>
                          {service.studentDiscountEligible && (
                            <span className="text-[#edd8aa] bg-black/40 px-1.5 py-0.5 rounded text-[10px]">
                              Student 20%
                            </span>
                          )}
                        </div>
                        <p className="mt-3 text-xs text-[#a9bcaf] font-sans line-clamp-2">
                          {service.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                        <span className="text-[#849a8c]">
                          {isSelected ? "Selected" : "Click to select"}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? "border-[#d4b26f] bg-[#d4b26f] text-[#112119]"
                              : "border-white/30"
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#c8b28d] hover:bg-[#d8c3a0] text-[#112119] font-condensed font-bold text-base tracking-wider uppercase transition-all shadow-md"
                >
                  <span>Continue to Barber</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SELECT BARBER */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold tracking-[0.25em] text-[#d4b26f] uppercase font-sans">
                  Step 2 of 4
                </span>
                <h2 className="font-condensed text-3xl font-bold uppercase text-white tracking-wide mt-1">
                  Choose Your Craftsman
                </h2>
              </div>

              {/* Any Barber Option */}
              <div
                onClick={() => setSelectedBarberId("any")}
                className={`cursor-pointer p-4 border rounded-sm transition-all flex items-center justify-between ${
                  selectedBarberId === "any"
                    ? "bg-[#1c362a] border-[#d4b26f] ring-1 ring-[#d4b26f]"
                    : "bg-[#101d17] border-white/10 hover:border-white/30"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#20372b] flex items-center justify-center text-[#d4b26f]">
                    <Scissors className="w-6 h-6 -rotate-45" />
                  </div>
                  <div>
                    <h4 className="font-condensed text-lg font-bold uppercase text-white">
                      First Available Master Barber
                    </h4>
                    <p className="text-xs text-[#9bb0a3] font-sans">
                      Quickest chair availability · Guaranteed master craftsmanship
                    </p>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    selectedBarberId === "any"
                      ? "border-[#d4b26f] bg-[#d4b26f] text-[#112119]"
                      : "border-white/30"
                  }`}
                >
                  {selectedBarberId === "any" && <CheckCircle2 className="w-4 h-4" />}
                </div>
              </div>

              {/* Individual Barbers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {barbers.map((barber) => {
                  const isSelected = selectedBarberId === barber.id;
                  return (
                    <div
                      key={barber.id}
                      onClick={() => setSelectedBarberId(barber.id)}
                      className={`cursor-pointer border rounded-sm overflow-hidden transition-all flex flex-col justify-between ${
                        isSelected
                          ? "bg-[#1c362a] border-[#d4b26f] ring-1 ring-[#d4b26f]"
                          : "bg-[#101d17] border-white/10 hover:border-white/30"
                      }`}
                    >
                      <div className="relative h-48 w-full bg-black/40">
                        <Image
                          src={barber.image}
                          alt={barber.name}
                          fill
                          sizes="(max-width: 640px) 100vw, 30vw"
                          className="object-cover object-center filter grayscale contrast-[1.1]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-xs text-white">
                          <span className="font-semibold">{barber.experience}</span>
                          <span className="text-[#d4b26f] font-mono">★ {barber.rating}</span>
                        </div>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-condensed text-lg font-bold uppercase text-white">
                            {barber.name}
                          </h4>
                          <p className="text-xs text-[#d4b26f] font-semibold uppercase">
                            {barber.badge || barber.title}
                          </p>
                          <p className="text-[11px] text-[#9bb0a3] mt-1 font-mono line-clamp-1">
                            {barber.specialty}
                          </p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                          <span className="text-[#849a8c]">
                            {isSelected ? "Selected" : "Select"}
                          </span>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected
                                ? "border-[#d4b26f] bg-[#d4b26f] text-[#112119]"
                                : "border-white/30"
                            }`}
                          >
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white hover:border-[#d4b26f] font-condensed uppercase tracking-wider text-sm transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Services</span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#c8b28d] hover:bg-[#d8c3a0] text-[#112119] font-condensed font-bold text-base tracking-wider uppercase transition-all shadow-md"
                >
                  <span>Select Date & Slot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SELECT DATE & TIME SLOT */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold tracking-[0.25em] text-[#d4b26f] uppercase font-sans">
                  Step 3 of 4
                </span>
                <h2 className="font-condensed text-3xl font-bold uppercase text-white tracking-wide mt-1">
                  Choose Appointment Time
                </h2>
              </div>

              {/* 7-Day Date Carousel */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#8da396] mb-3">
                  Select Date
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {availableDates.map((d) => {
                    const isSelected = d.dateString === selectedDate;
                    return (
                      <button
                        key={d.dateString}
                        onClick={() => setSelectedDate(d.dateString)}
                        className={`p-3 rounded-sm border flex flex-col items-center justify-center transition-all ${
                          isSelected
                            ? "bg-[#c8b28d] border-[#c8b28d] text-[#112119] font-bold shadow-lg"
                            : "bg-[#101d17] border-white/10 text-white hover:border-white/30"
                        }`}
                      >
                        <span className="text-[11px] font-mono uppercase tracking-wider">
                          {d.dayName}
                        </span>
                        <span className="font-condensed text-2xl font-bold my-0.5">
                          {d.dayNumber}
                        </span>
                        <span className="text-[10px] tracking-wider uppercase">
                          {d.month}
                        </span>
                        {d.isMonThu && (
                          <span
                            className={`text-[9px] mt-1 px-1 rounded ${
                              isSelected
                                ? "bg-[#112119] text-[#edd8aa]"
                                : "bg-[#d4b26f]/20 text-[#edd8aa]"
                            }`}
                          >
                            20% Off
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots Grid */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#8da396]">
                    Available Time Slots for {selectedDate}
                  </label>
                  <span className="text-xs text-[#d4b26f] font-mono">
                    30-min buffer between rituals
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 max-h-64 overflow-y-auto pr-1">
                  {timeSlots.map((slot) => {
                    const isSelected = slot === selectedSlot;
                    return (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2.5 px-2 text-center rounded-sm border text-xs font-mono font-semibold transition-all ${
                          isSelected
                            ? "bg-[#d4b26f] text-[#112119] border-[#d4b26f] shadow-md"
                            : "bg-[#101d17] border-white/10 text-white/90 hover:border-[#d4b26f]/60 hover:text-white"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white hover:border-[#d4b26f] font-condensed uppercase tracking-wider text-sm transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Barber</span>
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#c8b28d] hover:bg-[#d8c3a0] text-[#112119] font-condensed font-bold text-base tracking-wider uppercase transition-all shadow-md"
                >
                  <span>Customer Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: CUSTOMER DETAILS & PAYMENT CONFIRMATION */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold tracking-[0.25em] text-[#d4b26f] uppercase font-sans">
                  Step 4 of 4
                </span>
                <h2 className="font-condensed text-3xl font-bold uppercase text-white tracking-wide mt-1">
                  Confirm & Settle ₹50 Token
                </h2>
                <p className="text-sm text-[#9db2a5] font-sans mt-1">
                  The ₹50 reservation token guarantees your chair and is deducted from your final bill.
                </p>
              </div>

              {errorMessage && (
                <div className="p-4 bg-red-900/30 border border-red-500/50 rounded text-red-200 text-sm">
                  {errorMessage}
                </div>
              )}

              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#8da396] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Malhotra"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#101d17] border border-white/10 rounded-sm px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#d4b26f]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#8da396] mb-1.5">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9568423360"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#101d17] border border-white/10 rounded-sm px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#d4b26f]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#8da396] mb-1.5">
                    Email Address (For Instant GST Receipt)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. vikram@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#101d17] border border-white/10 rounded-sm px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#d4b26f]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#8da396] mb-1.5">
                    Barber Notes / Styling Preference (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Low skin fade, keeping beard length, sensitive neck skin"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#101d17] border border-white/10 rounded-sm px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#d4b26f]"
                  />
                </div>
              </div>

              {/* Student Discount Checkbox */}
              {selectedService.studentDiscountEligible && (
                <div className="p-4 bg-[#182c22] border border-[#d4b26f]/30 rounded-sm flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="studentCheck"
                    checked={isStudent}
                    onChange={(e) => setIsStudent(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-[#d4b26f] focus:ring-[#d4b26f]"
                  />
                  <label htmlFor="studentCheck" className="text-xs text-[#c8d8ce] cursor-pointer">
                    <span className="font-bold text-white block">
                      Apply Student 20% Discount (Mon – Thu)
                    </span>
                    <span>
                      I will present my valid college / school photo ID card during checkout at the shop.
                    </span>
                  </label>
                </div>
              )}

              {/* Dual Confirmation Options */}
              <div className="pt-4 border-t border-white/10 space-y-4">
                <span className="block text-xs uppercase tracking-wider font-semibold text-[#8da396]">
                  Select Confirmation Mode
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Mode A: Online ₹50 Payment */}
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={handleOnlinePayment}
                    className="p-5 bg-[#c8b28d] hover:bg-[#d8c3a0] text-[#112119] rounded-sm flex flex-col justify-between text-left transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <CreditCard className="w-6 h-6" />
                        <span className="font-condensed font-bold text-lg">₹50 TOKEN</span>
                      </div>
                      <h4 className="font-condensed text-xl font-bold uppercase mt-2">
                        Pay ₹50 Online (Razorpay)
                      </h4>
                      <p className="text-xs text-[#35483e] font-sans mt-1">
                        Instant chair guarantee · UPI, Cards, NetBanking · Instant Receipt
                      </p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-[#112119]/20 flex items-center justify-between text-xs font-bold tracking-wider uppercase font-condensed">
                      <span>{submitting ? "Processing..." : "Pay ₹50 & Confirm"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Mode B: WhatsApp Concierge */}
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={handleWhatsAppBooking}
                    className="p-5 bg-[#172e22] hover:bg-[#1e3b2c] border border-[#25D366]/40 text-white rounded-sm flex flex-col justify-between text-left transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <MessageCircle className="w-6 h-6 text-[#25D366]" />
                        <span className="font-mono text-xs text-[#25D366] font-semibold">
                          CONCIERGE
                        </span>
                      </div>
                      <h4 className="font-condensed text-xl font-bold uppercase mt-2 text-white">
                        Book via WhatsApp
                      </h4>
                      <p className="text-xs text-[#a3b8ac] font-sans mt-1">
                        Prefilled summary sent directly to the shop concierge on WhatsApp.
                      </p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between text-xs font-bold tracking-wider uppercase font-condensed text-[#25D366]">
                      <span>{submitting ? "Reserving..." : "Send to WhatsApp"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 border border-white/20 text-white hover:border-[#d4b26f] font-condensed uppercase tracking-wider text-sm transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Slots</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sticky Summary Sidebar */}
        <div className="lg:col-span-4 bg-[#172b21] border border-white/10 p-6 rounded-sm shadow-xl sticky top-28 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="font-condensed text-xl font-bold uppercase text-white tracking-wide">
              Appointment Summary
            </h3>
            <span className="text-[10px] font-mono tracking-widest text-[#d4b26f] uppercase bg-black/40 px-2 py-0.5">
              Live
            </span>
          </div>

          {/* Service Details */}
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[#899f92] block uppercase tracking-wider">Service</span>
                <span className="font-bold text-white text-sm">{selectedService.name}</span>
                <span className="text-[#a4b8ad] block mt-0.5 font-mono">
                  {selectedService.durationMinutes} Minutes
                </span>
              </div>
              <span className="font-condensed text-lg font-bold text-white">
                {formatPrice(selectedService.price)}
              </span>
            </div>

            {/* Barber */}
            <div className="pt-2 border-t border-white/5 flex justify-between items-center">
              <div>
                <span className="text-[#899f92] block uppercase tracking-wider">Barber</span>
                <span className="font-bold text-white">{selectedBarber.name}</span>
              </div>
            </div>

            {/* Date & Time */}
            <div className="pt-2 border-t border-white/5 flex justify-between items-center">
              <div>
                <span className="text-[#899f92] block uppercase tracking-wider">Date & Slot</span>
                <span className="font-bold text-white">
                  {selectedDate} at {selectedSlot}
                </span>
              </div>
            </div>

            {/* Student Discount Item */}
            {isStudentDiscountActive && (
              <div className="pt-2 border-t border-white/5 flex justify-between items-center text-[#d4b26f]">
                <span>Student Discount (20%)</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}
          </div>

          {/* Pricing Ledger */}
          <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
            <div className="flex justify-between text-white/80">
              <span>Service Total:</span>
              <span>{formatPrice(finalServicePrice)}</span>
            </div>

            <div className="flex justify-between text-[#edd8aa] font-semibold">
              <span>Online Booking Token:</span>
              <span>{formatPrice(bookingTokenAmount)}</span>
            </div>

            <div className="flex justify-between text-white/60">
              <span>Balance payable at shop:</span>
              <span>{formatPrice(balanceAtShop)}</span>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-between items-center">
              <span className="font-condensed text-base font-bold text-white uppercase">
                Pay Today:
              </span>
              <span className="font-condensed text-2xl font-black text-[#d4b26f]">
                {formatPrice(bookingTokenAmount)}
              </span>
            </div>
          </div>

          {/* Guarantee info */}
          <div className="pt-4 border-t border-white/10 flex items-start gap-2.5 text-[11px] text-[#8ea396]">
            <ShieldCheck className="w-4 h-4 text-[#d4b26f] flex-shrink-0 mt-0.5" />
            <span>
              ₹50 is 100% refundable or adjustable if rescheduled 2 hours before the slot.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <main className="min-h-screen bg-[#112119] text-[#f3f4f1]">
      <Navbar />
      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <span className="text-[#d4b26f] font-mono">Loading reservation terminal...</span>
          </div>
        }
      >
        <BookingWizard />
      </Suspense>
      <Footer />
    </main>
  );
}
