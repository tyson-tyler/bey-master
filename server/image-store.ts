import { createStore, useStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createZustandContext } from "./zustand-context";
import React from "react";

type State = {
  tags: string[];
  setTags: (tags: string[]) => void;
  activeTag: string;
  setActiveTag: (tag: string) => void;
  activeColor: string;
  setActiveColor: (color: string) => void;
  generating: boolean;
  setGeneration: (generating: boolean) => void;
};

const getStore = (initialState: {
  activeTag: string;
  activeColor: string;
  generating: boolean;
}) => {
  return createStore<State>()(
    persist(
      (set) => ({
        tags: [],
        setTags: (tags) => set({ tags }),
        activeTag: initialState.activeTag,
        setActiveTag: (tag) => set({ activeTag: tag }),
        activeColor: initialState.activeColor,
        setActiveColor: (color) => set({ activeColor: color }),
        generating: initialState.generating,
        setGeneration: (generating) => set({ generating }),
      }),
      {
        name: "images-store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  );
};

export const ImageStore = createZustandContext(getStore);

export function useImageStore<T>(selector: (state: State) => T) {
  const store = React.useContext(ImageStore.Context);
  if (!store) {
    throw new Error("Missing image store provider");
  }
  return useStore(store, selector);
}
