import {
  SalaryDetailsCard,
  SalaryDetailsCardSkeleton
} from "@/components/salary/salary-details-card";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarYearEarnings } from "@/types";

const SalaryYearOverview = ({
  yearSalaryStatistics
}: {
  yearSalaryStatistics?: CalendarYearEarnings;
}) => {
  if (!yearSalaryStatistics) {
    return <SalaryYearOverviewSkeleton />;
  }

  return (
    <div>
      <h3 className="mb-3 text-lg">{yearSalaryStatistics.year} overview</h3>
      <div className="grid grid-cols-2 gap-3">
        <SalaryDetailsCard heading="Work days">{yearSalaryStatistics.workDays}</SalaryDetailsCard>
        <SalaryDetailsCard heading="Work hours">{yearSalaryStatistics.workHours}</SalaryDetailsCard>
        <SalaryDetailsCard
          heading="Gross salary"
          info="This calculation is based on the assumption that you can bill all of your hours during the given period and that you are entitled to 12% of your regular pay as holiday payment."
        >
          {yearSalaryStatistics.grossFormatted}
        </SalaryDetailsCard>
        <SalaryDetailsCard
          heading="Net salary"
          info="This calculation is based on the assumption that you can bill all of your hours during the given period and that you are entitled to 12% of your regular pay as holiday payment."
        >
          {yearSalaryStatistics.netFormatted}
        </SalaryDetailsCard>
      </div>
    </div>
  );
};

const SalaryYearOverviewSkeleton = () => {
  return (
    <div>
      <Skeleton className="mb-3 h-[28px] w-28 text-lg" />
      <div className="grid grid-cols-2 gap-3">
        <SalaryDetailsCardSkeleton />
        <SalaryDetailsCardSkeleton />
        <SalaryDetailsCardSkeleton />
        <SalaryDetailsCardSkeleton />
      </div>
    </div>
  );
};

export { SalaryYearOverview, SalaryYearOverviewSkeleton };
