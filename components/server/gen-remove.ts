"use server";

import { v2 as cloudinary } from "cloudinary";
import { actionClient } from "./safe-action";
import z from "zod";

cloudinary.config({
  cloud_name: "dw5f8ze3g",
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const genRemoveSchema = z.object({
  prompt: z.string(),
  activeImage: z.string(),
});

async function checkImageProcessing(url: string) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error checking image processing:", error);
    return false;
  }
}

export const genRemove = actionClient
  .schema(genRemoveSchema)
  .action(async ({ parsedInput: { prompt, activeImage } }) => {
    const parts = activeImage.split("/upload/");
    const removeUrl = `${parts[0]}/upload/e_gen_remove:${prompt}/${parts[1]}`;

    let isProcessed = false;
    const maxAttempts = 10; // Reduce attempts to 10
    const delay = 2000; // Increase delay to 2 seconds

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      isProcessed = await checkImageProcessing(removeUrl);
      if (isProcessed) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    if (!isProcessed) {
      throw new Error("Image processing timed out or failed.");
    }

    console.log("Processed Image URL:", removeUrl);
    return { success: removeUrl };
  });
