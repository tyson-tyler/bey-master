"use client";

import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";
import Image from "next/image";
import Link from "next/link";

interface InsightCardProps {
  imgUrl: string;
  title: string;
  subtitle: string;
  index: number;
  id: string;
}

const InsightCard = ({
  imgUrl,
  title,
  subtitle,
  index,
  id,
}: InsightCardProps) => {
  // Function to truncate text by character limit
  const truncateText = (text: string, charLimit: number) => {
    return text.length > charLimit ? text.slice(0, charLimit) + "..." : text;
  };

  return (
    <Link href={`/blog/${id}`}>
      <motion.div
        variants={fadeIn("up", "spring", index * 0.5, 1)}
        className="flex flex-col gap-6 cursor-pointer p-4 rounded-[24px] bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
      >
        <div className="relative w-full h-52 rounded-[24px] overflow-hidden">
          <Image
            src={imgUrl}
            alt={title}
            fill
            className="object-cover transform hover:scale-105 transition-transform duration-300 ease-in-out rounded-[24px]"
          />
        </div>
        <div className="flex flex-1 flex-col justify-center">
          <h4 className="font-semibold  text-[24px] text-white leading-tight">
            {truncateText(title, 40)}
          </h4>
          <p className="mt-[10px] font-normal lg:text-[18px] text-[14px] text-gray-400 leading-relaxed">
            {truncateText(subtitle, 50)}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

export default InsightCard;
