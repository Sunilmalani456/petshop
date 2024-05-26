"use client";

import { Button } from "./ui/button";

export default function SignOutBtn({
  LogOut,
}: {
  LogOut: () => Promise<void>;
}) {
  return <Button onClick={async () => await LogOut()}>Sign Out</Button>;
}
