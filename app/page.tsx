"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";

import Navbar from "@/components/shared/navbar";
import Hero from "@/components/shared/Hero";
import SkeletonLogo from "@/components/shared/logo";
import Footer from "@/components/shared/Footer";
import Preloader from "@/components/shared/preloader";

const World = dynamic(() => import("@/components/shared/World"), {
  ssr: false,
  loading: () => <SkeletonLogo />,
});
const Insights = dynamic(() => import("@/components/shared/Insight"), {
  ssr: false,
  loading: () => <SkeletonLogo />,
});

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 0); // Simulate loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full bg-black text-white">
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <Navbar />
          <Hero />

          <World />
          <Insights />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Page;
