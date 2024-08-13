"use client";
import Topbar from "@/components/Topbar";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect, useRef } from "react";
import { IoCloudUpload } from "react-icons/io5";
import { SiGooglegemini } from "react-icons/si";
import gsap from "gsap";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null); // Store the selected file
  const [loading, setLoading] = useState(false); // Track loading status
  const backgroundAnimationRef = useRef<GSAPTween | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const router = useRouter();
  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files: any = event.target.files;
    if (files?.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      const videoURL = URL.createObjectURL(selectedFile);
      setVideoSrc(videoURL);
    }
  };

  const uploadVideo = async () => {
    if (file) {
      setLoading(true); // Set loading state to true
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const newName = response.data.newName;
        router.push("/dashboard/" + newName);
        // Handle response as needed
      } catch (error) {
        console.error("Error uploading video:", error);
      } finally {
        setLoading(false); // Set loading state to false
      }
    }
  };

  useEffect(() => {
    if (videoSrc && buttonRef.current) {
      // Background Animation when video is present
      backgroundAnimationRef.current = gsap.to("main", {
        background: `
        linear-gradient(135deg, rgba(255, 0, 150, 0.8) 0%, rgba(0, 204, 255, 0.8) 100%), 
        url('https://www.transparenttextures.com/patterns/cubes.png')`,
        backgroundSize: "cover",
        duration: 5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Bounce animation on the button when video is present
      gsap.fromTo(
        buttonRef.current,
        { y: -20 },
        {
          y: 0,
          duration: 1,
          ease: "bounce.out",
          repeat: 1,
          repeatDelay: 0.5,
        }
      );
    } else {
      // Reset background when no video is present
      gsap.set("main", { background: "" });
      if (backgroundAnimationRef.current) {
        backgroundAnimationRef.current.kill();
      }
    }

    return () => {
      // Clean up the background animation on unmount
      if (backgroundAnimationRef.current) {
        backgroundAnimationRef.current.kill();
        gsap.set("main", { background: "" }); // Reset background
      }

      // Clean up the video URL
      if (videoSrc) {
        URL.revokeObjectURL(videoSrc);
      }
    };
  }, [videoSrc]);

  return (
    <>
      <Topbar />
      <main className="lg:max-w-6xl lg:justify-center mb-10 md:mb-0 lg:mb-0 md:mt-[100px] md:ml-2 md:mr-2 lg:mx-auto lg:p-[20px] flex flex-col lg:flex lg:flex-row mx-auto px-4 bg-gray-100 rounded-lg dark:bg-gray-900 transition-all duration-500 ease-in-out">
        <div className="py-8 flex flex-col justify-center gap-2">
          <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl font-bold uppercase mb-2 dark:text-white text-black">
            <span className="xl:text-5xl lg:text-4xl p-3 mb-3 text-center flex justify-center lg:justify-normal lg:text-left md:text-4xl sm:text-3xl text-2xl dark:text-white text-black">
              Generate caption from video
            </span>
            <span className="text-center bg-gradient-to-br from-purple-500 to-sky-500 bg-clip-text text-transparent lg:text-left flex justify-center lg:justify-normal">
              using Power of AI
            </span>
          </h1>
          <p className="text-sm text-gray-400 flex justify-center lg:justify-normal text-center">
            Generate a caption from a video with the help of AI and get a
            caption on your video.
          </p>
          <form className="grid gap-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Upload Video
            </label>
            <div className="w-full mb-4 gap-3 justify-center lg:flex items-center mx-auto">
              <div className="relative w-full flex items-center justify-center">
                <IoCloudUpload className="absolute left-8 mr-2 text-xl text-white" />
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="flex justify-center w-full text-sm my-5 lg:my-1 text-center items-center dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-full cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white focus:outline-none px-4 py-3 pl-16 file:bg-transparent file:text-white file:border-none hover:bg-gradient-to-l transition-all duration-300 ease-in-out"
                />
              </div>

              <Button
                ref={buttonRef}
                onClick={(e) => {
                  e.preventDefault(); // Prevent default button behavior
                  uploadVideo(); // Call upload function
                }}
                className={`relative rounded-full h-[46px] flex justify-center w-full text-sm text-center items-center dark:text-gray-300 border border-gray-300 dark:border-gray-600 cursor-pointer ${
                  videoSrc
                    ? "bg-gradient-to-r from-purple-500 to-red-500 text-white hover:transition-colors"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
                disabled={!videoSrc || loading} // Disable button when no video is selected or uploading
              >
                {loading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 0115.485-2.18L22 8a10 10 0 00-18 1.817L4 12z"
                    ></path>
                  </svg>
                ) : (
                  <SiGooglegemini className="w-5 h-5 text-white mr-2" />
                )}
                {loading ? "Uploading..." : "Generate AI Caption"}
              </Button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              MP4, AVI, MOV up to 50MB
            </p>
          </form>
        </div>

        <div className="p-8 md:justify-center rounded-2xl md:flex mx-auto lg:flex-row">
          {videoSrc ? (
            <video
              loop
              id="hew"
              key={videoSrc}
              className="bg-gray-200 object-cover lg:w-[240px] w-[250px] h-[400px] lg:h-[380px] text-gray-500"
              autoPlay
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="bg-gray-200 lg:w-[240px] w-[250px] h-[400px] lg:h-[380px] text-gray-500 rounded-2xl flex items-center justify-center">
              <img
                src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWN6N3M3MXZudGhtZm5sNTBncDR3bG9mbnh0OG96eng1NHdkc3l2bCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/4ilFRqgbzbx4c/giphy.webp"
                alt="default preview"
                className="bg-gray-200 object-cover lg:w-[240px] w-[250px] h-[400px] lg:h-[380px] text-gray-500 rounded-2xl"
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Page;
