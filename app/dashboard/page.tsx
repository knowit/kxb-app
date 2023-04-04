import { CompanyBenefits } from "@/app/dashboard/_components/company-benefits";
import {
  UserCalendarMonthWithSalary,
  UserCalendarMonthWithSalarySkeleton
} from "@/app/dashboard/_components/user-calendar-month-with-salary";
import {
  YearlyEconomicOverview,
  YearlyEconomicOverviewSkeleton
} from "@/app/dashboard/_components/yearly-economic-overview";
import { getRequestDateNow } from "@/lib/date";
import { query } from "@/lib/query";
import { getEdgeFriendlyToken } from "@/lib/token";
import { getUser, getUserSettings } from "@/lib/user";
import { getCalendarMonth } from "@/utils/calendar-utils";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const runtime = "experimental-edge";

export const metadata = {
  title: "Dashboard"
};

export default async function DashboardPage() {
  const token = await getEdgeFriendlyToken();

  const currentDate = getRequestDateNow();

  const calendarMonth = getCalendarMonth(currentDate);

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
      <CompanyBenefits />
      <Suspense fallback={<YearlyEconomicOverviewSkeleton />}>
        {/* @ts-expect-error Async Server Component */}
        <YearlyEconomicOverview />
      </Suspense>
    </>
  );
}
