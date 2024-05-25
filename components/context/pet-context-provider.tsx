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
  handleCheckOut: (id: string) => void;
  numberOfPets: number;
  handleChangeSelectedPetId: (id: string) => void;
  selectedPet: pet | undefined;
};

export const petContext = createContext<PetContextProps | null>(null);

const PetContextProvider = ({ data, children }: PetContextProviderProps) => {
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // derived state
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = pets.length;

  // console.log(selectedPet);

  const handleCheckOut = (id: string) => {
    setPets((pre) => pre.filter((pet) => pet.id !== id));
    setSelectedPetId(null);
  };

  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };

  return (
    <petContext.Provider
      value={{
        pets,
        selectedPetId,
        numberOfPets,
        selectedPet,
        handleChangeSelectedPetId,
        handleCheckOut,
      }}
    >
      {children}
    </petContext.Provider>
  );
};

export default PetContextProvider;
