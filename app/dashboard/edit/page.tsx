"use client";
import React, { useEffect, useRef } from "react";
import Topbar from "@/components/Topbar";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { Bot } from "lucide-react";
import Link from "next/link";

const LandingPage = () => {
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const buttonRef = useRef(null);
  const iconRefs = useRef([]);
  const starsRef = useRef(null); // Reference for the stars
  const chipRefs = useRef([]); // Reference for computing chips

  useEffect(() => {
    // Heading animation with gradient
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.5,
        onComplete: () =>
          gsap.to(headingRef.current, {
            backgroundImage: "linear-gradient(90deg, #ff8c00, #ff0080)",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            duration: 2,
          }),
      }
    );

    // Subheading animation with fade in
    gsap.fromTo(
      subheadingRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 1,
      }
    );

    // Button animation with a bounce effect
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "bounce.out",
        delay: 1.5,
      }
    );

    // Star animation - Creating twinkling and moving stars
    gsap.to(starsRef.current, {
      backgroundPosition: "200% 200%",
      duration: 60,
      ease: "linear",
      repeat: -1,
    });

    // Icons animation with hover effect
    iconRefs.current.forEach((icon, index) => {
      gsap.to(icon, {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        rotation: "random(-15, 15)",
        duration: "random(4, 6)",
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        delay: index * 0.3,
      });

      // Interactive hover effect
      icon.addEventListener("mouseenter", () => {
        gsap.to(icon, { scale: 1.2, duration: 0.3 });
      });
      icon.addEventListener("mouseleave", () => {
        gsap.to(icon, { scale: 1, duration: 0.3 });
      });
    });

    // Computing chips animation
    chipRefs.current.forEach((chip, index) => {
      gsap.to(chip, {
        y: "random(-30, 30)",
        x: "random(-30, 30)",
        rotation: "random(-30, 30)",
        duration: "random(6, 8)",
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: index * 0.4,
      });
    });
  }, []);

  return (
    <>
      <Topbar />
      <main
        ref={starsRef}
        className="relative min-h-screen flex flex-col justify-center items-center dark:bg-black bg-gray-50 dark:text-white text-black overflow-hidden"
      >
        {/* Star Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="w-full h-full bg-[url('/path-to-your-star-image.png')] bg-cover bg-center opacity-50"></div>
        </div>

        {/* Computing Chips Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <svg
              key={i}
              ref={(el) => (chipRefs.current[i] = el)}
              className="absolute w-20 h-20 text-gray-300 opacity-20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-4-8h2v2H8v-2zm6 0h2v2h-2v-2zm-6-2h2v2H8v-2zm6 0h2v2h-2v-2zm-4 0h2v2h-2v-2zm4 2h2v2h-2v-2zm0 0h-2v-2h2v2zm2 0h2v-2h-2v2zm0 0h2v-2h-2v2zm0-4h-2v-2h2v2zm-4 0h-2v-2h2v2zm4 4h2v2h-2v-2zm-2-4h2v-2h-2v2zm0 4h2v-2h-2v2zm0-4h2v-2h-2v2zm-4 0h-2v-2h2v2zm0 0H8v2h2v-2zm2-4H8v2h2v-2zm0 0H8v2h2v-2zm0 0h-2v-2h2v2zm0 4h2v2h-2v-2zm-4 2h2v2H8v-2zm4-2h-2v2h2v-2zm0 0h2v-2h-2v2zm0-4h-2v-2h2v2z"
              />
            </svg>
          ))}
        </div>

        {/* Animated AI-Themed Icons */}
        <div className="absolute inset-0 flex justify-center items-center overflow-hidden pointer-events-none">
          {/* AI Brain Icon */}
          <svg
            ref={(el) => (iconRefs.current[0] = el)}
            className="absolute w-24 h-24 text-blue-500 opacity-30"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 2C6.582 2 3 5.582 3 10s3.582 8 8 8 8-3.582 8-8S15.418 2 11 2zm0 14a5.978 5.978 0 01-4.242-1.758A5.978 5.978 0 015 10a5.978 5.978 0 011.758-4.242A5.978 5.978 0 0111 4a5.978 5.978 0 014.242 1.758A5.978 5.978 0 0117 10a5.978 5.978 0 01-1.758 4.242A5.978 5.978 0 0111 16z"
            />
          </svg>

          {/* AI Process Icon */}
          <svg
            ref={(el) => (iconRefs.current[1] = el)}
            className="absolute w-32 h-32 text-purple-500 opacity-30"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>

          {/* AI Imagination Icon */}
          <svg
            ref={(el) => (iconRefs.current[2] = el)}
            className="absolute w-28 h-28 text-yellow-500 opacity-30"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.75 12.004L11.25 7H7v7h1.5zm7.5 0L12.75 7H17v7h-1.5zM4 19h16v2H4zm0-4h16v2H4zm0-4h16v2H4zm0-4h16v2H4z"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="z-10 text-center max-w-3xl px-6">
          <h1
            ref={headingRef}
            className="text-5xl md:text-6xl font-extrabold mb-6"
          >
            Discover AI-Generated Content
          </h1>
          <p
            ref={subheadingRef}
            className="text-lg md:text-xl text-gray-500 mb-8"
          >
            Get the best content generated by cutting-edge AI, tailored just for
            you.
          </p>
          <a href="http://www.myaimix.com/hellother" target="_blank">
            <Button
              ref={buttonRef}
              size="lg"
              className="relative flex items-center w-full gap-2 p-3 justify-center bg-gradient-to-r transition-colors from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500 text-white"
            >
              <span className="material-icons">
                <Bot className="w-5 h-5 text-white mr-2" />
              </span>{" "}
              Get Started
            </Button>
          </a>
        </div>
      </main>
    </>
  );
};

export default LandingPage;
