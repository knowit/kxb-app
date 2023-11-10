import { CompanyBenefits } from "@/app/dashboard/_components/company-benefits";
import {
  UserCalendarMonthWithSalary, UserCalendarMonthWithSalarySkeleton
} from "@/app/dashboard/_components/user-calendar-month-with-salary";
import {
  YearlyEconomicOverview,
  YearlyEconomicOverviewSkeleton
} from "@/app/dashboard/_components/yearly-economic-overview";
import { Suspense } from "react";

export const metadata = {
  title: "Dashboard"
};

export default async function DashboardPage() {
  return (
    <>
      <Suspense fallback={<UserCalendarMonthWithSalarySkeleton />}>
        <UserCalendarMonthWithSalary />
      </Suspense>
      <CompanyBenefits />
      <Suspense fallback={<YearlyEconomicOverviewSkeleton />}>
        <YearlyEconomicOverview />
      </Suspense>
    </>
  );
}
