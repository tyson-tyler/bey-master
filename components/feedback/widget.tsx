"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { FaPaperPlane } from "react-icons/fa";
import EmojiRating from "./rating";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import toast from "react-hot-toast";
import { MessageCircle } from "lucide-react";

const Widget = () => {
  const [rating, setRating] = useState(3);
  const [submitted, setSubmitted] = useState(false);
  const submit = (e: any) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      feedback: form.feedback.value,

      rating,
    };
    toast("Thanks for your Feedback !", {
      icon: "🎊",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    setSubmitted(true);

    console.log(data);
  };
  return (
    <Popover>
      <div className="widget fixed text-black dark:text-white bottom-[4rem] md:bottom-4 right-4 z-50">
        <PopoverTrigger asChild>
          <Button className="rounded-full shadow-lg hover:scale-105">
            <MessageCircle className="mr-2 h-5 w-5" />
            Feedback
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full max-w-lg p-4">
          {submitted ? (
            <div className="bg-gray-100 flex flex-col text-black p-4 dark:bg-gray-800 rounded-lg dark:text-white">
              <span className="mb-3 font-bold flex justify-center items-center">
                🥳 🎉 --Thank You-- 🎉 🥳
              </span>
              <h3 className="text-lg font-bold">
                Thanks you for your feedback !
              </h3>
              <p className="text-gray-400 flex-wrap">
                We appreciated your feedback. It helps us improve our product
                and provide better service to our customers.
              </p>
            </div>
          ) : (
            <div className="flex shadow-lg w-[300px] md:w-[400px] lg:w-[450px] p-3 dark:bg-gray-900 bg-gray-100 rounded-md flex-col gap-3 justify-center items-center">
              <h3 className="text-lg font-semibold">Give me your feedback</h3>
              <form className="w-full" onSubmit={submit}>
                <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                  <div className="w-full md:w-1/2">
                    <Label htmlFor="name" className="mb-2 hidden md:flex">
                      Name
                    </Label>
                    <Input
                      id="name"
                      className="border mt-[7px] border-black dark:bg-gray-800 dark:border-gray-100 w-full"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <Label htmlFor="email" className="mb-2 hidden md:flex">
                      Email
                    </Label>
                    <Input
                      id="email"
                      placeholder="Enter your email"
                      className="dark:bg-gray-800 mt-[7px] w-full"
                    />
                  </div>
                </div>
                <div className="my-3 w-full">
                  <Label htmlFor="feedback" className="mb-2 hidden md:flex">
                    Feedback
                  </Label>
                  <Textarea
                    id="feedback"
                    placeholder="Tell us what you think"
                    className="min-h-[25px] lg:min-h-[100px] dark:bg-gray-800 mb-10 mt-[7px] w-full resize-none"
                  />
                </div>
                <hr />
                <div className="w-full justify-center flex mt-[-20px] items-center">
                  <span className="lg:p-2 p-0 mb-3 w-[160px] flex justify-center text-center bg-gray-200 text-black dark:bg-gray-900 dark:text-white">
                    Send Your Rating
                  </span>
                </div>
                <EmojiRating />
                <Button className="flex gap-2 mt-3 w-full justify-center">
                  <FaPaperPlane className="text-white w-5 h-5" />
                  Submit
                </Button>
              </form>
            </div>
          )}
        </PopoverContent>
      </div>
    </Popover>
  );
};

export default Widget;
