"use client";

import { ThemeSelect } from "@/components/theme-select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Show } from "@/components/ui/show";
import { getInitials } from "@/utils/common-utils";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

function UserAvatar({
  name,
  src,
  isAdmin = false
}: {
  name?: string;
  src?: string;
  isAdmin?: boolean;
}) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Popover open={open} onOpenChange={open => setOpen(open)}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-12 w-12 rounded-full p-0">
          <Avatar>
            <AvatarImage src={src} alt={`Avatar image of ${name}`} />
            <AvatarFallback delayMs={500}>{getInitials(name)}</AvatarFallback>
          </Avatar>
          <span className="sr-only">Open popover</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="bottom"
        className="flex min-w-[10rem] flex-col gap-y-2 p-0"
      >
        <div className="px-6 py-4">
          <span className="text-lg font-bold uppercase">{name}</span>
        </div>
        <Separator />
        <div className="flex flex-col space-y-2 px-6 py-4">
          <Link href="/dashboard/profile" onClick={() => setOpen(false)}>
            Profile
          </Link>
          <Link href="/dashboard/feedback" onClick={() => setOpen(false)}>
            Feedback
          </Link>
          <Show when={isAdmin}>
            <Link href="/admin/users" onClick={() => setOpen(false)}>
              Users
            </Link>
          </Show>
          <Show when={isAdmin}>
            <Link href="/dashboard/salary-calculator" onClick={() => setOpen(false)}>
              Salary Calculator
            </Link>
          </Show>
          <Show when={isAdmin}>
            <Link href="/dashboard/job-offer" onClick={() => setOpen(false)}>
              Job offers
            </Link>
          </Show>
        </div>
        <Separator />
        <div className="flex items-center gap-3 px-6 py-4">
          <span className="text-sm">Theme</span>
          <ThemeSelect />
        </div>
        <Separator />
        <div className="px-6 py-4">
          <Button onClick={() => signOut()}>Logout</Button>
        </div>
        <PopoverArrow offset={23} />
      </PopoverContent>
    </Popover>
  );
}

export { UserAvatar };
