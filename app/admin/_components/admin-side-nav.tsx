"use client";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarNavItem } from "types";

interface SideNavProps {
  items: SidebarNavItem[];
}

function AdminSideNav({ items }: SideNavProps) {
  const path = usePathname();

  if (!items?.length) {
    console.log("MEH");
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon ?? "ChevronRight"];

        return (
          item.href && (
            <Link key={index} href={item.disabled ? "/" : item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-100",
                  path === item.href ? "bg-neutral-200" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
}

export { AdminSideNav };
