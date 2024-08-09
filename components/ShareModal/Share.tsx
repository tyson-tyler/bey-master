"use client";
import { useSelf } from "@liveblocks/react/suspense";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import Hello from "../../app/assets/hello.svg";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import e from "express";
import UserTypeSelector from "../UserTypeSelecter";
import Collaborator from "./Collabrater";
import { updateDocumentAccess } from "@/lib/actions/room.action";

const ShareModal = ({
  roomId,
  collaborators,
  creatorId,
  currentUserType,
}: ShareDocumentDialogProps) => {
  const user = useSelf();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState<UserType>("viewer");

  const shareDocumentHandler = async () => {
    setLoading(true);
    await updateDocumentAccess({
      roomId,
      email,
      userType: userType as UserType,
      updatedBy: user.info,
    });
    setLoading(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          className="flex h-9 gap-1 px-4"
          disabled={currentUserType !== "editor"}
        >
          <Image
            src={Hello}
            width={20}
            height={20}
            alt="hello"
            className="min-w-4 md:size-5 mr-0 sm:mr-2"
          />
          <p className="hidden sm:block">Share</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 text-white">
        <DialogHeader>
          <DialogTitle>Share who can Edit & View this Document</DialogTitle>
          <DialogDescription>
            Choose who can write something and view the document.
          </DialogDescription>
        </DialogHeader>
        <Label htmlFor="email" className="mt-6 text-gray-500">
          Email Address
        </Label>
        <div className="flex items-center gap-3">
          <div className="flex flex-1 rounded-md bg-gray-700">
            <input
              id="email"
              placeholder="Enter email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[100%] outline-none bg-gray-700  rounded-md px-3"
            />
            <UserTypeSelector userType={userType} setUserType={setUserType} />
          </div>
          <Button
            className="flex h-full gap-1 px-5"
            disabled={loading}
            type="submit"
            onClick={shareDocumentHandler}
          >
            {loading ? "Sending" : "Invite"}
          </Button>
        </div>
        <div className="my-2 space-y-2">
          <div className="flex flex-col">
            {collaborators.map((collaborator) => (
              <Collaborator
                key={collaborator.id}
                roomId={roomId}
                creatorId={creatorId}
                email={collaborator.email}
                collaborator={collaborator}
                user={user.info}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
