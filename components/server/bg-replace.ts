"use server";

import { v2 as cloudinary } from "cloudinary";
import { actionClient } from "./safe-action";
import z from "zod";

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dw5f8ze3g",
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Define the schema for the background replacement action
const bgReplaceSchema = z.object({
  prompt: z.string().optional(),
  activeImage: z.string(),
});

// Function to check if the image processing is complete
async function checkImageProcessing(url: string): Promise<boolean> {
  const maxRetries = 5; // Number of retries for 504 errors
  const retryDelay = 2000; // Delay between retries in milliseconds

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return true; // Image processed successfully
      }
      if (response.status === 504) {
        console.warn(`Attempt ${attempt + 1}: 504 error, retrying...`);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        continue; // Retry if 504 error occurs
      }
      return false; // Other non-200 status
    } catch (error) {
      console.error(`Attempt ${attempt + 1}: Error occurred`, error);
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
    }
  }
  return false; // Processing failed after retries
}

// Background replacement action
export const replaceBackground = actionClient
  .schema(bgReplaceSchema)
  .action(async ({ parsedInput: { prompt, activeImage } }) => {
    const parts = activeImage.split("/upload/");
    const bgReplaceUrl = prompt
      ? `${
          parts[0]
        }/upload/e_gen_background_replace:prompt_${encodeURIComponent(
          prompt
        )}/${parts[1]}`
      : `${parts[0]}/upload/e_gen_background_replace/${parts[1]}`;

    // Poll the URL to check if the image is processed
    let isProcessed = false;
    const maxAttempts = 20;
    const delay = 1000; // 1 second

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      isProcessed = await checkImageProcessing(bgReplaceUrl);
      if (isProcessed) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    if (!isProcessed) {
      throw new Error("Image processing timed out");
    }

    console.log(bgReplaceUrl);
    return { success: bgReplaceUrl };
  });
