import Heading from "@/components/heading";
import AuthenticatedLayout from "@/components/layouts/authenticatedLayout";
import SalaryOverview from "@/components/salaryOverview";
import Text from "@/components/text";
import DEFAULT_USER_SALARY from "@/constants/defaultUserSalary";
import { getEarningsForMonth, getEarningsForYear } from "@/logic/earningsLogic";
import { useCalendar } from "@/utils/calendarProvider";
import { getResultForAuthenticatedPage } from "@/utils/pageUtils";
import { GetServerSideProps } from "next";
import * as React from "react";

export default function SalaryCalculator() {
  const { year, nextYear, monthDetail, isLoadingCalendar } = useCalendar();

  const [hourlyRate, setHourlyRate] = React.useState(DEFAULT_USER_SALARY.hourlyRate);
  const [commission, setCommission] = React.useState(DEFAULT_USER_SALARY.commission);
  const [tax, setTax] = React.useState(DEFAULT_USER_SALARY.tax);

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
      <Heading variant="pageHeading">Salary Calculator</Heading>
      <Text>We provide you with a simple salary model.</Text>
      <Text className="text-center lg:text-left">
        You get paid by commission or guaranteed salary. Knowit covers both employer&apos;s national
        insurance contributions (14.10%) and holyday payment (12%). This means you can calculate
        your next payment by the following formulae{" "}
        <span className="text-black bg-green-500 dark:bg-green-400">
          Work hours in month x hourly rate x commission = your salary.
        </span>
      </Text>
      <SalaryOverview />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  return getResultForAuthenticatedPage(context);
};

SalaryCalculator.layoutProps = {
  meta: {
    title: "Salary calculator"
  },
  Layout: AuthenticatedLayout
};
