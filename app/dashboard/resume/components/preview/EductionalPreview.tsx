import React from "react";

function EducationalPreview({ resumeInfo }: any) {
  return (
    <div className="my-6 dark:text-white text-black">
      <h2 className="text-center font-bold text-sm mb-2">Education</h2>
      <hr className="border-2" />

      {resumeInfo?.education.map((education: any, index: any) => (
        <div key={index} className="my-5">
          <h2 className="text-sm font-bold">{education.universityName}</h2>
          <h2 className="text-xs flex justify-between">
            {education?.degree} in {education?.major}
            <span>
              {education?.startDate} - {education?.endDate}
            </span>
          </h2>
          <p className="text-xs my-2">{education?.description}</p>
        </div>
      ))}
    </div>
  );
}

export default EducationalPreview;
