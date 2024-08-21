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
import { SheetLayer } from "../layers/coollayer";

const Editor = () => {
  const activeLayer = useLayerStore((state) => state.activeLayer);
  return (
    <div className="flex h-screen">
      <div className="py-6 lg:block hidden px-4 w-[105px] shrink-0">
        <div className="pb-12 text-center">
          <ModeToggle />
        </div>
        <div className="lg:flex  flex-col gap-4 hidden">
          {activeLayer.resourceType === "image" ? <ImageTools /> : null}
          {activeLayer.resourceType === "video" ? <VideoTools /> : null}
          {activeLayer.resourceType && (
            <ExportAsset resource={activeLayer.resourceType} />
          )}
        </div>
      </div>
      <div
        className="flex  w-full bottom-0 fixed justify-center dark:bg-gray-950 bg-gray-50
       z-50 gap-4 lg:hidden"
      >
        {activeLayer.resourceType === "image" ? <ImageTools /> : null}
        {activeLayer.resourceType === "video" ? <VideoTools /> : null}
        {activeLayer.resourceType && (
          <ExportAsset resource={activeLayer.resourceType} />
        )}
        <div className="flex justify-center items-center">
          <ModeToggle />
        </div>
      </div>
      {/* <UploadImage /> */}
      <Loading />
      <UploadForm />
      <ActiveImage />
      <Layers />
      <SheetLayer />
    </div>
  );
};

export default Editor;
