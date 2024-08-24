import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();

    // Log the received request body
    console.log("Received request body:", requestBody);

    if (!requestBody.modelUrl) {
      console.error("Missing 'modelUrl' field in the request body");
      return NextResponse.json(
        { error: "Missing 'modelUrl' field in the request body" },
        { status: 400 }
      );
    }

    if (!requestBody.input) {
      console.error("Missing 'input' field in the request body");
      return NextResponse.json(
        { error: "Missing 'input' field in the request body" },
        { status: 400 }
      );
    }

    if (!process.env.HUGGING_FACE_TOKEN) {
      console.error("Missing 'Hugging Face Access Token'");
      return NextResponse.json(
        { error: "Missing 'Hugging Face Access Token'" },
        { status: 500 }
      );
    }

    const modelUrl = requestBody.modelUrl;
    const input = requestBody.input;

    const response = await fetch(modelUrl, {
      headers: {
        Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ inputs: input }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        `Request to Hugging Face failed with status: ${response.status}, body: ${errorBody}`
      );
      return NextResponse.json(
        { error: "Request to model failed" },
        { status: response.status }
      );
    }

    const audioData = await response.arrayBuffer();

    return new NextResponse(audioData, {
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (error) {
    console.error("Error occurred in API route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
