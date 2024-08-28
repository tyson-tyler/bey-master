"use server";

import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import { actionClient } from "./safe-action";
import z from "zod";
import { Cloudinary } from "@cloudinary/url-gen";

cloudinary.config({
  cloud_name: "dw5f8ze3g",
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const genFillSchema = z.object({
  activeImage: z.string(),
  aspect: z.string(),
  width: z.string(),
  height: z.string(),
});

async function checkImageProcessing(url: string) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return true;
    } else if (response.status === 504) {
      // Retry the request if a 504 error occurs
      return false;
    }
    return false;
  } catch (error) {
    return false;
  }
}

function reloadPageWithRetries(retryCount: number) {
  if (retryCount < 5) {
    // Wait a bit before reloading
    setTimeout(() => {
      location.reload();
    }, 2000); // 2-second delay before reload
  }
}

export const genFill = actionClient
  .schema(genFillSchema)
  .action(async ({ parsedInput: { activeImage, aspect, width, height } }) => {
    const parts = activeImage.split("/upload/");

    const fillUrl = `${parts[0]}/upload/ar_${aspect},b_gen_fill,c_pad,w_${width},h_${height}/${parts[1]}`;
    console.log(fillUrl);

    // Poll the URL to check if the image is processed
    let isProcessed = false;
    const maxAttempts = 30; // Increase attempts to 30
    const delay = 2000; // Increase delay to 2 seconds
    let retryCount = 0;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      isProcessed = await checkImageProcessing(fillUrl);
      if (isProcessed) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    if (!isProcessed) {
      retryCount++;
      reloadPageWithRetries(retryCount);
      return { error: "Image processing failed" };
    }

    return { success: fillUrl };
  });
