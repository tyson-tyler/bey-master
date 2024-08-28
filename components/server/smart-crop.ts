"use server";

import { v2 as cloudinary } from "cloudinary";
import { actionClient } from "./safe-action";
import z from "zod";

cloudinary.config({
  cloud_name: "dw5f8ze3g",
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const genFillSchema = z.object({
  activeVideo: z.string(),
  aspect: z.string(),
  height: z.string(),
});

async function checkVideoProcessing(url: string) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error checking video processing:", error);
    return false;
  }
}

export const genCrop = actionClient
  .schema(genFillSchema)
  .action(async ({ parsedInput: { activeVideo, aspect, height } }) => {
    const parts = activeVideo.split("/upload/");
    const fillUrl = `${parts[0]}/upload/ar_${aspect},c_fill,g_auto,h_${height}/${parts[1]}`;

    // Poll the URL to check if the video is processed
    let isProcessed = false;
    const maxAttempts = 30; // Increased attempts to 30
    const delay = 2000; // Increased delay to 2 seconds

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      isProcessed = await checkVideoProcessing(fillUrl);
      if (isProcessed) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    if (!isProcessed) {
      console.error("Video processing failed after multiple attempts.");
      return { error: "Video processing failed" };
    }

    console.log("Processed Video URL:", fillUrl);
    return { success: fillUrl };
  });
