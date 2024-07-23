import mongoose from "mongoose";

export async function connecToDB() {
  await mongoose.connect(process.env.MONGODB_URI as string);
}
