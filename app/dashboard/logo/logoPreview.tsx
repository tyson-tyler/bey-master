"use client";
import { UpdateStrogeContext } from "@/app/constants/UpdateStrageContext";
import { icons } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaDownload } from "react-icons/fa6";

const LogoPreview = ({ downloadIcon }: any) => {
  const [storageValue, setStorageValue] = useState<any>(null);
  const { updateStorage, setUpdateStorage }: any =
    useContext(UpdateStrogeContext);
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
    const downloadLogoDiv: any = document.getElementById("downloadLogoDiv");

    html2canvas(downloadLogoDiv, {
      backgroundColor: null,
    }).then((canvas) => {
      const pngImage = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngImage;
      downloadLink.download = "myaimix_logo";
      downloadLink.click();
    });
  };

  const Icon = ({ name, color, size, rotate }: any) => {
    const LucidIcon = icons[name];
    if (!LucidIcon) {
      return;
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

  const PreviewContent = ({ DownloadIcon }: any) => (
    <div
      className="w-full h-full bg-gray-200 outline-dotted flex justify-center items-center rounded-md outline-gray-300 dark:outline-gray-700 rounded-md"
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
            name={storageValue?.icon}
            color={storageValue?.iconColor}
            size={storageValue?.iconSize}
            rotate={storageValue?.iconRotate}
            className="max-h-full max-w-full"
          />
        )}
      </div>
    </div>
  );

  return (
    <>
      {isSmallScreen ? (
        <Dialog>
          <DialogTrigger asChild>
            <button className="text-blue-500 underline mb-10">
              Show Preview
            </button>
          </DialogTrigger>
          <DialogContent>
            <PreviewContent />
          </DialogContent>
        </Dialog>
      ) : (
        <div
          id="downloadLogoDiv"
          className="flex justify-center items-center mx-auto w-full h-screen sm:h-[400px] sm:w-[400px] md:h-[450px] md:w-[450px] lg:h-[500px] lg:w-[500px]"
        >
          <PreviewContent />
        </div>
      )}
    </>
  );
};

export default LogoPreview;
