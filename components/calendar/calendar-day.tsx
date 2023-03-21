import { cn } from "@/lib/utils";
import { CalendarDay, CalendarEntries, CalendarSizeVariant } from "@/types";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { Icons } from "../icons";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { Show } from "../ui/show";

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
    return (
      <div
        className={cn(
          "flex flex-col dark:bg-black",
          {
            "font-medium underline underline-offset-4": calendarDay.isToday,
            "dark:text-emerald-500": calendarDay.isToday || calendarDay.isWorkDay,
            "dark:text-red-500": calendarDay.isNonCommissionedWorkDay,
            "dark:text-zinc-450 text-zinc-500":
              calendarDay.type === "spacing" ||
              calendarDay.type === "week" ||
              calendarDay.type === "header",
            "border-l border-t border-l-zinc-700 border-t-zinc-700":
              calendarDay.type === "day" || calendarDay.type === "spacing",
            "border-t border-t-zinc-700": calendarDay.type === "week",
            "": calendarDay.isOdd,
            "min-h-[50px] md:min-h-[112px]":
              calendarSizeVariant === "large" &&
              (calendarDay.type === "day" || calendarDay.type === "spacing"),
            "items-end justify-start py-1 px-1 md:py-2 md:px-3": calendarSizeVariant === "large",
            "h-full min-h-[44px] items-center justify-center lg:min-h-[50px] lg:min-w-[50px]":
              calendarSizeVariant === "default",
            "text-sm": calendarDay.type === "header",
            "text-xs": calendarDay.type === "header" && calendarSizeVariant === "small",
            "h-full min-h-[36px] items-center justify-center": calendarSizeVariant === "small"
          },
          className
        )}
        {...other}
        ref={ref}
      >
        <div
          className={cn("flex items-center justify-center", {
            "w-full items-center justify-end pb-1.5 md:pb-2":
              calendarSizeVariant === "large" &&
              (calendarDay.type === "day" || calendarDay.type === "spacing"),
            "justify-between": calendarSizeVariant === "large" && calendarDay.isStartOfWeek,
            "text-[15px]": calendarSizeVariant === "small",
            "text-xs": calendarSizeVariant === "small" && calendarDay.type === "header"
          })}
        >
          {calendarSizeVariant === "large" && calendarDay.isStartOfWeek ? (
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
