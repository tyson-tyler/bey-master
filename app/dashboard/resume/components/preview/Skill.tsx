import React from "react";

const Skill = ({ resumeInfo }: any) => {
  return (
    <>
      <h2 className="text-center font-bold mb-1">Skill</h2>
      <hr className="border-2" />
      <div className="grid grid-cols-2 gap-3 my-4">
        {resumeInfo?.skills.map((skill: any, index: any) => (
          <div key={index} className="flex items-center justify-between">
            <h2 className="text-xs">{skill.name}</h2>
            <div className="h-2 bg-gray-200 w-[120px]">
              <div
                className="h-2 flex justify-center items-center "
                style={{
                  backgroundColor: resumeInfo?.themeColor,
                  width: skill?.rating * 20 + "%",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Skill;
