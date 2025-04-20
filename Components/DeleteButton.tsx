"use client";
import { deleteTask } from "@/app/actions/tasks";
import { DeleteIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

export default function DeleteButton({ taskId }: { taskId: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    startTransition(async () => {
      try {
        const result = await deleteTask(taskId);

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success(result.message);
        router.push("/tasks");
      } catch {
        toast.error("An unexpected error occured");
      }
    });
  }

  return (
    <div>
      <button
        disabled={isPending}
        className="flex items-center bg-red-700 hover:bg-red-800 disabled:hover:bg-red-700 disabled:opacity-75 gap-2 border-1 border-white/10 px-3 py-1 rounded-md text-sm hover:cursor-pointer  transition-all"
        onClick={handleDelete}
      >
        {isPending ? (
          <span>Deleting...</span>
        ) : (
          <>
            <DeleteIcon size={16} />
            <span>Delete</span>
          </>
        )}
      </button>
    </div>
  );
}
