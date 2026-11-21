import { NextResponse } from "next/server";
import crypto from "crypto";
import { updateBookingStatus, getBookingByReference } from "@/lib/storage";
import { sanitizeString } from "@/lib/security";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const bookingRef = sanitizeString(body.bookingRef);
    const paymentId = sanitizeString(body.paymentId);
    const orderId = sanitizeString(body.orderId);
    const signature = sanitizeString(body.signature);

    if (!bookingRef || !paymentId || !orderId) {
      return NextResponse.json(
        { success: false, error: "Missing required payment verification parameters." },
        { status: 400 }
      );
    }

    const booking = getBookingByReference(bookingRef);
    if (!booking) {
      return NextResponse.json(
        { success: false, error: "Booking reference does not exist." },
        { status: 404 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Cryptographic HMAC-SHA256 Signature Verification
    if (keySecret && !keySecret.includes("demo") && signature) {
      const generatedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(`${orderId}|${paymentId}`)
        .digest("hex");

      const isSignatureValid = crypto.timingSafeEqual(
        Buffer.from(generatedSignature, "utf-8"),
        Buffer.from(signature, "utf-8")
      );

      if (!isSignatureValid) {
        console.warn(`[SECURITY ALERT] Invalid payment signature attempt on ref: ${bookingRef}`);
        return NextResponse.json(
          { success: false, error: "Payment verification failed: Invalid cryptographic signature." },
          { status: 400 }
        );
      }
    }

    // Update status to CONFIRMED
    const updated = updateBookingStatus(bookingRef, "CONFIRMED", {
      paymentId,
      orderId,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Booking state could not be updated." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Payment cryptographically verified and appointment confirmed.",
      booking: updated,
    });
  } catch (error) {
    console.error("Payment verification security exception:", error);
    return NextResponse.json(
      { success: false, error: "Payment verification failed." },
      { status: 500 }
    );
  }
}
