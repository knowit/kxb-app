import { cn } from "@/lib/utils";
import { CalendarDay, CalendarEntries } from "@/types";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { Icons } from "../icons";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { Show } from "../ui/show";

type CalendarDayProps = ComponentPropsWithoutRef<"div"> & {
  calendarDay: CalendarEntries;
  big?: boolean;
  holidayInfos?: CalendarDay[];
};

const CalendarDay = forwardRef<React.ElementRef<"div">, CalendarDayProps>(
  ({ className, calendarDay, big = false, holidayInfos = [], ...other }, ref) => {
    return (
      <div
        className={cn(
          "flex flex-col border-2 border-transparent",
          {
            "border-emerald-500 font-medium ": calendarDay.isToday,
            "dark:text-emerald-500": calendarDay.isToday || calendarDay.isWorkDay,
            "dark:text-red-500": calendarDay.isNonCommissionedWorkDay,
            "dark:text-zinc-450 text-zinc-500":
              calendarDay.type === "spacing" ||
              calendarDay.type === "week" ||
              calendarDay.type === "header",
            "bg-zinc-200 dark:bg-zinc-800": calendarDay.isOdd,
            "min-h-[50px] md:min-h-[112px]":
              big && (calendarDay.type === "day" || calendarDay.type === "spacing"),
            "items-end justify-start py-1 px-1 md:py-2 md:px-3": big,
            "items-center justify-center lg:min-h-[50px] lg:min-w-[50px]": !big,
            "text-xs": calendarDay.type === "header"
          },
          className
        )}
        {...other}
        ref={ref}
      >
        <div
          className={cn("flex", {
            "w-full items-center justify-end pb-1.5 md:pb-2":
              big && (calendarDay.type === "day" || calendarDay.type === "spacing"),
            "justify-between": big && calendarDay.isStartOfWeek
          })}
        >
          {big && calendarDay.isStartOfWeek ? (
            <div className="text-xs dark:text-zinc-600 md:text-base">{calendarDay.week}</div>
          ) : null}
          <div className="flex items-center gap-1">
            <Show when={calendarDay.type === "day"}>
              <HoverCard>
                <HoverCardTrigger>{calendarDay.value}</HoverCardTrigger>
                <HoverCardContent className="text-neutral-50" sideOffset={10}>
                  Edit work day details
                </HoverCardContent>
              </HoverCard>
            </Show>
            <Show when={calendarDay.type !== "day"}>{calendarDay.value}</Show>
            <Show when={(calendarDay?.workDayDetails?.extraHours ?? 0) > 0}>
              <Icons.PlusCircled />
            </Show>
            <Show when={calendarDay?.workDayDetails?.sickDay ?? false}>
              <Icons.MinusCircled />
            </Show>
          </div>
        </div>
        {big &&
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
                <div className="bg-red-zinc-contrast hidden rounded-md px-2 py-1 text-xs leading-tight text-zinc-900 md:block">
                  {x.holidayInformation?.name}
                </div>
                <div className="dark:border-red-zinc-contrast dark:bg-red-zinc-contrast block h-2 w-full rounded-full border border-red-700 bg-red-700 md:hidden"></div>
              </div>
            ))}
      </div>
    );
  }
);

CalendarDay.displayName = "CalendarDay";

export { CalendarDay };
