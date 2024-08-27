import DropZone from "@/components/DropZone";
import Topbar from "@/components/Topbar";
import React from "react";

const page = () => {
  return (
    <div>
      <Topbar />

      <div className="space-y-16 pb-8 mt-16">
        <div className="space-y-6">
          <h1 className="text-3xl  md:text-5xl font-bold usespan text-center">
            Free Unlimited File Converter
          </h1>
          <p className="text-gray-400 text-sm md:text-lg text-center md:px-24 xl:px-44 2xl:px-52">
            The ultimate online tool for unlimited and free multimedia
            conversation. Transform images, video, audio and effortlessly,
            without restrictions . Start converting now and elevate your content
            like your never do before! For Free for life
          </p>
        </div>
        <DropZone />
      </div>
    </div>
  );
};

export default page;
