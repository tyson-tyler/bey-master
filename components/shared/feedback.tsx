"use client";

import { motion } from "framer-motion";
import { socials } from "../../app/constants/next";

import styles from "../../app/index";
import { footerVariants } from "../../utils/motion";

const Footer = () => (
  <motion.footer
    variants={footerVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} px-0 relative`}
  >
    <div className="footer-gradient" />
    <div
      className={`${styles.innerWidth} mx-auto flex flex-col gap-8 bg-gray-950`}
    >
      <div className="flex flex-col">
        <div className="mb-[50px] h-[2px] bg-white opacity-10" />

        <div className="flex items-center justify-between flex-wrap gap-4 px-2">
          <p className="font-normal text-[14px] text-white opacity-50">
            Copyright © 2024 - 2025 Myaimix. All rights reserved.
          </p>

          <div className="flex gap-4">
            {socials.map((social) => (
              <img
                key={social.name}
                src={social.url}
                alt={social.name}
                className="w-[24px] h-[24px] object-contain cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.footer>
);

export default Footer;
