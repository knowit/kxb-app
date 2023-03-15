import { getRequestDateNow } from "@/lib/date";
import { cn } from "@/lib/utils";
import { CalendarMonth } from "@/types";
import { getCalendarMonthEntries } from "@/utils/calendar-utils";
import * as React from "react";

const CalendarMonth: React.FC<{ month: CalendarMonth; big?: boolean }> = ({
  month,
  big = false,
  ...other
}) => {
  const currentDate = getRequestDateNow();
  const showWeeks = true && !big;
  const holidayInfos = month.days.filter(day => day.holidayInformation);

  const calendarEntries = getCalendarMonthEntries(month, currentDate, showWeeks);

  return (
    <div className="min-h-[290px]">
      <div className="flex items-center justify-center gap-3">
        <div className="flex items-center justify-center gap-1">
          <div className="h-2 w-2 rounded-full border-neutral-50 bg-neutral-50" />
          <span className="text-xs">Off work</span>
        </div>
        <div className="flex items-center justify-center gap-1">
          <div className="h-2 w-2 rounded-full border-emerald-500 bg-emerald-500" />
          <span className="text-xs">Work</span>
        </div>
        <div className="flex items-center justify-center gap-1">
          <div className="h-2 w-2 rounded-full border-red-500 bg-red-500" />
          <span className="text-xs">Non commissioned</span>
        </div>
      </div>
      <div
        className={cn("grid", {
          "grid-cols-8": showWeeks,
          "grid-cols-7": !showWeeks
        })}
      >
        {calendarEntries.map((calendarDay, index) => (
          <div
            key={`calendar-day-${index}`}
            className={cn("flex flex-col border-2 border-transparent", {
              "border-emerald-500 font-medium ": calendarDay.isToday,
              "dark:text-emerald-500": calendarDay.isToday || calendarDay.isWorkDay,
              "dark:text-zinc-450 text-zinc-500":
                calendarDay.type === "spacing" ||
                calendarDay.type === "week" ||
                calendarDay.type === "header",
              "bg-zinc-200 dark:bg-zinc-800": calendarDay.isOdd,
              "min-h-[50px] md:min-h-[112px]":
                big && (calendarDay.type === "day" || calendarDay.type === "spacing"),
              "items-end justify-start py-1 px-1 md:py-2 md:px-3": big,
              "min-h-[34px] items-center justify-center": !big,
              "text-xs": calendarDay.type === "header"
            })}
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
              <div>{calendarDay.value}</div>
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
        ))}
      </div>
      {holidayInfos.length ? (
        <div className="mt-4">
          {holidayInfos.map((day, index) => (
            <div
              key={`holiday-info-${index}`}
              className="mr-1 inline-flex text-xs leading-tight dark:text-zinc-400"
            >
              {`${day.date.getDate()}.${day.date.getMonth() + 1}: ${day.holidayInformation?.name}${
                holidayInfos.length === index + 1 ? "" : ","
              }`}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export { CalendarMonth };
