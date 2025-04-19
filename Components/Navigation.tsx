"use client";

import {
  ChartArea,
  HomeIcon,
  ListTodo,
  PlusIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import NavLink from "./NavLink";
import { useState } from "react";
import UserEmail from "./UserEmail";
import { usePathname } from "next/navigation";

const PAGES = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <HomeIcon size={20} />,
  },
  {
    href: "/tasks",
    label: "Tasks",
    icon: <ListTodo size={20} />,
  },
  {
    href: "/analytics",
    label: "Analytics",
    icon: <ChartArea size={20} />,
  },
  {
    href: "/tasks/new",
    label: "New Task",
    icon: <PlusIcon size={20} />,
  },
];

export default function Navigation() {
  // const [isActive, setIsActive] = useState("Dashboard");
  const pathName = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 flex w-16 flex-col border-r border-gray-200/10 px-2 py-4 md:w-64 md:px-4 dark:border-dark-border-subtle bg-[#1A1A1A]">
      <div className="mb-8 flex items-center justify-center px-2 md:justify-start">
        <Link href="/dashboard" className="text-xl font-bold  text-white">
          <span className="hidden md:inline ">FocusFlow</span>
          <span className="md:hidden">FF</span>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col space-y-3">
        {PAGES.map((page) => {
          return (
            <NavLink
              {...page}
              key={page.href}
              // setIsActive={() => setIsActive(page.label)}
              isActive={pathName === page.href}
            />
          );
        })}
      </nav>

      <div className="border-t  pt-4 border-t-gray-300/10">
        <UserEmail />
      </div>
    </aside>
  );
}
