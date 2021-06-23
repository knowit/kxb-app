import Heading from "@/components/heading";
import HeadingSkeleton from "@/components/skeleton/headingSkeleton";
import StatisticSkeleton from "@/components/skeleton/statisticSkeleton";
import Statistic from "@/components/statistic";
import StatisticGroup from "@/components/statisticGroup";
import * as React from "react";

export default function YearStatistic({
  title,
  yearStatistic,
  isLoading = false,
  showNinetyPercentBillableHours = false,
  ...other
}) {
  return isLoading ? (
    <div className="mb-12">
      <HeadingSkeleton />
      <StatisticGroup>
        <StatisticSkeleton />
        <StatisticSkeleton />
        <StatisticSkeleton />
        <StatisticSkeleton />
      </StatisticGroup>
    </div>
  ) : (
    <div className="mb-12">
      <Heading>{title}</Heading>
      <StatisticGroup {...other}>
        <Statistic title="Work days" value={yearStatistic.workDays} />
        <Statistic title="Work hours" value={yearStatistic.workHours} />
        <Statistic
          title="Gross salary - 100% billable hours"
          value={yearStatistic.grossFormatted}
        />
        <Statistic title="Net salary - 100% billable hours" value={yearStatistic.netFormatted} />
      </StatisticGroup>
    </div>
  );
}
