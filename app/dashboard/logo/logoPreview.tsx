"use client";
import { UpdateStrogeContext } from "@/app/constants/UpdateStrageContext";
import { icons, LucideIcon } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaDownload } from "react-icons/fa6";

// Define types for props and state
interface LogoPreviewProps {
  downloadIcon: boolean; // Change according to actual type if needed
}

interface StorageValue {
  bgPadding?: string;
  bgRounded?: number;
  bgColor?: string;
  icon?: string;
  iconSize?: number;
  iconColor?: string;
  iconRotate?: number;
}

const LogoPreview: React.FC<LogoPreviewProps> = ({ downloadIcon }) => {
  const [storageValue, setStorageValue] = useState<StorageValue | null>(null);
  const { updateStorage, setUpdateStorage } = useContext(
    UpdateStrogeContext
  ) || { updateStorage: {}, setUpdateStorage: () => {} };
  const BASE_URL = "https://logoexpress.tubeguruji.com";
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  useEffect(() => {
    const storedData = localStorage.getItem("value");
    const parsedData = storedData ? JSON.parse(storedData) : {};
    setStorageValue(parsedData);
  }, [updateStorage]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // md breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (downloadIcon) {
      downloadPngLogo();
    }
  }, [downloadIcon]);

  const downloadPngLogo = () => {
    const downloadLogoDiv = document.getElementById("downloadLogoDiv");

    if (downloadLogoDiv) {
      html2canvas(downloadLogoDiv, {
        backgroundColor: null,
      }).then((canvas) => {
        const pngImage = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngImage;
        downloadLink.download = "myaimix_logo";
        downloadLink.click();
      });
    }
  };

  const Icon = ({
    name,
    color,
    size,
    rotate,
  }: {
    name: string;
    color?: string;
    size?: number;
    rotate?: number;
  }) => {
    const LucidIcon = icons[name as keyof typeof icons] as
      | LucideIcon
      | undefined;
    if (!LucidIcon) {
      return null;
    }

    return (
      <LucidIcon
        color={color}
        size={size}
        style={{
          transform: `rotate(${rotate}deg)`,
        }}
        className="max-h-full max-w-full"
      />
    );
  };

  return (
    <>
      <div
        id="downloadLogoDiv" // Add the ID here
        className="lg:w-[500px] lg:h-[500px] md:w-[400px] md:h-[400px] sm:w-[300px] sm:h-[300px] w-[300px] h-[300px] bg-gray-200 dark:bg-gray-950 outline-dotted flex justify-center items-center  outline-gray-300 dark:outline-gray-700 rounded-md"
        style={{
          padding: storageValue?.bgPadding,
        }}
      >
        <div
          className="h-full w-full flex justify-center items-center"
          style={{
            borderRadius: storageValue?.bgRounded || 0,
            background: storageValue?.bgColor || "#fff",
          }}
        >
          {storageValue?.icon?.includes(".png") ? (
            <img
              src={BASE_URL + "/png/" + storageValue?.icon}
              style={{
                height: storageValue?.iconSize,
                width: storageValue?.iconSize,
              }}
              className="max-h-full max-w-full"
            />
          ) : (
            <Icon
              name={storageValue?.icon || ""}
              color={storageValue?.iconColor}
              size={storageValue?.iconSize}
              rotate={storageValue?.iconRotate}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default LogoPreview;
