"use client";
import Header from "@/components/logo/Header";
import React, { useState, useEffect, useRef } from "react";
import IconController from "./IconController";
import BackgroundController from "./BackgroundController";
import LogoPreview from "./logoPreview";
import { UpdateStrogeContext } from "@/app/constants/UpdateStrageContext";
import { gsap } from "gsap";

const Page = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [updateStorage, setUpdateStorage] = useState({});
  const [downloadIcon, setDownloadIcon] = useState();

  const contentRef = useRef(null);

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
          selectedIndex={(value: any) => {
            setSelectedIndex(value);
          }}
          DownloadIcon={setDownloadIcon}
        />

        <div
          ref={contentRef}
          className="flex flex-col md:flex-row w-full mt-2 md:mt-4 lg:mt-3"
        >
          <div className="w-full md:w-1/3 lg:px-5 lg:pt-3">
            {selectedIndex === 0 ? (
              <IconController />
            ) : (
              <BackgroundController />
            )}
          </div>
          <div className="w-full md:w-2/3 p-2 dark:text-white text-black">
            <LogoPreview downloadIcon={downloadIcon} />
          </div>
        </div>
      </div>
    </UpdateStrogeContext.Provider>
  );
};

export default Page;
