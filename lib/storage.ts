import { Booking } from "./types";
import { siteConfig } from "./site";

// In-memory store for development/demo (persists during server runtime)
const bookingsStore = new Map<string, Booking>();

// Preload a sample booking so the user can test the confirmation page immediately
export const sampleRef = "UE-20261125-0412";
const sampleBooking: Booking = {
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
};

bookingsStore.set(sampleRef, sampleBooking);

const STORAGE_KEY = "urbanedge_bookings_store_v1";

function loadFromLocalStorage(): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const list: Booking[] = JSON.parse(raw);
      list.forEach((b) => bookingsStore.set(b.referenceNumber, b));
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([sampleBooking]));
    }
  } catch (e) {
    console.error("Failed to load bookings from localStorage", e);
  }
}

function syncToLocalStorage(): void {
  if (typeof window === "undefined") return;
  try {
    const list = Array.from(bookingsStore.values());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error("Failed to sync bookings to localStorage", e);
  }
}

export function saveBooking(booking: Booking): Booking {
  loadFromLocalStorage();
  bookingsStore.set(booking.referenceNumber, booking);
  syncToLocalStorage();
  return booking;
}

export function getBookingByReference(ref: string): Booking | undefined {
  loadFromLocalStorage();
  return bookingsStore.get(ref);
}

export function updateBookingStatus(
  ref: string,
  status: Booking["status"],
  paymentDetails?: { paymentId?: string; orderId?: string }
): Booking | undefined {
  loadFromLocalStorage();
  const existing = bookingsStore.get(ref);
  if (!existing) return undefined;

  const updated: Booking = {
    ...existing,
    status,
    ...(paymentDetails?.paymentId ? { paymentId: paymentDetails.paymentId } : {}),
    ...(paymentDetails?.orderId ? { orderId: paymentDetails.orderId } : {}),
  };

  bookingsStore.set(ref, updated);
  syncToLocalStorage();
  return updated;
}

export function getAllBookings(): Booking[] {
  loadFromLocalStorage();
  return Array.from(bookingsStore.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
