"use client";

import React, { createContext, useState } from "react";

type SearchContextProviderProps = {
  children: React.ReactNode;
};

type SearchContextProps = {
  searchQuery: string;
  handleChangeSearchQuery: (query: string) => void;
};

export const searchContext = createContext<SearchContextProps | null>(null);

const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleChangeSearchQuery = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <searchContext.Provider value={{ searchQuery, handleChangeSearchQuery }}>
      {children}
    </searchContext.Provider>
  );
};

export default SearchContextProvider;
