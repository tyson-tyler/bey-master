"use client";
import Templates from "@/app/(data)/Templates";
import { TEMPLATE } from "../../_components/TemplateListSection";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import { chatSession } from "@/utils/AiModal";
import { useState, useEffect, useRef } from "react";
import { AIOutput } from "@/utils/schema";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import gsap from "gsap";
import Image from "next/image";
import { ModeToggle } from "@/components/Toogle";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PROPS {
  params: {
    "template-slug": string;
  };
}

function CreateNewContent(props: PROPS) {
  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug == props.params["template-slug"]
  );
  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>("");
  const { user } = useUser();
  const formSectionRef = useRef<HTMLDivElement>(null);
  const outputSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const formSection = formSectionRef.current;
    const outputSection = outputSectionRef.current;

    if (formSection && outputSection) {
      gsap.fromTo(
        formSection,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3 }
      );

      gsap.fromTo(
        outputSection,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.6 }
      );
    }
  }, []);

  const GenerateAiContent = async (formData: any) => {
    setLoading(true);

    if (!selectedTemplate) {
      console.error("Selected template is undefined");
      setLoading(false);
      return;
    }

    const SelectedPropmt = selectedTemplate.aiPrompt;
    const FinaleAiPrompt = JSON.stringify(formData) + ", " + SelectedPropmt;

    const result = await chatSession.sendMessage(FinaleAiPrompt);
    const aiResponseText = await result?.response.text();

    if (!aiResponseText) {
      console.error("AI response is undefined");
      setLoading(false);
      return;
    }

    await SaveInDb(
      JSON.stringify(formData),
      selectedTemplate.slug,
      aiResponseText
    );

    setAiOutput(aiResponseText);
    setLoading(false);
  };

  const SaveInDb = async (formData: any, slug: string, aiResp: string) => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      throw new Error("User email address is undefined");
    }

    const result = await db.insert(AIOutput).values({
      formData: formData,
      aiResponse: aiResp,
      templateSlug: slug,
      createdBy: user.primaryEmailAddress.emailAddress,
      createdAt: moment().format("DD/MM/YYYY"),
    });
    console.log(result);
  };

  return (
    <>
      <div className="p-0 bg-white sticky top-0 z-50 dark:bg-gray-900">
        <div className="flex  h-[60px] border-b-2 border-gray-800 dark:border-gray-600 w-full justify-between items-center dark:bg-gray-950 p-2 relative top-0 bg-white  dark:text-white text-black">
          <div className="flex justify-center items-center">
            <Link href={"/dashboard"}>
              <ArrowLeft className="dark:text-white text-black transition  hover:bg-blue-600 hover:p-2 rounded-full flex justify-center items-center" />
            </Link>
            {selectedTemplate?.icon && (
              <img
                src={selectedTemplate.icon}
                alt="Template Icon"
                width={60}
                height={60}
                className="p-2 w-[60px] h-[60px] object-cover rounded-full"
              />
            )}
            <div className="flex justify-center flex-col ml-3">
              <h2 className="font-bold text-purple-500">
                {selectedTemplate?.name}
              </h2>
              <p className="text-gray-500 hidden md:flex text-[10px]">
                {selectedTemplate?.desc}
              </p>
            </div>
          </div>
          <div>
            <ModeToggle />
          </div>
        </div>
      </div>
      <div
        ref={formSectionRef}
        className="flex  flex-col-reverse md:gap-[10px] lg:gap-3 md:p-4 lg:p-0 sm:p-2 p-1 sm:gap-2 gap-2 bg-white dark:bg-gray-950"
      >
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={(v: any) => GenerateAiContent(v)}
          loading={loading}
        />
        <div ref={outputSectionRef}>
          <OutputSection aiOutput={aiOutput} loading={loading} />
        </div>
      </div>
    </>
  );
}

export default CreateNewContent;
