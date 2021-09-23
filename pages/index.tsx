import CompanyBenefits from "@/components/companyBenefits";
import Heading from "@/components/heading";
import AuthenticatedLayout from "@/components/layouts/authenticatedLayout";
import { useUser } from "@/components/user";
import YearlyEarnings from "@/components/yearlyEarnings";
import YearStatistic from "@/components/yearStatistic";
import { getResultForAuthenticatedPage } from "@/utils/pageUtils";
import { useSalary } from "@/utils/salaryProvider";
import { GetServerSideProps } from "next";
import * as React from "react";

export default function Home() {
  const { user } = useUser();
  const { yearSalaryStatistics, nextYearSalaryStatistics, isLoadingSalary } = useSalary();

  return (
    <>
      <Heading variant="pageHeading" className="mb-16 lg:mb-24">{`Hi ${user?.name}`}</Heading>
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

export const getServerSideProps: GetServerSideProps = async context => {
  return getResultForAuthenticatedPage(context);
};

Home.layoutProps = {
  meta: {
    title: "Home"
  },
  Layout: AuthenticatedLayout
};
