import * as React from "react";
import { getWorkDays } from "../logic/calendarLogic";
import { getFormattedMonth } from "../logic/dateLogic";
import { getGrossIncome, getNetIncome, getWorkHours } from "../logic/earningsLogic";
import { useCalendar } from "../utils/calendarProvider";
import CalculateEarningsInputs, {
  calculateEarningsInputsDefaultOptions
} from "./calculateEarningsInputs";
import CalendarMonth from "./calendarMonth";
import Text from "./text";

const getDateFromYearDataAndMonth = (year, month) => {
  const now = new Date();
  return new Date(year?.year ?? now.getFullYear(), month ?? now.getMonth(), 1);
};

const getMonthFromYearDataAndDate = (year, date) => {
  const months = year?.months;

  if (months === null || months === undefined || months?.length <= 0) {
    return 0;
  }

  const month = date?.getMonth() ?? 0;

  return year.months[month];
};

export default function YearlyEarnings() {
  const { year, month } = useCalendar();

  const initialDate = getDateFromYearDataAndMonth(year, month);
  const [currentDate, setCurrentDate] = React.useState(initialDate);
  const [currentMonth, setCurrentMonth] = React.useState(
    getMonthFromYearDataAndDate(year, initialDate)
  );

  React.useEffect(() => {
    const newDate = getDateFromYearDataAndMonth(year, month);
    setCurrentDate(newDate);
    setCurrentMonth(getMonthFromYearDataAndDate(year, newDate));
  }, [year, month]);

  const [earningInputValues, setEarningInputValues] = React.useState(
    calculateEarningsInputsDefaultOptions
  );

  const formattedMonth = React.useMemo(() => getFormattedMonth(currentDate), [currentDate]);

  const workDays = React.useMemo(() => getWorkDays(currentMonth), [currentMonth]);

  const workHours = React.useMemo(
    () =>
      getWorkHours(
        earningInputValues.workHoursPerDay,
        workDays.length,
        earningInputValues.nonCommissionedHours
      ),
    [earningInputValues.workHoursPerDay, workDays, earningInputValues.nonCommissionedHours]
  );

  const gross = React.useMemo(
    () => getGrossIncome(workHours, earningInputValues.hourlyRate, earningInputValues.commission),
    [workHours, earningInputValues.hourlyRate, earningInputValues.commission]
  );

  const net = React.useMemo(() => getNetIncome(gross, earningInputValues.tax), [
    gross,
    earningInputValues.tax
  ]);

  return (
    <div className="flex flex-col lg:flex-row justify-evenly items-center">
      <CalculateEarningsInputs onChange={earningsValues => setEarningInputValues(earningsValues)} />
      <div className="w-full max-w-sm order-first lg:order-last">
        <CalendarMonth title={`${formattedMonth} ${year?.year}`} month={currentMonth} />
        <Text>
          Arbeidstimer i {formattedMonth}: {workHours} timer
        </Text>
        <Text>
          Brutto i {formattedMonth}: {gross},-
        </Text>
        <Text>
          Netto i {formattedMonth}: {net},-
        </Text>
      </div>
    </div>
  );
}
