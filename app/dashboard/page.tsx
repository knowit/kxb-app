import { getRequestDateNow } from "@/lib/date";
import { query } from "@/lib/query";
import { getEdgeFriendlyToken } from "@/lib/token";
import { getUser, getUserEarnings, getUserSettings } from "@/lib/user";
import { getCalendarMonth } from "@/utils/calendar-utils";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import CalendarMonthWithSalary from "./_components/calendar-month-with-salary";
import CompanyBenefits from "./_components/company-benefits";
import YearlyEconomicOverview from "./_components/yearly-economic-overview";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

export default async function DashboardPage() {
  const token = await getEdgeFriendlyToken();

  const currentDate = getRequestDateNow();

  const calendarMonth = getCalendarMonth(currentDate);

  const [user, userEarnings, userSettings] = await query([
    getUser(token.id),
    getUserEarnings(token.id),
    getUserSettings(token.id)
  ]);

  if (!user.data) {
    return redirect("/login");
  }

  return (
    <>
      <CalendarMonthWithSalary
        user={user.data}
        calendarMonth={calendarMonth}
        userEarnings={userEarnings.data}
        userSettings={userSettings.data}
      />
      <CompanyBenefits />
      <Suspense fallback={<div />}>
        {/* @ts-expect-error Async Server Component */}
        <YearlyEconomicOverview />
      </Suspense>
    </>
  );
}
