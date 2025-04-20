import { ArrowLeft, PenIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function TaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-3xl p-8 flex flex-col gap-y-6">
      <Link
        href={"/tasks"}
        className="flex gap-x-1 items-center text-gray-400 text-sm hover:text-white/70"
      >
        <ArrowLeft size={16} />
        <span>Back To Tasks</span>
      </Link>

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold ">Task Name</h1>
        <div>
          <Link
            href={"./edit"}
            className="flex items-center gap-2 border-1 border-white/10 px-3 py-1 rounded-md text-sm hover:cursor-pointer hover:bg-gray-800/40 transition-all"
          >
            <PenIcon size={16} />
            <span>Edit</span>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-y-3 p-6 border-1 border-white/10 rounded-lg bg-[#1A1A1A]">
        <div className="flex gap-3 items-center">
          <p className="text-sm px-3  bg-blue-300 rounded-full">status</p>
          <p className="text-sm px-3  bg-blue-300 rounded-full">priority</p>
          <p className="text-md">created</p>
          <p className="text-md">updated</p>
        </div>

        <p className="text-gray-500/80 text-lg">description</p>
      </div>

      <div className="flex flex-col gap-y-3 bg-[#1A1A1A] p-6 border-white/10 border-1 rounded-lg">
        <h4 className="text-xl">Details</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h6 className="text-gray-500 text-sm">assigned to</h6>
            <span>email</span>
          </div>
          <div>
            <h6 className="text-gray-500 text-sm">status</h6>
            <span className="px-3 bg-gray-500 rounded-full text-xs py-0.5">
              done
            </span>
          </div>
          <div>
            <h6 className="text-gray-500 text-sm">Priority</h6>
            <span className="px-3 bg-gray-500 rounded-full text-xs  py-0.5">
              Medium
            </span>
          </div>
          <div>
            <h6 className="text-gray-500 text-sm">Created</h6>
            <span>when was this created</span>
          </div>
        </div>
      </div>
    </div>
  );
}
