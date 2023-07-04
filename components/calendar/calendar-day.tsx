"use client";

import { Icons } from "@/components/icons";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Show } from "@/components/ui/show";
import { cn } from "@/lib/utils";
import { CalendarDay, CalendarEntries, CalendarSizeVariant } from "@/types";
import { ComponentPropsWithoutRef, forwardRef, useMemo } from "react";
import { CalendarDayWeekDropdownMenu } from "./calendar-day-week-dropdown-menu";

type CalendarDayProps = ComponentPropsWithoutRef<"div"> & {
  calendarDay: CalendarEntries;
  calendarSizeVariant?: CalendarSizeVariant;
  holidayInfos?: CalendarDay[];
};

const CalendarDay = forwardRef<React.ElementRef<"div">, CalendarDayProps>(
  (
    { className, calendarDay, calendarSizeVariant = "default", holidayInfos = [], ...other },
    ref
  ) => {
    const showHoverCard = useMemo(() => calendarDay.type === "day", [calendarDay.type]);
    const showDropdownMenu = useMemo(() => calendarDay.type === "week", [calendarDay.type]);

    return (
      <div
        className={cn(
          "flex aspect-square flex-col items-center justify-center lg:aspect-[16/11]",
          {
            "font-medium underline underline-offset-4": calendarDay.isToday,
            "text-emerald-500 dark:text-emerald-500": calendarDay.isWorkDay,
            "text-red-500 dark:text-red-500": calendarDay.isNonCommissionedWorkDay,
            "dark:text-neutral-450 text-neutral-500":
              calendarDay.type === "spacing" ||
              calendarDay.type === "week" ||
              calendarDay.type === "header",
            "border-l border-t border-l-neutral-700 border-t-neutral-700":
              calendarDay.type === "day" || calendarDay.type === "spacing",
            "border-t border-t-neutral-700": calendarDay.type === "week",
            "": calendarDay.isOdd,
            "items-end justify-start px-1 py-1 md:px-3 md:py-2": calendarSizeVariant === "large",
            "text-sm": calendarDay.type === "header",
            "text-xs": calendarDay.type === "header" && calendarSizeVariant === "small"
          },
          className
        )}
        {...other}
        ref={ref}
      >
        <div
          className={cn("", {
            "w-full items-center justify-end pb-1.5 md:pb-2":
              calendarSizeVariant === "large" &&
              (calendarDay.type === "day" || calendarDay.type === "spacing"),
            "justify-between": calendarSizeVariant === "large" && calendarDay.isStartOfWeek,
            "text-[15px]": calendarSizeVariant === "small",
            "text-xs": calendarSizeVariant === "small" && calendarDay.type === "header"
          })}
        >
          {calendarSizeVariant === "large" && calendarDay.isStartOfWeek ? (
            <div className="text-xs dark:text-neutral-600 md:text-base">{calendarDay.week}</div>
          ) : null}
          <div className="flex items-center gap-1">
            <Show when={showHoverCard}>
              <HoverCard>
                <HoverCardTrigger>{calendarDay.value}</HoverCardTrigger>
                <HoverCardContent className="text-neutral-50" sideOffset={10}>
                  Edit work day details
                </HoverCardContent>
              </HoverCard>
            </Show>
            <Show when={showDropdownMenu}>
              <CalendarDayWeekDropdownMenu calendarDay={calendarDay} />
            </Show>
            <Show when={!showHoverCard && !showDropdownMenu}>{calendarDay.value}</Show>
            <Show when={(calendarDay?.workDayDetails?.extraHours ?? 0) > 0}>
              <Icons.PlusCircled />
            </Show>
            <Show when={calendarDay?.workDayDetails?.sickDay ?? false}>
              <Icons.MinusCircled />
            </Show>
          </div>
        </div>
        {calendarSizeVariant === "large" &&
          (calendarDay.type === "day" || calendarDay.type === "spacing") &&
          holidayInfos
            .filter(
              x =>
                x.day === calendarDay.value &&
                x.weekNumber === calendarDay.week &&
                !!x?.holidayInformation?.name
            )
            .map((x, index) => (
              <div key={`holiday-info-inline-${index}`} className="w-full">
                <div className="bg-red-neutral-contrast hidden rounded-md px-2 py-1 text-xs leading-tight text-neutral-900 md:block">
                  {x.holidayInformation?.name}
                </div>
                <div className="dark:border-red-neutral-contrast dark:bg-red-neutral-contrast block h-2 w-full rounded-full border border-red-700 bg-red-700 md:hidden"></div>
              </div>
            ))}
      </div>
    );
  }
);

CalendarDay.displayName = "CalendarDay";

export { CalendarDay };
