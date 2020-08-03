import * as React from "react";
import YearlyEarnings from "../containers/yearlyEarnings";
import { getHomePageProps } from "../logic/staticPageLogic";
import { getFileSystemDataForYear } from "../utils/fileSystemData";

export default function HomePage(props) {
  return <YearlyEarnings year={props?.data?.data} />;
}

export async function getStaticProps() {
  const year = new Date().getFullYear();
  const data = await getFileSystemDataForYear(year);

  return {
    revalidate: 3600,
    props: await getHomePageProps({
      data,
      year
    })
  };
}
