import { Booking } from "./types";
import { siteConfig } from "./site";

// In-memory store for development/demo (persists during server runtime)
const bookingsStore = new Map<string, Booking>();

// Preload a sample booking so the user can test the confirmation page immediately
const sampleRef = "UE-20261125-0412";
bookingsStore.set(sampleRef, {
  id: "booking_sample_01",
  referenceNumber: sampleRef,
  serviceId: "signature-haircut",
  serviceName: "Signature Haircut & Style",
  servicePrice: 450,
  barberId: "marcus-vance",
  barberName: "Marcus Vance",
  date: "2026-11-25",
  timeSlot: "11:30 AM",
  customerName: "Rohan Sharma",
  customerPhone: "+91 98765 12345",
  customerEmail: "rohan.sharma@example.com",
  isStudentDiscount: false,
  notes: "Prefers low skin fade and textured scissor top",
  bookingAmountPaid: siteConfig.bookingAmountInr,
  balanceDueAtShop: 450 - siteConfig.bookingAmountInr,
  status: "CONFIRMED",
  paymentMethod: "RAZORPAY",
  paymentId: "pay_sample_test_8392",
  orderId: "order_sample_test_1029",
  createdAt: new Date().toISOString(),
});

export function saveBooking(booking: Booking): Booking {
  bookingsStore.set(booking.referenceNumber, booking);
  return booking;
}

export function getBookingByReference(ref: string): Booking | undefined {
  return bookingsStore.get(ref);
}

export function updateBookingStatus(
  ref: string,
  status: Booking["status"],
  paymentDetails?: { paymentId?: string; orderId?: string }
): Booking | undefined {
  const existing = bookingsStore.get(ref);
  if (!existing) return undefined;

  const updated: Booking = {
    ...existing,
    status,
    ...(paymentDetails?.paymentId ? { paymentId: paymentDetails.paymentId } : {}),
    ...(paymentDetails?.orderId ? { orderId: paymentDetails.orderId } : {}),
  };

  bookingsStore.set(ref, updated);
  return updated;
}

export function getAllBookings(): Booking[] {
  return Array.from(bookingsStore.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
