import { petContext } from "@/components/context/pet-context-provider";
import { searchContext } from "@/components/context/search-context-provider";
import { useContext } from "react";

export const usePetContext = () => {
  const context = useContext(petContext);

  if (!context) {
    throw new Error("useContext must be used within a PetContextProvider");
  }

  return context;
};

export const useSearchContext = () => {
  const context = useContext(searchContext);

  if (!context) {
    throw new Error("useContext must be used within a SeacrhContextProvider");
  }

  return context;
};

