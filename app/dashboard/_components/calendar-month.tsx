import { CalendarDay } from "@/components/calendar/calendar-day";
import { Card } from "@/components/ui/card";
import { Show } from "@/components/ui/show";
import { UserEditWorkDayDetailDialog } from "@/components/user/user-edit-work-day-detail-dialog";
import { cn } from "@/lib/utils";
import { CalendarMonth, CalendarSizeVariant, UserWorkDayDetail } from "@/types";
import { getCalendarMonthEntries } from "@/utils/calendar-utils";
import { type FC } from "react";

const CalendarMonth: FC<{
  month: CalendarMonth;
  calendarSizeVariant?: CalendarSizeVariant;
  workDayDetails?: UserWorkDayDetail[];
  closeUserWorkDayDetailsDialogOnSaveSuccess?: boolean;
  showDialogOnCalendarDayClick?: boolean;
}> = ({
  month,
  calendarSizeVariant = "default",
  workDayDetails = [],
  closeUserWorkDayDetailsDialogOnSaveSuccess = false,
  showDialogOnCalendarDayClick = false,
  ...other
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
      <div className="flex items-center justify-center gap-3">
        <div className="flex items-center justify-center gap-2">
          <div className="h-3 w-3 rounded-full border-neutral-50 bg-neutral-50" />
          <span className="text-xs">Off work</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="h-3 w-3 rounded-full border-emerald-500 bg-emerald-500" />
          <span className="text-xs">Work</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="h-3 w-3 rounded-full border-red-500 bg-red-500" />
          <span className="text-xs">Non commissioned</span>
        </div>
      </div>
      <Card
        className={cn("mt-3 grid", {
          "grid-cols-8": showWeeks,
          "grid-cols-7": !showWeeks
        })}
      >
        {calendarEntries.map((calendarDay, index) => {
          switch (calendarDay.type) {
            case "day":
              return showDialogOnCalendarDayClick ? (
                <UserEditWorkDayDetailDialog
                  key={`calendar-day-${index}`}
                  calendarDay={calendarDay}
                  calendarSizeVariant={calendarSizeVariant}
                  holidayInfos={holidayInfos}
                  closeDialogOnFormSubmitSuccess={closeUserWorkDayDetailsDialogOnSaveSuccess}
                />
              ) : (
                <CalendarDay
                  key={`calendar-day-${index}`}
                  calendarDay={calendarDay}
                  calendarSizeVariant={calendarSizeVariant}
                  holidayInfos={holidayInfos}
                />
              );
            default:
              return (
                <CalendarDay
                  key={`calendar-day-${index}`}
                  calendarDay={calendarDay}
                  calendarSizeVariant={calendarSizeVariant}
                  holidayInfos={holidayInfos}
                />
              );
          }
        })}
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
