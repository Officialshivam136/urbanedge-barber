import React from "react";
import BookingDetailsClient from "./BookingDetailsClient";
import { sampleRef } from "@/lib/storage";

export function generateStaticParams() {
  return [
    { ref: sampleRef },
    { ref: "sample" },
  ];
}

export default async function BookingConfirmationPage({
  params,
}: {
  params: Promise<{ ref: string }>;
}) {
  const { ref } = await params;
  return <BookingDetailsClient refNumber={ref} />;
}
