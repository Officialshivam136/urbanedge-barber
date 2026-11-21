export interface Service {
  id: string;
  name: string;
  category: "hair" | "shave" | "beard" | "package" | "treatment";
  price: number;
  durationMinutes: number;
  description: string;
  isPopular?: boolean;
  studentDiscountEligible?: boolean;
}

export interface Barber {
  id: string;
  name: string;
  title: string;
  experience: string;
  specialty: string;
  bio: string;
  image: string;
  badge?: string;
  rating: number;
  reviewsCount: number;
}

export type BookingStatus =
  | "PENDING_PAYMENT"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED"
  | "NO_SHOW";

export interface Booking {
  id: string;
  referenceNumber: string; // e.g., UE-20261125-0412
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  barberId: string;
  barberName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:MM (e.g., 10:30 AM)
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  isStudentDiscount: boolean;
  notes?: string;
  bookingAmountPaid: number; // ₹50
  balanceDueAtShop: number;
  status: BookingStatus;
  paymentMethod: "RAZORPAY" | "WHATSAPP_CONFIRMED";
  paymentId?: string;
  orderId?: string;
  createdAt: string;
  expiresAt?: string;
}

export interface TimeSlot {
  time: string; // e.g. "10:00 AM"
  available: boolean;
}
