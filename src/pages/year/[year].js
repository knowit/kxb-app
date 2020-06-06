import * as React from "react";
import YearlyEarnings from "../../containers/yearlyEarnings";
import { getYearPageProps, getYearPageStaticPaths } from "../../logic/staticPageLogic";
import { getFileSystemDataForYear } from "../../utils/fileSystemData";

export default function YearPage(props) {
  return <YearlyEarnings year={props?.data?.data ?? {}} />;
}

export async function getStaticProps({ params }) {
  const data = await getFileSystemDataForYear(params.year ?? new Date().getFullYear());

  return {
    unstable_revalidate: 3600,
    props: await getYearPageProps({
      data,
      year: params.year
    })
  };
}

export async function getStaticPaths() {
  return {
    paths: await getYearPageStaticPaths(),
    fallback: true
  };
}
