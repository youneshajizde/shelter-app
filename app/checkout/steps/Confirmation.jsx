"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { finalCheckoutPrice } from "@/lib/utils";
function Confirmation() {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-lg space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center">
        Payment Successful
      </h2>

      <div className="text-lg text-center text-green-600">
        <p>Thank you for your purchase!</p>
        <p>Your order has been confirmed, and we'll process it shortly.</p>
      </div>

      <div className="mt-6 text-center">
        <Button
          onClick={handleBackToHome}
          className="w-full bg-stone-800 hover:bg-stone-900"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}

export default Confirmation;
