import Calendar from "@/components/calendar";
import Heading from "@/components/heading";
import SalaryStatistics from "@/components/salaryStatistics";
import Text from "@/components/text";
import TextField from "@/components/textField";
import YearStatistic from "@/components/yearStatistic";
import DEFAULT_USER_SALARY from "@/constants/defaultUserSalary";
import { getEarningsForMonth, getEarningsForYear } from "@/logic/earningsLogic";
import { useCalendar } from "@/utils/calendarProvider";
import * as React from "react";

export default function SalaryOverview(props) {
  const { year, nextYear, monthDetail, isLoadingCalendar } = useCalendar();

  const [hourlyRate, setHourlyRate] = React.useState(
    +(props.hourlyRate ?? DEFAULT_USER_SALARY.hourlyRate)
  );
  const [commission, setCommission] = React.useState(
    +(props.commission ?? DEFAULT_USER_SALARY.commission)
  );
  const [tax, setTax] = React.useState(+(props.tax ?? DEFAULT_USER_SALARY.tax));

  const salaryStatistics = React.useMemo(
    () => getEarningsForMonth(monthDetail, hourlyRate, commission, tax, []),
    [monthDetail, hourlyRate, commission, tax]
  );

  const yearSalaryStatistics = React.useMemo(
    () => getEarningsForYear(year, hourlyRate, commission, tax, []),
    [year, hourlyRate, commission, tax]
  );

  const nextYearSalaryStatistics = React.useMemo(
    () => getEarningsForYear(nextYear, hourlyRate, commission, tax, []),
    [nextYear, hourlyRate, commission, tax]
  );

  return (
    <>
      <Heading>Monthly salary example</Heading>
      <div className="flex flex-col lg:flex-row justify-evenly items-center w-full">
        <div>
          <TextField
            id="hourlyRate"
            label="Hourly rate"
            placeholder={DEFAULT_USER_SALARY.hourlyRate.toString()}
            value={hourlyRate}
            onChange={e => setHourlyRate(e.target.value)}
            type="number"
          />
          <TextField
            id="commission"
            label="Commission"
            placeholder={DEFAULT_USER_SALARY.commission.toString()}
            value={commission}
            onChange={e => setCommission(e.target.value)}
            type="number"
            step="0.01"
          />
          <TextField
            id="tax"
            label="Tax"
            placeholder={DEFAULT_USER_SALARY.tax.toString()}
            value={tax}
            onChange={e => setTax(e.target.value)}
            type="number"
            step="0.01"
          />
        </div>
        <div className="flex-grow max-w-lg ml-4">
          <Calendar disableUserWorkDayDetails />
          <SalaryStatistics salaryStatistics={salaryStatistics} />
        </div>
      </div>
      <Heading>Yearly overview</Heading>
      <Text>
        Holyday payment is paid in June. For this month you get holiday payment and commissioned
        pay. It&#39;s usually a good practice to set aside some money for the month after your
        vacation as the holyday pay is usually paid before the actual vacation.
      </Text>
      <YearStatistic
        title={`${year?.year} overview`}
        yearStatistic={yearSalaryStatistics}
        isLoading={isLoadingCalendar}
      />
      <YearStatistic
        title={`${nextYear?.year} overview`}
        yearStatistic={nextYearSalaryStatistics}
        isLoading={isLoadingCalendar}
      />
    </>
  );
}
