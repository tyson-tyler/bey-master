import Insights from "@/components/shared/Insight";
import Navbar from "@/components/shared/navbar";
import React from "react";

const page = () => {
  return (
    <>
      <div className="bg-black">
        <Navbar />
        <Insights />
      </div>
    </>
  );
};

export default page;
