"use client";

import { useImageStore } from "@/server/image-store";
import { Button } from "@/components/ui/button";
import { replaceBackground } from "@/server/bg-replace";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageOff } from "lucide-react";
import { useLayerStore } from "@/server/layer-store";
import { useState } from "react";

export default function AIBackgroundReplace() {
  const setGenerating = useImageStore((state) => state.setGeneration);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const addLayer = useLayerStore((state) => state.addLayer);
  const generating = useImageStore((state) => state.generating);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);

  const [prompt, setPrompt] = useState("");

  return (
    <Popover>
      <PopoverTrigger disabled={!activeLayer?.url} asChild>
        <Button
          variant="outline"
          className="py-8 hover:bg-transparent transform transition-all hover:scale-105"
        >
          <span className="flex gap-1 items-center justify-center flex-col text-[9px] font-medium">
            <span className="hidden lg:flex">BG Replace</span>
            <ImageOff size={18} />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="lg:w-full md:w-[75%] sm:w-[75%] w-[75%]">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">
              Generative Background Replace
            </h4>
            <p className="text-sm text-muted-foreground">
              Replace the background of your image with AI-generated content.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col items-center gap-4">
              <Label htmlFor="prompt">Prompt (optional)</Label>
              <input
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the new background"
                className="col-span-2 w-full h-8 border-2 border-black dark:border-white rounded-md p-5"
              />
            </div>
          </div>
        </div>
        <Button
          disabled={!activeLayer?.url || generating}
          className="w-full mt-4"
          onClick={async () => {
            setGenerating(true);
            const res = await replaceBackground({
              prompt: prompt,
              activeImage: activeLayer.url!,
            });

            if (res?.data?.success) {
              const newLayerId = crypto.randomUUID();
              addLayer({
                id: newLayerId,
                name: "bg-replaced-" + activeLayer.name,
                format: activeLayer.format,
                height: activeLayer.height,
                width: activeLayer.width,
                url: res.data.success,
                publicId: activeLayer.publicId,
                resourceType: "image",
              });
              setGenerating(false);
              setActiveLayer(newLayerId);
            }
          }}
        >
          {generating ? "Generating..." : "Replace Background"}
        </Button>
      </PopoverContent>
    </Popover>
  );
}
