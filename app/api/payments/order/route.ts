import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";
import { getBookingByReference } from "@/lib/storage";

export async function POST(request: Request) {
  try {
    const { bookingRef } = await request.json();

    if (!bookingRef) {
      return NextResponse.json(
        { success: false, error: "Missing booking reference" },
        { status: 400 }
      );
    }

    const booking = getBookingByReference(bookingRef);
    if (!booking) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      );
    }

    const amountInPaise = siteConfig.bookingAmountInr * 100; // 5000 paise = ₹50
    const currency = "INR";
    const receipt = booking.referenceNumber;

    // Check if live Razorpay credentials are provided
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (keyId && keySecret && keyId.startsWith("rzp_live")) {
      // In production with live credentials:
      const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
      const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency,
          receipt,
          notes: {
            service: booking.serviceName,
            barber: booking.barberName,
            date: booking.date,
            slot: booking.timeSlot,
          },
        }),
      });

      const rzpData = await rzpRes.json();
      return NextResponse.json({
        success: true,
        orderId: rzpData.id,
        amount: amountInPaise,
        currency,
        keyId,
        isSimulated: false,
      });
    }

    // Standard development & test mode response (instant seamless simulation)
    const mockOrderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    return NextResponse.json({
      success: true,
      orderId: mockOrderId,
      amount: amountInPaise,
      currency,
      keyId: keyId || "rzp_test_urbanedge_demo",
      isSimulated: true,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate payment order" },
      { status: 500 }
    );
  }
}
