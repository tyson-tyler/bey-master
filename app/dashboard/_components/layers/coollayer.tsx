"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useImageStore } from "@/server/image-store";
import { useLayerStore } from "@/server/layer-store";
import { Layers2 } from "lucide-react";
import LayerImage from "./layer-image";
import LayerInfo from "@/safe/layer-info";
import { IoIosImages } from "react-icons/io";

export function SheetLayer() {
  const [open, setOpen] = useState(false);
  const layers = useLayerStore((state) => state.layers);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const generating = useImageStore((state) => state.generating);
  const addLayer = useLayerStore((state) => state.addLayer);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Layers2
          className="text-gray-500 dark:text-white p-2 flex lg:hidden my-2 mx-2 absolute top-2 right-2 bg-slate-50 dark:bg-gray-800 rounded-md shadow-xl justify-center items-center"
          size={40}
          onClick={() => setOpen(true)}
        />
      </SheetTrigger>
      <SheetContent className="p-2">
        <Card className="basis-[320px] h-screen shrink-0 overflow-y-scroll overflow-x-hidden relative flex lg:hidden flex-col">
          <CardHeader className="">
            <div className="flex items-center gap-3">
              <IoIosImages className="w-[3rem] h-[3rem] dark:text-white text-black" />
              <div className="flex flex-col gap-1">
                <CardTitle className="text-sm">
                  {activeLayer.name || "Layers"}
                </CardTitle>
                {activeLayer.width && activeLayer.height ? (
                  <CardDescription>
                    {activeLayer.width} x {activeLayer.height}
                  </CardDescription>
                ) : null}
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-screen p-2">
            {layers.map((layer, index) => (
              <div
                className={cn(
                  "cursor-pointer ease-in-out w-full dark:hover:bg-gray-800 hover:bg-gray-200 rounded-md border border-transparent",
                  { "animate-pulse": generating }
                )}
                key={layer.id}
                onClick={() => {
                  if (generating) return;
                  setActiveLayer(layer.id);
                  setOpen(false); // Close the sheet when a layer is selected
                }}
              >
                <div className="relative p-4 flex items-center w-full">
                  <div className="flex gap-4 items-center h-8 w-full justify-between">
                    {!layer.url ? (
                      <p className="text-xs font-medium justify-self-end">
                        New Layer
                      </p>
                    ) : null}
                    <LayerImage layer={layer} />
                    <LayerInfo layer={layer} layerIndex={index} />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
          <div className="sticky justify-center w-full p-4 bottom-0 bg-card flex gap-2 shrink-0">
            <Button
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
              className="w-full flex gap-2 justify-center"
            >
              <span>Create Layer</span>
              <Layers2 className="text-white" size={18} />
            </Button>
          </div>
        </Card>
      </SheetContent>
    </Sheet>
  );
}
