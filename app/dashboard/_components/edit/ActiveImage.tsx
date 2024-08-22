import { useImageStore } from "@/server/image-store";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Layer, useLayerStore } from "@/server/layer-store";
import { motion } from "framer-motion";
import ImageComparison from "../layers/image-comparison";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";

export default function ActiveImage() {
  const generating = useImageStore((state) => state.generating);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const layerComparisonMode = useLayerStore(
    (state) => state.layerComparisonMode
  );
  const comparedLayers = useLayerStore((state) => state.comparedLayers);
  const layers = useLayerStore((state) => state.layers);

  if (!activeLayer.url && comparedLayers.length === 0) return null;

  const renderLayer = (layer: Layer) => (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="fixed top-2 lg:left-[12.5rem] left-[0.5rem] md:left-[0.5rem] z-50">
        <Link href={"/dashboard"}>
          <Button className="lg:flex p-4 flex lg:rounded-md md:rounded-full">
            <ArrowBigLeft className="w-5 h-5 text-white mr-0 lg:mr-2" />
            <span className="lg:flex md:hidden hidden">Back</span>
          </Button>
        </Link>
      </div>
      {layer.resourceType === "image" && (
        <Image
          alt={layer.name || "Image"}
          src={layer.url || ""}
          fill={true}
          className={cn(
            "rounded-lg object-contain bg-white shadow-lg dark:bg-gray-950",
            generating ? "animate-pulse" : ""
          )}
        />
      )}
      {layer.resourceType === "video" && (
        <video
          width={layer.width}
          height={layer.height}
          controls
          className="rounded-lg object-contain bg-white dark:bg-gray-950 shadow-lg max-w-full max-h-full"
          src={layer.transcriptionURL || layer.url}
        />
      )}
    </div>
  );

  if (layerComparisonMode && comparedLayers.length > 0) {
    const comparisonLayers = comparedLayers
      .map((id) => layers.find((l) => l.id === id))
      .filter(Boolean) as Layer[];

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full relative mb-6 md:mb-[53px] lg:mb-0  lg:p-24 sm:p-6 p-6 bg-secondary dark:bg-gray-900 flex flex-col items-center justify-center"
      >
        <ImageComparison layers={comparisonLayers} />
      </motion.div>
    );
  }

  return (
    <div className="w-full relative mb-[50px] sm:mb-[55px] md:mb-[53px] lg:mb-0 dark:bg-gray-900  lg:p-24 sm:p-6 p-6 bg-secondary flex flex-col items-center justify-center">
      {renderLayer(activeLayer)}
    </div>
  );
}
