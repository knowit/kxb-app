import { CompanyBenefits } from "@/app/dashboard/_components/company-benefits";
import { UserCalendarMonthWithSalarySkeleton } from "@/app/dashboard/_components/user-calendar-month-with-salary";
import { YearlyEconomicOverviewSkeleton } from "@/app/dashboard/_components/yearly-economic-overview";
import { getRequestDateNow } from "@/lib/date";
import { getCalendarMonth } from "@/utils/calendar-utils";

export default function DashboardLoading() {
  const currentDate = getRequestDateNow();

  const calendarMonth = getCalendarMonth(currentDate);

  return (
    <>
      <UserCalendarMonthWithSalarySkeleton month={calendarMonth} />
      <CompanyBenefits />
      <YearlyEconomicOverviewSkeleton />
    </>
  );
}
