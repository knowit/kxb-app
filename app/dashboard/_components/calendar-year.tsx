import { getCalendarYear } from "@/utils/calendar-utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { getYear } from "date-fns";
import Link from "next/link";
import * as React from "react";

import { getRequestDateNow } from "@/lib/date";
import { cn } from "@/lib/utils";
import { CalendarMonth } from "./calendar-month";

const CalendarYear: React.FC<{ date: Date }> = ({ date }) => {
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
            className="inline-flex min-h-[34px] items-center rounded-md border border-transparent bg-zinc-200 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 dark:bg-zinc-800 dark:text-zinc-50 hover:dark:bg-zinc-700"
            href={`/dashboard/year/${year - 1}`}
          >
            <span className="sr-only">Forrige år</span>
            <ChevronLeftIcon />
          </Link>
          {/* Go to current year */}
          <Link
            className="inline-flex min-h-[34px] items-center rounded-md border border-transparent bg-zinc-200 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 dark:bg-zinc-800 dark:text-zinc-50 hover:dark:bg-zinc-700"
            href={`/dashboard/year/${currentDate.getFullYear()}`}
          >
            Today
          </Link>
          {/* Go to next year */}
          <Link
            className="inline-flex min-h-[34px] items-center rounded-md border border-transparent bg-zinc-200 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 dark:bg-zinc-800 dark:text-zinc-50 hover:dark:bg-zinc-700"
            href={`/dashboard/year/${year + 1}`}
          >
            <span className="sr-only">Neste år</span>
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
              <CalendarMonth month={month} calendarSizeVariant="small" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { CalendarYear };
