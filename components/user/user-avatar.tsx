"use client";

import { ThemeSelect } from "@/components/theme-select";
import { Button } from "@/components/ui/button";
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { GearIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

function UserAvatar({ name, src }: { name?: string; src?: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-12 w-12 rounded-full p-0">
          {src ? (
            <Image
              className="aspect-square rounded-full p-0"
              src={src}
              alt="User avatar"
              width={48}
              height={48}
            />
          ) : (
            <GearIcon className="h-6 w-6" />
          )}
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
        <div className="px-6 py-4">
          <Link href="/dashboard/profile">Profile</Link>
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
