import { CalendarDay } from "@/components/calendar/calendar-day";
import { CalendarMonthLegend } from "@/components/calendar/calendar-month-legend";
import { Card } from "@/components/ui/card";
import { Show } from "@/components/ui/show";
import { cn } from "@/lib/utils";
import { CalendarMonth, CalendarSizeVariant, User, UserWorkDayDetail } from "@/types";
import { getCalendarMonthEntries } from "@/utils/calendar-utils";
import { FC } from "react";

type CalendarMonthProps = {
  month: CalendarMonth;
  calendarSizeVariant?: CalendarSizeVariant;
  workDayDetails?: UserWorkDayDetail[];
  closeUserWorkDayDetailsDialogOnSaveSuccess?: boolean;
  showDialogOnCalendarDayClick?: boolean;
  user?: User;
};

const CalendarMonth: FC<CalendarMonthProps> = ({
  calendarSizeVariant = "default",
  month,
  workDayDetails = []
}) => {
  const currentDate = new Date();
  const showWeeks = true && calendarSizeVariant !== "large";
  const holidayInfos = month.days.filter(day => day.holidayInformation);

  const calendarEntries = getCalendarMonthEntries(month, currentDate, showWeeks, workDayDetails);

  return (
    <div
      className={cn({
        "min-h-[240px] lg:min-h-[410px]": calendarSizeVariant === "default"
      })}
    >
      <CalendarMonthLegend />
      <Card
        className={cn("mt-3 grid", {
          "grid-cols-8": showWeeks,
          "grid-cols-7": !showWeeks
        })}
      >
        {calendarEntries.map((calendarDay, index) => (
          <CalendarDay
            key={`calendar-day-${index}`}
            calendarDay={calendarDay}
            calendarSizeVariant={calendarSizeVariant}
            holidayInfos={holidayInfos}
          />
        ))}
      </Card>
      <Show when={holidayInfos.length > 0}>
        <div className="mt-4">
          {holidayInfos.map((day, index) => {
            const date = new Date(day.date);
            return (
              <div
                key={`holiday-info-${index}`}
                className="mr-1 inline-flex text-xs leading-tight dark:text-zinc-400"
              >
                {`${date.getDate()}.${date.getMonth() + 1}: ${day.holidayInformation?.name}${
                  holidayInfos.length === index + 1 ? "" : ","
                }`}
              </div>
            );
          })}
        </div>
      </Show>
    </div>
  );
};

export { CalendarMonth };
export type { CalendarMonthProps };
