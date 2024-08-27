"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useLayerStore } from "../layer-store";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ImageIcon, VideoIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import UploadImage from "./upload-image";
import UploadVideo from "./upload-video";
import { gsap } from "gsap";

export default function UploadForm() {
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const [selectedType, setSelectedType] = useState("image");
  const layerComparisonMode = useLayerStore(
    (state) => state.layerComparisonMode
  );

  // Refs for GSAP animation
  const cardRefs: any = useRef<{
    image: HTMLDivElement | null;
    video: HTMLDivElement | null;
  }>({
    image: null,
    video: null,
  });

  useEffect(() => {
    if (selectedType && cardRefs.current[selectedType]) {
      gsap.fromTo(
        cardRefs.current[selectedType],
        { scale: 1 },
        { scale: 1.1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [selectedType]);

  if (!activeLayer.url && !layerComparisonMode)
    return (
      <div className="w-full p-4 sm:p-8 flex flex-col justify-center items-center h-full">
        {selectedType === "image" && <UploadImage />}
        {selectedType === "video" && <UploadVideo />}

        <RadioGroup
          defaultValue="image"
          onValueChange={(e) => setSelectedType(e)}
          className="flex items-center justify-center gap-4 sm:gap-8 py-4 sm:py-8"
        >
          <Card
            ref={(el) => (cardRefs.current.image = el)}
            onClick={() => setSelectedType("image")}
            className={cn(
              "flex flex-col items-center justify-center py-2 sm:py-4 px-4 sm:px-6 gap-2 sm:gap-4 cursor-pointer transform transition-all duration-300",
              selectedType === "image"
                ? "border-2 border-blue-500 shadow-lg"
                : "border"
            )}
          >
            <CardContent className="flex items-center space-x-2 p-0">
              <RadioGroupItem value="image" id="image-mode" hidden />
              <Label
                className={cn(
                  "text-sm sm:text-lg",
                  selectedType === "image"
                    ? "font-bold text-blue-500"
                    : "text-gray-600"
                )}
                htmlFor="image-mode"
              >
                Image Mode
              </Label>
            </CardContent>
            <ImageIcon
              className={cn(
                "w-8 sm:w-10 h-8 sm:h-10",
                selectedType === "image" ? "text-blue-500" : "text-gray-400"
              )}
            />
          </Card>

          <Card
            ref={(el) => (cardRefs.current.video = el)}
            onClick={() => setSelectedType("video")}
            className={cn(
              "flex flex-col items-center justify-center py-2 sm:py-4 px-4 sm:px-6 gap-2 sm:gap-4 cursor-pointer transform transition-all duration-300",
              selectedType === "video"
                ? "border-2 border-red-500 shadow-lg"
                : "border"
            )}
          >
            <CardContent className="flex items-center space-x-2 p-0">
              <RadioGroupItem value="video" id="video-mode" hidden />
              <Label
                className={cn(
                  "text-sm sm:text-lg",
                  selectedType === "video"
                    ? "font-bold text-red-500"
                    : "text-gray-600"
                )}
                htmlFor="video-mode"
              >
                Video Mode
              </Label>
            </CardContent>
            <VideoIcon
              className={cn(
                "w-8 sm:w-10 h-8 sm:h-10",
                selectedType === "video" ? "text-red-500" : "text-gray-400"
              )}
            />
          </Card>
        </RadioGroup>
      </div>
    );
}
