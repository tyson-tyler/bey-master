"use client";
import { Layer } from "@/server/layer-store";
import Image from "next/image";

export default function LayerImage({ layer }: { layer: Layer }) {
  if (layer.url && layer.name)
    return (
      <div className="w-12 h-12 justify-center flex items-center">
        <Image
          className="w-full object-contain justify-center h-full rounded-md mr-2"
          alt="lya"
          src={layer.format === "mp4" ? layer.poster || layer.url : layer.url}
          width={50}
          height={50}
        />
        <div>
          <p className="text-xs">{`${layer.name?.slice(0, 1)}.${
            layer.format
          }`}</p>
        </div>
      </div>
    );
}
