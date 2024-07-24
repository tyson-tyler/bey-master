"use client";
import React, { useEffect, useRef } from "react";
import { TEMPLATE } from "../_components/TemplateListSection";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { CiLocationArrow1 } from "react-icons/ci";

function TemplateCard(item: TEMPLATE) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;

    if (card) {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.05,
          boxShadow: "0 20px 30px rgba(0,0,0,0.1)",

          ease: "power3.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          boxShadow: "0 10px 15px rgba(0,0,0,0.1)",

          ease: "power3.out",
        });
      });

      return () => {
        card.removeEventListener("mouseenter", () => {});
        card.removeEventListener("mouseleave", () => {});
      };
    }
  }, []);

  return (
    <div className="w-full max-w-fit border-0 !bg-transparent sm:max-w-[356px]">
      <Link href={"/dashboard/content/" + item?.slug}>
        <div className="h-[380px] w-full" ref={cardRef}>
          <img
            src={item.icon}
            width={384}
            height={540}
            alt={item.name}
            className="h-full rounded-md object-cover"
          />
        </div>
        {/* <div className="p-4 text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {item.name}
          </h3>
          <p className="text-gray-700 text-[10px] sm:text-[12px] md:text-[15px] lg:text-[16px] dark:text-gray-300">
            {item.desc}
          </p>
        </div> */}

        <div className="flex justify-between mt-4 mb-2 p-0">
          <div className="dark:text-white text-black font-semibold line-clamp-1 w-full text-left">
            {item.name}
          </div>
        </div>
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center">
            <CiLocationArrow1 className="text-black w-5 h-5  dark:text-gray-500 dark:hover:text-white" />
          </div>

          <span className="font-semibold text-sm text-black dark:text-gray-500 dark:hover:text-white">
            Vist Now
          </span>
        </div>
      </Link>
    </div>
  );
}

export default TemplateCard;
