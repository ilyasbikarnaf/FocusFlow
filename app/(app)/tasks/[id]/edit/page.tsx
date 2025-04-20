import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function TaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-3xl p-8 flex flex-col gap-y-4">
      <Link
        href={"/dashboard"}
        className="flex gap-x-1 items-center text-gray-400 text-sm hover:text-white/70"
      >
        <ArrowLeft size={16} />
        <span>Back To Dashboard</span>
      </Link>

      <h1 className="text-2xl font-bold ">Create New Task</h1>

      <form className="bg-[#1A1A1A] rounded-md p-8 space-y-5 border-1 border-gray-400/20">
        <div className="flex flex-col space-y-2">
          <label htmlFor="title">Title</label>
          <input
            className="placeholder:text-[#5B606B] px-3 py-1 outline-none border-white/20 ring ring-white/10 rounded bg-[#222222] focus:ring-2 focus:ring-gray-800 focus:border-none disabled:hover:cursor-not-allowed disabled:opacity-60 h-10"
            type="text"
            id="title"
            name="title"
            placeholder="Task Title"
            disabled={false}
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="description">Description</label>
          <textarea
            className="placeholder:text-[#5B606B] px-3 py-1 outline-none border-white/20 ring ring-white/10 rounded bg-[#222222] focus:ring-2 focus:ring-gray-800 focus:border-none disabled:hover:cursor-not-allowed disabled:opacity-60 h-32"
            id="description"
            name="description"
            placeholder="Describe your task"
            disabled={false}
          />
        </div>

        <div className="flex *:flex-1 *:flex *:flex-col *:space-y-2 space-x-4">
          <div>
            <label htmlFor="status">Status</label>
            <select
              className="p-2 ring ring-gray-400/10 bg-[#222222] rounded outline-none focus:ring-2 focus:ring-gray-800"
              name="status"
              id="status"
            >
              <option value="todo">Todo</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div>
            <label htmlFor="priority">Priority</label>
            <select
              className="p-2 ring ring-gray-400/10 bg-[#222222] rounded outline-none focus:ring-2 focus:ring-gray-800"
              name="priority"
              id="priority"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end items-center gap-4">
          <Link
            href={"/dashboard"}
            className="px-4 py-2 h-10 bg-transparent hover:bg-gray-800 transition-all rounded-md"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="hover:cursor-pointer bg-blue-500 px-4 py-2 rounded-md text-md hover:bg-blue-600 transition-all h-10 disabled:hover:cursor-not-allowed disabled:hover:bg-blue-500 disabled:opacity-60"
            disabled={false}
          >
            {false ? "Editin..." : "Edit Task"}
          </button>
        </div>
      </form>
    </div>
  );
}
