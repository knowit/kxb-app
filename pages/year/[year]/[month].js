import * as React from "react";
import YearlyEarnings from "../../../components/yearlyEarnings";
import { getMonthFromName } from "../../../logic/dateLogic";
import { getMonthPageStaticPaths, getYearPageProps } from "../../../logic/staticPageLogic";
import CalendarService from "../../../services/CalendarService";

export default function MonthPage({ data, month }) {
  return <YearlyEarnings year={data ?? {}} month={month} />;
}

export async function getStaticProps({ params }) {
  const data = await CalendarService.getCalendarMonthsForYear(params.year);

  return {
    revalidate: 3600,
    props: await getYearPageProps({
      data,
      year: +params.year,
      month: getMonthFromName(params.month)
    })
  };
}

export async function getStaticPaths() {
  return {
    paths: await getMonthPageStaticPaths(),
    fallback: true
  };
}
