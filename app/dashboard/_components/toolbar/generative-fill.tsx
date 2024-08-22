import React, { useMemo, useState } from "react";
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
import { Crop, Loader } from "lucide-react";
import { useLayerStore } from "@/server/layer-store";
import { AnimatePresence, motion } from "framer-motion";

const PREVIEW_SIZE = 250;
const EXPANSION_THRESHOLD = 250; // px

export default function GenerativeFill() {
  const setGenerating = useImageStore((state) => state.setGeneration);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const addLayer = useLayerStore((state) => state.addLayer);
  const layers = useLayerStore((state) => state.layers);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const generating = useImageStore((state) => state.generating);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);

  const previewStyle = useMemo(() => {
    if (!activeLayer.width || !activeLayer.height) return {};

    const newWidth = activeLayer.width + width;
    const newHeight = activeLayer.height + height;

    const scale = Math.min(PREVIEW_SIZE / newWidth, PREVIEW_SIZE / newHeight);

    return {
      width: `${newWidth * scale}px`,
      height: `${newHeight * scale}px`,
      backgroundImage: `url(${activeLayer.url})`,
      backgroundSize: `${activeLayer.width * scale}px ${
        activeLayer.height * scale
      }px`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      position: "relative" as const,
    };
  }, [activeLayer, width, height]);

  const previewOverlayStyle = useMemo(() => {
    if (!activeLayer.width || !activeLayer.height) return {};

    const scale = Math.min(
      PREVIEW_SIZE / (activeLayer.width + width),
      PREVIEW_SIZE / (activeLayer.height + height)
    );

    const leftWidth = width > 0 ? `${(width / 2) * scale}px` : "0";
    const rightWidth = width > 0 ? `${(width / 2) * scale}px` : "0";
    const topHeight = height > 0 ? `${(height / 2) * scale}px` : "0";
    const bottomHeight = height > 0 ? `${(height / 2) * scale}px` : "0";

    return {
      position: "absolute" as const,
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      boxShadow: `inset ${leftWidth} ${topHeight} 0 rgba(48, 119, 255, 1), 
                  inset -${rightWidth} ${topHeight} 0 rgba(48, 119, 255, 1), 
                  inset ${leftWidth} -${bottomHeight} 0 rgba(48, 119, 255, 1), 
                  inset -${rightWidth} -${bottomHeight} 0 rgba(48, 119, 255,1)`,
    };
  }, [activeLayer, width, height]);

  const handleGenFill = async () => {
    setGenerating(true);
    const res = await genFill({
      width: (width + activeLayer.width!).toString(),
      height: (height + activeLayer.height!).toString(),
      aspect: "1:1",
      activeImage: activeLayer.url!,
    });
    if (res?.data?.success) {
      console.log(res.data.success);
      setGenerating(false);
      const newLayerId = crypto.randomUUID();
      addLayer({
        id: newLayerId,
        name: "generative-fill",
        format: activeLayer.format,
        height: height + activeLayer.height!,
        width: width + activeLayer.width!,
        url: res.data.success,
        publicId: activeLayer.publicId,
        resourceType: "image",
      });
      setActiveLayer(newLayerId);
    }
    if (res?.data?.error) {
      console.log(res.data.error);
      setGenerating(false);
    }
  };

  const ExpansionIndicator = ({
    value,
    axis,
  }: {
    value: number;
    axis: "x" | "y";
  }) => {
    const isVisible = Math.abs(value) >= EXPANSION_THRESHOLD;
    const position =
      axis === "x"
        ? {
            top: "50%",
            [value > 0 ? "right" : "left"]: 0,
            transform: "translateY(-50%)",
          }
        : {
            left: "50%",
            [value > 0 ? "bottom" : "top"]: 0,
            transform: "translateX(-50%)",
          };

    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute bg-primary text-white px-2 py-1 rounded-md text-xs font-bold"
            style={position}
          >
            {Math.abs(value)}px
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <Popover>
      <PopoverTrigger
        className="text-black dark:text-white"
        disabled={!activeLayer?.url}
        asChild
      >
        <Button
          variant="outline"
          className="py-8 hover:bg-transparent transform transition-all hover:scale-105"
          style={{ position: "relative" }}
        >
          <span className="flex text-[9px] gap-1 items-center justify-center flex-col font-medium">
            <span className="hidden lg:flex">Generative Fill</span>
            <Crop size={18} />
          </span>
        </Button>
      </PopoverTrigger>
      <AnimatePresence>
        {activeLayer?.url && (
          <PopoverContent
            className="w-full max-w-sm shadow-lg rounded-lg p-4 bg-white dark:bg-gray-800"
            asChild
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col h-full">
                <div className="space-y-2">
                  <h4 className="font-medium text-center py-2 leading-none">
                    Generative Fill
                  </h4>
                  {activeLayer.width && activeLayer.height ? (
                    <div className="flex flex-row justify-between items-center md:items-start">
                      <div className="flex flex-col gap-1 items-center">
                        <span className="text-xs">Current Size:</span>
                        <p className="text-sm text-primary font-bold">
                          {activeLayer.width}X{activeLayer.height}
                        </p>
                      </div>
                      <div className="flex flex-col items-center mt-2 md:mt-0">
                        <span className="text-xs">New Size:</span>
                        <p className="text-sm text-primary font-bold">
                          {activeLayer.width + width}X
                          {activeLayer.height + height}
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="flex flex-col md:flex-row gap-2 items-center justify-center mt-4">
                  <div className="text-center w-full">
                    <Label htmlFor="maxWidth">Modify Width</Label>
                    <Input
                      name="width"
                      type="range"
                      max={activeLayer.width}
                      value={width}
                      onChange={(e) => setWidth(parseInt(e.target.value))}
                      className="h-8"
                    />
                  </div>
                  <div className="text-center w-full mt-2 md:mt-0">
                    <Label htmlFor="maxHeight">Modify Height</Label>
                    <Input
                      name="height"
                      type="range"
                      min={-activeLayer.height! + 100}
                      max={activeLayer.height}
                      value={height}
                      step={2}
                      onChange={(e) => setHeight(parseInt(e.target.value))}
                      className="h-8"
                    />
                  </div>
                </div>
                {/* Preview */}
                <div
                  className="preview-container flex-grow mt-4"
                  style={{
                    width: `${PREVIEW_SIZE}px`,
                    height: `${PREVIEW_SIZE}px`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className="preview" style={previewStyle}>
                    <div
                      className="preview-overlay"
                      style={previewOverlayStyle}
                    />
                  </div>
                </div>

                {/* Expansion Indicators */}
                <ExpansionIndicator value={width} axis="x" />
                <ExpansionIndicator value={height} axis="y" />

                {/* Button */}
                <div className="flex justify-center mt-4">
                  <Button
                    disabled={generating}
                    onClick={handleGenFill}
                    className="w-full py-2"
                  >
                    {generating ? (
                      <div className="flex">
                        <Loader className="w-5 h-5 mr-2" />
                        Generating...
                      </div>
                    ) : (
                      "🖌️ Generate"
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </PopoverContent>
        )}
      </AnimatePresence>
    </Popover>
  );
}
