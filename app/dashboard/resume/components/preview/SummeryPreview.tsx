import React from "react";

const SummeryPreview = ({ resumeInfo }: any) => {
  return (
    <p className="text-sm dark:text-white text-black">{resumeInfo?.summery}</p>
  );
};

export default SummeryPreview;
