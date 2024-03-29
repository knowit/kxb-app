"use client";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { ADMIN_CONSTANTS } from "@/constants/admin-constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

function AdminSideNav() {
  const path = usePathname();

  return (
    <nav className="grid items-start gap-2">
      {ADMIN_CONSTANTS.SIDEBAR_NAV.map((item, index) => {
        const Icon = Icons[item.icon ?? "ChevronRight"];

        return (
          item.href && (
            <Link key={index} href={item.disabled ? "/" : item.href}>
              <span
                className={cn(
                  buttonVariants({ variant: path === item.href ? "default" : "ghost" }),
                  "w-full justify-start",
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
