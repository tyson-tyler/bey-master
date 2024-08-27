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

export default function Footer() {
  const activeLayer = useLayerStore((state) => state.activeLayer);
  return (
    <>
      <div className="w-full flex justify-center gap-2 md:hidden fixed bottom-0 z-50  dark:bg-gray-950 dark:text-white bg-white text-black">
        <GenerativeFill />
        <AIRecolor />
        <GenRemove />
        <AIBackgroundReplace />
        <ExtractPart />

        {/* <ModeToggle /> */}
        {activeLayer.resourceType && (
          <ExportAsset resource={activeLayer.resourceType} />
        )}
      </div>
    </>
  );
}
