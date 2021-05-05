import * as React from "react";
import { useCalendar } from "../utils/calendarProvider";
import { useSalary } from "../utils/salaryProvider";
import Statistic from "./statistic";
import StatisticGroup from "./statisticGroup";

export default function SalaryStatistics({ salaryStatistics, ...other }) {
  const { monthDetail, isLoadingCalendar } = useCalendar();
  const { monthStatistics, isLoadingSalary } = useSalary();

  const isLoading = React.useMemo(
    () => (salaryStatistics ? isLoadingCalendar : isLoadingCalendar || isLoadingSalary),
    [salaryStatistics, isLoadingCalendar, isLoadingSalary]
  );

  return (
    <StatisticGroup {...other}>
      <Statistic
        title={`Work days in ${monthDetail?.month}`}
        value={salaryStatistics?.workDays?.length ?? monthStatistics?.workDays?.length}
        isLoading={isLoading}
      />
      <Statistic
        title={`Work hours in ${monthDetail?.month}`}
        value={salaryStatistics?.workHours ?? monthStatistics.workHours}
        isLoading={isLoading}
      />
      <Statistic
        title={`Gross salary ${monthDetail?.month}`}
        value={salaryStatistics?.grossFormatted ?? monthStatistics.grossFormatted}
        isLoading={isLoading}
      />
      <Statistic
        title={`Net salary ${monthDetail?.month}`}
        value={salaryStatistics?.netFormatted ?? monthStatistics.netFormatted}
        isLoading={isLoading}
      />
    </StatisticGroup>
  );
}
