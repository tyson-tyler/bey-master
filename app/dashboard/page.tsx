"use client";
import React, { useState } from "react";
import SearchSection from "./_components/SearchSection";
import TemplateListSection from "./_components/TemplateListSection";

import ButtonGroup from "./_components/banner";
import Topbar from "@/components/Topbar";

const page = () => {
  return (
    <>
      <Topbar />
      <div className="md:m-[10px]">
        <SearchSection />
      </div>
    </>
  );
};

export default page;
