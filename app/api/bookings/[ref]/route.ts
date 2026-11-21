import { NextResponse } from "next/server";
import { getBookingByReference } from "@/lib/storage";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ ref: string }> }
) {
  const { ref } = await params;
  const booking = getBookingByReference(ref);

  if (!booking) {
    return NextResponse.json(
      { success: false, error: "Booking reference not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, booking });
}
