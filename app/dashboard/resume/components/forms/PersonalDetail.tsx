import { ResumeInfoContext } from "@/app/constants/ResumeInfoContext";
import GlobalApi from "@/app/service/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle, User2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const PersonalDetail = ({ enabledNext }: any) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const { resumeInfo, setResumeInfo }: any = useContext(ResumeInfoContext);

  useEffect(() => {
    console.log(params);
  }, []);
  const handleInputChange = (e: any) => {
    enabledNext(false);
    const { name, value } = e.target;
    // useEffect(() => {
    //   console.log("---", resumeInfo);
    // }, []);

    setFormData({
      ...formData,
      [name]: value,
    });
    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };
  const onSave = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: formData,
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
  return (
    <div className=" shadow-lg rounded-lg  dark:text-white text-black">
      <div className="top-0  items-center  w-full absolute p-4 md:p-[21px] flex gap-2 dark:bg-gray-800 dark:text-white bg-gray-50 text-black">
        <User2Icon className="w-8 h-8 dark:text-white text-black" />
        <div className="flex flex-col ml-3">
          <h2 className="font-bold text-[15px]"> Personal Detail</h2>
          <p className="text-xs">Get Started with the basic information</p>
        </div>
      </div>
      <form onSubmit={onSave} className="lg:p-10 md:p-3 sm:p-5 p-5 mt-6">
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input
              name="firstName"
              defaultValue={resumeInfo?.firstName}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input
              name="lastName"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo?.lastName}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input
              name="jobTitle"
              required
              defaultValue={resumeInfo?.jobTitle}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input
              name="address"
              required
              defaultValue={resumeInfo?.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input
              name="phone"
              required
              defaultValue={resumeInfo?.phone}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input
              name="email"
              required
              defaultValue={resumeInfo?.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetail;
