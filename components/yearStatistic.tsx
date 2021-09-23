import Heading from "@/components/heading";
import HeadingSkeleton from "@/components/skeleton/headingSkeleton";
import StatisticSkeleton from "@/components/skeleton/statisticSkeleton";
import Statistic from "@/components/statistic";
import StatisticGroup from "@/components/statisticGroup";
import { CalendarYearEarnings } from "@/types";
import * as React from "react";

interface Props {
  title: string;
  yearStatistic: CalendarYearEarnings;
  isLoading?: boolean;
  showNinetyPercentBillableHours?: boolean;
}

const YearStatistic: React.FC<Props> = ({
  title,
  yearStatistic,
  isLoading = false,
  showNinetyPercentBillableHours = false,
  ...other
}) => {
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
};

export default YearStatistic;
