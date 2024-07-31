"use client";
import { ResumeInfoContext } from "@/app/constants/ResumeInfoContext";
import React, { useContext } from "react";
import PersonalDetailPrevioer from "./preview/PersonalDetailPrevioer";
import SummeryPreview from "./preview/SummeryPreview";
import Professinal from "./preview/Professinal";
import EductionalPreview from "./preview/EductionalPreview";
import Skill from "./preview/Skill";

const ResumePreview = () => {
  const { resumeInfo, setResumeInfo }: any = useContext(ResumeInfoContext);
  return (
    <div className="shadow-lg h-full p-14  dark:bg-gray-900 bg-gray-50 text-black dark:text-white">
      <PersonalDetailPrevioer resumeInfo={resumeInfo} />

      <SummeryPreview resumeInfo={resumeInfo} />

      <Professinal resumeInfo={resumeInfo} />
      <EductionalPreview resumeInfo={resumeInfo} />
      <Skill resumeInfo={resumeInfo} />
    </div>
  );
};

export default ResumePreview;
