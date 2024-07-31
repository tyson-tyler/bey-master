import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "./RichTextEditor";
import { ResumeInfoContext } from "@/app/constants/ResumeInfoContext";
import { Loader } from "lucide-react";
import GlobalApi from "@/app/service/GlobalApi";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { AiFillExperiment } from "react-icons/ai";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
};

const Experience = () => {
  const [experienceList, setExperinceList] = useState([formField]);
  const [loading, setLoading] = useState(false);
  const handleChange = (index: any, event: any) => {
    const newEntries: any = experienceList.slice();

    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperinceList(newEntries);
  };
  const AddNewExperience = () => {
    setExperinceList([...experienceList, formField]);
  };
  const { resumeInfo, setResumeInfo }: any = useContext(ResumeInfoContext);
  const RemoveExperience = () => {
    setExperinceList((experinceList) => experinceList.slice(0, -1));
  };
  const handleRichTextEditor = (e: any, name: any, index: any) => {
    const newEntries: any = experienceList.slice();

    newEntries[index][name] = e.target.value;
    setExperinceList(newEntries);
  };
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      experience: experienceList,
    });
  }, [experienceList]);
  const params = useParams();

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        Experience: experienceList.map(({ id, ...rest }: any) => rest),
      },
    };

    console.log(experienceList);

    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (res) => {
        console.log(res);
        setLoading(false);
        toast.success("Details updated !");
      },
      (error) => {
        setLoading(false);
      }
    );
  };
  return (
    <div>
      <div className=" shadow-lg rounded-lg mt-10">
        <div className="top-0  items-center  w-full absolute p-4 flex gap-2 dark:bg-gray-800 dark:text-white bg-gray-50 text-black">
          <AiFillExperiment className="w-8 h-8 dark:text-white text-black" />
          <div className="flex flex-col ml-3">
            <h2 className="font-bold text-[15px]">Add Experience</h2>
            <p className="text-xs">Add Your Experience</p>
          </div>
        </div>
      </div>
      <div>
        {experienceList.map((item, index) => (
          <div key={index} className="lg:p-10 md:p-5 sm:p-5 p-5">
            <div className="grid grid-cols-2 gap-3  my-5 rounded-lg">
              <div>
                <label className="text-xs">Position Title</label>
                <Input
                  name="title"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.title}
                />
              </div>
              <div>
                <label className="text-xs">Company Name</label>
                <Input
                  name="companyName"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.companyName}
                />
              </div>
              <div>
                <label className="text-xs">City</label>
                <Input
                  name="city"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.city}
                />
              </div>
              <div>
                <label className="text-xs">State</label>
                <Input
                  name="state"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.state}
                />
              </div>
              <div>
                <label className="text-xs">Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.startDate}
                />
              </div>
              <div>
                <label className="text-xs">End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.endDate}
                />
              </div>
              <div className="col-span-2">
                {/* Work Summery  */}
                {/* <RichTextEditor
                  index={index}
                  defaultValue={item?.workSummery}
                  onRichTextEditorChange={(event) =>
                    handleRichTextEditor(event, "workSummery", index)
                  }
                /> */}
                <RichTextEditor
                  index={index}
                  onRichTextEditorChange={(event: any) =>
                    handleRichTextEditor(event, "workSummery", index)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between 10 md:p-5 sm:p-5 p-5">
        <div className="flex gap-2">
          <Button
            variant={"outline"}
            onClick={AddNewExperience}
            className="text-purple-600"
          >
            Add Experience{" "}
          </Button>
          <Button
            variant="outline"
            onClick={RemoveExperience}
            className="text-primary"
          >
            {" "}
            - Remove
          </Button>
        </div>
        {/* <Button disabled={loading} onClick={() => onSave()}>
          {loading ? <Loader className="animate-spin" /> : "Save"}
        </Button> */}
        <Button disabled={loading} onClick={() => onSave()}>
          {loading ? <Loader className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default Experience;
