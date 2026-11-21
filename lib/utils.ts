import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { siteConfig } from "./site";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateBookingReference(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `UE-${dateStr}-${randomSuffix}`;
}

export function generateWhatsAppBookingUrl(booking: {
  referenceNumber: string;
  serviceName: string;
  barberName: string;
  date: string;
  timeSlot: string;
  customerName: string;
  customerPhone: string;
  isStudent?: boolean;
}): string {
  const message = [
    `*NEW APPOINTMENT RESERVATION — URBANEDGE*`,
    `Ref: #${booking.referenceNumber}`,
    ``,
    `*Customer:* ${booking.customerName}`,
    `*Phone:* ${booking.customerPhone}`,
    `*Service:* ${booking.serviceName}`,
    `*Barber:* ${booking.barberName}`,
    `*Date:* ${booking.date}`,
    `*Slot:* ${booking.timeSlot}`,
    booking.isStudent ? `*Note:* Student Discount 20% applied (Mon-Thu)` : null,
    ``,
    `_Booking token of ₹${siteConfig.bookingAmountInr} to be settled._`,
    `Please confirm my chair! 💈`,
  ]
    .filter(Boolean)
    .join("\n");

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
}

export function getAvailableSlots(dateString: string): string[] {
  // Generate slots from 09:00 AM to 08:30 PM in 30 min intervals
  const slots: string[] = [];
  const startHour = 9;
  const endHour = 20; // up to 8:30 PM

  for (let h = startHour; h <= endHour; h++) {
    const period = h < 12 ? "AM" : "PM";
    const displayHour = h > 12 ? h - 12 : h;

    slots.push(`${displayHour.toString().padStart(2, "0")}:00 ${period}`);
    if (h < endHour || (h === endHour && true)) {
      slots.push(`${displayHour.toString().padStart(2, "0")}:30 ${period}`);
    }
  }

  return slots;
}
