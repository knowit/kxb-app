import HeadingSkeleton from "@/components/skeleton/headingSkeleton";
import StatisticSkeleton from "@/components/skeleton/statisticSkeleton";
import Statistic from "@/components/statistic";
import StatisticGroup from "@/components/statisticGroup";
import { CalendarYearEarnings } from "@/types";
import * as React from "react";
import { Box, Heading } from "./ui";

type YearStatisticProps = {
  title: string;
  yearStatistic: CalendarYearEarnings;
  isLoading?: boolean;
  showNinetyPercentBillableHours?: boolean;
};

const YearStatistic = ({
  title,
  yearStatistic,
  isLoading = false,
  showNinetyPercentBillableHours = false,
  ...other
}: YearStatisticProps) => {
  return isLoading ? (
    <Box
      css={{
        marginBottom: "$12"
      }}
    >
      <HeadingSkeleton />
      <StatisticGroup>
        <StatisticSkeleton />
        <StatisticSkeleton />
        <StatisticSkeleton />
        <StatisticSkeleton />
      </StatisticGroup>
    </Box>
  ) : (
    <Box
      css={{
        marginBottom: "$12"
      }}
    >
      <Heading size="3">{title}</Heading>
      <StatisticGroup {...other}>
        <Statistic title="Work days" value={yearStatistic.workDays} />
        <Statistic title="Work hours" value={yearStatistic.workHours} />
        <Statistic
          title="Gross salary - 100% billable hours"
          value={yearStatistic.grossFormatted}
        />
        <Statistic title="Net salary - 100% billable hours" value={yearStatistic.netFormatted} />
      </StatisticGroup>
    </Box>
  );
};

export default YearStatistic;
