"use client";

import { PalmtreeIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { toggleVacationWeek } from "@/lib/actions/user-actions";
import { cn } from "@/lib/utils";
import { CalendarEntries } from "@/types";
import { useRouter } from "next/navigation";
import { ComponentPropsWithoutRef, useTransition } from "react";

export function CalendarDayWeekDropdownMenu({
  className,
  calendarDay,
  ...other
}: ComponentPropsWithoutRef<typeof DropdownMenuContent> & { calendarDay: CalendarEntries }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">{calendarDay.value}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cn("w-56", className)} {...other}>
        <DropdownMenuLabel>Week {calendarDay.value}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={async () => {
              await toggleVacationWeek(calendarDay.date);

              startTransition(() => {
                router.refresh();
              });
            }}
            disabled={isPending}
          >
            <PalmtreeIcon className="mr-2 h-4 w-4" />
            <span>Toggle vacation</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <XIcon className="mr-2 h-4 w-4" />
          <span>Close</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
