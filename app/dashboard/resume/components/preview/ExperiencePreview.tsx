import React from "react";

function ExperiencePreview({ resumeInfo }: any) {
  return (
    <div className="my-6">
      {resumeInfo?.Experience?.map((experience: any, index: any) => (
        <div key={index} className="my-5">
          <h2 className="text-sm font-bold">{experience?.title}</h2>
          <h2 className="text-xs flex justify-between">
            {experience?.companyName},{experience?.city},{experience?.state}
            <span>
              {experience?.startDate} To{" "}
              {experience?.currentlyWorking ? "Present" : experience.endDate}{" "}
            </span>
          </h2>
          <h2 className="font-semibold my-2">{experience.workSummery}</h2>
          {/* <div
            className="text-xs my-2"
            dangerouslySetInnerHTML={{ __html: experience?.workSummery }}
          /> */}
        </div>
      ))}
    </div>
  );
}

export default ExperiencePreview;
