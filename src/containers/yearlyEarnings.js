import * as React from "react";
import CalendarMonth from "../components/calendarMonth";
import Flex from "../components/flex";
import Typography from "../components/typography";
import { getWorkDays } from "../logic/calendarLogic";
import { getFormattedMonth } from "../logic/dateLogic";
import { getGrossIncome, getNetIncome, getWorkHours } from "../logic/earningsLogic";
import CalculateEarningsInputs, {
  calculateEarningsInputsDefaultOptions
} from "./calculateEarningsInputs";

const getDateFromYearDataAndMonth = (year, month) => {
  const now = new Date();
  return new Date(year.year ?? now.getFullYear(), month ?? now.getMonth(), 1);
};

const getMonthFromYearDataAndDate = (year, date) => year?.months[date?.getMonth()] ?? 0;

export default function YearlyEarnings({ year, month }) {
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
    <>
      <Flex>
        <CalculateEarningsInputs
          onChange={earningsValues => setEarningInputValues(earningsValues)}
        />
        <Flex direction="column">
          <Typography as="h1" uppercase>
            {formattedMonth} {year?.year}
          </Typography>
          <CalendarMonth month={currentMonth} />
          <Typography>
            Arbeidstimer i {formattedMonth}: {workHours} timer
          </Typography>
          <Typography>
            Brutto i {formattedMonth}: {gross},-
          </Typography>
          <Typography>
            Netto i {formattedMonth}: {net},-
          </Typography>
        </Flex>
      </Flex>
    </>
  );
}
