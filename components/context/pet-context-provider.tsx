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
};

export const petContext = createContext<PetContextProps | null>(null);

const PetContextProvider = ({ data, children }: PetContextProviderProps) => {
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };

  return (
    <petContext.Provider
      value={{ pets, selectedPetId, handleChangeSelectedPetId }}
    >
      {children}
    </petContext.Provider>
  );
};

export default PetContextProvider;
