"use server";

import { SignupSchema } from "@/lib/schemas/auth";
import { clerkClient } from "@clerk/nextjs/server";

type AuthResponse = {
  success: boolean;
  message: string;
  email?: string;
  password?: string;
};

export const createUserAccount = async (
  formData: FormData
): Promise<AuthResponse> => {
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
    //clerk create user
    const client = await clerkClient();

    await client.users.createUser({ emailAddress: [email], password });

    return {
      success: true,
      message: "Successfully signed up! Welcome to FocusFlow!",
      email,
      password,
    };
  } catch (error: any) {
    if (
      error.errors[0].message ===
      "That email address is taken. Please try another."
    ) {
      return {
        success: false,
        message:
          "An account with this email already exists. Please use a different email or try logging in",
      };
    }
    return {
      success: false,
      message: "An unexpected error occured please try again later",
    };
  }
};
