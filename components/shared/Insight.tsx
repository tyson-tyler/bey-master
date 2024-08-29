"use client";

import { motion } from "framer-motion";
import styles from "../../app/index";
import { insights } from "../../app/constants/next";
import { staggerContainer } from "../../utils/motion";
import { TitleText, TypingText } from "../../components/shared/text";
import InsightCard from "./InCard";

const Insights = () => (
  <section className={`${styles.paddings} relative z-10 p-10 bg-gray-950`}>
    <motion.div
      variants={staggerContainer}
      // initial="hidden"
      // whileInView="show"
      // viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col`}
    >
      <TypingText title="| Blog Myaimix" textStyles="text-center" />
      <TitleText title={<>Blog about Myaimix</>} textStyles="text-center" />
      <div
        className="
          mt-[50px] 
         grid-container
          gap-[30px]
        "
      >
        {insights.map((item, index) => (
          <InsightCard key={`insight-${index}`} {...item} index={index + 1} />
        ))}
      </div>
    </motion.div>
  </section>
);

export default Insights;
