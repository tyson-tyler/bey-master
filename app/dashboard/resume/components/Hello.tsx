import { createContext } from "react";

interface ExperienceType {
  id: number;
  title: string;
  companyName: string;
  startDate: string;
  endDate: string;
  workSummary: string;
}

interface EducationType {
  id: number;
  universityName: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface SkillType {
  name: string;
  rating: number;
}

interface ResumeInfoType {
  firstName: string;
  lastName: string;
  jobTitle: string;
  address: string;
  phone: string;
  email: string;
  themeColor: string;
  summary: string;
  experience: ExperienceType[];
  education: EducationType[];
  skills: SkillType[];
}

interface ResumeInfoContextType {
  resumeInfo: ResumeInfoType;
  setResumeInfo: React.Dispatch<React.SetStateAction<ResumeInfoType>>;
}

const defaultResumeInfo: ResumeInfoType = {
  firstName: "",
  lastName: "",
  jobTitle: "",
  address: "",
  phone: "",
  email: "",
  themeColor: "",
  summary: "",
  experience: [
    {
      id: 1,
      title: "",
      companyName: "",
      startDate: "",
      endDate: "",
      workSummary: "",
    },
  ],
  education: [
    {
      id: 1,
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ],
  skills: [
    {
      name: "",
      rating: 0,
    },
  ],
};

export const ResumeInfoContext = createContext<
  ResumeInfoContextType | undefined
>(undefined);
