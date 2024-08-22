"use client";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useLayerStore } from "@/server/layer-store";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowBigLeft, ImageIcon, VideoIcon } from "lucide-react";
import { gsap } from "gsap";
import UploadImage from "./upload-image";
import UploadVideo from "./upload-video";
import { Button } from "@/components/ui/button";

export default function UploadForm() {
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const [selectedType, setSelectedType] = useState("image");
  const layerComparisonMode = useLayerStore(
    (state) => state.layerComparisonMode
  );
  const imageCardRef = useRef(null);
  const videoCardRef = useRef(null);

  // GSAP animation function
  const animateCard = (ref: any, animationType: any) => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, scale: 0.8, rotateY: animationType === "flip" ? 180 : 0 },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 0.6,
          ease: animationType === "bounce" ? "bounce.out" : "power1.out",
          stagger: 0.1,
        }
      );
    }
  };

  useEffect(() => {
    // Animate selected card
    if (selectedType === "image") {
      animateCard(imageCardRef, "bounce");
      animateCard(videoCardRef, "flip");
    } else if (selectedType === "video") {
      animateCard(videoCardRef, "bounce");
      animateCard(imageCardRef, "flip");
    }
  }, [selectedType]);

  if (!activeLayer.url && !layerComparisonMode) {
    return (
      <div className="w-full relative mb-6 md:mb-[53px] lg:mb-0  lg:p-24 sm:p-0 p-0 bg-secondary dark:bg-gray-950  items-center  flex flex-col justify-center h-full">
        {selectedType === "image" ? <UploadImage /> : null}
        {selectedType === "video" ? <UploadVideo /> : null}

        <RadioGroup
          defaultValue="image"
          onValueChange={(e) => {
            setSelectedType(e);
          }}
          className="flex items-center justify-center gap-8 mb-[40px] sm:mb-[40px] md:mb-[20px] lg:mb-0 py-8"
        >
          <Card
            ref={imageCardRef}
            onClick={() => setSelectedType("image")}
            className={cn(
              "flex flex-col items-center justify-center py-4 px-6 gap-4 cursor-pointer transition-all duration-500",
              selectedType === "image"
                ? "border-blue-500 border-2"
                : "border-transparent"
            )}
          >
            <CardContent className="flex items-center space-x-2 p-0">
              <RadioGroupItem value="image" id="image-mode" hidden />
              <Label
                className={`${
                  selectedType === "image" ? "text-blue-500" : null
                }`}
                htmlFor="image-mode"
              >
                Image Mode
              </Label>
            </CardContent>
            <ImageIcon
              className={`${selectedType === "image" ? "text-blue-500" : null}`}
              size={36}
            />
          </Card>
          <Card
            ref={videoCardRef}
            onClick={() => setSelectedType("video")}
            className={cn(
              "flex flex-col items-center justify-center p-4 gap-4 cursor-pointer transition-all duration-500",
              selectedType === "video"
                ? "border-blue-500 border-2"
                : "border-transparent"
            )}
          >
            <CardContent className="flex items-center space-x-2 p-0">
              <RadioGroupItem value="video" id="video-mode" hidden />
              <Label
                className={`${
                  selectedType === "video" ? "text-blue-500" : null
                }`}
                htmlFor="video-mode"
              >
                Video Mode
              </Label>
            </CardContent>
            <VideoIcon
              className={`${selectedType === "video" ? "text-blue-500" : null}`}
              size={36}
            />
          </Card>
        </RadioGroup>
      </div>
    );
  }

  return null;
}
