import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/app/constants/ResumeInfoContext";
import { LoaderCircle, Plus, Trash } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import GlobalApi from "@/app/service/GlobalApi";
import { toast } from "sonner";
import { FaBookOpen } from "react-icons/fa";

function Education() {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo }: any = useContext(ResumeInfoContext);
  const params = useParams();
  const [educationalList, setEducationalList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  useEffect(() => {
    if (resumeInfo) {
      setEducationalList(resumeInfo?.education || []);
    }
  }, [resumeInfo]);

  const handleChange = (event: any, index: any) => {
    const newEntries: any = educationalList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  };

  const AddNewEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const RemoveEducation = () => {
    setEducationalList((educationalList) => educationalList.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        education: educationalList.map(({ id, ...rest }: any) => rest),
      },
    };
    console.log(data);

    GlobalApi.UpdateResumeDetail(params.resumeId, data).then(
      (resp) => {
        console.log(resp);
        setLoading(false);
        toast("Details updated !");
      },
      (error) => {
        setLoading(false);
        toast("Server Error, Please try again!");
      }
    );
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationalList,
    });
  }, [educationalList, resumeInfo, setResumeInfo]);

  return (
    <div className="text-black dark:text-white shadow-lg rounded-lg mt-10">
      <div className="top-0 items-center w-full absolute p-4 flex gap-2 dark:bg-gray-800 dark:text-white bg-gray-50 text-black">
        <FaBookOpen className="w-8 h-8 dark:text-white text-black" />
        <div className="flex flex-col ml-3">
          <h2 className="font-bold text-[15px]">Add Education</h2>
          <p className="text-xs">Add Your Education</p>
        </div>
      </div>

      <div className="lg:p-10 md:p-5 sm:p-5 p-5">
        {educationalList.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-2 gap-3 p-3 my-5 rounded-lg"
          >
            <div className="col-span-2">
              <label>University Name</label>
              <Input
                name="universityName"
                onChange={(e) => handleChange(e, index)}
                defaultValue={item?.universityName}
              />
            </div>
            <div>
              <label>Degree</label>
              <Input
                name="degree"
                onChange={(e) => handleChange(e, index)}
                defaultValue={item?.degree}
              />
            </div>
            <div>
              <label>Major</label>
              <Input
                name="major"
                onChange={(e) => handleChange(e, index)}
                defaultValue={item?.major}
              />
            </div>
            <div>
              <label>Start Date</label>
              <Input
                type="date"
                name="startDate"
                onChange={(e) => handleChange(e, index)}
                defaultValue={item?.startDate}
              />
            </div>
            <div>
              <label>End Date</label>
              <Input
                type="date"
                name="endDate"
                onChange={(e) => handleChange(e, index)}
                defaultValue={item?.endDate}
              />
            </div>
            <div className="col-span-2">
              <label>Description</label>
              <Textarea
                name="description"
                onChange={(e) => handleChange(e, index)}
                defaultValue={item?.description}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between lg:p-10 md:p-5 sm:p-5 p-5">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewEducation}
            className="text-primary"
          >
            <Plus className="w-5 h-5 text-white" />
            Add More Education
          </Button>
          <Button
            variant="outline"
            onClick={RemoveEducation}
            className="text-primary"
          >
            <Trash className="w-5 h-5 text-white" />
            Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={() => onSave()}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Education;
