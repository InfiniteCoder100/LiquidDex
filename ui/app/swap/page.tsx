"use client";
import SwapComponent from "../components/OdosQuote"

import dynamic from "next/dynamic";
export default function SwapPage() {
  const Swap = dynamic(() => import("../components/swap"), {
    ssr: false,
  });
  return (
    <div className="mt-20">
      <Swap />
      <SwapComponent/>
    </div>
  );
}
