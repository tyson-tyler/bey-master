"use client";
import React, { useEffect, useState } from "react";
import "../../_components/global.css";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "react-hot-toast";
import Image from "next/image";

interface Props {
  aiOutput: string;
  loading: boolean;
}
import Hello from "../../../../components/public/logo.svg";
import Nice from "../../../../app/public/hello1.png";
import LoadingScreen from "./ani";

function OutputSection({ aiOutput, loading }: Props) {
  const [currentOutput, setCurrentOutput] = useState("");

  useEffect(() => {
    if (!loading && aiOutput) {
      let index = 0;
      setCurrentOutput("");
      const interval = setInterval(() => {
        if (index < aiOutput.length) {
          setCurrentOutput((prev) => prev + aiOutput[index]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 5); // Adjust the speed as necessary

      return () => clearInterval(interval);
    }
  }, [loading, aiOutput]);

  const copyToClipboardFallback = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      const successful = document.execCommand("copy");
      if (successful) {
        toast.success("Copy Successfully");
      } else {
        toast.error("Failed to copy");
      }
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
      toast.error("Failed to copy");
    }
    document.body.removeChild(textArea);
  };

  const handleToast = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(currentOutput)
        .then(() => {
          toast.success("Copy Successfully");
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
          toast.error("Failed to copy");
        });
    } else {
      copyToClipboardFallback(currentOutput);
    }
  };

  return (
    <div className="bg-white rounded-md dark:bg-gray-950 h-screen dark:text-white  text-black">
      <div className="bg-white dark:bg-gray-950 h-screen rounded-lg">
        {loading ? (
          <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950">
            <LoadingScreen />
          </div>
        ) : (
          <div className="w-full relative h-full">
            {currentOutput ? (
              <>
                <Button
                  onClick={handleToast}
                  variant={"outline"}
                  className="mb-2 absolute lg:right-12 md:right-8 sm:right-3 right-1 top-5 lg:mt-3"
                >
                  <Copy className="text-black dark:text-white w-4 h-4" />
                </Button>
                <textarea
                  value={currentOutput}
                  readOnly
                  className="w-full hello h-screen p-4 bg-white dark:bg-gray-950 border-none focus:outline-none rounded-md dark:text-white text-black resize-none"
                />
              </>
            ) : (
              <div className="flex justify-center h-screen dark:bg-gray-950 dark:text-white bg-white text-black items-center flex-col m-auto gap-3 w-full p-4">
                <Image
                  width={100}
                  height={100}
                  src={Hello}
                  alt="hello"
                  className="animate-bounce"
                />
                <h1 className="lg:text-2xl md:text-lg font-semibold sm:text-lg text-[14px]">
                  Myaimix, is the Best Ai for Ai Content.
                </h1>
                <p className="text-sm text-gray-600">
                  Myaimix can make mistakes sometimes. Please give AI some time.
                </p>
                <Image width={100} height={100} src={Nice} alt="hello" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default OutputSection;
