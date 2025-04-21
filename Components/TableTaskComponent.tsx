import cn from "@/lib/utils/cn";
import formatRelativeTime from "@/lib/utils/formatRelativeTime";
import { getPriorityLabel, getStatusLabel } from "@/lib/utils/taskLabel";
import Link from "next/link";

type TableTaskComponentProps = {
  href: string;
  title: string;
  status: "done" | "todo" | "in_progress";
  priority: "medium" | "high" | "low";
  createdAt: Date;
};

export default function TableTaskComponent({
  href,
  title,
  status,
  priority,
  createdAt,
}: TableTaskComponentProps) {
  const { label: statusLabel, classes: statusClasses } = getStatusLabel(status);
  const { label: priorityLabel, classes: priorityClasses } =
    getPriorityLabel(priority);

  return (
    <Link
      href={href}
      className="block bg-[#222222]  hover:bg-[#1A1A1A] transition-all"
    >
      <div className="grid grid-cols-12 px-6 py-4 gap-5 items-center">
        <div className="md:col-span-5 col-span-3">{title}</div>
        <div className="md:col-span-2 col-span-3">
          <span
            className={cn(
              "px-2.5 rounded-xl text-[10px] md:text-base py-1",
              statusClasses
            )}
          >
            {statusLabel}
          </span>
        </div>
        <div className="md:col-span-2 col-span-3">
          <span
            className={cn(
              `${priorityClasses} text-sm text-[12px] md:text-base px-2.5 rounded-xl py-1`
            )}
          >
            {priorityLabel}
          </span>
        </div>
        <div className="md:col-span-3 col-span-3 text-xs md:text-sm lg:text-base text-gray-400">
          {formatRelativeTime(createdAt)}
        </div>
      </div>
    </Link>
  );
}
