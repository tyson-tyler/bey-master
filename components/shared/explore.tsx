"use client";
import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import styles from "../../app/index";
import { staggerContainer } from "../../utils/motion";

import { exploreWorlds } from "../../app/constants/next";
import ExploreCard from "../ExploreCard";
import { TitleText, TypingText } from "./text";

const Explore = () => {
  const [active, setActive] = useState("world-2");

  return (
    <section className={`${styles.paddings}`} id="explore">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <TypingText title="| The Ai Feature" textStyles="text-center" />
        <TitleText
          title={
            <>
              Choose what you want <br className="md:block hidden" /> to Ai
            </>
          }
          textStyles="text-center"
        />
        <div className="mt-[50px] flex lg:flex-row flex-col min-h-[50vh] gap-5">
          {exploreWorlds.map((world, index) => (
            <ExploreCard
              key={world.id}
              {...world}
              index={index}
              active={active}
              handleClick={setActive}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Explore;
