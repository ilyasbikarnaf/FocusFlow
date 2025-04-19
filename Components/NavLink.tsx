import cn from "@/lib/utils/cn";
import Link from "next/link";
import { JSX } from "react";

type NavLinkProps = {
  href: string;
  label: string;
  isActive: boolean;
  icon: JSX.Element;
};

export default function NavLink({
  href,
  label,
  icon,
  isActive = false,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center px-2 py-2 text-sm font-medium rounded-md",
        isActive
          ? " bg-blue-900 text-blue-200"
          : "text-gray-300 hover:bg-gray-800"
      )}
    >
      <span className="mr-3 text-gray-400">{icon}</span>
      <span className="hidden md:inline">{label}</span>
    </Link>
  );
}
