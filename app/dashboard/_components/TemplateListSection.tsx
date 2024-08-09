import Templates from "@/app/(data)/Templates";
import React, { Suspense, useEffect, useState } from "react";
import TemplateCard from "../billing/TemplateCard";

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
      <div className="px-6">
        <h1 className="text-2xl font-semibold mb-5 mt-5 pt-7 sm:text-2xl md:text-3xl lg:text-4xl dark:text-white text-black">
          Most Popular
        </h1>
      </div>
      {loading ? (
        <div className="text-center mt-10">Loading templates...</div>
      ) : (
        <Suspense fallback="Loading">
          <div className="grid-container gap-4 mb-[10rem] p-[20px] md:mb-[1rem]">
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
