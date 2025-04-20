import TaskForm from "@/Components/TaskForm";
import { getTask } from "@/lib/utils/dal";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function TaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const task = await getTask(id);

  return (
    <div className="mx-auto max-w-3xl p-8 flex flex-col gap-y-4">
      <Link
        href={"/dashboard"}
        className="flex gap-x-1 items-center text-gray-400 text-sm hover:text-white/70"
      >
        <ArrowLeft size={16} />
        <span>Back To Dashboard</span>
      </Link>

      <h1 className="text-2xl font-bold ">Update New Task</h1>
      <TaskForm task={task} />
    </div>
  );
}
