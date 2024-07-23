import ImageGenerator from "@/components/ImageGenerator";
import React from "react";

const page = () => {
  return (
    <div>
      {/* <h1 className="text-4xl sm:text-5xl text-center p-3 my-4 md:text-6xl lg:text-7xl xl:text-8xl font-bold text-transparent bg-clip-text animate-gradient1 bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 transition duration-1000 ease-in-out">
        Generate Image
      </h1> */}
      <ImageGenerator />
    </div>
  );
};

export default page;
