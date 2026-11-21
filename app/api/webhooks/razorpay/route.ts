import { NextResponse } from "next/server";
import crypto from "crypto";
import { updateBookingStatus } from "@/lib/storage";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-razorpay-signature");
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // Cryptographic Webhook Authenticity Check
    if (webhookSecret && !webhookSecret.includes("demo") && signature) {
      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(rawBody)
        .digest("hex");

      const isValid = crypto.timingSafeEqual(
        Buffer.from(expectedSignature, "utf-8"),
        Buffer.from(signature, "utf-8")
      );

      if (!isValid) {
        console.warn("[SECURITY ALERT] Unauthorized webhook request rejected: Invalid signature.");
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
      }
    }

    const event = JSON.parse(rawBody);

    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;
      const bookingRef = payment.notes?.bookingRef || payment.description;
      if (bookingRef) {
        updateBookingStatus(bookingRef, "CONFIRMED", {
          paymentId: payment.id,
          orderId: payment.order_id,
        });
      }
    } else if (event.event === "payment.failed") {
      const payment = event.payload.payment.entity;
      const bookingRef = payment.notes?.bookingRef;
      if (bookingRef) {
        updateBookingStatus(bookingRef, "CANCELLED");
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
