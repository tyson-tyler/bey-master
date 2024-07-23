"use client";
import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Button } from "../ui/button";
import Link from "next/link";

const Footer = () => {
  useGSAP(() => {
    gsap.to("#title", { opacity: 1, y: 0, delay: 1 });
  }, []);
  return (
    <section
      id="highlights"
      className="w-screen overflow-hidden common-padding bg-zinc-950"
    >
      <div className="screen-max-width">
        <div>
          <h1 id="title" className="section-heading text-center mb-5">
            Get Started With Myaimix
          </h1>
          <p
            id="title"
            className="section-para text-center text-sm text-gray-500  mt-4 "
          >
            Make your project perfect writing attractive reading expernice
          </p>
        </div>
        <Link
          className="w-full flex justify-center items-center m-auto mt-3"
          href={"/dashboard"}
        >
          <Button>Dive into Myaimix</Button>
        </Link>
      </div>
    </section>
  );
};

export default Footer;
