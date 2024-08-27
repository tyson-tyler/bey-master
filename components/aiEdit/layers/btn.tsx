"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Layer } from "../layer-store";
import { useLayerStore } from "../layer-store";

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

  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        setActiveLayer(layerIndex === 0 ? layers[1].id : layers[0].id);
        removeLayer(layer.id);
      }}
      variant="destructive"
      className="flex items-center gap-2"
    >
      <Trash size={14} />
    </Button>
  );
}
