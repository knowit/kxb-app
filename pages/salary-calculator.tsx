import { Calendar, useCalendar } from "@/components/calendar";
import AuthenticatedLayout from "@/components/layouts/authenticatedLayout";
import { YearStatistic } from "@/components/salary";
import SalaryStatistics from "@/components/salary/components/salaryStatistics";
import { Box, Flex, Heading, Paragraph, Text, TextField } from "@/components/ui";
import DEFAULT_USER_SALARY from "@/constants/defaultUserSalary";
import { getEarningsForMonth, getEarningsForYear } from "@/logic/earningsLogic";
import { getResultForAuthenticatedPage } from "@/utils/pageUtils";
import { GetServerSideProps } from "next";
import * as React from "react";

export default function SalaryCalculator() {
  const { year, nextYear, activeCalendarMonthDetail, isLoadingCalendar } = useCalendar();

  const [hourlyRate, setHourlyRate] = React.useState(DEFAULT_USER_SALARY.hourlyRate);
  const [commission, setCommission] = React.useState(DEFAULT_USER_SALARY.commission);
  const [tax, setTax] = React.useState(DEFAULT_USER_SALARY.tax);

  const salaryStatistics = React.useMemo(
    () => getEarningsForMonth(activeCalendarMonthDetail, hourlyRate, commission, tax, []),
    [activeCalendarMonthDetail, hourlyRate, commission, tax]
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
      <Heading size="5">Salary Calculator</Heading>
      <Paragraph>We provide you with a simple salary model.</Paragraph>
      <Paragraph>
        You get paid by commission or guaranteed salary. Knowit covers both employer&apos;s national
        insurance contributions (14.10%) and holyday payment (12%). This means you can calculate
        your next payment by the following formulae{" "}
        <Text
          color="green"
          css={{
            display: "inline"
          }}
        >
          work hours in month x hourly rate x commission = your salary.
        </Text>
      </Paragraph>
      <Heading>Monthly salary example</Heading>
      <Flex
        direction={{
          "@initial": "column",
          "@bp1": "row"
        }}
        justifyContent="even"
        alignItems="center"
        css={{
          width: "100%"
        }}
      >
        <Box>
          <TextField
            id="hourlyRate"
            label="Hourly rate"
            placeholder={DEFAULT_USER_SALARY.hourlyRate.toString()}
            value={hourlyRate}
            onChange={e => setHourlyRate(+e.target.value)}
            type="number"
          />
          <TextField
            id="commission"
            label="Commission"
            placeholder={DEFAULT_USER_SALARY.commission.toString()}
            value={commission}
            onChange={e => setCommission(+e.target.value)}
            type="number"
            step="0.01"
          />
          <TextField
            id="tax"
            label="Tax"
            placeholder={DEFAULT_USER_SALARY.tax.toString()}
            value={tax}
            onChange={e => setTax(+e.target.value)}
            type="number"
            step="0.01"
          />
        </Box>
        <Box
          css={{
            flexGrow: 1,
            maxWidth: "$calendarContainer",
            ml: "$3"
          }}
        >
          <Calendar />
          <SalaryStatistics salaryStatistics={salaryStatistics} />
        </Box>
      </Flex>
      <Heading>Yearly overview</Heading>
      <Paragraph>
        Holyday payment is paid in June. For this month you get holiday payment and commissioned
        pay. It&#39;s usually a good practice to set aside some money for the month after your
        vacation as the holyday pay is usually paid before the actual vacation.
      </Paragraph>
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

export const getServerSideProps: GetServerSideProps = async context => {
  return getResultForAuthenticatedPage(context);
};

SalaryCalculator.layoutProps = {
  meta: {
    title: "Salary calculator"
  },
  Layout: AuthenticatedLayout
};
