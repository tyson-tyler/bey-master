"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Layer, useLayerStore } from "@/server/layer-store";

export default function LayerInfo({
  layer,
  layerIndex,
}: {
  layer: Layer;
  layerIndex: number;
}) {
  const layers = useLayerStore((state) => state.layers);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);
  const removeLayer = useLayerStore((state) => state.removeLayer);

  const handleDelete = () => {
    setActiveLayer(layerIndex === 0 ? layers[1].id : layers[0].id);
    removeLayer(layer.id);
  };

  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        handleDelete();
      }}
      variant="ghost"
      className="flex  justify-center hover:border-2 hover:border-red-500 text-red-500  items-center  rounded-md"
    >
      <Trash size={14} />
    </Button>
  );
}
