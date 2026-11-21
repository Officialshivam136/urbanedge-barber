"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BookingDetailsClient from "./[ref]/BookingDetailsClient";
import { sampleRef } from "@/lib/storage";

function BookingContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref") || sampleRef;
  return <BookingDetailsClient refNumber={ref} />;
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#112119] flex items-center justify-center text-[#9ab0a3] font-mono text-sm">
          Loading appointment pass...
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
