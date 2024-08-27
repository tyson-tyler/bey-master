"use client";
import VideoTranscription from "./transcribe";
import { useLayerStore } from "../layer-store";
import SmartCrop from "./smart-crop";
import ExportImage from "./export-image";

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
