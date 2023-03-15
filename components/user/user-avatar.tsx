"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { GearIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";
import Link from "next/link";

function UserAvatar() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-10 rounded-full p-0">
          <GearIcon className="h-4 w-4" />
          <span className="sr-only">Open popover</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex min-w-[10rem] flex-col gap-y-2">
        <Link href="/dashboard/profile">Profile</Link>
        <Button onClick={() => signOut()}>Logout</Button>
      </PopoverContent>
    </Popover>
  );
}

export { UserAvatar };
