import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TaskFormLoading() {
  return (
    <div className="mx-auto max-w-3xl p-8 space-y-6">
      <Link
        href={"/tasks"}
        className="flex gap-x-1 items-center text-gray-400 text-sm hover:text-white/70"
      >
        <ArrowLeft size={16} />
        <span>Back To Dashboard</span>
      </Link>

      <div className="h-8 w-1/3 bg-gray-400/20 rounded-md animate-pulse" />

      <div className="bg-[#1A1A1A] p-8 rounded-md border border-gray-400/20 space-y-6 *:animate-pulse">
        <div className="space-y-2">
          <div className="h-4 w-20 bg-gray-400/20 rounded-md" />
          <div className="h-10 w-full bg-gray-400/10 rounded-md" />
        </div>

        <div className="space-y-2">
          <div className="h-4 w-24 bg-gray-400/20 rounded-md" />
          <div className="h-32 w-full bg-gray-400/10 rounded-md" />
        </div>

        <div className="flex space-x-4">
          <div className="h-10 w-32 bg-gray-400/10 rounded-md" />
          <div className="h-10 w-32 bg-gray-400/10 rounded-md" />
        </div>

        <div className="flex justify-end space-x-4">
          <div className="h-10 w-24 bg-gray-400/20 rounded-md" />
          <div className="h-10 w-24 bg-gray-400/20 rounded-md" />
        </div>
      </div>
    </div>
  );
}
