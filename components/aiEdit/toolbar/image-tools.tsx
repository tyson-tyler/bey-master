"use client";

import AIRecolor from "./recolor";
import GenerativeFill from "./generative-fill";
import GenRemove from "./gen-remove";
import BgRemove from "./bg-remove";
import AIBackgroundReplace from "./bg-replace";
import ExtractPart from "./extract-part";
import { ModeToggle } from "@/components/Toogle";
import { useLayerStore } from "../layer-store";
import ExportAsset from "./export-image";

export default function ImageTools() {
  const activeLayer = useLayerStore((state) => state.activeLayer);
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="pb-12 hidden items-center pt-3 md:flex justify-center text-center">
          <ModeToggle />
        </div>
        <div className="md:flex  flex-col hidden">
          <GenerativeFill />
          <AIRecolor />
          <GenRemove />
          <AIBackgroundReplace />
          <ExtractPart />

          {activeLayer.resourceType && (
            <ExportAsset resource={activeLayer.resourceType} />
          )}
        </div>
      </div>
    </>
  );
}
