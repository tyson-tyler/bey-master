import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/app/constants/ResumeInfoContext";
import { Brain, BrainCircuitIcon, Loader, LoaderCircle } from "lucide-react";
import React, { useContext, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { AIChatSession } from "@/app/service/AIModa";
import { toast } from "sonner";
import { SiGooglegemini } from "react-icons/si";
import { GiBrain } from "react-icons/gi";
const RichTextEditor = ({ onRichTextEditorChange, index }: any) => {
  const PROMPT =
    "{positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags";
  const [value, setValue] = useState(
    "<ul><li>Developed and maintanced web application using a combination of front-end and back-end technologies, including, React, Node.js, Express.js, and PostgresSQL. <ul><li>Implemented a user-friendly interface for a customer portal, resulting in a 15s increase in customer satisfaction ratings.</li></ul></li></ul>"
  );
  const { resumeInfo, setResumeInfo }: any = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const GenerateSummeryFromAI = async () => {
    setLoading(true);
    if (!resumeInfo.experience[index].title) {
      toast.success("Please Add Position Title");
      return;
    }
    const prompt = PROMPT.replace(
      "{positionTitle}",
      resumeInfo.experience[index].title
    );
    const result = await AIChatSession.sendMessage(prompt);
    console.log(result.response.text());
    const resp = result.response.text();
    setValue(resp.replace("[", "").replace("]", ""));
    setLoading(false);
  };

  return (
    <div>
      <div className="flex items-center my-4 justify-between">
        <div className="flex items-center">
          <label className="font-bold usespan mr-2 ">Summery</label>
          <SiGooglegemini />
        </div>
        <Button className="flex gap-2" onClick={GenerateSummeryFromAI}>
          {loading ? (
            <div className="flex gap-2">
              <Loader className="w-5 h-5 animate-spin" />
              Generate from AI
            </div>
          ) : (
            <div className="flex gap-2">
              <GiBrain className="w-5 h-5" />
              Generate from AI
            </div>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e: any) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
