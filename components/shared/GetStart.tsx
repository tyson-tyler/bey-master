"use client";

import { motion } from "framer-motion";
import styles from "../../app/index";
import { startingFeatures } from "../../app/constants/next";
import { TitleText, TypingText } from "../../components/shared/text";
import StartSteps from "../StartSteps";
import { staggerContainer, fadeIn, planetVariants } from "../../utils/motion";
import Image from "next/image";
import Logo from "../../app/public/1.png";
import useWindowSize from "../../utils/useWindowSize";

const GetStarted = () => {
  const { width } = useWindowSize();
  const isLargeScreen = width! >= 1024; // Tailwind's `lg` breakpoint is 1024px

  return (
    <section
      className={`${styles.paddings} relative z-10 bg-gray-950 p-[12px]`}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
      >
        {isLargeScreen && (
          <motion.div
            variants={planetVariants("left")}
            className={`flex-1 ${styles.flexCenter}`}
          >
            <Image
              src={Logo}
              fill
              alt="get-started"
              className="w-[90%] h-[90%] object-contain"
            />
          </motion.div>
        )}
        <motion.div
          variants={fadeIn("left", "tween", 0.2, 1)}
          className="flex-[0.75] flex justify-center flex-col"
        >
          <TypingText title="| How Myaimix works" />
          <TitleText title={<>Why you Myaimix</>} />
          <div className="mt-[31px] flex flex-col max-w-[370px] gap-[24px]">
            {startingFeatures.map((feature, index) => (
              <StartSteps
                key={feature}
                number={`${index < 10 ? "0" : ""} ${index + 1}`}
                text={feature}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default GetStarted;
