import CalendarMonthWithSalary from "@/app/dashboard/_components/calendar-month-with-salary";
import CompanyBenefits from "@/app/dashboard/_components/company-benefits";
import YearlyEconomicOverview, {
  YearlyEconomicOverviewSkeleton
} from "@/app/dashboard/_components/yearly-economic-overview";
import { getRequestDateNow } from "@/lib/date";
import { query } from "@/lib/query";
import { getEdgeFriendlyToken } from "@/lib/token";
import { getUser, getUserEarnings, getUserSettings } from "@/lib/user";
import { getCalendarMonth } from "@/utils/calendar-utils";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

export const metadata = {
  title: "Dashboard"
};

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
      <Suspense fallback={<YearlyEconomicOverviewSkeleton />}>
        {/* @ts-expect-error Async Server Component */}
        <YearlyEconomicOverview />
      </Suspense>
    </>
  );
}
