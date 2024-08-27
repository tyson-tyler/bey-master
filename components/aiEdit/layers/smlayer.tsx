import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLayerStore } from "../layer-store";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Images, Layers2 } from "lucide-react";
import { useImageStore } from "../store";
import LayerImage from "./layer-image";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Layers } from "lucide-react";
import LayerInfo from "./btn";

export default function SmLayer() {
  const layers = useLayerStore((state) => state.layers);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);
  const addLayer = useLayerStore((state) => state.addLayer);
  const generating = useImageStore((state) => state.generating);
  const layerComparisonMode = useLayerStore(
    (state) => state.layerComparisonMode
  );
  const setLayerComparisonMode = useLayerStore(
    (state) => state.setLayerComparisonMode
  );
  const comparedLayers = useLayerStore((state) => state.comparedLayers);
  const toggleComparedLayer = useLayerStore(
    (state) => state.toggleComparedLayer
  );
  const setComparedLayers = useLayerStore((state) => state.setComparedLayers);

  const [isSheetOpen, setSheetOpen] = useState(false); // State to control sheet visibility

  const MCard = useMemo(() => motion(Card), []);
  const MButton = useMemo(() => motion(Button), []);

  const getLayerName = useMemo(
    () => (id: string) => {
      const layer = layers.find((l) => l.id === id);
      return layer ? layer.url : "Nothing here";
    },
    [layers]
  );

  const visibleLayers = useMemo(
    () =>
      layerComparisonMode
        ? layers.filter((layer) => layer.url && layer.resourceType === "image")
        : layers,
    [layerComparisonMode, layers]
  );

  return (
    <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger>
        <Layers className="w-10 h-10 flex lg:hidden absolute top-2 right-2 p-2 rounded-full dark:bg-gray-900 dark:text-white text-black bg-gray-100" />
      </SheetTrigger>
      <SheetContent className="bg-gray-200 p-0 rounded-none">
        <MCard
          layout
          className="basis-[320px] h-full rounded-none shrink-0 flex lg:hidden scrollbar-thin scrollbar-track-secondary overflow-y-scroll scrollbar-thumb-primary scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-x-hidden relative flex-col"
        >
          <CardHeader className="sticky top-0 z-50 px-4 py-6 min-h-28 bg-card shadow-sm">
            {layerComparisonMode ? (
              <div>
                <CardTitle className="text-sm pb-2">Comparing...</CardTitle>
                <CardDescription className="flex gap-2 items-center">
                  <Image
                    alt="compare"
                    width={32}
                    height={32}
                    src={getLayerName(comparedLayers[0]) as string}
                  />
                  {comparedLayers.length > 0 && <ArrowRight />}
                  {comparedLayers.length > 1 ? (
                    <Image
                      alt="compare"
                      width={32}
                      height={32}
                      src={getLayerName(comparedLayers[1]) as string}
                    />
                  ) : (
                    "Nothing here"
                  )}
                </CardDescription>
              </div>
            ) : (
              <div className="flex flex-col gap-1 ">
                <CardTitle className="text-sm">
                  {activeLayer.name || "Layers"}
                </CardTitle>
                {activeLayer.width && activeLayer.height ? (
                  <CardDescription className="text-xs">
                    {activeLayer.width}X{activeLayer.height}
                  </CardDescription>
                ) : null}
              </div>
            )}
          </CardHeader>
          <motion.div className="flex-1 flex flex-col mt-3 ">
            <AnimatePresence>
              {visibleLayers.map((layer, index) => {
                return (
                  <motion.div
                    animate={{ scale: 1, opacity: 1 }}
                    initial={{ scale: 0, opacity: 0 }}
                    exit={{ scale: 0, opacity: 0 }}
                    layout
                    className={cn(
                      "cursor-pointer ease-in-out hover:bg-secondary border border-transparent",
                      {
                        "border-primary": layerComparisonMode
                          ? comparedLayers.includes(layer.id)
                          : activeLayer.id === layer.id,
                        "animate-pulse": generating,
                      }
                    )}
                    key={layer.id}
                    onClick={() => {
                      if (generating) return;
                      if (layerComparisonMode) {
                        toggleComparedLayer(layer.id);
                      } else {
                        setActiveLayer(layer.id);
                        setSheetOpen(false); // Close the sheet when a layer is selected
                      }
                    }}
                  >
                    <div className="relative p-4 flex items-center">
                      <div className="flex gap-2 items-center h-8 w-full justify-between">
                        {!layer.url ? (
                          <p className="text-xs font-medium justify-self-end">
                            New layer
                          </p>
                        ) : null}
                        <LayerImage layer={layer} />
                        {layers.length !== 1 && (
                          <LayerInfo layer={layer} layerIndex={index} />
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
          <CardContent className="sticky bottom-0 bg-card flex gap-2 shrink-0">
            <MButton
              layout
              onClick={() => {
                addLayer({
                  id: crypto.randomUUID(),
                  url: "",
                  height: 0,
                  width: 0,
                  publicId: "",
                  name: "",
                  format: "",
                });
              }}
              variant="outline"
              className="w-full flex gap-2"
            >
              <span className="text-xs">Create Layer</span>
              <Layers2 className="text-secondary-foreground" size={18} />
            </MButton>
            <MButton
              disabled={
                !activeLayer.url || activeLayer.resourceType === "video"
              }
              layout
              onClick={() => {
                if (layerComparisonMode) {
                  setLayerComparisonMode(!layerComparisonMode);
                } else {
                  setComparedLayers([activeLayer.id]);
                }
              }}
              variant={layerComparisonMode ? "destructive" : "outline"}
              className="w-full flex gap-2"
            >
              <motion.span className={cn("text-xs font-bold")}>
                {layerComparisonMode ? "Stop Comparing" : "Compare"}
              </motion.span>
              {!layerComparisonMode && (
                <Images className="text-secondary-foreground" size={18} />
              )}
            </MButton>
          </CardContent>
        </MCard>
      </SheetContent>
    </Sheet>
  );
}
