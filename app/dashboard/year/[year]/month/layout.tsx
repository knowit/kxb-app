import { CompanyBenefits } from "@/app/dashboard/_components/company-benefits";
import {
  YearlyEconomicOverview,
  YearlyEconomicOverviewSkeleton
} from "@/app/dashboard/_components/yearly-economic-overview";
import { Suspense } from "react";

interface MonthLayoutProps {
  children: React.ReactNode;
}

export default async function MonthLayout({ children }: MonthLayoutProps) {
  return (
    <>
      {children}
      <CompanyBenefits />
      <Suspense fallback={<YearlyEconomicOverviewSkeleton />}>
        {/* @ts-expect-error Async Server Component */}
        <YearlyEconomicOverview />
      </Suspense>
    </>
  );
}
