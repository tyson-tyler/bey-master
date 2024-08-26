"use client";
import React from "react";
import Editor from "../_components/edit/Editor";
import { ImageStore } from "@/server/image-store";
import { LayerStore } from "@/server/layer-store";

const page = () => {
  return (
    <LayerStore.Provider
      initialValue={{
        layerComparisonMode: false,
        layers: [
          {
            id: crypto.randomUUID(),
            url: "",
            height: 0,
            width: 0,
            publicId: "",
          },
        ],
      }}
    >
      <ImageStore.Provider
        initialValue={{
          activeTag: "", // Provide a default or initial value
          activeColor: "", // Provide a default or initial value
          generating: false,
        }}
      >
        <main className="h-full">
          <Editor />
        </main>
      </ImageStore.Provider>
    </LayerStore.Provider>
  );
};

export default page;
