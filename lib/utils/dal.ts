import connectDB from "@/db";
import { Task } from "@/db/TaskSchema";
import { auth } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import { cache } from "react";
import { unstable_cacheTag as cacheTag } from "next/cache";

export const getCurrentUserId = cache(async () => {
  try {
    const { userId } = await auth();

    if (!userId) throw new Error("Unauthorized");

    return userId;
  } catch {
    return null;
  }
});

export async function getAllTasks() {
  // await connectDB();

  const userId = await getCurrentUserId();
  const tasks = await Task.find({ userId });

  return tasks;
}

export async function getTask(id: string, userId: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Task Id");
  }

  const task = await Task.findOne({ _id: id, userId });

  if (!task) {
    throw new Error("Task not found or unauthorized");
  }

  return task;
}
