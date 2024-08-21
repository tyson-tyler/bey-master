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
import { Crop, RefreshCcw, ScanFace, Square } from "lucide-react";
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
import TikTok from "../icons/tiktok";
import Image from "next/image";
import Youtube from "../icons/youtube";
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
  const [loading, setLoading] = useState("fasle");

  // GSAP Animation on card selection
  useEffect(() => {
    const cards = document.querySelectorAll(".smart-crop-card");
    gsap.to(cards, {
      scale: 1.05,
      borderColor: "blue",
      ease: "power2.out",
      duration: 0.3,
      paused: true,
      clearProps: "all",
    });
    gsap.utils.toArray(cards).forEach((card: any) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, { scale: 1.05, borderColor: "blue" });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { scale: 1, borderColor: "transparent" });
      });
    });
  }, [aspectRatio]);

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
          <span className="flex gap-1 items-center flex-col text-[9px] font-medium">
            Smart Crop
            <Crop size={18} />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <div className="flex flex-col h-full">
          <div className="space-y-2 pb-4">
            <h3 className="font-medium text-center py-2 leading-none">
              Smart Recrop
            </h3>
          </div>
          <h4 className="text-md font-medium pb-2">Format</h4>
          <div className={"flex gap-4 items-center justify-center pb-2"}>
            <Card
              className={cn(
                aspectRatio === "16:9"
                  ? "shadow-xl border-2 border-purple-500"
                  : "",
                "p-4 w-36 cursor-pointer smart-crop-card "
              )}
              onClick={() => setAspectRatio("16:9")}
            >
              <CardHeader className="text-center p-0">
                <CardTitle className="text-md">Youtube</CardTitle>
                <CardDescription>
                  <p className="text-sm font-bold">16:9</p>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-0 pt-2">
                <Youtube />
              </CardContent>
            </Card>
            <Card
              className={cn(
                aspectRatio === "9:16"
                  ? "shadow-xl border-2 border-purple-500"
                  : "",
                "p-4 w-36 cursor-pointer smart-crop-card border-transparent border-2"
              )}
              onClick={() => setAspectRatio("9:16")}
            >
              <CardHeader className="p-0 text-center">
                <CardTitle className="text-md">Tiktok</CardTitle>
                <CardDescription>
                  <p className="text-sm font-bold">9:16</p>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-0 pt-2">
                <TikTok />
              </CardContent>
            </Card>
            <Card
              className={cn(
                aspectRatio === "1:1"
                  ? "shadow-xl border-2 border-purple-500"
                  : "",
                "p-4 w-36 cursor-pointer smart-crop-card border-transparent "
              )}
              onClick={() => setAspectRatio("1:1")}
            >
              <CardHeader className="p-0 text-center">
                <CardTitle className="text-md">Square</CardTitle>
                <CardDescription>
                  <p className="text-sm font-bold">1:1</p>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-0 pt-2">
                <Square className="w-10 h-10" />
              </CardContent>
            </Card>
          </div>

          <Button
            onClick={handleGenCrop}
            className="w-full mt-4"
            variant={"outline"}
            disabled={!activeLayer.url || generating}
          >
            {generating ? "Cropping..." : "Smart Crop 🎨"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
