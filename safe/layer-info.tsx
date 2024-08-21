"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Layer, useLayerStore } from "@/server/layer-store";
import { EllipsisIcon } from "lucide-react";
import { FaTrashAlt } from "react-icons/fa";
import { VisuallyHidden } from "@reach/visually-hidden";

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

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Debugging output
    console.log("Button clicked");
    console.log("Current layers:", layers);
    console.log("Layer index:", layerIndex);

    // Ensure there are at least two layers before setting the active layer
    if (layers.length > 1) {
      const newActiveLayerId = layerIndex === 0 ? layers[1].id : layers[0].id;
      console.log("Setting active layer to:", newActiveLayerId);
      setActiveLayer(newActiveLayerId);
    } else {
      console.warn("Cannot delete the last layer.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="bg-gray-50">
          <EllipsisIcon size={12} />
        </Button>
      </DialogTrigger>
      <DialogContent className="text-black bg-gray-200 dark:bg-gray-800 dark:text-white">
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>Layer {layer.id} Information</DialogTitle>
          </VisuallyHidden>
        </DialogHeader>
        <h3 className="text-lg font-medium text-center mb-2">
          Layer {layer.id}
        </h3>
        <div className="py-4 space-y-0.5">
          <p>
            <span className="font-bold">FileName :</span> {layer.name}
          </p>
          <p>
            <span className="font-bold">Format :</span> {layer.format}
          </p>
          <p>
            <span className="font-bold">Size :</span> {layer.width}X
            {layer.height}
          </p>
        </div>
        <Button
          className="flex justify-center items-center gap-2 bg-red-500 hover:bg-red-600 hover:border-red-500 transition hover:transform hover:scale-105"
          onClick={handleDelete}
        >
          <FaTrashAlt size={16} />
          <span>Delete Layer</span>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
