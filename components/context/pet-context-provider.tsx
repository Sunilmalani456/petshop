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
  handleAddPet: (newPet: Omit<pet, "id">) => void;
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

  // event handlers / actions
  const handleAddPet = async (newPet: Omit<pet, "id">) => {
    setPets((pre) => [
      ...pre,
      {
        id: Math.random().toString(36).substr(2, 9),
        ...newPet,
      },
    ]);
  };

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
        handleAddPet,
      }}
    >
      {children}
    </petContext.Provider>
  );
};

export default PetContextProvider;
