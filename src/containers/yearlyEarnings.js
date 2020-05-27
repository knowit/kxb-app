import * as React from "react";
import CalendarMonth from "../components/calendarMonth";
import Flex from "../components/flex";
import Typography from "../components/typography";
import { getWorkDays } from "../logic/calendarLogic";
import { getFormattedLongDate, getFormattedMonth } from "../logic/dateLogic";
import { getGrossIncome, getNetIncome, getWorkHours } from "../logic/earningsLogic";
import CalculateEarningsInputs, {
  calculateEarningsInputsDefaultOptions
} from "./calculateEarningsInputs";

export default function YearlyEarnings({ year }) {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [currentMonth, setCurrentMonth] = React.useState(year?.months[currentDate.getMonth()] ?? 0);

  const [earningInputValues, setEarningInputValues] = React.useState(
    calculateEarningsInputsDefaultOptions
  );

  const formattedMonth = React.useMemo(() => getFormattedMonth(currentDate), [currentDate]);
  const formattedLongDate = React.useMemo(() => getFormattedLongDate(currentDate), [currentDate]);

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
            {formattedMonth}
          </Typography>
          <Typography as="h2">{formattedLongDate}</Typography>
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
