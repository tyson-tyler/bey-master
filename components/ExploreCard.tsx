"use client";

import { motion } from "framer-motion";

import { fadeIn } from "../utils/motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const ExploreCard = ({
  id,
  imgUrl,
  title,
  index,
  active,
  handleClick,
  icons,
}: any) => (
  <motion.div
    variants={fadeIn("right", "spring", index * 0.5, 0.75)}
    initial={{ scale: 1 }}
    animate={active === id ? { scale: 1 } : { scale: 1 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
    className={`relative ${
      active === id ? "lg:flex-[3.5] flex-[10] lg" : "lg:flex-[0.5] flex-[2]"
    } flex items-center justify-center min-w-[170px] h-[600px] transition-[flex] duration-[0.7s] ease-out-flex cursor-pointer`}
    onClick={() => handleClick(id)}
  >
    <Image
      src={imgUrl}
      width={2000}
      height={2000}
      alt="planet-04"
      className="absolute w-full h-full object-cover rounded-[24px]"
    />
    {active !== id ? (
      <h3 className="font-semibold sm:text-[26px] text-[18px] text-white absolute z-0 lg:bottom-20 lg:rotate-[-90deg] lg:origin-[0,0]">
        {title}
      </h3>
    ) : (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute bottom-0 p-8 flex justify-start w-full flex-col bg-[rgba(0,0,0,0.5)] rounded-b-[24px]"
      >
        <h2 className="mt-[24px] font-semibold sm:text-[32px] text-[24px] text-white">
          {title}
        </h2>
        <Link href={icons}>
          {" "}
          <Button className="mt-5">Vist Now</Button>
        </Link>
      </motion.div>
    )}
  </motion.div>
);

export default ExploreCard;
