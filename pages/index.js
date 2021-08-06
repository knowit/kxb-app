import CompanyBenefits from "@/components/companyBenefits";
import Heading from "@/components/heading";
import AuthenticatedLayout from "@/components/layouts/authenticatedLayout";
import YearlyEarnings from "@/components/yearlyEarnings";
import YearStatistic from "@/components/yearStatistic";
import { getResultForAuthenticatedPage } from "@/utils/pageUtils";
import { useSalary } from "@/utils/salaryProvider";
import * as React from "react";

export default function Home({ session }) {
  const { yearSalaryStatistics, nextYearSalaryStatistics, isLoadingSalary } = useSalary();

  return (
    <>
      <Heading variant="pageHeading" className="mb-24">{`Hi ${session?.user?.name}`}</Heading>
      <YearlyEarnings />
      <CompanyBenefits />
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
  return getResultForAuthenticatedPage(context);
}

Home.layoutProps = {
  meta: {
    title: "Home"
  },
  Layout: AuthenticatedLayout
};
