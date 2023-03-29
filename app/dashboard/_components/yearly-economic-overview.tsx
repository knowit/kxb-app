import {
  SalaryYearOverview,
  SalaryYearOverviewSkeleton
} from "@/components/salary/salary-year-overview";
import { getEdgeFriendlyToken } from "@/lib/token";
import { getUserEarnings } from "@/lib/user";

async function YearlyEconomicOverview() {
  const token = await getEdgeFriendlyToken();
  const userEarnings = await getUserEarnings(token.id);

  return (
    <div className="flex flex-col gap-y-8">
      <SalaryYearOverview
        key="year-salary-statistics"
        yearSalaryStatistics={userEarnings?.yearSalaryStatistics}
      />
    </div>
  );
}

function YearlyEconomicOverviewSkeleton() {
  return (
    <div className="flex flex-col gap-y-8">
      <SalaryYearOverviewSkeleton />
    </div>
  );
}

export { YearlyEconomicOverview, YearlyEconomicOverviewSkeleton };
