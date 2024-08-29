"use server";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import { actionClient } from "./safe-action";
import z from "zod";
import sharp from "sharp";

// Cloudinary configuration
cloudinary.config({
  cloud_name: "dw5f8ze3g",
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Define the schema for form data
const formData = z.object({
  image: z.instanceof(FormData),
});

type UploadResult =
  | { success: UploadApiResponse; error?: never }
  | { error: string; success?: never };

// Image upload function
export const uploadImage = actionClient
  .schema(formData)
  .action(async ({ parsedInput: { image } }): Promise<UploadResult> => {
    console.log(image);
    const formImage = image.get("image");

    if (!formImage) return { error: "No image provided" };
    if (!image) return { error: "No image provided" };

    const file = formImage as File;

    try {
      // Convert the file to an ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Compress the image using sharp
      const compressedBuffer = await sharp(buffer)
        .resize({ width: 1500 }) // Resize to a max width of 1500px
        .webp({ quality: 80 }) // Convert to WebP format with 80% quality
        .toBuffer();

      return new Promise<UploadResult>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            use_filename: true,
            unique_filename: false,
            filename_override: file.name,
            resource_type: "image",
          },
          (error, result) => {
            if (error || !result) {
              console.error("Upload failed:", error);
              reject({ error: "Upload failed" });
            } else {
              console.log("Upload successful:", result);
              resolve({ success: result });
            }
          }
        );

        // End the upload stream with the compressed buffer
        uploadStream.end(compressedBuffer);
      });
    } catch (error) {
      console.error("Error processing file:", error);
      return { error: "Error processing file" };
    }
  });
