import { model, models, Schema } from "mongoose";

interface IImage {
  imageUrl: string;
  prompt: string;
}
interface IStory {
  story: Story;
}

const ImageSchema = new Schema<IImage>(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const ImageModel = models.Image || model<IImage>("Image", ImageSchema);

const StorySchema = new Schema<IStory>(
  {
    story: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

export const StoryModel = models.Story || model<IStory>("Story", StorySchema);
