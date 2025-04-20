import TableTaskComponent from "@/Components/TableTaskComponent";
import { getAllTasks } from "@/lib/utils/dal";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function Task() {
  const tasks = await getAllTasks();

  return (
    <div className="w-full p-8 flex flex-col gap-y-9">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Tasks</h1>
        <Link
          href={"/tasks/new"}
          className="text-md bg-blue-500 p-2.5 rounded-md hover:cursor-pointer flex items-center gap-x-2 hover:opacity-90"
        >
          <PlusIcon size={18} />
          <span>New Issue</span>
        </Link>
      </div>
      <div className="overflow-hidden rounded-lg border border-white/10  shadow-sm border-dark-border-default bg-dark-high">
        <div className="grid grid-cols-12 gap-4 bg-[#1A1A1A] px-6 py-3 text-sm font-medium  border-dark-border-default bg-dark-elevated text-gray-400">
          <div className="col-span-5">Title</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Priority</div>
          <div className="col-span-3">Created</div>
        </div>

        {/* tasks rows */}

        <div className="divide-y divide-gray-200/10 divide-dark-border-default">
          {tasks.map((task) => (
            <TableTaskComponent
              key={task.taskId}
              href={`/tasks/${task.taskId}`}
              priority={task.priority}
              status={task.status}
              title={task.title}
              createdAt={task.createdAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
