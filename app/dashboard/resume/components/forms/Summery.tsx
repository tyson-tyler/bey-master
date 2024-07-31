import { ResumeInfoContext } from "@/app/constants/ResumeInfoContext";
import GlobalApi from "@/app/service/GlobalApi";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GiBrain } from "react-icons/gi";
import { AIChatSession } from "../../../../../app/service/AIModa";
import { SiGooglegemini } from "react-icons/si";
import { Copy } from "lucide-react";
import { FaUserEdit } from "react-icons/fa";

const prompt =
  "Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format";

interface SummaryItem {
  experience_level: string;
  summary: string;
}

const Summery = ({ enabledNext }: { enabledNext: (next: boolean) => void }) => {
  const { resumeInfo, setResumeInfo }: any = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState<
    SummaryItem[]
  >([]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSummery(e.target.value);
  };

  useEffect(() => {
    if (summery) {
      setResumeInfo({
        ...resumeInfo,
        summery: summery,
      });
    }
  }, [summery]);

  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
    console.log(PROMPT);
    const result = await AIChatSession.sendMessage(PROMPT);
    const responseText = await result.response.text();
    console.log(responseText);
    setAiGenerateSummeryList(JSON.parse(responseText));
    setLoading(false);
  };

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        summery: summery,
      },
    };
    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (resp) => {
        console.log(resp);
        enabledNext(true);
        setLoading(false);
        toast.success("Details updated");
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success("Copied to clipboard");
      },
      (err) => {
        toast.error("Failed to copy");
      }
    );
  };

  return (
    <>
      <div className="shadow-lg rounded-lg dark:text-white text-black">
        <div className="top-0 items-center w-full absolute p-4 flex gap-2 dark:bg-gray-800 dark:text-white bg-gray-50 text-black">
          <FaUserEdit className="w-8 h-8 dark:text-white text-black" />
          <div className="flex flex-col ml-3">
            <h2 className="font-bold text-[15px]">Summary Details</h2>
            <p className="text-xs">Add Summary Detail of yourself</p>
          </div>
        </div>

        <form className="mt-[25px] lg:p-10 md:p-5 sm:p-5 p-5" onSubmit={onSave}>
          <div className="flex justify-between mt-7">
            <label>Add Summery</label>
            <Button
              variant={"outline"}
              onClick={GenerateSummaryFromAI}
              size={"sm"}
              className="hover:bg-pink-500 transition transform"
              type="button"
            >
              <GiBrain className="w-5 h-5 mr-3" /> Generate with Ai
            </Button>
          </div>
          <Textarea className="mt-5" required onChange={handleInput} />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              Save
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummeryList.length > 0 && (
        <div className="my-5 lg:p-10 md:p-5 sm:p-5 p-5">
          <h2 className="font-bold usespan flex items-center">
            Suggestion <SiGooglegemini className="w-5 h-5 ml-3 usespan" />
          </h2>
          {aiGeneratedSummeryList.map((item, index) => (
            <div
              key={index}
              onClick={() => setSummery(item.summary)}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer dark:bg-gray-900 dark:text-white text-black"
            >
              <div className="flex justify-between w-full items-center">
                <h2 className="font-bold my-1 text-primary">
                  Choice: {item.experience_level}
                </h2>
                <Button
                  variant={"ghost"}
                  onClick={() => copyToClipboard(item.summary)}
                >
                  <Copy className="w-3 h-3 text-white" />
                </Button>
              </div>
              <p>{item.summary}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Summery;
