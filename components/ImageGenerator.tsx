"use client";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Loader from "./Loader";
import axios from "axios";
import Image from "next/image";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const res = await axios.get("/api/generate");
    setImages(res.data.images);
  };

  const handleGenerateImage = async () => {
    setLoading(true);

    try {
      const response = await axios.post("/api/generate", { prompt });
      if (response.status === 200) {
        fetchImages();
      } else {
        console.log("something got wrong"); // Set an empty array if data is not as expected
      }
    } catch (error) {
      console.error("Failed to fetch images:", error);
      // Set an empty array on error
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="w-full px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col items-center gap-4">
          <div className="flex w-full items-center space-x-2">
            <Input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Imagine and type some world a image generated"
              className="flex-1"
            />
            <Button disabled={loading} onClick={handleGenerateImage}>
              {loading ? (
                <>
                  <Loader />
                  Generating
                </>
              ) : (
                <div>Generate</div>
              )}
            </Button>
          </div>
          {images.length > 0 ? (
            <div className="grid-container gap-4  mt-5">
              {images.map((image) => (
                <Image
                  key={image.imageUrl}
                  src={image.imageUrl}
                  alt="image"
                  width={700}
                  height={700}
                  className="object-cover w-[100vh]"
                />
              ))}
            </div>
          ) : (
            <div className="mt-4">No Image</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
