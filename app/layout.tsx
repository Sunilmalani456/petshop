import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PetSoft - Pet Daycare Software",
  description:
    "PetSoft is a pet daycare software for managing your pet daycare business. It helps you manage your pet daycare business with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen text-sm text-zinc-900 bg-[#E5E8EC]`}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
