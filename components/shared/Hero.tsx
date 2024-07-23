"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "../ui/button";

import SkeletonLogo from "./logo";
import { delay } from "framer-motion";

const StarAnimation = dynamic(() => import("./star"), {
  ssr: false,
  loading: () => <SkeletonLogo />,
});

const LogoScroll = dynamic(() => import("./log"), {
  ssr: false,
  loading: () => <SkeletonLogo />,
});

const Hero = () => {
  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap");
      const { CSSRulePlugin } = await import("gsap/CSSRulePlugin");

      gsap.registerPlugin(CSSRulePlugin);

      const gradientRule = CSSRulePlugin.getRule(".animate-gradient1::before");

      gsap.to("#hero", { opacity: 1 });
      gsap.to("#hero1", { opacity: 1, x: 0 });

      gsap.to("#cta", { opacity: 1, delay: 0.2, y: 0 });

      gsap.to(gradientRule, {
        duration: 5,
        backgroundImage:
          "linear-gradient(to right, #ff0080, #ff8c00, #40e0d0, #1e90ff, #ff0080)",
        repeat: -1,
        yoyo: true,
        ease: "linear",
      });
    };

    loadGSAP();
  }, []);

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p id="hero" className="hero-title">
          Ai Content Generator
        </p>
        <div className="text-center justify-center flex flex-col">
          <h1
            id="hero1"
            className="text-4xl transform opacity-0 sm:text-5xl text-center p-3 my-4 md:text-6xl lg:text-7xl xl:text-8xl font-bold transition duration-1000 ease-in-out usespan text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500"
          >
            Myaimix
          </h1>
          <div
            id="cta"
            className="flex flex-col items-center opacity-0 translate-y-20"
          >
            <Link href="/dashboard">
              <div className="flex justify-center items-center gap-3 mb-4">
                <Button>Get Started</Button>
                <Button variant="ghost">About us</Button>
              </div>
              {/* <p className="font-normal text-gray-500 text-sm px-4">
                Myaimix is an open-source AI prompting tools for the Idea for
                your project and get Solve your Problem .
              </p> */}
            </Link>
          </div>
        </div>
      </div>
      <LogoScroll />
    </section>
  );
};

export default Hero;
