"use client";

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
import Image from "next/image";
import Hello from "../../../../app/public/i.svg";
export default function Layers() {
  const layers = useLayerStore((state) => state.layers);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const generating = useImageStore((state) => state.generating);
  const addLayer = useLayerStore((state) => state.addLayer);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);

  return (
    <Card className="basis-[320px] shrink-0 overflow-y-scroll overflow-x-hidden relative flex flex-col shadow-2xl">
      <CardHeader className="">
        <div className="flex  items-center gap-3">
          <Image src={Hello} width={40} height={40} alt="hello" />
          <div className="flex flex-col gap-1">
            <CardTitle className="text-sm">
              {activeLayer.name || "Layers"}
            </CardTitle>
            {activeLayer.width && activeLayer.height ? (
              <CardDescription>
                {activeLayer.width}x{activeLayer.height}
              </CardDescription>
            ) : null}
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-screen">
        {layers.map((layer, index) => (
          <div
            className={cn(
              "cursor-pointer ease-in-out w0 dark:hover:bg-gray-800 hover:bg-gray-200 rounded-md border border-transparent",
              { "animate-pulse": generating }
            )}
            key={layer.id}
            onClick={() => {
              if (generating) return;
              setActiveLayer(layer.id);
            }}
          >
            <div className="relative p-4 flex items-center w-full">
              <div className="flex gap-2 items-center h-8 w-full justify-between">
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
      <div className="sticky justify-center w-full p-4 bottom-0  bg-card flex gap-2 shrink-0">
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
          className="w-full flex gap-2"
          variant={"outline"}
        >
          <span>Create Layer</span>
          <Layers2 className="text-gray-500" size={18} />
        </Button>
      </div>
    </Card>
  );
}
