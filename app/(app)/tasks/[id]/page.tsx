import DeleteButton from "@/Components/DeleteButton";
import cn from "@/lib/utils/cn";
import { getTask } from "@/lib/utils/dal";
import formatRelativeTime from "@/lib/utils/formatRelativeTime";
import { getPriorityLabel, getStatusLabel } from "@/lib/utils/taskLabel";
import { currentUser, User } from "@clerk/nextjs/server";
import { ArrowLeft, DeleteIcon, PenIcon } from "lucide-react";
import Link from "next/link";

export const revalidate = 3600; // seconds = 1 hour

export default async function TaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const user = (await currentUser()) as User;

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl p-8">
        Please Login To preview Your Tasks
      </div>
    );
  }

  const task = await getTask(id);
  const { label: statusLabel, classes: statusClasses } = getStatusLabel(
    task.status
  );
  const { label: priorityLabel, classes: priorityClasses } = getPriorityLabel(
    task.priority
  );

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
        <h1 className="text-2xl font-bold ">{task.title}</h1>
        <div className="flex items-center gap-2">
          <div>
            <Link
              href={`${id}/edit`}
              className="flex items-center gap-2 border-1 border-white/10 px-3 py-1 rounded-md text-sm hover:cursor-pointer hover:bg-gray-800/40 transition-all"
            >
              <PenIcon size={16} />
              <span>Edit</span>
            </Link>
          </div>

          <DeleteButton taskId={id} />
        </div>
      </div>

      <div className="flex flex-col gap-y-3 p-6 border-1 border-white/10 rounded-lg bg-[#1A1A1A]">
        <div className="flex gap-3 items-center">
          <p
            className={cn(
              "text-sm px-3  bg-blue-300 rounded-full",
              statusClasses
            )}
          >
            {statusLabel}
          </p>
          <p
            className={cn(
              "text-sm px-3  bg-blue-300 rounded-full",
              priorityClasses
            )}
          >
            {priorityLabel}
          </p>
          <p className="text-md text-gray-500 font-thin">{`Created ${formatRelativeTime(
            task.createdAt
          )}`}</p>
          <p className="text-md">
            {task.isEdited
              ? `Updated ${formatRelativeTime(task.editedAt!)}`
              : ""}
          </p>
        </div>

        <p
          className={cn(
            "text-gray-500/80 text-lg",
            !task.description && "italic"
          )}
        >
          {!task.description ? "No description provided" : task.description}
        </p>
      </div>

      <div className="flex flex-col gap-y-3 bg-[#1A1A1A] p-6 border-white/10 border-1 rounded-lg">
        <h4 className="text-xl">Details</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h6 className="text-gray-500 text-sm">assigned to</h6>
            <span>
              {user.emailAddresses[0].emailAddress || "Please Log in"}
            </span>
          </div>
          <div>
            <h6 className="text-gray-500 text-sm">status</h6>
            <span
              className={cn(
                "px-3 bg-gray-500 rounded-full text-xs py-0.5",
                statusClasses
              )}
            >
              {statusLabel}
            </span>
          </div>
          <div>
            <h6 className="text-gray-500 text-sm">Priority</h6>
            <span
              className={cn(
                "px-3 bg-gray-500 rounded-full text-xs  py-0.5",
                priorityClasses
              )}
            >
              {priorityLabel}
            </span>
          </div>
          <div>
            <h6 className="text-gray-500 text-sm">Created</h6>
            <span>{formatRelativeTime(task.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
