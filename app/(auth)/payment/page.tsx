"use client";

import { createCheckOutSession } from "@/actions/petAction";
import H1 from "@/components/h1";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import React, { useTransition } from "react";

const PaymentPage = () => {
  const searhParams = useSearchParams();
  const [isPending, startTransaction] = useTransition();

  return (
    <main className="flex flex-col items-center space-y-10">
      <H1>Payment access requires payment</H1>

      {!searhParams.has("success") && (
        <Button
          disabled={isPending}
          onClick={async () => {
            startTransaction(async () => {
              await createCheckOutSession();
            });
          }}
        >
          {isPending ? "Processing..." : "Buy Life time access for 299$"}
        </Button>
      )}

      {searhParams.has("success") && (
        <p className="text-sm bg-green-500/90 rounded-full font-bold text-white p-1 px-3">
          Payment Successful! You have life time access to PetSoft.
        </p>
      )}

      {searhParams.has("cancelled") && (
        <p className="text-sm text-red-600">
          Payment Cancelled! You can try again.
        </p>
      )}
    </main>
  );
};

export default PaymentPage;
