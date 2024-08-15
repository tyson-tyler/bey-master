import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Header from "@/components/logo/Header";
import IconController from "./IconController";
import BackgroundController from "./BackgroundController";
import LogoPreview from "./logoPreview";
import { UpdateStrogeContext } from "@/app/constants/UpdateStrageContext";

const Page: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [updateStorage, setUpdateStorage] = useState<any>({}); // Replace `any` with actual type if possible
  const [downloadIcon, setDownloadIcon] = useState<any>(undefined); // Replace `any` with actual type

  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, [selectedIndex]);

  return (
    <UpdateStrogeContext.Provider value={{ updateStorage, setUpdateStorage }}>
      <div className="w-full h-full flex flex-col items-center justify-start">
        <Header
          selectedIndex={(value: number) => {
            setSelectedIndex(value);
          }}
          DownloadIcon={setDownloadIcon}
        />

        <div
          ref={contentRef}
          className="flex flex-col-reverse justify-center w-full mt-2 md:mt-4 lg:mt-3"
        >
          <div>
            <BackgroundController />
          </div>
          <div className="w-full justify-center flex items-center p-2 dark:text-white text-black">
            <LogoPreview downloadIcon={downloadIcon} />
          </div>
        </div>
      </div>
    </UpdateStrogeContext.Provider>
  );
};

export default Page;
