import { NextResponse } from "next/server";
import { ImageModel } from "@/models";
import { connecToDB } from "@/lib/mongodb";
import { replicate } from "@/lib/ai/replicate";

export async function POST(req: Request) {
  const body = await req.json();
  const prompt = body.prompt;

  try {
    const res: any = await replicate.run(
      "prompthero/openjourney:ad59ca21177f9e217b9075e7300cf6e14f7e5b4505b87b9689dbd866e9768969",
      { input: { prompt } }
    );

    console.log("Replicate response:", res);

    // Extract the first element from the response array as the image URL
    const imageUrl = res[0];
    if (!imageUrl) {
      throw new Error("No image URL returned from Replicate API");
    }

    await connecToDB();

    const imageDoc = await ImageModel.create({ imageUrl, prompt });
    if (!imageDoc) {
      return NextResponse.json(
        { error: "Failed to save Image" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Image generated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error generating image:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  await connecToDB();
  const images = await ImageModel.find().sort({ createdAt: -1 }).limit(10);
  return NextResponse.json({ images }, { status: 200 });
}
