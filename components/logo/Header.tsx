"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Hello from "../../components/public/logo.svg";
import { ModeToggle } from "../Toogle";
import { Button } from "../ui/button";
import { FaDownload } from "react-icons/fa6";
import { ImageIcon } from "lucide-react";
import { IoIosColorPalette, IoMdImage } from "react-icons/io";

const Header = ({ selectedIndex, DownloadIcon }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const menuList = [
    {
      id: 1,

      name: "Icons",
      icon: IoIosColorPalette,
    },
    {
      id: 2,
      name: "Background",
      icon: IoMdImage,
    },
  ];

  return (
    <div
      id="no-print"
      className="p-1 sticky  top-0 w-full z-50 md:p-3 flex shadow-sm  items-center bg-gray-100 dark:bg-gray-900 dark:text-white text-black  justify-between"
    >
      <div className="text-2xl font-bold flex items-center">
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer">
            <Image
              src={Hello}
              width={50}
              height={50}
              alt="hello"
              className="lg:mr-3 rounded-full flex md:hidden"
            />
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={() => DownloadIcon(Date.now())}
          className="bg-blue-600 flex gap-2 hover:bg-blue-500 transition transform hover:scale-105"
        >
          <FaDownload className="w-5 h-5 text-white md:mr-2 mr-0" />
          <span className="lg:flex md:flex hidden"> Download</span>
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
