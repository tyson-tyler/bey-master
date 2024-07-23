"use client";

import { motion } from "framer-motion";

import styles from "../../app/index";
import { newFeatures } from "../../app/constants/next";
import { TitleText, TypingText } from "../../components/shared/text";
import { planetVariants, staggerContainer, fadeIn } from "../../utils/motion";
import NewFeatures from "./NexFeature";
import Image from "next/image";
import Logo from "../../app/public/2.png";

const WhatsNew = () => (
  <section className={`${styles.paddings} relative z-10 bg-gray-950 p-10`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
    >
      <motion.div
        variants={fadeIn("right", "tween", 0.2, 1)}
        className="flex-[0.95] flex justify-center flex-col"
      >
        <TypingText title="| Whats new?" />
        <TitleText title={<>Whats new about Myaimix</>} />
        <div className="mt-[48px] flex flex-wrap justify-between gap-[24px]">
          {newFeatures.map((feature) => (
            <NewFeatures key={feature.title} {...feature} />
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={planetVariants("right")}
        className={`flex-1 ${styles.flexCenter}`}
      >
        <Image
          src={Logo}
          fill
          alt="get-started"
          className="w-[90%] h-[90%] object-contain"
        />
      </motion.div>
    </motion.div>
  </section>
);

export default WhatsNew;
