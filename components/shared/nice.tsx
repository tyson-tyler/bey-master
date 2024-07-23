import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SpaceSVG from "./hero1";

const HeroSection: React.FC = () => {
  const starsRef = useRef(null);
  const solarSystemRef = useRef(null);
  const titleRef = useRef(null);
  const taglineRef = useRef(null);

  useEffect(() => {
    // GSAP animation
    const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

    tl.from(starsRef.current, { opacity: 0, duration: 2, stagger: 0.1 })
      .from(
        solarSystemRef.current,
        { scale: 0, duration: 1.5, ease: "back.out(1.7)" },
        "-=1"
      )
      .from(titleRef.current, { opacity: 0, y: -50, duration: 1 }, "-=0.5")
      .from(taglineRef.current, { opacity: 0, y: 50, duration: 1 }, "-=0.5");
  }, []);

  return (
    <div className="relative overflow-hidden h-screen">
      <SpaceSVG />

      <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-4"
        >
          Your Title Here
        </h1>
        <p
          ref={taglineRef}
          className="text-lg md:text-xl lg:text-2xl text-center"
        >
          Your tagline here
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
