"use client";
import { Loader, PlusCircle } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import GlobalApi from "../../app/service/GlobalApi";
import { useRouter } from "next/navigation";

const AddResume = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const { user } = useUser();
  const navigation = useRouter();
  const [loading, setLoading] = useState(false);

  const onCreate = async () => {
    setLoading(true);
    const uuid = uuidv4();
    const data = {
      data: {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };

    GlobalApi.CreateNewResume(data).then(
      (resp) => {
        console.log(resp.data.data.documentId);
        if (resp) {
          setLoading(false);
          navigation.push(
            "/dashboard/resume/" + resp.data.data.documentId + "/edit"
          );
        }
      },
      (error) => {
        setLoading(false);
      }
    );
  };
  return (
    <div>
      <div
        className="p-14 py-24  items-center gap-5 flex justify-center flex-col dark:bg-gray-700 dark:text-white bg-gray-100 text-black rounded-lg h-[280px] transition-all hover:scale-105 cursor-pointer transform"
        onClick={() => setOpenDialog(true)}
      >
        <PlusCircle />
        <span>Create New Resume</span>
      </div>

      <Dialog open={openDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-black dark:text-white">
              Edit profile
            </DialogTitle>
            <DialogDescription>
              <p>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </p>
              <Input
                className="my-2"
                placeholder="Ex. full Web development"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>

            <div className="flex justify-end gap-5 text-black dark:text-white">
              <Button variant={"ghost"} onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button
                disabled={!resumeTitle || loading}
                onClick={() => onCreate()}
              >
                {loading ? <Loader className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
