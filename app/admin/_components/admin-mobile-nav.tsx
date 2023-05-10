"use client";

import { Icons } from "@/components/icons";
import { ThemeSelect } from "@/components/theme-select";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { ADMIN_CONSTANTS } from "@/constants/admin-constants";
import { cn } from "@/lib/utils";
import { useSelectedLayoutSegment } from "next/navigation";
import { ReactNode, useState } from "react";

const AdminMobileNavSection = ({ children }: { children: ReactNode }) => (
  <div className="px-6 py-4">{children}</div>
);

export function AdminMobileNav() {
  const [open, setOpen] = useState(false);
  const segment = useSelectedLayoutSegment();

  return (
    <Popover open={open} onOpenChange={open => setOpen(open)}>
      <PopoverTrigger asChild className="block md:hidden">
        <Button>
          <Icons.HamburgerMenu />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="bottom"
        className="flex min-w-[18rem] flex-col gap-y-2 p-0"
      >
        <AdminMobileNavSection>
          <nav className="flex flex-col gap-4">
            {ADMIN_CONSTANTS.SIDEBAR_NAV.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  item.href.startsWith(`/${segment}`) && "text-neutral-900",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
                onClick={() => setOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </AdminMobileNavSection>
        <Separator />
        <AdminMobileNavSection>
          <div className="flex items-center gap-3">
            <span className="text-sm">Theme</span>
            <ThemeSelect />
          </div>
        </AdminMobileNavSection>
        <Separator />
        <AdminMobileNavSection>
          <Link
            className="flex items-center gap-2"
            href="/dashboard"
            onClick={() => setOpen(false)}
          >
            <Icons.Dashboard className="mb-0.5" />
            <span>Dashboard</span>
          </Link>
        </AdminMobileNavSection>
        <PopoverArrow />
      </PopoverContent>
    </Popover>
  );
}
