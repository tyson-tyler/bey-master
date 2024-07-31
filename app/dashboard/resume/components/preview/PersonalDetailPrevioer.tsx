import React from "react";

const PersonalDetailPrevioer = ({ resumeInfo }: any) => {
  return (
    <div className="dark:text-white text-black">
      <h2 className="font-bold text-xl text-center">
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>
      <h2 className="text-center text-sm font-medium">
        {resumeInfo?.jobTitle}
      </h2>
      <h2 className="text-center font-normal text-sm">{resumeInfo?.address}</h2>

      <div className="flex justify-between">
        <h2 className="font-normal text-sm">{resumeInfo?.email}</h2>
        <h2 className="font-normal text-sm">{resumeInfo?.phone}</h2>
      </div>
      <hr className="border-[1.5px] my-7" />
    </div>
  );
};

export default PersonalDetailPrevioer;
