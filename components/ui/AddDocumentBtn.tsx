"use client";
import React from "react";
import { Button } from "./button";
import Image from "next/image";
import Hello from "../../components/public/me.svg";
import { createDocument } from "@/lib/actions/room.action";
import { useRouter } from "next/navigation";

const AddDocumentBtn = ({ userId, email }: AddDocumentBtnProps) => {
  const router = useRouter();
  const addDocumentHandler = async () => {
    try {
      const room = await createDocument({ userId, email });

      if (room) router.push(`/documents/${room.id}`);
    } catch (error) {}
  };
  return (
    <Button
      type="submit"
      onClick={addDocumentHandler}
      className="gradient-blue flex gap-1 py-3 shadow-md  rounded-lg"
    >
      <Image src={Hello} alt="hello" width={24} height={24} />
      <p className="ml-2 lg:flex md:flex hidden">Start a blank document</p>
    </Button>
  );
};

export default AddDocumentBtn;
