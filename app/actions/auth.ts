"use server";

import connectDB from "@/db";
import { User } from "@/db/schema";
import { SignupSchema } from "@/lib/schemas/auth";
import { hashPassword } from "@/lib/utils/authUtils";

type AuthResponse = {
  success: boolean;
  message: string;
};

export const SignupUser = async (formData: FormData): Promise<AuthResponse> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const parsedData = SignupSchema.safeParse({
    email,
    password,
    confirmPassword,
  });

  if (!parsedData.success) {
    return {
      success: false,
      message: parsedData.error.flatten().formErrors.join(", "),
    };
  }

  try {
    await connectDB();

    const user = await User.find({ email });

    if (user) {
      return {
        success: false,
        message:
          "An account with this email already exists. Please sign in or use a different email.",
      };
    }

    const hashedPassword = await hashPassword(password);
    await User.create({ email, password: hashedPassword });

    return {
      success: true,
      message: "Successfully signed up! Welcome to FocusFlow!",
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
