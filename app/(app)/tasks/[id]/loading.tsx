import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// Mock Data for the loading page
export default function TaskPage() {
  return (
    <div className="mx-auto max-w-3xl md:p-8 flex flex-col gap-y-6">
      <Link
        href={"/tasks"}
        className="flex gap-x-1 items-center text-gray-400 text-sm hover:text-white/70"
      >
        <ArrowLeft size={16} />
        <span>Back To Tasks</span>
      </Link>

      <div className="flex justify-between items-center animate-pulse">
        <div className="w-64 h-8 bg-gray-400/40 rounded-md"></div>
        <div className="flex items-center gap-2">
          <div className="w-24 h-8 bg-gray-400/40 rounded-md"></div>
          <div className="w-8 h-8 bg-gray-400/40 rounded-md"></div>
        </div>
      </div>

      <div className="flex flex-col gap-y-4 md:p-6 p-4 border-1 border-white/10 rounded-lg bg-[#1A1A1A]">
        <div className="flex gap-3 items-center flex-wrap animate-pulse">
          <div className="w-24 h-6 bg-gray-400/40 rounded-full"></div>
          <div className="w-24 h-6 bg-gray-400/40 rounded-full"></div>
          <div className="w-48 h-4 bg-gray-400/40 rounded-md"></div>
          <div className="w-48 h-4 bg-gray-400/40 rounded-md"></div>
        </div>

        <div className="w-3/4 h-4 bg-gray-400/40 rounded-md animate-pulse"></div>
      </div>

      <div className="flex flex-col gap-y-3 bg-[#1A1A1A] p-6 border-white/10 border-1 rounded-lg animate-pulse">
        <div className="w-32 h-6 bg-gray-400/40 rounded-md"></div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="w-40 h-4 bg-gray-400/40 rounded-md"></div>
          </div>
          <div>
            <div className="w-40 h-4 bg-gray-400/40 rounded-md"></div>
          </div>
          <div>
            <div className="w-40 h-4 bg-gray-400/40 rounded-md"></div>
          </div>
          <div>
            <div className="w-40 h-4 bg-gray-400/40 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
