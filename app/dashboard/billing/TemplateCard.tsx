"use client";
import React, { useEffect, useRef } from "react";
import { TEMPLATE } from "../_components/TemplateListSection";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

function TemplateCard(item: TEMPLATE) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;

    if (card) {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3 }
      );

      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.05,
          boxShadow: "0 20px 30px rgba(0,0,0,0.1)",
          duration: 0.3,
          ease: "power3.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
          duration: 0.3,
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
    <Link href={"/dashboard/content/" + item?.slug}>
      <div
        ref={cardRef}
        className="bg-white dark:bg-gray-800 h-[300px] sm:h-[300px] md:h-[330px] lg:h-[400px] flex justify-center items-center flex-col shadow-lg rounded-lg overflow-hidden transition-all duration-300 cursor-pointer"
      >
        <div className="relative w-full h-[200px] object-cover">
          <Image src={item.icon} fill alt={item.name} objectFit="contain" />
        </div>
        <div className="p-4 text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {item.name}
          </h3>
          <p className="text-gray-700 text-[10px] sm:text-[12px] md:text-[15px] lg:text-[16px] dark:text-gray-300">
            {item.desc}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default TemplateCard;
