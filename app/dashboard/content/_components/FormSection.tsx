"use client";
import React, { useState, useRef } from "react";
import { TEMPLATE } from "../../_components/TemplateListSection";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { ModeToggle } from "@/components/Toogle";
import { BsFillSendFill } from "react-icons/bs";

interface PROPS {
  selectedTemplate?: TEMPLATE;
  userFormInput: any;
  loading: boolean;
}

const FormSection = ({ selectedTemplate, userFormInput, loading }: PROPS) => {
  const [formData, setFormData] = useState<any>();
  const bottomRef = useRef<HTMLDivElement>(null);

  const onSubmit = (e: any) => {
    e.preventDefault();
    userFormInput(formData);
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div className="lg:m-5 mb-5 sm:mb-5 md:mb-0 shadow-md rounded-lg bg-gray-100 sm:bottom-[4.5rem] bottom-[4.5rem] md:bottom-2 sticky z-50 dark:bg-gray-900">
        <form className="flex flex-row w-full" onSubmit={onSubmit}>
          <div className="flex flex-row w-full space-y-4">
            {selectedTemplate?.form?.map((item, index) => (
              <div className="mb-2 w-full" key={index}>
                {item.field === "input" ? (
                  <div className="mt-2">
                    <input
                      className="dark:bg-gray-900 ml-3 bg-gray-100  h-[50px] border-none focus:outline-none dark:text-white text-black w-full p-2 rounded-md"
                      name={item.field}
                      required={item?.required}
                      onChange={handleInputChange}
                      placeholder="Enter the niche of your blog"
                    />
                  </div>
                ) : item.field === "textarea" ? (
                  <div className="mt-2 hidden">
                    <Textarea
                      className="dark:bg-gray-950 border-none focus:outline-none dark:text-white text-black w-full p-2 rounded-md"
                      rows={6}
                      name={item.field}
                      required={item?.required}
                      onChange={handleInputChange}
                    />
                  </div>
                ) : null}
              </div>
            ))}

            <Button
              type="submit"
              className="mr-4 flex items-center justify-center w-[50px] h-[40px]  p-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader className="w-5 h-5  animate-spin" />
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <BsFillSendFill className="w-5 h-5" />
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormSection;
