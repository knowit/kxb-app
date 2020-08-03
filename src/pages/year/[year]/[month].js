import * as React from "react";
import YearlyEarnings from "../../../containers/yearlyEarnings";
import { getMonthFromName } from "../../../logic/dateLogic";
import { getMonthPageStaticPaths, getYearPageProps } from "../../../logic/staticPageLogic";
import { getFileSystemDataForYear } from "../../../utils/fileSystemData";

export default function MonthPage({ data, month }) {
  return <YearlyEarnings year={data?.data ?? {}} month={month} />;
}

export async function getStaticProps({ params }) {
  const data = await getFileSystemDataForYear(params.year ?? new Date().getFullYear());

  return {
    revalidate: 3600,
    props: await getYearPageProps({
      data,
      year: params.year,
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
