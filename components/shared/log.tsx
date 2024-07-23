"use client";

import Image from "next/image";
import Logo1 from "../public/logo1.svg";
import Logo2 from "../public/logo2.svg";
import Logo3 from "../public/logo3.svg";
import Logo4 from "../public/logo4.svg";
import Logo5 from "../public/logo5.svg";

const logos = [Logo1, Logo2, Logo3, Logo4, Logo5];

const LogoScroll = () => {
  return (
    <div className="overflow-hidden">
      <div className="flex flex-wrap justify-center items-center w-full h-full ">
        {logos.map((Logo, index) => (
          <div key={index} className="flex-none mx-4 my-4">
            <Image
              src={Logo.src}
              alt={`Logo ${index + 1}`}
              width={40}
              height={40}
              loading="lazy"
              className="w-[2rem] sm:w-[2rem] md:w-20 lg:w-20 xl:w-20 h-auto mb-4"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoScroll;
