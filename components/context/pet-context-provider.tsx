"use client";

import { AddPet, DeletePet, EditPet } from "@/actions/petAction";
import { pet } from "@/lib/types";
import React, {
  createContext,
  startTransition,
  useOptimistic,
  useState,
} from "react";
import { toast } from "sonner";

type PetContextProviderProps = {
  data: pet[];
  children: React.ReactNode;
};

type PetContextProps = {
  pets: pet[];
  selectedPetId: string | null;
  handleCheckOut: (id: string) => Promise<void>;
  numberOfPets: number;
  handleAddPet: (newPet: Omit<pet, "id">) => Promise<void>;
  handleChangeSelectedPetId: (id: string) => void;
  selectedPet: pet | undefined;
  handleEditPet: (petId: string, newData: Omit<pet, "id">) => Promise<void>;
};

export const petContext = createContext<PetContextProps | null>(null);

const PetContextProvider = ({ data, children }: PetContextProviderProps) => {
  // const [optimisticPets, setOptimisticPets] = useOptimistic(
  //   data,
  //   (preState, newPetData) => {
  //     return [
  //       ...preState,
  //       { ...newPetData, id: Math.random().toString(36).substr(2, 9) },
  //     ];
  //   } // optimistic update
  // );

  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (preState, { action, payload }) => {
      switch (action) {
        case "add":
          return [
            ...preState,
            { ...payload, id: Math.random().toString(36).substr(2, 9) },
          ];
        case "edit":
          return preState.map((pet) => {
            if (pet.id === payload.petId) {
              return {
                ...pet,
                ...payload.newData,
              };
            }
            return pet;
          });
        case "delete":
          return preState.filter((pet) => pet.id !== payload);
        default:
          return preState;
      }
    } // optimistic update
  );

  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // derived state
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  // event handlers / actions
  const handleAddPet = async (newPet: Omit<pet, "id">) => {
    // setPets((pre) => [
    //   ...pre,
    //   {
    //     id: Math.random().toString(36).substr(2, 9),
    //     ...newPet,
    //   },
    // ]);

    // await AddPet(newPet);

    setOptimisticPets({ action: "add", payload: newPet });

    const error = await AddPet(newPet);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleEditPet = async (petId: string, newData: Omit<pet, "id">) => {
    // setPets((pre) =>
    //   pre.map((pet) => {
    //     if (pet.id === petId) {
    //       return {
    //         id: petId,
    //         ...newData,
    //       };
    //     }
    //     return pet;
    //   })
    // );

    setOptimisticPets({ action: "edit", payload: { petId, newData } });

    const error = await EditPet(petId, newData);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleCheckOut = async (petId: string) => {
    // setPets((pre) => pre.filter((pet) => pet.id !== id));

    setOptimisticPets({ action: "delete", payload: petId });
    await DeletePet(petId as string);
    setSelectedPetId(null);
  };

  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };

  return (
    <petContext.Provider
      value={{
        pets: optimisticPets,
        selectedPetId,
        numberOfPets,
        selectedPet,
        handleChangeSelectedPetId,
        handleCheckOut,
        handleAddPet,
        handleEditPet,
      }}
    >
      {children}
    </petContext.Provider>
  );
};

export default PetContextProvider;
