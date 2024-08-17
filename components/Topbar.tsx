// components/Topbar.js
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import Hello from "../components/public/logo.svg";

import { ModeToggle } from "./Toogle";
// Replace with your logo path

const Topbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    // Handle search submission logic here
    console.log("Search query:", searchQuery);
  };

  return (
    <div
      id="no-print"
      className="p-1 sticky top-0 w-full z-50 md:p-3 flex shadow-sm  items-center bg-gray-100 dark:bg-gray-900 dark:text-white text-black  justify-between"
    >
      <div className="text-2xl font-bold  flex items-center">
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

      <div className="xl:flex hidden">
        <h2 className="bg-purple-600 p-1 rounded-full text-xs text-white px-2">
          🔥 Join the membership at only $9 per month
        </h2>
      </div>
      <ModeToggle />
    </div>
  );
};

export default Topbar;
