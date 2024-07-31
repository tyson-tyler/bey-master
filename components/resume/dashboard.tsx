"use client";
import React, { useEffect, useState } from "react";
import AddResume from "./AddResume";
import { useUser } from "@clerk/nextjs";
import GlobalApi from "@/app/service/GlobalApi";
import ResumeCard from "./ResumeCard";

const Dashboard = () => {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    user && GetResumesList();
  }, [user]);
  const GetResumesList = () => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress).then(
      (resp) => {
        setResumeList(resp.data.data);
      }
    );
  };
  return (
    <div className="p-10 md:px-10 lg:px-12 gap-3">
      <h2 className="font-bold text-3xl mb-2 dark:text-white text-black">
        My Resume
      </h2>
      <p className="text-black dark:text-white mb-3">
        Generate Ai Resume for your work and job role
      </p>
      <div className="grid-container  gap-5">
        <AddResume />
        {resumeList.length > 0 &&
          resumeList.map((resume, index) => (
            <ResumeCard resume={resume} key={index} />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
