import { UserCalendarMonthWithSalarySkeleton } from "@/app/dashboard/_components/user-calendar-month-with-salary";
import { getRequestDateNow } from "@/lib/date";
import { getCalendarMonth } from "@/utils/calendar-utils";
import { headers } from "next/headers";

interface SelectedYearMonthPageProps {
  params: { year: string; month: string };
}

export default async function SelectedYearMonthLoading() {
  const currentDate = getRequestDateNow();

  // I have no idea why loading files doens't have access to the
  // same params as pages, but they don't. So we have to extract
  // the year and month from the URL.
  const nextUrl = headers().get("next-url") ?? "";

  // URLs have this form /dashboard/year/2021/month/1
  // Use regex to extract the year and month from the URL
  const regex = /\/dashboard\/year\/(\d+)\/month\/(\d+)/;
  const match = nextUrl.match(regex);

  const year = +(match?.[1] ?? currentDate.getFullYear());
  const month = +(match?.[2] ?? currentDate.getMonth());

  const calendarMonth = getCalendarMonth(new Date(year, month));

  return (
    <>
      <UserCalendarMonthWithSalarySkeleton month={calendarMonth} />
    </>
  );
}
