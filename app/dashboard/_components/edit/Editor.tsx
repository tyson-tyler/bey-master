"use client";
import React from "react";
import UploadImage from "../upload/upload-image";
import Layers from "../layers/layers";
import { ModeToggle } from "@/components/Toogle";
import ActiveImage from "./ActiveImage";
import UploadForm from "../upload/upload-form";
import { useLayerStore } from "@/server/layer-store";
import ImageTools from "../toolbar/image-toolbar";
import Loading from "../toolbar/loading-screen";
import VideoTools from "../toolbar/videoTools";
import ExportAsset from "../toolbar/export-image";

const Editor = () => {
  const activeLayer = useLayerStore((state) => state.activeLayer);
  return (
    <div className="flex h-screen">
      <div className="py-6 px-4 w-[105px] shrink-0">
        <div className="pb-12 text-center">
          <ModeToggle />
        </div>
        <div className="flex flex-col gap-4">
          {activeLayer.resourceType === "image" ? <ImageTools /> : null}
          {activeLayer.resourceType === "video" ? <VideoTools /> : null}
          {activeLayer.resourceType && (
            <ExportAsset resource={activeLayer.resourceType} />
          )}
        </div>
      </div>
      {/* <UploadImage /> */}
      <Loading />
      <UploadForm />
      <ActiveImage />
      <Layers />
    </div>
  );
};

export default Editor;
