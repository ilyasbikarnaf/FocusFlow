"use server";

import { Task } from "@/db/TaskSchema";
import { getCurrentUserId } from "@/lib/utils/dal";
import { z } from "zod";
import { nanoid } from "nanoid";
import connectDB from "@/db";

const TaskSchema = z.object({
  title: z.string(),
  description: z.string().optional().nullable(),
  status: z.enum(["todo", "in_progress", "done"]),
  priority: z.enum(["low", "medium", "high"]),
  userId: z.string().min(1, "User ID is required"),
  taskId: z.string(),
  editedAt: z.date().optional(),
  isEdited: z.boolean().default(false),
});

// editedAt: {
//   type: Date,
//   default: null,
// },
// isEdited: {
//   type: Boolean,
//   default: false,
// },

export type ActionResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  error?: string;
};

export async function createTask(formData: FormData): Promise<ActionResponse> {
  try {
    await connectDB();
    const userId = await getCurrentUserId();

    if (!userId) {
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
      taskId: nanoid(),
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
    return {
      success: false,
      message: "Error occured during task creation",
    };
  }
}

export async function updateTask(
  taskId: string,
  formData: FormData
): Promise<ActionResponse> {
  try {
    await connectDB();
    const userId = await getCurrentUserId();

    if (!userId) {
      return { success: false, message: "Unauthorized" };
    }

    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      status: formData.get("status") as string,
      priority: formData.get("priority") as string,
      userId,
      taskId: nanoid(),
      isEdited: true,
      editedAt: new Date(),
    };

    const validatedData = TaskSchema.safeParse(data);

    if (!validatedData.success) {
      return { success: false, message: "Invalid data" };
    }

    await Task.findOneAndUpdate({ taskId, userId }, validatedData.data);

    return { success: true, message: "Task updated succesfully" };
  } catch (e) {
    return { success: false, message: "Failed to update task" };
  }
}

export async function deleteTask(taskId: string) {
  try {
    await connectDB();
    const userId = await getCurrentUserId();

    if (!userId) {
      return { success: false, message: "Unauthorized" };
    }

    const result = await Task.deleteOne({ taskId, userId });
    if (result.deletedCount === 0) {
      return {
        success: false,
        message: "Task not found or you don't have permission",
      };
    }

    return { success: true, message: "Task Deleted succesfully" };
  } catch (e) {
    return { success: false, message: "Failed to delete the task" };
  }
}
