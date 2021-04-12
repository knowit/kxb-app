import * as React from "react";
import { useCalendar } from "../utils/calendarProvider";
import { useSalary } from "../utils/salaryProvider";
import CalculateEarningsInputs from "./calculateEarningsInputs";
import CalendarMonth from "./calendarMonth";
import Text from "./text";

export default function YearlyEarnings() {
  const { year, monthName, monthDetail } = useCalendar();
  const { workHours, gross, net } = useSalary();

  return (
    <div className="flex flex-col lg:flex-row justify-evenly items-center">
      <CalculateEarningsInputs />
      <div className="w-full max-w-sm order-first lg:order-last">
        <CalendarMonth title={`${monthName} ${year?.year}`} month={monthDetail} />
        <Text className="mt-6">
          Work hours in {monthName}: {workHours} hours
        </Text>
        <Text>
          Gross salary {monthName}: {gross},-
        </Text>
        <Text>
          Net salary {monthName}: {net},-
        </Text>
      </div>
    </div>
  );
}
