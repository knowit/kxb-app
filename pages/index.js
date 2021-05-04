import { getSession } from "next-auth/client";
import * as React from "react";
import Heading from "../components/heading";
import AuthenticatedLayout from "../components/layouts/authenticatedLayout";
import YearlyEarnings from "../components/yearlyEarnings";
import YearStatistic from "../components/yearStatistic";
import { useSalary } from "../utils/salaryProvider";

export default function Home() {
  const { yearSalaryStatistics, nextYearSalaryStatistics, isLoadingSalary } = useSalary();

  return (
    <>
      <Heading variant="pageHeading">Overview</Heading>
      <YearlyEarnings />
      <YearStatistic
        title={`${yearSalaryStatistics?.year} overview`}
        yearStatistic={yearSalaryStatistics}
        isLoading={isLoadingSalary}
      />
      <YearStatistic
        title={`${nextYearSalaryStatistics?.year} overview`}
        yearStatistic={nextYearSalaryStatistics}
        isLoading={isLoadingSalary}
      />
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      props: {
        session
      }
    };
  }

  return {
    redirect: {
      destination: "/login",
      permanent: false
    }
  };
}

Home.layoutProps = {
  meta: {
    title: "Home"
  },
  Layout: AuthenticatedLayout
};
