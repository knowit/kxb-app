import { CalendarDay } from "@/components/calendar/calendar-day";
import { CalendarMonth } from "@/components/calendar/calendar-month";
import { CalendarMonthLegend } from "@/components/calendar/calendar-month-legend";
import { Card } from "@/components/ui/card";
import { Show } from "@/components/ui/show";
import { UserEditWorkDayDetailDialog } from "@/components/user/user-edit-work-day-detail-dialog";
import { getUserWorkDayDetailsByDate } from "@/lib/user";
import { cn } from "@/lib/utils";
import { CalendarSizeVariant, User, UserWorkDayDetail } from "@/types";
import { getCalendarMonthEntries } from "@/utils/calendar-utils";
import { FC } from "react";

type UserCalendarMonthProps = {
  user: User;
  month: CalendarMonth;
  calendarSizeVariant?: CalendarSizeVariant;
  workDayDetails?: UserWorkDayDetail[];
  closeUserWorkDayDetailsDialogOnSaveSuccess?: boolean;
  showDialogOnCalendarDayClick?: boolean;
};

async function UserCalendarMonth({
  month,
  calendarSizeVariant = "default",
  workDayDetails = [],
  closeUserWorkDayDetailsDialogOnSaveSuccess = false,
  showDialogOnCalendarDayClick = false,
  user
}: UserCalendarMonthProps) {
  const currentDate = new Date();
  const showWeeks = true && calendarSizeVariant !== "large";
  const holidayInfos = month.days.filter(day => day.holidayInformation);

  let userWorkDayDetails = workDayDetails;

  if (user && !userWorkDayDetails.length) {
    userWorkDayDetails = await getUserWorkDayDetailsByDate(
      user.id.toString(),
      month.monthNumber,
      month.year
    );
  }

  const calendarEntries = getCalendarMonthEntries(
    month,
    currentDate,
    showWeeks,
    userWorkDayDetails
  );

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
        {calendarEntries.map((calendarDay, index) => {
          switch (calendarDay.type) {
            case "day":
              return showDialogOnCalendarDayClick ? (
                <UserEditWorkDayDetailDialog
                  key={`calendar-day-${index}`}
                  user={user}
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
                className="mr-1 inline-flex text-xs leading-tight dark:text-neutral-400"
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
}

type UserCalendarMonthSkeletonProps = Pick<UserCalendarMonthProps, "month" | "calendarSizeVariant">;

const UserCalendarMonthSkeleton: FC<UserCalendarMonthSkeletonProps> = ({
  calendarSizeVariant = "default",
  month
}) => {
  return <CalendarMonth month={month} calendarSizeVariant={calendarSizeVariant} />;
};

export { UserCalendarMonth, UserCalendarMonthSkeleton };
export type { UserCalendarMonthProps, UserCalendarMonthSkeletonProps };
