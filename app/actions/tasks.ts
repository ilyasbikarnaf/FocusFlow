"use server";

import { Task } from "@/db/TaskSchema";
import { getCurrentUserId } from "@/lib/utils/dal";
import { z } from "zod";

const TaskSchema = z.object({
  title: z.string(),
  description: z.string().optional().nullable(),
  status: z.enum(["todo", "in_progress", "done"]),
  priority: z.enum(["low", "medium", "high"]),
  userId: z.string().min(1, "User ID is required"),
});

export type ActionResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  error?: string;
};

export async function createTask(formData: FormData): Promise<ActionResponse> {
  try {
    const userId = await getCurrentUserId();

    if (!userId) {
      console.log(userId);
      return {
        success: false,
        message: "unauthorized",
      };
    }

    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      status: formData.get("status") as string,
      priority: formData.get("priority") as string,
      userId,
    };

    const validatedData = TaskSchema.safeParse(data);

    if (!validatedData.success) {
      return {
        success: false,
        message: "Invalid data",
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    await Task.create(validatedData.data);

    return { success: true, message: "Task Created Successfully" };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error occured during task creation",
    };
  }
}

async function updateTask() {}

async function deleteTask() {}
