"use client";
import React, { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Explore from "./explore";

const Highlights = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 0); // Simulate loading time

    return () => clearTimeout(timer);
  }, []);

  useGSAP(() => {
    if (!isLoading) {
      gsap.to("#title", { opacity: 1, y: 0, delay: 1 });
    }
  }, [isLoading]);

  return (
    <section
      id="highlights"
      className="w-screen overflow-hidden common-padding bg-zinc-950"
    >
      <div className="screen-max-width">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="spinner">
              <div className="double-bounce1"></div>
              <div className="double-bounce2"></div>
            </div>
          </div>
        ) : (
          <div>
            {/* <h1 id="title" className="section-heading text-center mb-5">
              Get the Highlights.
            </h1> */}
            <Explore />
          </div>
        )}
      </div>
      <style jsx>{`
        .spinner {
          width: 40px;
          height: 40px;
          position: relative;
        }
        .double-bounce1,
        .double-bounce2 {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #fff;
          opacity: 0.6;
          position: absolute;
          top: 0;
          left: 0;
          animation: bounce 2s infinite ease-in-out;
        }
        .double-bounce2 {
          animation-delay: -1s;
        }
        @keyframes bounce {
          0%,
          100% {
            transform: scale(0);
          }
          50% {
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default Highlights;
