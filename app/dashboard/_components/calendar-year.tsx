import { CalendarMonth } from "@/app/dashboard/_components/calendar-month";
import { buttonVariants } from "@/components/ui/button";
import { getRequestDateNow } from "@/lib/date";
import { cn } from "@/lib/utils";
import { UserWorkDayDetail } from "@/types";
import { getCalendarYear } from "@/utils/calendar-utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { getYear } from "date-fns";
import Link from "next/link";
import { type FC } from "react";

const CalendarYear: FC<{ date: Date; workDayDetails?: UserWorkDayDetail[] }> = ({
  date,
  workDayDetails = []
}) => {
  const currentDate = getRequestDateNow();
  const year = date.getFullYear();
  const calendarYear = getCalendarYear(year);

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between">
        <h1 className="mb-4">Calendar {getYear(date)}</h1>
        <div className="flex items-center gap-2">
          {/* Go to previous year */}
          <Link
            className={buttonVariants({ variant: "outline" })}
            href={`/dashboard/year/${year - 1}`}
          >
            <span className="sr-only">Last year</span>
            <ChevronLeftIcon />
          </Link>
          {/* Go to current year */}
          <Link
            className={buttonVariants({ variant: "outline" })}
            href={`/dashboard/year/${currentDate.getFullYear()}`}
          >
            Today
          </Link>
          {/* Go to next year */}
          <Link
            className={buttonVariants({ variant: "outline" })}
            href={`/dashboard/year/${year + 1}`}
          >
            <span className="sr-only">Next year</span>
            <ChevronRightIcon />
          </Link>
        </div>
      </div>
      <div className="my-4 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {calendarYear.months.map((month, index) => {
          const date = new Date(month.days[0].date);
          return (
            <div key={`calendar-year-calendar-month-${index}`}>
              <Link href={`/dashboard/year/${month.year}/month/${month.monthNumber}`}>
                <h2
                  className={cn("mb-3 text-center", {
                    "underline underline-offset-2 dark:text-emerald-500":
                      currentDate.getMonth() === date.getMonth() &&
                      currentDate.getFullYear() === date.getFullYear()
                  })}
                >
                  {month.month}
                </h2>
              </Link>
              <CalendarMonth
                month={month}
                calendarSizeVariant="small"
                workDayDetails={workDayDetails}
                showDialogOnCalendarDayClick
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { CalendarYear };
