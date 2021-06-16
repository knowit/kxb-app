import * as React from "react";
import Heading from "./heading";
import HeadingSkeleton from "./skeleton/headingSkeleton";
import StatisticSkeleton from "./skeleton/statisticSkeleton";
import Statistic from "./statistic";
import StatisticGroup from "./statisticGroup";

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
