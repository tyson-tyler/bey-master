"use client";
import VideoTranscription from "./transcribe";
import { useLayerStore } from "@/server/layer-store";
import SmartCrop from "./smart-crop";
import ExportAsset from "./export-image";

export default function VideoTools() {
  const activeLayer = useLayerStore((state) => state.activeLayer);
  if (activeLayer.resourceType === "video")
    return (
      <>
        <VideoTranscription />
        <SmartCrop />
      </>
    );
}
