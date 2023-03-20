import { getRequestDateNow } from "@/lib/date";
import { query } from "@/lib/query";
import { getUser, getUserEarnings } from "@/lib/user";
import { getCalendarMonth } from "@/utils/calendar-utils";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import CalendarMonthWithSalary from "./_components/calendar-month-with-salary";
import CompanyBenefits from "./_components/company-benefits";
import YearlyEconomicOverview from "./_components/yearly-economic-overview";

export const runtime = "experimental-edge";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

export default async function DashboardPage() {
  const currentDate = getRequestDateNow();

  const calendarMonth = getCalendarMonth(currentDate);

  const [user, userEarnings] = await query([getUser(), getUserEarnings()]);

  if (!user.data) {
    return redirect("/login");
  }

  return (
    <>
      <CalendarMonthWithSalary
        user={user.data}
        calendarMonth={calendarMonth}
        userEarnings={userEarnings.data ?? undefined}
      />
      <CompanyBenefits />
      <Suspense fallback={<div />}>
        {/* @ts-expect-error Async Server Component */}
        <YearlyEconomicOverview />
      </Suspense>
    </>
  );
}
