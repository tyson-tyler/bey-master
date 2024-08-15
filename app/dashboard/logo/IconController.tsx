import { Slider } from "@/components/ui/slider";
import { Smile } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import ColorPickerController from "./ColorPickerController";
import { UpdateStrogeContext } from "@/app/constants/UpdateStrageContext";
import IconList from "./IconList";
import BackgroundController from "./BackgroundController";

const IconController = () => {
  const storageValue = JSON.parse(localStorage.getItem("value") || "{}");
  const [size, setSize] = useState(storageValue ? storageValue?.iconSize : 280);
  const [rotate, setRotate] = useState(
    storageValue ? storageValue?.iconRotate : 0
  );
  const [color, setColor] = useState(
    storageValue ? storageValue.iconColor : "#000"
  );
  const { updateStorage, setUpdateStorage }: any =
    useContext(UpdateStrogeContext);
  const [icon, setIcon] = useState(storageValue ? storageValue?.icon : "Smile");

  useEffect(() => {
    const updatedValue = {
      ...storageValue,
      iconSize: size,
      iconRotate: rotate,
      iconColor: color,
      icon: icon,
    };

    setUpdateStorage(updatedValue);

    localStorage.setItem("value", JSON.stringify(updatedValue));
  }, [size, rotate, color, icon]);

  return (
    <div className="dark:text-white text-black">
      <div>
        <IconList selectedIcon={(icon: any) => setIcon(icon)} />
        <div className="py-2">
          <label className="p-2 flex justify-between items-center">
            Size <span>{size} px </span>
          </label>
          <Slider
            className="dark:bg-gray-700 bg-gray-50"
            defaultValue={[280]}
            max={412}
            step={1}
            onValueChange={(event) => setSize(event[0])}
          />
        </div>
      </div>
      <div className="py-2">
        <label className="p-2 flex justify-between items-center">
          Icon Color
        </label>
        <div className="p-[20px] flex justify-center items-center">
          <ColorPickerController
            hideController={true}
            selectedColor={(color: any) => setColor(color)}
          />
        </div>
      </div>
    </div>
  );
};

export default IconController;
