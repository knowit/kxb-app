import * as React from "react";
import YearlyEarnings from "../../components/yearlyEarnings";
import { getYearPageProps, getYearPageStaticPaths } from "../../logic/staticPageLogic";
import CalendarService from "../../services/CalendarService";

export default function YearPage({ data }) {
  const now = new Date();
  const month = now.getMonth();

  return <YearlyEarnings year={data ?? {}} month={month} />;
}

export async function getStaticProps({ params }) {
  const data = await CalendarService.getCalendarMonthsForYear(params.year);

  return {
    revalidate: 3600,
    props: await getYearPageProps({
      data,
      year: +params.year
    })
  };
}

export async function getStaticPaths() {
  return {
    paths: await getYearPageStaticPaths(),
    fallback: true
  };
}
