import { SalaryDetailsCard } from "@/components/salary/salary-details-card";
import { getUserEarnings } from "@/lib/user";

export default async function YearlyEconomicOverview() {
  const userEarnings = await getUserEarnings();

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
