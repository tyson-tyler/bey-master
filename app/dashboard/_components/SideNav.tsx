// components/Sidebar.js
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaAppStore, FaUser } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa";

import { useState } from "react";
import Image from "next/image";
import Hello from "../../../components/public/logo.svg";
import { UserButton, useUser } from "@clerk/nextjs";
import styles from "../_components/sidebar.module.css";

import { MdOutlineAttachMoney } from "react-icons/md";
import { FaGear, FaImage } from "react-icons/fa6";
import Loader from "@/components/Loader"; // Import your loader component
import { RiImageCircleFill } from "react-icons/ri";

const Sidebar = () => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState(pathname);
  const { user, isLoaded } = useUser(); // Destructure user and isLoaded from useUser hook

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
      colorClass: "bg-green-600",
      animationClass: styles.animateSpin, // Ensure correct class name from CSS module
    },
    {
      href: "/dashboard/rusme",
      label: "Resume",
      icon: <FaWpforms className="inline-block lg:mr-3" />,
      colorClass: "bg-pink-600",
      animationClass: styles.animateShake,
    },
    {
      href: "/dashboard/billing",
      label: "Billing",
      icon: <MdOutlineAttachMoney className="inline-block lg:mr-3" />,
      colorClass: "bg-yellow-600",
      animationClass: styles.animatePing, // Ensure correct class name from CSS module
    },
    {
      href: `/dashboard/setting/${user?.id}`,
      label: "Setting",
      icon: <FaGear className="inline-block lg:mr-3" />,
      colorClass: "bg-red-600",
      animationClass: styles.animatePulse, // Ensure correct class name from CSS module
    },
  ];

  const handleLinkClick = (href: any) => {
    setActiveLink(href);
    // Reset activeLink state after 1000ms (1 second) to trigger animation again
    setTimeout(() => {
      setActiveLink("");
    }, 1000);
  };

  return (
    <div className="h-screen fixed hidden dark:bg-gray-900 bg-gray-100 text-black dark:text-white md:flex lg:w-64 md:w-[80px] flex-col">
      <div className="text-2xl font-bold p-4 flex items-center">
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer">
            <Image
              src={Hello}
              width={50}
              height={50}
              alt="hello"
              className="lg:mr-3 rounded-full"
            />
            <span className="hidden lg:flex lg:text-2xl md:text-lg">
              Myaimix
            </span>
          </div>
        </Link>
      </div>
      <hr className="border-gray-700 md:flex lg:hidden" />
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => (
          <Link href={link.href} key={link.label}>
            <div
              onClick={() => handleLinkClick(link.href)}
              className={`flex items-center lg:py-2 lg:px-4 p-3 mb-3 rounded-lg duration-300 hover:scale-105 transition ${
                pathname === link.href
                  ? `md:rounded-full lg:rounded-md ${link.colorClass}`
                  : ""
              } ${
                activeLink === link.href
                  ? `md:rounded-full lg:rounded-md ${link.colorClass} ${styles.activeLink}`
                  : ""
              }`}
            >
              <span
                className={`transition-transform hidden sm:flex md:flex duration-300 text-2xl ${
                  activeLink === link.href ? link.animationClass : ""
                }`}
              >
                {link.icon}
              </span>
              <span className="lg:ml-2 font-semibold text-lg hidden lg:flex">
                {link.label}
              </span>
            </div>
          </Link>
        ))}
      </nav>
      <div className="m-auto flex justify-center items-center bottom-2 mb-4 w-full">
        {!isLoaded ? (
          <Loader /> // Display loader while user data is loading
        ) : (
          <div className="flex justify-center lg:ml-8 items-center w-full space-x-2">
            <UserButton />
            <span className="hidden font-semibold lg:flex w-full">
              {user?.fullName}
            </span>{" "}
            {/* Display user's full name on large screens */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
