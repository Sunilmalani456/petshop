"use client";

import { pet } from "@/lib/types";
import React, { createContext, useState } from "react";

type PetContextProviderProps = {
  data: pet[];
  children: React.ReactNode;
};

type PetContextProps = {
  pets: pet[];
  selectedPetId: string | null;
  handleChangeSelectedPetId: (id: string) => void;
  selectedPet: pet | undefined;
};

export const petContext = createContext<PetContextProps | null>(null);

const PetContextProvider = ({ data, children }: PetContextProviderProps) => {
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // derived state
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);

  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };

  return (
    <petContext.Provider
      value={{ pets, selectedPetId, selectedPet, handleChangeSelectedPetId }}
    >
      {children}
    </petContext.Provider>
  );
};

export default PetContextProvider;
