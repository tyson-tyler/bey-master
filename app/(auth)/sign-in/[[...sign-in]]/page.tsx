import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  return (
    <div className="h-screen overflow-hidden flex flex-col lg:flex-row justify-center items-center bg-black  text-white">
      <div className="relative z-10 p-8  lg:w-1/2 lg:flex lg:justify-center lg:items-center">
        <SignIn />
      </div>
    </div>
  );
}
