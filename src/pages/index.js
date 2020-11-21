import * as React from "react";
import YearlyEarnings from "../containers/yearlyEarnings";
import { getHomePageProps } from "../logic/staticPageLogic";
import CalendarService from "../services/CalendarService";

export default function HomePage(props) {
  return <YearlyEarnings year={props?.data} />;
}

export async function getStaticProps() {
  const year = new Date().getFullYear();
  const data = await CalendarService.getCalendarMonthsForYear(year);

  return {
    revalidate: 3600,
    props: await getHomePageProps({
      data,
      year
    })
  };
}
