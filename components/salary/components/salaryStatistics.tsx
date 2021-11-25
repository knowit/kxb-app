import { useCalendar } from "@/components/calendar";
import { useSalary } from "@/components/salary";
import Statistic from "@/components/statistic";
import StatisticGroup from "@/components/statisticGroup";
import { Alert, AppearInBox, Text } from "@/components/ui";
import { CalendarMonthEarnings } from "@/types";
import * as React from "react";

type SalaryStatisticsProps = {
  salaryStatistics?: CalendarMonthEarnings;
};

const SalaryStatistics = ({ salaryStatistics, ...other }: SalaryStatisticsProps) => {
  const { activeCalendarMonthDetail, isLoadingCalendar } = useCalendar();
  const { activeCalendarMonthStatistics, isLoadingSalary } = useSalary();

  const isLoading = React.useMemo(
    () => (salaryStatistics ? isLoadingCalendar : isLoadingCalendar || isLoadingSalary),
    [salaryStatistics, isLoadingCalendar, isLoadingSalary]
  );

  const statistics: CalendarMonthEarnings = salaryStatistics ?? activeCalendarMonthStatistics;

  return (
    <>
      <AppearInBox appear={statistics?.halfTax ?? false}>
        <Alert
          variant="success"
          css={{
            mb: "$3"
          }}
        >
          <Text>
            Salary for {statistics.monthName} paid with{" "}
            <Text inline textDecoration="underline">
              half tax
            </Text>{" "}
            at {statistics.payDay}
          </Text>
        </Alert>
      </AppearInBox>
      <StatisticGroup {...other}>
        <Statistic
          title={`Work days in ${activeCalendarMonthDetail?.month}`}
          value={statistics?.workDays?.length}
          isLoading={isLoading}
        />
        <Statistic
          title={`Work hours in ${activeCalendarMonthDetail?.month}`}
          value={statistics?.workHours}
          isLoading={isLoading}
        />
        <Statistic
          title={`Gross salary ${activeCalendarMonthDetail?.month}`}
          value={statistics?.grossFormatted}
          isLoading={isLoading}
        />
        <Statistic
          title={`Net salary ${activeCalendarMonthDetail?.month}`}
          value={statistics?.netFormatted}
          isLoading={isLoading}
        />
      </StatisticGroup>
    </>
  );
};

export default SalaryStatistics;
