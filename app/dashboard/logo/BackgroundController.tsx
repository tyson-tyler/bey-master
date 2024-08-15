"use client";
import { Slider } from "@/components/ui/slider";
import React, { useContext, useEffect, useState } from "react";
import ColorPickerController from "./ColorPickerController";
import { UpdateStrogeContext } from "@/app/constants/UpdateStrageContext";
import IconController from "./IconController";

const BackgroundController = () => {
  const storageValue = JSON.parse(localStorage.getItem("value") || "{}");
  const [rounded, setRounded] = useState(
    storageValue ? storageValue.bgRounded : 0
  );
  const [padding, setPadding] = useState(
    storageValue ? storageValue.bgPadding : 0
  );
  const [color, setColor] = useState(
    storageValue ? storageValue.bgColor : "#000"
  );

  const { updateStorage, setUpdateStorage }: any =
    useContext(UpdateStrogeContext);

  useEffect(() => {
    const updatedValue = {
      ...storageValue,
      bgRounded: rounded,
      bgPadding: padding,
      bgColor: color,
    };
    setUpdateStorage(updatedValue);
    localStorage.setItem("value", JSON.stringify(updatedValue));
  }, [rounded, padding, color]);

  return (
    <div className="p-6">
      <IconController />

      {/* <div className="py-2 flex flex-col md:flex-row text-black dark:text-white">
        <label className="p-2 flex justify-between items-center">
          Rounded
        
        </label>
        <Slider
          defaultValue={[0]}
          max={250}
          step={1}
          onValueChange={(event) => setRounded(event[0])}
        />
        <label className="p-2 flex justify-between items-center">
          Padding
        </label>
        <Slider
          defaultValue={[0]}
          max={250} 
          step={1}
          onValueChange={(event) => setPadding(event[0])}
        />
      </div> */}
      {/* <div className="py-2">
        <label className="p-2 dark:text-white text-black flex justify-between items-center w-full">
          Background Color
        </label>
        <div className="p-[20px] flex justify-center mb-4 md:mb-3">
          <ColorPickerController
            hideController={false}
            selectedColor={(color: any) => setColor(color)}
          />
        </div>
      </div> */}
    </div>
  );
};

export default BackgroundController;
