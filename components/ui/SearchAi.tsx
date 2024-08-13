"use client";
import { useUser } from "@clerk/nextjs";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import SkeletonLoader from "@/components/Skeleton";

import SearchBar from "./AiSearch";
import TemplateListSection from "./AiList";

const SearchSection = () => {
  const [userSearchInput, setUserSearchInput] = useState<string>();
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const galaxyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoaded) {
      setLoading(false);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (galaxyRef.current) {
      gsap.to(galaxyRef.current, {
        backgroundPosition: "0% 100%",
        repeat: -1,
        duration: 30,
        ease: "linear",
      });
    }
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[180px] sm:h-[200px] md:h-[250px] lg:h-[250px] rounded-md w-full  inset-0 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 opacity-50 animate-pulse">
        <SkeletonLoader />
      </div>
    );
  }

  return (
    <div className="relative ">
      {/* Galaxy Effect */}
      <div ref={galaxyRef} style={{ zIndex: -1 }}></div>
      <div className="relative p-[20px] flex mb-4 mt-4 flex-col justify-center items-center  rounded-md w-full bg-contain bg-left bg-fixed ">
        <div className="absolute  bg-black "></div>
        <div className="relative z-10 flex flex-col justify-center items-center text-center">
          <SearchBar
            onSearchInput={(value: string) => setUserSearchInput(value)}
            className="transition duration-300 ease-in-out transform hover:scale-105"
          />
        </div>
      </div>

      <TemplateListSection userSearchInput={userSearchInput} />
    </div>
  );
};

export default SearchSection;