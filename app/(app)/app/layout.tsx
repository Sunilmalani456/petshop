import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";
import PetContextProvider from "@/components/context/pet-context-provider";
import SearchContextProvider from "@/components/context/search-context-provider";
import prisma from "@/lib/db";
import { checkAuth } from "@/lib/server-utils";
import { Pet } from "@prisma/client";
import React from "react";
import { Toaster } from "sonner";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const Session = await checkAuth();

  const PetData: Pet[] = await prisma.pet.findMany({
    where: {
      userId: Session.user?.id,
    },
  });

  return (
    <>
      <BackgroundPattern />
      <div className="flex flex-col max-w-[1050px] mx-auto px-4 min-h-screen">
        <AppHeader />
        <SearchContextProvider>
          <PetContextProvider data={PetData}>{children}</PetContextProvider>
        </SearchContextProvider>
        <AppFooter />
      </div>
      <Toaster position="top-right" />
    </>
  );
};

export default AppLayout;
