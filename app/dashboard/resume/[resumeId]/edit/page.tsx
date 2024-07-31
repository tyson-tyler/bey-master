"use client";
import Header from "@/components/resume/header";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import FormSection from "../../components/FormSection";
import ResumePreview from "../../components/ResumePreview";
import { ResumeInfoContext } from "@/app/constants/ResumeInfoContext";
import dummy from "@/lib/dummy";
import GlobalApi from "@/app/service/GlobalApi";

const EditResume = () => {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState(dummy);

  useEffect(() => {
    setResumeInfo(dummy);
  }, []);

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then((resp) => {
      console.log(resp.data.data);
    });
  };
  return (
    //  @ts-ignore
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="gap-10  w-full">
        <FormSection />
        <div id="print-area" className="lg:p-10 md:p-5 sm:p-5 p-5">
          <ResumePreview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default EditResume;
