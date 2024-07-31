"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { RWebShare } from "react-web-share";
import { useParams } from "next/navigation";
import GlobalApi from "@/app/service/GlobalApi";

function View() {
  const handleDownload = () => {
    window.print();
  };

  const [resumeInfo, setResumeInfo] = useState();
  const { resumeId } = useParams();

  useEffect(() => {
    GetResumeInfo();
  }, []);
  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then((resp) => {
      console.log(resp.data.data);
      setResumeInfo(resp.data.data);
    });
  };
  return (
    <>
      <div id="no-print" className="my-10 mx-10 md:mx-20 lg:mx-36">
        <h2 className="text-center dark:text-white text-black text-[25px] sm:text-[25px] font-bold md:text-[25px] lg:text-[44px]">
          🎉 Congrats ! Your AI Resume is Bulid 🥳
        </h2>
        <p className="text-center text-[10px] text-gray-500 sm:text-[12px] md:text-[15px] lg:text-[16px]">
          💼 Now You can Download & Share your Resume and Get Hire in your Dream
          Company 🏭
        </p>

        <div className="flex justify-around w-full my-5">
          <Button onClick={handleDownload}>Download</Button>
        </div>
      </div>
    </>
  );
}

export default View;
