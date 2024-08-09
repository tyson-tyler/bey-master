import Image from "next/image";
import Link from "next/link";
import React from "react";
import Hello from "../components/public/logo.svg";
import { UserButton } from "@clerk/nextjs";

type HeaderProps = {
  children: React.ReactNode;
};
const Header = ({ children }: HeaderProps) => {
  return (
    <div className="text-white py-3  min-h-[22px] min-w-full flex-nowrap bg-[#09111f] flex w-full items-center justify-between gap-2 px-4">
      <Link href={"/"} className="md:flex-1 flex items-center">
        <Image
          src={Hello}
          width={50}
          height={20}
          className="hidden md:block"
          alt="hello"
        />
        <span className="text-2xl ml-3 font-bold lg:flex md:hidden hidden">
          Myaimix.
        </span>

        <Image
          src={Hello}
          width={50}
          height={20}
          className="mr-2 md:hidden"
          alt="hello"
        />
      </Link>
      {children}
    </div>
  );
};

export default Header;
