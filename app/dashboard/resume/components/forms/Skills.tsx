import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import "@smastrom/react-rating/style.css";
import { Rating } from "@smastrom/react-rating";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { ResumeInfoContext } from "@/app/constants/ResumeInfoContext";
import { useParams } from "next/navigation";
import GlobalApi from "@/app/service/GlobalApi";
import toast from "react-hot-toast";
import { FaPaintBrush } from "react-icons/fa";
const Skills = () => {
  const [skillsList, setSkillsList] = useState([
    {
      name: "",
      rating: 0,
    },
  ]);
  const handleChange = (index: any, name: any, value: any) => {
    const newEntries: any = skillsList.slice();

    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };
  const { resumeId } = useParams();
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo }: any = useContext(ResumeInfoContext);
  const AddNewSkills = () => {
    setSkillsList([
      ...skillsList,
      {
        name: "",
        rating: 0,
      },
    ]);
  };
  const RemoveSkills = () => {
    setSkillsList((skillsList) => skillsList.slice(0, -1));
  };
  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        skills: skillsList,
      },
    };
    GlobalApi.UpdateResumeDetail(resumeId, data).then(
      (resp) => {
        console.log(resp);
        setLoading(false);
        toast.success("Details updated !");
      },
      (error) => {
        setLoading(false);
        toast.error("Server Error");
      }
    );
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: skillsList,
    });
  }, [skillsList]);
  return (
    <div className="shadow-lg rounded-lg dark:text-white text-black gap-4">
      <div className="top-0  items-center  w-full absolute p-4 flex gap-2 dark:bg-gray-800 dark:text-white bg-gray-50 text-black">
        <FaPaintBrush className="w-8 h-8 dark:text-white text-black" />
        <div className="flex flex-col ml-3">
          <h2 className="font-bold text-[15px]">Add Skills</h2>
          <p className="text-xs">Add Your Skills</p>
        </div>
      </div>

      <div className="lg:pt-10 px-11 md:px-5  md:pt-5 sm:pt-5 pt-5 pb-0">
        {skillsList.map((item, index) => (
          <div className="flex justify-between">
            <div className="my-2">
              <label className="text-xs mb-2">Name</label>
              <Input
                className="w-full mt-2 "
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
            </div>
            <Rating
              style={{ maxWidth: 120 }}
              value={item.rating}
              onChange={(v: any) => handleChange(index, "rating", v)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between lg:p-10 md:p-5 sm:p-5 p-5">
        <div className="flex gap-2">
          <Button
            variant={"outline"}
            onClick={AddNewSkills}
            className="text-purple-600"
          >
            Add More Skill{" "}
          </Button>
          <Button
            variant="outline"
            onClick={RemoveSkills}
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

export default Skills;
