import { CalendarDay } from "@/components/calendar/calendar-day";
import { Show } from "@/components/ui/show";
import { UserEditWorkDayDetailDialog } from "@/components/user/user-edit-work-day-detail-dialog";
import { getRequestDateNow } from "@/lib/date";
import { cn } from "@/lib/utils";
import { CalendarMonth, UserWorkDayDetail } from "@/types";
import { getCalendarMonthEntries } from "@/utils/calendar-utils";
import * as React from "react";

const CalendarMonth: React.FC<{
  month: CalendarMonth;
  big?: boolean;
  workDayDetails?: UserWorkDayDetail[];
}> = ({ month, big = false, workDayDetails = [], ...other }) => {
  const currentDate = getRequestDateNow();
  const showWeeks = true && !big;
  const holidayInfos = month.days.filter(day => day.holidayInformation);

  const calendarEntries = getCalendarMonthEntries(month, currentDate, showWeeks, workDayDetails);

  return (
    <div className="min-h-[240px] lg:min-h-[410px]">
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
        {calendarEntries.map((calendarDay, index) => {
          switch (calendarDay.type) {
            case "day":
              return (
                <UserEditWorkDayDetailDialog
                  key={`calendar-day-${index}`}
                  calendarDay={calendarDay}
                  big={big}
                  holidayInfos={holidayInfos}
                />
              );
            default:
              return (
                <CalendarDay
                  key={`calendar-day-${index}`}
                  calendarDay={calendarDay}
                  big={big}
                  holidayInfos={holidayInfos}
                />
              );
          }
        })}
      </div>
      <Show when={holidayInfos.length > 0}>
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
      </Show>
    </div>
  );
};

export { CalendarMonth };
