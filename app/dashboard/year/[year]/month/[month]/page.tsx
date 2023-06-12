import {
  UserCalendarMonthWithSalary,
  UserCalendarMonthWithSalarySkeleton
} from "@/app/dashboard/_components/user-calendar-month-with-salary";
import { MONTH } from "@/constants/date-constants";
import { query } from "@/lib/query";
import { getEdgeFriendlyToken } from "@/lib/token";
import { getUser, getUserSettings } from "@/lib/user";
import { selectedYearMonthPageParams } from "@/lib/validations/page-params";
import { getCalendarMonth } from "@/utils/calendar-utils";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

interface SelectedYearMonthPageProps {
  params: { year: string; month: string };
}

export const runtime = "edge";

export function generateMetadata({ params }: SelectedYearMonthPageProps): Metadata {
  const month = Object.values(MONTH).find(month => month.value === +params.month);

  return {
    title: `${month?.i18n.en} - ${params.year}`
  };
}

export default async function SelectedYearMonthPage({ params }: SelectedYearMonthPageProps) {
  const token = await getEdgeFriendlyToken();

  const parsedParams = await selectedYearMonthPageParams.safeParseAsync(params);

  if (!parsedParams.success) {
    return notFound();
  }

  // preloadUserWorkDayDetailsByDate(token.id, parsedParams.data.month, parsedParams.data.year);

  const calendarMonth = getCalendarMonth(new Date(parsedParams.data.year, parsedParams.data.month));

  const [user, userSettings] = await query([getUser(token.id), getUserSettings(token.id)]);

  if (!user.data) {
    return redirect("/logout");
  }

  return (
    <>
      <Suspense fallback={<UserCalendarMonthWithSalarySkeleton month={calendarMonth} />}>
        <UserCalendarMonthWithSalary
          user={user.data}
          calendarMonth={calendarMonth}
          userSettings={userSettings.data}
        />
      </Suspense>
    </>
  );
}
