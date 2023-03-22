import {
  SalaryDetailsCard,
  SalaryDetailsCardSkeleton
} from "@/components/salary/salary-details-card";
import { Skeleton } from "@/components/ui/skeleton";
import { getEdgeFriendlyToken } from "@/lib/token";
import { getUserEarnings } from "@/lib/user";

export default async function YearlyEconomicOverview() {
  const token = await getEdgeFriendlyToken();
  const userEarnings = await getUserEarnings(token.id);

  return (
    <div className="flex flex-col gap-y-8">
      <div>
        <h3 className="mb-3 text-lg">{userEarnings?.yearSalaryStatistics.year} overview</h3>
        <div className="grid grid-cols-2 gap-3">
          <SalaryDetailsCard heading="Work days">
            {userEarnings?.yearSalaryStatistics.workDays}
          </SalaryDetailsCard>
          <SalaryDetailsCard heading="Work hours">
            {userEarnings?.yearSalaryStatistics.workHours}
          </SalaryDetailsCard>
          <SalaryDetailsCard heading="Gross salary - 100% billable hours">
            {userEarnings?.yearSalaryStatistics.grossFormatted}
          </SalaryDetailsCard>
          <SalaryDetailsCard heading="Net salary - 100% billable hours">
            {userEarnings?.yearSalaryStatistics.netFormatted}
          </SalaryDetailsCard>
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-lg">{userEarnings?.nextYearSalaryStatistics.year} overview</h3>
        <div className="grid grid-cols-2 gap-3">
          <SalaryDetailsCard heading="Work days">
            {userEarnings?.nextYearSalaryStatistics.workDays}
          </SalaryDetailsCard>
          <SalaryDetailsCard heading="Work hours">
            {userEarnings?.nextYearSalaryStatistics.workHours}
          </SalaryDetailsCard>
          <SalaryDetailsCard heading="Gross salary - 100% billable hours">
            {userEarnings?.nextYearSalaryStatistics.grossFormatted}
          </SalaryDetailsCard>
          <SalaryDetailsCard heading="Net salary - 100% billable hours">
            {userEarnings?.nextYearSalaryStatistics.netFormatted}
          </SalaryDetailsCard>
        </div>
      </div>
    </div>
  );
}

function YearlyEconomicOverviewSkeleton() {
  return (
    <div className="flex flex-col gap-y-8">
      <div>
        <Skeleton className="mb-3 h-[28px] w-28 text-lg" />
        <div className="grid grid-cols-2 gap-3">
          <SalaryDetailsCardSkeleton />
          <SalaryDetailsCardSkeleton />
          <SalaryDetailsCardSkeleton />
          <SalaryDetailsCardSkeleton />
        </div>
      </div>
      <div>
        <Skeleton className="mb-3 h-[28px] w-28 text-lg" />
        <div className="grid grid-cols-2 gap-3">
          <SalaryDetailsCardSkeleton />
          <SalaryDetailsCardSkeleton />
          <SalaryDetailsCardSkeleton />
          <SalaryDetailsCardSkeleton />
        </div>
      </div>
    </div>
  );
}

export { YearlyEconomicOverview, YearlyEconomicOverviewSkeleton };
