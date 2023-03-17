import { Suspense } from "react";
import CompanyBenefits from "../_components/company-benefits";
import YearlyEconomicOverview from "../_components/yearly-economic-overview";

interface YearLayoutProps {
  children: React.ReactNode;
}

export default async function YearLayout({ children }: YearLayoutProps) {
  return (
    <>
      {children}
      <CompanyBenefits />
      <Suspense fallback={<div />}>
        {/* @ts-expect-error Async Server Component */}
        <YearlyEconomicOverview />
      </Suspense>
    </>
  );
}
