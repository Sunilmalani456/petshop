"use client";

import { createCheckOutSession } from "@/actions/petAction";
import H1 from "@/components/h1";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useTransition } from "react";
import { useSession } from "next-auth/react";

const PaymentPage = () => {
  const searhParams = useSearchParams();
  const [isPending, startTransaction] = useTransition();
  const { data: session, update, status } = useSession();
  const router = useRouter();
  return (
    <main className="flex flex-col items-center space-y-10">
      <H1>Payment access requires payment</H1>

      {searhParams.has("success") && (
        <Button
          disabled={status === "loading" || session?.user.hasAccess}
          onClick={async () => {
            await update(true);
            router.push("/app/dashboard");
          }}
        >
          Access PetSoft
        </Button>
      )}

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
