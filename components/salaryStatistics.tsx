import Statistic from "@/components/statistic";
import StatisticGroup from "@/components/statisticGroup";
import { CalendarMonthEarnings } from "@/types";
import { useCalendar } from "@/utils/calendarProvider";
import { useSalary } from "@/utils/salaryProvider";
import * as React from "react";

function UserSalaryStatistics({ ...other }) {
  const { monthDetail, isLoadingCalendar } = useCalendar();
  const { monthStatistics, isLoadingSalary } = useSalary();

  const isLoading = React.useMemo(
    () => isLoadingCalendar || isLoadingSalary,
    [isLoadingCalendar, isLoadingSalary]
  );

  return (
    <StatisticGroup {...other}>
      <Statistic
        title={`Work days in ${monthDetail?.month}`}
        value={monthStatistics?.workDays?.length}
        isLoading={isLoading}
      />
      <Statistic
        title={`Work hours in ${monthDetail?.month}`}
        value={monthStatistics.workHours}
        isLoading={isLoading}
      />
      <Statistic
        title={`Gross salary ${monthDetail?.month}`}
        value={monthStatistics.grossFormatted}
        isLoading={isLoading}
      />
      <Statistic
        title={`Net salary ${monthDetail?.month}`}
        value={monthStatistics.netFormatted}
        isLoading={isLoading}
      />
    </StatisticGroup>
  );
}

type SalaryStatisticsProps = {
  salaryStatistics?: CalendarMonthEarnings;
};

const SalaryStatistics = ({ salaryStatistics, ...other }: SalaryStatisticsProps) => {
  const { monthDetail, isLoadingCalendar } = useCalendar();

  return salaryStatistics ? (
    <StatisticGroup {...other}>
      <Statistic
        title={`Work days in ${monthDetail?.month}`}
        value={salaryStatistics?.workDays?.length}
        isLoading={isLoadingCalendar}
      />
      <Statistic
        title={`Work hours in ${monthDetail?.month}`}
        value={salaryStatistics?.workHours}
        isLoading={isLoadingCalendar}
      />
      <Statistic
        title={`Gross salary ${monthDetail?.month}`}
        value={salaryStatistics?.grossFormatted}
        isLoading={isLoadingCalendar}
      />
      <Statistic
        title={`Net salary ${monthDetail?.month}`}
        value={salaryStatistics?.netFormatted}
        isLoading={isLoadingCalendar}
      />
    </StatisticGroup>
  ) : (
    <UserSalaryStatistics {...other} />
  );
};

export default SalaryStatistics;
