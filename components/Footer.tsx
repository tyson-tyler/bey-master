// components/Sidebar.js
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaImages } from "react-icons/fa";
import { RiImageCircleFill } from "react-icons/ri";
import { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs"; // Import useUser hook
import styles from "../app/dashboard/_components/sidebar.module.css"; // Import your custom sidebar styles
import { GoHistory } from "react-icons/go";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import { UserButton } from "@clerk/nextjs";
import Loader from "./Loader"; // Import your loader component

const Sidebar = () => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState(pathname);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const linksRef = useRef<(HTMLDivElement | null)[]>([]);
  const { user, isLoaded } = useUser(); // Destructure isLoaded from useUser hook

  const links = [
    {
      href: "/dashboard",
      label: "Home",
      icon: <FaHome className="inline-block lg:mr-3" />,
      colorClass: "bg-blue-600",
      animationClass: styles.animateBounce, // Ensure correct class name from CSS module
    },
    {
      href: "/dashboard/did",
      label: "Image",
      icon: <RiImageCircleFill className="inline-block lg:mr-3" />,
      colorClass: "bg-purple-600",
      animationClass: styles.animatePulse, // Ensure correct class name from CSS module
    },
    {
      href: "/dashboard/billing",
      label: "Billing",
      icon: <MdOutlineAttachMoney className="inline-block lg:mr-3" />,
      colorClass: "bg-green-600",
      animationClass: styles.animateSpin, // Ensure correct class name from CSS module
    },
    {
      href: `/dashboard/setting/${user?.id}`,
      label: "Setting",
      icon: <FaGear className="inline-block lg:mr-3" />,
      colorClass: "bg-yellow-600",
      animationClass: styles.animatePing, // Ensure correct class name from CSS module
    },
  ];

  const handleLinkClick = (href: string, index: number) => {
    setActiveLink(href);
    setIndicatorPosition(index);
    // Reset activeLink state after 1000ms (1 second) to trigger animation again
    setTimeout(() => {
      setActiveLink("");
    }, 1000);
  };

  const setIndicatorPosition = (index: number) => {
    if (linksRef.current[index]) {
      const linkElement = linksRef.current[index];
      if (linkElement) {
        const { offsetLeft, offsetWidth } = linkElement;
        setIndicatorStyle({
          left: offsetLeft,
          width: offsetWidth,
        });
      }
    }
  };

  useEffect(() => {
    const activeIndex = links.findIndex((link) => link.href === pathname);
    setIndicatorPosition(activeIndex);
  }, [pathname]);

  return (
    <div className="fixed w-full md:hidden bottom-0 dark:bg-gray-900 bg-gray-100 dark:text-white text-black flex justify-around items-center p-2">
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
            className={`flex flex-col items-center rounded-full px-2 hover:scale-105 transition duration-300 ${
              pathname === link.href ? ` rounded-md ${link.colorClass}` : ""
            } ${
              activeLink === link.href
                ? `${link.colorClass} ${styles.activeLink} text-white`
                : ""
            }`}
          >
            <span
              className={`transition-transform duration-300 text-2xl mb-2 ${
                activeLink === link.href ? link.animationClass : ""
              }`}
            >
              {link.icon}
            </span>
            {/* <span className="font-semibold text-[10px]">{link.label}</span> */}
          </div>
        </Link>
      ))}
      {!isLoaded ? <Loader /> : <UserButton />}
    </div>
  );
};

export default Sidebar;
