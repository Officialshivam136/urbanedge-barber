import { NextResponse } from "next/server";
import { saveBooking, getAllBookings } from "@/lib/storage";
import { generateBookingReference } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { Booking } from "@/lib/types";
import {
  sanitizeString,
  isValidPhone,
  isValidBookingDate,
  resolveServerSideService,
  resolveServerSideBarber,
} from "@/lib/security";

export async function GET() {
  const bookings = getAllBookings();
  return NextResponse.json({ success: true, count: bookings.length, bookings });
}

export async function POST(request: Request) {
  try {
    // 1. Guard against oversized payloads (max 50KB)
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > 50000) {
      return NextResponse.json(
        { success: false, error: "Payload too large. Maximum allowed size is 50KB." },
        { status: 413 }
      );
    }

    const body = await request.json();

    const rawServiceId = sanitizeString(body.serviceId);
    const rawBarberId = sanitizeString(body.barberId);
    const date = sanitizeString(body.date);
    const timeSlot = sanitizeString(body.timeSlot);
    const customerName = sanitizeString(body.customerName);
    const customerPhone = sanitizeString(body.customerPhone);
    const customerEmail = sanitizeString(body.customerEmail);
    const notes = sanitizeString(body.notes);
    const isStudent = Boolean(body.isStudentDiscount);
    const paymentMethod = body.paymentMethod === "WHATSAPP_CONFIRMED" ? "WHATSAPP_CONFIRMED" : "RAZORPAY";

    // 2. Field Completeness Validation
    if (!rawServiceId || !rawBarberId || !date || !timeSlot || !customerName || !customerPhone) {
      return NextResponse.json(
        { success: false, error: "All required reservation fields must be provided." },
        { status: 400 }
      );
    }

    // 3. Name & Phone Validation
    if (customerName.length < 2 || customerName.length > 70) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid full name (2–70 characters)." },
        { status: 400 }
      );
    }

    if (!isValidPhone(customerPhone)) {
      return NextResponse.json(
        { success: false, error: "Invalid phone number. Please enter a valid 10-digit number." },
        { status: 400 }
      );
    }

    // 4. Date Validation (must not be past date)
    if (!isValidBookingDate(date)) {
      return NextResponse.json(
        { success: false, error: "Invalid booking date. You cannot book dates in the past." },
        { status: 400 }
      );
    }

    // 5. Server-Side Authoritative Price Resolution (NEVER trust client price)
    const resolvedService = resolveServerSideService(rawServiceId, isStudent);
    if (!resolvedService) {
      return NextResponse.json(
        { success: false, error: "Selected grooming service is invalid or unavailable." },
        { status: 400 }
      );
    }

    // 6. Server-Side Barber Verification
    const resolvedBarber = resolveServerSideBarber(rawBarberId);
    if (!resolvedBarber) {
      return NextResponse.json(
        { success: false, error: "Selected barber is invalid or unavailable." },
        { status: 400 }
      );
    }

    // 7. Calculate Financial Balance with Server Authority
    const ref = generateBookingReference();
    const effectivePrice = resolvedService.effectivePrice;
    const bookingToken = siteConfig.bookingAmountInr;
    const balanceDue = Math.max(0, effectivePrice - bookingToken);

    const newBooking: Booking = {
      id: `bk_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      referenceNumber: ref,
      serviceId: resolvedService.service.id,
      serviceName: resolvedService.service.name,
      servicePrice: effectivePrice,
      barberId: resolvedBarber.id,
      barberName: resolvedBarber.name,
      date,
      timeSlot,
      customerName,
      customerPhone,
      customerEmail: customerEmail.slice(0, 100),
      isStudentDiscount: resolvedService.isStudentEligible,
      notes: notes.slice(0, 300),
      bookingAmountPaid: bookingToken,
      balanceDueAtShop: balanceDue,
      status: paymentMethod === "WHATSAPP_CONFIRMED" ? "CONFIRMED" : "PENDING_PAYMENT",
      paymentMethod,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15-min hold
    };

    saveBooking(newBooking);

    return NextResponse.json({
      success: true,
      booking: newBooking,
    });
  } catch (error) {
    console.error("Secure booking creation error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error processing booking." },
      { status: 500 }
    );
  }
}
