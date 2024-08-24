import { generateImage } from "@/lib/ai/generateImageAction";
import { geminiModel } from "@/lib/ai/modal";
import { connecToDB } from "@/lib/mongodb";
import { StoryModel } from "@/models";
import { formatResponse } from "@/safe/utils";
import { generateText } from "ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const user_prompt = body.prompt;

  console.log(user_prompt);

  const final_prompt = `Generate a children's story with each page containing 70-100 words. The story should be engaging, simple, and appropriate for young children, incorporating themes of friendship, adventure, and learning. The story should be unique, original, and suitable for children aged 3-6 years old. It should be fun to read, easy to understand, and follow, with a clear beginning, middle, and end. The story should be written in English and free from any copyrighted material. The final story should be in JSON format with the following structure; story_title: The title of the story, number_of_pages: The total number of pages in the story. pages: An array of objects, each containing, page_number: The page number. page_content: The content of the page, with paragraph breaks where appropriate and page_image: A prompt to generate an image for the page content, following the style of children's storybook illustrations. Finally cover_img: A prompt to generate a cover image for the story, using children's storybook cover art style. Use this user prompt to generate the story: ${user_prompt}`;

  const res = await generateText({
    model: geminiModel,
    prompt: final_prompt,
  });

  const story = formatResponse(res.text);
  const storyObj: Story = JSON.parse(story);

  const coverImagePropmpt = storyObj.cover_img;

  const coverImageUrl = await generateImage(coverImagePropmpt);
  storyObj.cover_img = coverImageUrl;

  for (let i = 0; i < storyObj.number_of_pages; i++) {
    const pageImagePrompt = storyObj.pages[i].page_image;

    const imageUrl = await generateImage(pageImagePrompt);

    storyObj.pages[i].page_image = imageUrl;
  }

  console.log(storyObj);

  await connecToDB();

  const storyDoc = await StoryModel.create({ story: storyObj });

  console.log(story);

  return NextResponse.json({ storyId: storyDoc._id }, { status: 200 });
}