"use client";

import { useEffect } from "react";
import UploadForm from "./upload/upload-form";
import { useLayerStore } from "./layer-store";
import Layers from "./layers/layer";
import ImageTools from "./toolbar/image-tools";
import VideoTools from "./toolbar/video-tools";
import { ModeToggle } from "../Toogle";

import Loading from "./upload/loading";
import ExportAsset from "./toolbar/export-image";
import ActiveImage from "./upload/active-image";
import SmLayer from "./layers/smlayer";
import Footer from "./toolbar/footer";

// Editor Component
export default function Editor() {
  const activeLayer = useLayerStore((state) => state.activeLayer);

  return (
    <div className="flex h-full">
      <div className="md:py-6 md:px-4 hidden md:block min-w-8">
        <div className="flex flex-col gap-4">
          {activeLayer.resourceType === "video" && <VideoTools />}
          {activeLayer.resourceType === "image" && <ImageTools />}
        </div>
      </div>
      <Loading />
      <ActiveImage />
      <UploadForm />
      <Layers />
      <SmLayer />
      <Footer />
      {/* Including the UploadImage component here */}
    </div>
  );
}
