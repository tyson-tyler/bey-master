"use client";
import React, { useState } from "react";
import PersonalDetail from "./forms/PersonalDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, LayoutGridIcon } from "lucide-react";
import Summery from "./forms/Summery";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";
import { useParams, useRouter } from "next/navigation";
import View from "@/components/View";

const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);
  const router = useRouter();
  const { resumeId } = useParams();

  const totalForms = 6; // Update this if you add or remove forms

  return (
    <div>
      <div
        id="no-print"
        className="flex justify-between  items-center  text-black mb-16 dark:text-white"
      >
        <div className="flex gap-2 top-[20px] absolute right-[20px] z-20">
          {activeFormIndex > 1 && (
            <Button
              size={"sm"}
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft />
            </Button>
          )}
          {activeFormIndex < totalForms && (
            <Button
              disabled={!enableNext}
              className="flex gap-2"
              size={"sm"}
              onClick={() => setActiveFormIndex(activeFormIndex + 1)}
            >
              Next <ArrowRight />
            </Button>
          )}
        </div>
      </div>

      {activeFormIndex === 1 ? (
        <PersonalDetail enabledNext={(v: any) => setEnableNext(v)} />
      ) : activeFormIndex === 2 ? (
        <Summery enabledNext={(v: any) => setEnableNext(v)} />
      ) : activeFormIndex === 3 ? (
        <Experience />
      ) : activeFormIndex === 4 ? (
        <Education />
      ) : activeFormIndex === 5 ? (
        <Skills />
      ) : activeFormIndex === 6 ? (
        <View />
      ) : null}
    </div>
  );
};

export default FormSection;
