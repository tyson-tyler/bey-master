import React from "react";

const Professinal = ({ resumeInfo }: any) => {
  return (
    <div className="my-6">
      <h2 className="text-center font-bold text-sm mb-2">
        Professional Experience
      </h2>
      <hr className="border-2 dark:border-sky-50 border-black" />

      {resumeInfo?.experience.map((experience: any, index: any) => (
        <div key={index} className="my-5">
          <h2 className="text-sm font-bold">{experience?.title}</h2>
          <h2 className="text-sm flex justify-between">
            {experience?.companyName}, {experience?.city}, {experience?.state}
            <span>
              {experience?.startDate} To{" "}
              {experience?.currentlyWorking ? "Present" : experience.endDate}
            </span>
          </h2>
          <div
            className="text-xs my-2"
            dangerouslySetInnerHTML={{ __html: experience?.workSummery }}
          />
        </div>
      ))}
    </div>
  );
};

export default Professinal;
