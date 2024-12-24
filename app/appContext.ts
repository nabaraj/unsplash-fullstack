"use client";
import { createContext } from "react";

type AppContextType = {
  imageId: string;
  setImageId: (id: string) => void;
};

const defaultValue = {} as AppContextType;

export const AppContext = createContext(defaultValue);
