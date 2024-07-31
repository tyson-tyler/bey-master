import { Pencil } from "lucide-react";
import Link from "next/link";
import React from "react";

const ResumeCard = ({ resume }: any) => {
  return (
    <Link href={"/dashboard/resume/" + resume.documentId + "/edit"}>
      <div className="p-14 flex-col bg-slate-200 rounded-lg gap-5 dark:bg-slate-900 dark:text-white text-black border-2 hover:scale-105 transition border-purple-600 flex items-center justify-center h-[280px]">
        <Pencil className="w-5 h-5 text-black dark:text-white" />
        <h2 className="text-center  text-black dark:text-white">
          {resume.title}
        </h2>
      </div>
    </Link>
  );
};

export default ResumeCard;
