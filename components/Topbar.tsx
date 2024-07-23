// components/Topbar.js
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { GoSearch } from "react-icons/go";
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
    <div className="p-1 sticky top-0 w-full z-50 md:p-3 flex shadow-sm  items-center bg-gray-100 dark:bg-gray-950 dark:text-white text-black  justify-between">
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
      <div className=" border lg:flex hidden gap-2 items-center p-2 shadow-md rounded-md w-[300px] sm:w-[300px] md:w-[330px] lg:w-[500px] bg-white dark:bg-gray-800 border-none">
        <GoSearch className="w-5 h-5" />
        <input
          type="text"
          placeholder="Search..."
          className="outline-none bg-none dark:bg-gray-800 bg-white  dark:text-white text-black"
        />
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
