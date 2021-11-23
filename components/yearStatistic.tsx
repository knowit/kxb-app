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
  return (
    <Box
      css={{
        marginBottom: "$6",
        "@bp1": {
          marginBottom: "$12"
        }
      }}
    >
      <Heading size="3">{title}</Heading>
      <StatisticGroup {...other}>
        <Statistic title="Work days" value={yearStatistic.workDays} isLoading={isLoading} />
        <Statistic title="Work hours" value={yearStatistic.workHours} isLoading={isLoading} />
        <Statistic
          title="Gross salary - 100% billable hours"
          value={yearStatistic.grossFormatted}
          isLoading={isLoading}
        />
        <Statistic
          title="Net salary - 100% billable hours"
          value={yearStatistic.netFormatted}
          isLoading={isLoading}
        />
      </StatisticGroup>
    </Box>
  );
};

export default YearStatistic;
