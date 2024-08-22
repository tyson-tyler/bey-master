"use client";
import React, { useMemo, useState, useEffect } from "react";
import { useImageStore } from "@/server/image-store";
import { Button } from "@/components/ui/button";
import { genFill } from "@/server/gen-fill";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Crop,
  Instagram,
  RefreshCcw,
  ScanFace,
  Square,
  YoutubeIcon,
} from "lucide-react";
import { useLayerStore } from "@/server/layer-store";
import { genCrop } from "@/server/smartCrop";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";
import gsap from "gsap";

export default function SmartCrop() {
  const setGenerating = useImageStore((state) => state.setGeneration);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const addLayer = useLayerStore((state) => state.addLayer);
  const layers = useLayerStore((state) => state.layers);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const generating = useImageStore((state) => state.generating);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);
  const [aspectRatio, setAspectRatio] = useState("16:9");

  const handleGenCrop = async () => {
    setGenerating(true);
    const res = await genCrop({
      height: activeLayer.height!.toString(),
      aspect: aspectRatio,
      activeVideo: activeLayer.url!,
    });

    if (res?.data?.success) {
      console.log(res.data.success);
      setGenerating(false);
      const newLayerId = crypto.randomUUID();
      const thumbnailUrl = res.data.success.replace(/\.[^/.]+$/, ".jpg");
      addLayer({
        id: newLayerId,
        name: "cropped " + activeLayer.name,
        format: activeLayer.format,
        height: height + activeLayer.height!,
        width: width + activeLayer.width!,
        url: res.data.success,
        publicId: activeLayer.publicId,
        resourceType: "video",
        poster: thumbnailUrl,
      });
      toast.success(res.data.success);
      setActiveLayer(newLayerId);
    }
    if (res?.data?.error) {
      toast.error(res.data.error);
      setGenerating(false);
    }
  };

  return (
    <Popover>
      <PopoverTrigger disabled={!activeLayer?.url} asChild>
        <Button variant="outline" className="py-8">
          <span className="flex flex-col items-center gap-1 text-[9px] font-medium">
            <span className="hidden lg:flex">Smart Crop</span>
            <Crop size={18} />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full max-w-md">
        <div className="flex flex-col h-full">
          <div className="space-y-2 pb-4">
            <h3 className="font-medium text-center py-2 leading-none">
              Smart Recrop
            </h3>
          </div>
          <h4 className="text-md font-medium pb-2">Format</h4>
          <div className="flex gap-4 items-center justify-center pb-2">
            <Card
              className={cn(
                aspectRatio === "16:9" ? "bg-red-600 text-white" : "",
                "p-4 w-24 sm:w-28 md:w-36 cursor-pointer smart-crop-card"
              )}
              onClick={() => setAspectRatio("16:9")}
            >
              <CardHeader className="text-center p-0">
                <CardTitle className="text-sm sm:text-md">Youtube</CardTitle>
                <CardDescription>
                  <p className="text-xs sm:text-sm font-bold">16:9</p>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-0 pt-2">
                <YoutubeIcon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
              </CardContent>
            </Card>
            <Card
              className={cn(
                aspectRatio === "9:16"
                  ? "shadow-xl border-2 bg-pink-800 text-white"
                  : "",
                "p-4 w-24 sm:w-28 md:w-36 cursor-pointer smart-crop-card border-transparent border-2"
              )}
              onClick={() => setAspectRatio("9:16")}
            >
              <CardHeader className="p-0 text-center">
                <CardTitle className="text-sm sm:text-md">Tiktok</CardTitle>
                <CardDescription>
                  <p className="text-xs sm:text-sm font-bold">9:16</p>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-0 pt-2">
                <Instagram className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
              </CardContent>
            </Card>
            <Card
              className={cn(
                aspectRatio === "1:1"
                  ? "shadow-xl border-2 border-purple-500 bg-blue-900 text-white"
                  : "",
                "p-4 w-24 sm:w-28 md:w-36 cursor-pointer smart-crop-card border-transparent"
              )}
              onClick={() => setAspectRatio("1:1")}
            >
              <CardHeader className="p-0 text-center">
                <CardTitle className="text-sm sm:text-md">Square</CardTitle>
                <CardDescription>
                  <p className="text-xs sm:text-sm font-bold">1:1</p>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-0 pt-2">
                <Square className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
              </CardContent>
            </Card>
          </div>

          <Button
            onClick={handleGenCrop}
            className="w-full mt-4"
            disabled={!activeLayer.url || generating}
          >
            {generating ? "Cropping..." : "Smart Crop 🎨"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
