// components/Sidebar1.js
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaImages } from "react-icons/fa";
import { RiImageCircleFill } from "react-icons/ri";
import { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import styles from "../app/dashboard/_components/sidebar.module.css";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaGear, FaRobot, FaVideo } from "react-icons/fa6";
import { UserButton } from "@clerk/nextjs";
import Loader from "./Loader";
import { IoDocument, IoDocumentAttachSharp } from "react-icons/io5";
import { IoLogoFreebsdDevil } from "react-icons/io";
import { VscFeedback } from "react-icons/vsc";

const Sidebar1 = () => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState(pathname);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const linksRef = useRef<(HTMLDivElement | null)[]>([]);
  const { user, isLoaded } = useUser();

  const links = [
    {
      href: "/dashboard",
      label: "Home",
      icon: <FaHome />,
      colorClass: "bg-blue-600",
      animationClass: styles.animateBounce,
    },

    {
      href: "/dashboard/document",
      label: "Document",
      icon: <IoDocument />,
      colorClass: "bg-pink-600",
      animationClass: styles.animateShake,
    },

    {
      href: "/dashboard/logo",
      label: "Logo Builder",
      icon: <IoLogoFreebsdDevil />,
      colorClass: "bg-purple-500",
      animationClass: styles.animateFlash,
    },
    {
      href: "/dashboard/file",
      label: "File Converter",
      icon: <IoDocumentAttachSharp />,
      colorClass: "bg-red-500",
      animationClass: styles.animateSlideInLeft,
    },
    {
      href: "/dashboard/edit",
      label: "Ai Edit",
      icon: <FaRobot />,
      colorClass: "bg-green-500",
      animationClass: styles.animateSwing,
    },
  ];

  const handleLinkClick = (href: string, index: number) => {
    setActiveLink(href);
    setIndicatorPosition(index);
    setTimeout(() => {
      setActiveLink("");
    }, 1000);
  };

  const setIndicatorPosition = (index: number) => {
    const linkElement = linksRef.current[index];
    if (linkElement) {
      const { offsetLeft, offsetWidth } = linkElement;
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth,
      });
    }
  };

  useEffect(() => {
    const activeIndex = links.findIndex((link) => link.href === pathname);
    setIndicatorPosition(activeIndex);
  }, [pathname]);

  return (
    <div
      id="no-print"
      className="fixed w-full md:hidden bottom-0 dark:bg-gray-900 bg-gray-100 dark:text-white text-black flex justify-around items-center p-2"
    >
      <div
        className="absolute h-1 bottom-0 bg-purple-600 transition-all duration-300"
        style={indicatorStyle}
      />
      {links.map((link, index) => (
        <Link href={link.href} key={link.label}>
          <div
            ref={(el) => {
              linksRef.current[index] = el;
            }}
            onClick={() => handleLinkClick(link.href, index)}
            className={`flex flex-col items-center rounded-md px-2 py-1 hover:scale-105 transition duration-300 ${
              pathname === link.href
                ? `rounded-md ${link.colorClass} text-white`
                : ""
            } ${
              activeLink === link.href
                ? `${link.colorClass} ${styles.activeLink} text-white`
                : ""
            }`}
          >
            <span
              className={`transition-transform duration-300 text-2xl px-1 py-1  ${
                pathname === link.href || activeLink === link.href
                  ? `${link.animationClass} text-white`
                  : ""
              }`}
            >
              {link.icon}
            </span>
          </div>
        </Link>
      ))}
      {!isLoaded ? <Loader /> : <UserButton />}
    </div>
  );
};

export default Sidebar1;
