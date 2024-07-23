"use client";

import { motion } from "framer-motion";
import styles from "../../app/index";
import { TitleText, TypingText } from "../../components/shared/text";
import { fadeIn, staggerContainer } from "../../utils/motion";
import Image from "next/image";
import Logo from "../../app/public/map.png";

const peopleLocations = [
  {
    src: "https://mighty.tools/mockmind-api/content/human/74.jpg",
    className: "lg:bottom-20 lg:right-20 md:bottom-2 md:right-2",
  },
  {
    src: "https://mighty.tools/mockmind-api/content/human/41.jpg",
    className: "bottom-40 left-40",
  },
  {
    src: "https://mighty.tools/mockmind-api/content/human/76.jpg",
    className: "top-10 left-20",
  },
  {
    src: "https://mighty.tools/mockmind-api/content/human/17.jpg",
    className: "right-[20rem] top-[14rem]",
  },
  {
    src: "https://mighty.tools/mockmind-api/content/human/10.jpg",
    className: "right-[40rem] top-[4rem]",
  },
  {
    src: "https://mighty.tools/mockmind-api/content/human/47.jpg",
    className: "top-1/2 left-[45%]",
  },
];

const World = () => (
  <section className={`${styles.paddings} relative z-10  bg-gray-950`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col`}
    >
      <TypingText title="| Trusted by 50 Million +" textStyles="text-center" />
      <TitleText
        title={
          <>
            Trusted by 50 Million + user and the world largest companies &
            StartUp
          </>
        }
        textStyles="text-center text-[22px]"
      />

      <motion.div
        variants={fadeIn("up", "tween", 0.3, 1)}
        className="relative mt-[68px] flex w-full h-[550px]"
      >
        <Image
          src={Logo}
          fill
          alt="map"
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {peopleLocations.map((person, index) => (
          <motion.div
            key={index}
            className={`absolute ${person.className} w-[50px] h-[50px] sm:w-[70px] sm:h-[70px]`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src={person.src}
              alt="people"
              width={50}
              loading="lazy"
              height={50}
              className="w-full h-full rounded-full"
            />
            <div className="absolute inset-0 bg-blue-500 opacity-0 rounded-full animate-ping"></div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  </section>
);

export default World;
