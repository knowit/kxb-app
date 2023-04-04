import {
  UserCalendarMonthWithSalary,
  UserCalendarMonthWithSalarySkeleton
} from "@/app/dashboard/_components/user-calendar-month-with-salary";
import { MONTH } from "@/constants/date-constants";
import { getRequestDateNow } from "@/lib/date";
import { query } from "@/lib/query";
import { getEdgeFriendlyToken } from "@/lib/token";
import { getUser, getUserSettings } from "@/lib/user";
import { getCalendarMonth } from "@/utils/calendar-utils";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

interface SelectedYearMonthPageProps {
  params: { year: string; month: string };
}

export const runtime = "experimental-edge";

export function generateMetadata({ params }: SelectedYearMonthPageProps): Metadata {
  const month = Object.values(MONTH).find(month => month.value === +params.month);

  return {
    title: `${month?.i18n.en} - ${params.year}`
  };
}

export default async function SelectedYearMonthPage({ params }: SelectedYearMonthPageProps) {
  const token = await getEdgeFriendlyToken();
  const currentDate = getRequestDateNow();

  const date = new Date(+(params.year ?? currentDate.getFullYear()), +params.month);

  const calendarMonth = getCalendarMonth(date);

  const [user, userSettings] = await query([getUser(token.id), getUserSettings(token.id)]);

  if (!user.data) {
    return redirect("/logout");
  }

  return (
    <>
      <Suspense fallback={<UserCalendarMonthWithSalarySkeleton month={calendarMonth} />}>
        {/* @ts-expect-error Async Server Component */}
        <UserCalendarMonthWithSalary
          user={user.data}
          calendarMonth={calendarMonth}
          userSettings={userSettings.data}
        />
      </Suspense>
    </>
  );
}
