import Image from "next/image";
import React from "react";
import Logo from "../public/logo.svg";
import { Button } from "../ui/button";
import Link from "next/link";
import { FaUser } from "react-icons/fa6";

const Navbar = () => {
  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
      <nav className="flex w-full screen-max-width">
        <Link href={"/"}>
          <Image width={44} height={48} src={Logo} alt="hello" />
        </Link>

        <div className="flex flex-1 gap-4  items-center px-5 justify-center max-sm:hidden">
          <Link
            className="text-gray-600 hover:text-white transition "
            href={"/"}
          >
            Home
          </Link>
          <Link
            className="text-gray-600 hover:text-white transition "
            href={"/dashboard/did"}
          >
            Image
          </Link>
          <Link
            className="text-gray-600 hover:text-white transition "
            href={"/pricing"}
          >
            Pricing
          </Link>
          <Link
            className="text-gray-600 hover:text-white transition "
            href={"/hello"}
          >
            Blog
          </Link>
        </div>
        <Link
          href={"/dashboard"}
          className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1"
        >
          <button className="flex items-center px-4 py-2 rounded-md bg-transparent  hover-glow hover:border-none hover:bg-transparent transition duration-500 ease-in-out">
            <FaUser className="w-5 h-5  animate-wiggle" />
          </button>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
