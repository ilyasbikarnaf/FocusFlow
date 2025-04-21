import { Skeleton } from "@heroui/react";

export default function TaskTableLoading() {
  return (
    <div className="w-full p-2 md:p-8 flex flex-col gap-y-9">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Tasks</h1>
        <Skeleton className="h-9 w-28 rounded-md bg-gray-400/40 animate-pulse" />
      </div>

      <div className="overflow-hidden rounded-lg border border-white/10 shadow-sm border-dark-border-default bg-dark-high">
        <div className="grid grid-cols-12 gap-4 bg-[#1A1A1A] px-6 py-3 text-sm font-medium border-dark-border-default bg-dark-elevated text-gray-400">
          <div className="md:col-span-5 col-span-3">Title</div>
          <div className="md:col-span-2 col-span-3">Status</div>
          <div className="md:col-span-2 col-span-3">Priority</div>
          <div className="md:col-span-3 col-span-3">Created</div>
        </div>

        <div className="divide-y divide-gray-200/10 divide-dark-border-default">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="grid grid-cols-12 px-6 py-4 gap-5 items-center bg-[#222222]"
            >
              <Skeleton className="md:col-span-5 col-span-3 h-4 w-full rounded-md bg-gray-400/40 animate-pulse" />
              <Skeleton className="md:col-span-2 col-span-3 h-4 w-16 rounded-md bg-gray-400/40 animate-pulse" />
              <Skeleton className="md:col-span-2 col-span-3 h-4 w-16 rounded-md bg-gray-400/40 animate-pulse" />
              <Skeleton className="md:col-span-3 col-span-3 h-4 w-20 rounded-md bg-gray-400/40 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
