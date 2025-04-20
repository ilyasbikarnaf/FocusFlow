import Link from "next/link";

type TableTaskComponentProps = {
  href: string;
  title: string;
  status: "Done" | "To do" | "In Progress";
  priority: "Medium" | "High" | "Low";
  createdAt: string;
};

export default function TableTaskComponent({
  href,
  title,
  status,
  priority,
  createdAt,
}: TableTaskComponentProps) {
  return (
    <Link
      href={href}
      className="block bg-[#222222]  hover:bg-[#1A1A1A] transition-all"
    >
      <div className="grid grid-cols-12 px-6 py-4 gap-5 items-center">
        <div className="col-span-5">{title}</div>
        <div className="col-span-2">
          <span className="bg-purple-400 px-2 rounded-xl py-0.5">{status}</span>
        </div>
        <div className="col-span-2">{priority}</div>
        <div className="col-span-3">{createdAt}</div>
      </div>
    </Link>
  );
}
