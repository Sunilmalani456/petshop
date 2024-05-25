import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";
import PetContextProvider from "@/components/context/pet-context-provider";
import SearchContextProvider from "@/components/context/search-context-provider";
import React from "react";
import prisma from "@/lib/db";
import { Toaster } from "sonner";
import { Pet } from "@prisma/client";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  // const response = await fetch(
  //   "https://bytegrad.com/course-assets/projects/petsoft/api/pets"
  // );

  // if (!response.ok) {
  //   throw new Error("Failed to fetch pets");
  // }

  // const PetData: pet[] = await response.json();

  const PetData: Pet[] = await prisma.pet.findMany();

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
