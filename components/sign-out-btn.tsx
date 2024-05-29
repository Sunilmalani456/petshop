"use client";

import { useTransition } from "react";
import { Button } from "./ui/button";

export default function SignOutBtn({
  LogOut,
}: {
  LogOut: () => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      disabled={isPending}
      onClick={async () => {
        startTransition(async () => {
          await LogOut();
        });
      }}
    >
      Sign Out
    </Button>
  );
}
