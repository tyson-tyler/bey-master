import React, { createContext, Dispatch, SetStateAction } from "react";

// Define the type for the context value
interface UpdateStorageContextType {
  updateStorage: any; // Replace `any` with actual type if possible
  setUpdateStorage: Dispatch<SetStateAction<any>>; // Adjust `any` as needed
}

// Create the context with the appropriate type
export const UpdateStrogeContext =
  createContext<UpdateStorageContextType | null>(null);
