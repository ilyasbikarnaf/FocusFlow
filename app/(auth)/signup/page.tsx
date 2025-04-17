"use client";

import { SignupUser } from "@/app/actions/auth";
import { SignupSchema } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const initialState = {
  success: false,
  message: "",
};

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignupSchema),
  });

  const [state, formAction, isPending] = useActionState(
    async (data: FormData) => {
      const result = await SignupUser(data);

      if (!result.success) {
        toast.error(result.message);
        return null;
      }

      toast.success(result.message);
    },
    initialState
  );

  // const onSubmit = (data) => console.log(data);

  return (
    <div className="flex flex-col justify-center min-h-screen  sm:px-6 lg:px-8 ">
      <div className="space-y-2 mb-10">
        <h1 className="text-center text-3xl">FocusFlow</h1>
        <h6 className="text-lg font-semibold text-center tracking-widest uppercase">
          Plan. Track. Win.
        </h6>
      </div>

      <form
        className="flex flex-col sm:mx-auto sm:max-w-md sm:w-full bg-[#1A1A1A] p-8 border-1 border-[#444444]/30   rounded space-y-7"
        action={formAction}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email"> Email</label>
          <input
            {...register("email")}
            type="email"
            name="email"
            id="email"
            className=" h-10 w-full rounded-md border border-gray-300/10 bg-[#222222] px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 "
          />

          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="opacity-80 text-sm ml-1">
            Password
          </label>
          <input
            {...register("password")}
            id="password"
            name="password"
            type="password"
            className=" h-10 w-full rounded-md border border-gray-300/10 bg-[#222222] px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 "
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword" className="opacity-80 text-sm ml-1">
            Confirm Password
          </label>
          <input
            {...register("confirmPassword")}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className=" h-10 w-full rounded-md border border-gray-300/10 bg-[#222222] px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 "
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <input
          disabled={true}
          type="submit"
          value={`${true ? "loading..." : "Sign up"}`}
          className="hover:cursor-pointer bg-blue-500 p-2 rounded-md disabled:cursor-not-allowed disabled:opacity-75"
        />
        <p className="text-white/50 text-center">
          Already have an account? &nbsp;
          <Link className="text-white" href="/signin">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
