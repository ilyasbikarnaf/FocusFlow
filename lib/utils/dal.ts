import connectDB from "@/db";
import { Task } from "@/db/TaskSchema";
import { auth } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import { cache } from "react";

export type RetrievedTasksType = {
  title: string;
  description: string;
  status: "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  editedAt?: Date;
  isEdited: boolean;
  userId: string;
  createdAt: Date;
  taskId: string;
};

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
  await connectDB();

  const userId = await getCurrentUserId();
  const tasks = (await Task.find({ userId }, { _id: 0, __v: 0 }).sort({
    createdAt: -1,
  })) as RetrievedTasksType[];

  return tasks;
}

export async function getTask(taskId: string) {
  const userId = await getCurrentUserId();
  console.log(userId);

  const task = await Task.findOne({ taskId }, { _id: 0, __v: 0 });
  console.log(task);
  if (!task) {
    throw new Error("Task not found or unauthorized");
  }

  return task as RetrievedTasksType;
}
