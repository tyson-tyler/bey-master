"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { icons } from "lucide-react";
import { iconList } from "../../constants/icons";
import axios from "axios";

const IconList = ({ selectedIcon }: any) => {
  const [openDialog, setOpenDialog] = useState(false);

  const storageValue = JSON.parse(localStorage.getItem("value") || "{}");
  const [icon, setIcon] = useState(storageValue ? storageValue?.icon : "Smile");

  const Icon = ({ name, color, size }: any) => {
    const LucideIcon = icons[name as keyof typeof icons];
    if (!LucideIcon) {
      return null;
    }
    return <LucideIcon color={color} size={size} />;
  };

  return (
    <div>
      <div>
        <label>Icon</label>
        <div
          onClick={() => setOpenDialog(true)}
          className="p-3 flex justify-center items-center my-2 cursor-pointer bg-gray-200 dark:bg-gray-800 dark:text-white text-black rounded-md w-[50px] h-[50px]"
        >
          <Icon name={icon} size={20} />
        </div>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="text-black dark:text-white">
          <DialogHeader>
            <DialogTitle className="text-black dark:text-white">
              Choose the Icon for Logo
            </DialogTitle>
            <DialogDescription>
              <div
                className="flex flex-wrap justify-center gap-4
              overflow-auto max-w-xl h-[300px] 
              cursor-pointer"
              >
                {iconList.map((iconName, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      if (iconName) {
                        selectedIcon(iconName);
                        setOpenDialog(false);
                        setIcon(iconName);
                      } else {
                        console.warn("Undefined iconName selected");
                      }
                    }}
                    className="border p-3 flex rounded-sm justify-center items-center hover:bg-gray-200 transform hover:scale-105 transition dark:text-white text-black dark:hover:bg-gray-800"
                  >
                    <Icon name={iconName} size={20} />
                  </div>
                ))}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IconList;
