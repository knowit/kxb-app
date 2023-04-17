"use client";

import { AdminMobileNav } from "@/app/admin/_components/admin-mobile-nav";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useState, type ReactNode } from "react";
import { MainNavItem } from "types";

interface MainNavProps {
  items?: MainNavItem[];
  children?: ReactNode;
}

function AdminMainNav({ items, children }: MainNavProps) {
  const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Icons.Logo className="w-full max-w-[96px] lg:max-w-[140px]" />
        <span className="hidden font-bold sm:inline-block">Admin</span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-semibold text-neutral-600 sm:text-sm",
                item.href.startsWith(`/${segment}`) && "text-neutral-900",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.Close /> : <Icons.Logo />}
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && items && <AdminMobileNav items={items}>{children}</AdminMobileNav>}
    </div>
  );
}

export { AdminMainNav };
