"use client";

import { AdminMobileNav } from "@/app/admin/_components/admin-mobile-nav";
import { Icons } from "@/components/icons";
import { ADMIN_CONSTANTS } from "@/constants/admin-constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

function AdminMainNav() {
  return (
    <div className="flex items-center justify-between gap-6 md:justify-start md:gap-10">
      <Link href="/admin" className="items-center space-x-2 md:flex">
        <Icons.Logo className="w-full max-w-[96px] lg:max-w-[140px]" />
      </Link>
      <nav className="hidden gap-6 md:flex">
        {ADMIN_CONSTANTS.MAIN_NAV.map((item, index) => (
          <Link
            key={index}
            href={item.disabled ? "#" : item.href}
            className={cn(item.disabled && "cursor-not-allowed opacity-80")}
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <AdminMobileNav />
    </div>
  );
}

export { AdminMainNav };
