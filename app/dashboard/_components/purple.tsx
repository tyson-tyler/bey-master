import Templates from "@/app/(data)/banner";
import React from "react";
import TemplateCard from "./banner";

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

const TemplateListSections = () => {
  return (
    <div className="flex flex-row gap-2 justify-center items-center">
      {Templates.map((item: TEMPLATE, index: number) => (
        <TemplateCard key={index} {...item} />
      ))}
    </div>
  );
};

export default TemplateListSections;
