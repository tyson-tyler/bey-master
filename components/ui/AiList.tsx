import Templates from "@/app/(data)/Templates";
import React, { Suspense, useEffect, useState } from "react";
import Loader from "../Loader";
import TemplateCard from "./AiCard";

export interface TEMPLATE {
  name: string;
  desc: string;
  icon: string;
  category: string;
  slug: string;
  aiPrompt: string;
  form?: FORM[];
}

export interface FORM {
  label: string;
  field: string;
  name: string;
  required?: boolean;
}

const TemplateListSection = ({ userSearchInput }: any) => {
  const [templateList, setTemplateList] = useState(Templates);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const filterTemplates = () => {
      if (userSearchInput) {
        const filterData = Templates.filter((item) =>
          item.name.toLowerCase().includes(userSearchInput.toLowerCase())
        );
        setTemplateList(filterData);
      } else {
        setTemplateList(Templates);
      }
      setLoading(false);
    };

    // Simulate delay to see the loading effect
    const delayFilter = setTimeout(filterTemplates, 50);

    return () => clearTimeout(delayFilter);
  }, [userSearchInput]);

  return (
    <>
      <div className="px-6"></div>
      {loading ? (
        <div className="text-center mt-10">
          <Loader />
        </div>
      ) : (
        <Suspense fallback="Loading">
          <div className="flex flex-col gap-4 mb-[10rem]  md:mb-[1rem]">
            {templateList.map((item: TEMPLATE, index: number) => (
              <TemplateCard key={index} {...item} />
            ))}
          </div>
        </Suspense>
      )}
    </>
  );
};

export default TemplateListSection;
