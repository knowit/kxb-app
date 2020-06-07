import * as React from "react";
import CalendarMonth from "../components/calendarMonth";
import { Flex } from "../components/flex";
import { FlexItem } from "../components/flexItem";
import { Heading } from "../components/heading";
import { Paragraph } from "../components/paragraph";
import { getWorkDays } from "../logic/calendarLogic";
import { getFormattedMonth } from "../logic/dateLogic";
import { getGrossIncome, getNetIncome, getWorkHours } from "../logic/earningsLogic";
import CalculateEarningsInputs, {
  calculateEarningsInputsDefaultOptions
} from "./calculateEarningsInputs";

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
    <Flex p={[3]} flexDirection={["column", "column", "row"]}>
      <FlexItem mr={[0, 0, 8, 8]} order={[1, 1, 0, 0]}>
        <CalculateEarningsInputs
          onChange={earningsValues => setEarningInputValues(earningsValues)}
        />
      </FlexItem>
      <FlexItem>
        <Heading as="h1" textTransform="uppercase">
          {formattedMonth} {year?.year}
        </Heading>
        <CalendarMonth month={currentMonth} mb={5} />
        <Paragraph>
          Arbeidstimer i {formattedMonth}: {workHours} timer
        </Paragraph>
        <Paragraph>
          Brutto i {formattedMonth}: {gross},-
        </Paragraph>
        <Paragraph>
          Netto i {formattedMonth}: {net},-
        </Paragraph>
      </FlexItem>
    </Flex>
  );
}
