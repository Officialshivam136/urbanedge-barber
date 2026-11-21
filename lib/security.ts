import { services, barbers } from "./data";

// In-memory sliding-window rate limiter
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up stale IP records every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
      if (entry.resetAt <= now) {
        rateLimitStore.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

/**
 * Checks if an IP has exceeded rate limit thresholds.
 * @param ip Client IP address
 * @param limit Max allowed requests within window
 * @param windowMs Window duration in milliseconds (default: 60,000ms = 1 min)
 */
export function checkRateLimit(
  ip: string,
  limit: number = 60,
  windowMs: number = 60 * 1000
): { allowed: boolean; remaining: number; resetInSec: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || entry.resetAt <= now) {
    // New window
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      allowed: true,
      remaining: limit - 1,
      resetInSec: Math.ceil(windowMs / 1000),
    };
  }

  // Increment within existing window
  entry.count += 1;
  const remaining = Math.max(0, limit - entry.count);
  const resetInSec = Math.ceil((entry.resetAt - now) / 1000);

  if (entry.count > limit) {
    return { allowed: false, remaining: 0, resetInSec };
  }

  return { allowed: true, remaining, resetInSec };
}

/**
 * Strips script tags, HTML tags, and dangerous characters to prevent XSS injection.
 */
export function sanitizeString(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>?/gm, "") // Strip HTML tags
    .replace(/[\x00-\x1F\x7F]/g, "") // Strip control characters
    .trim();
}

/**
 * Validates 10-digit Indian phone or standard E.164 phone number.
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[^0-9]/g, "");
  return cleaned.length >= 10 && cleaned.length <= 13;
}

/**
 * Validates date is in YYYY-MM-DD format and is not in the past.
 */
export function isValidBookingDate(dateStr: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;

  const targetDate = new Date(`${dateStr}T23:59:59`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return !isNaN(targetDate.getTime()) && targetDate >= today;
}

/**
 * Server-side authoritative price resolution.
 * Never trust the price submitted from the client browser!
 */
export function resolveServerSideService(serviceId: string, isStudent: boolean) {
  const found = services.find((s) => s.id === serviceId);
  if (!found) return null;

  const basePrice = found.price;
  const isStudentEligible = Boolean(isStudent && found.studentDiscountEligible);
  const effectivePrice = isStudentEligible ? Math.round(basePrice * 0.8) : basePrice;

  return {
    service: found,
    effectivePrice,
    isStudentEligible,
  };
}

/**
 * Validates barber exists or assigns default.
 */
export function resolveServerSideBarber(barberId: string) {
  if (barberId === "any") {
    return { id: "any", name: "First Available Master Barber" };
  }
  const found = barbers.find((b) => b.id === barberId);
  return found ? { id: found.id, name: found.name } : null;
}
