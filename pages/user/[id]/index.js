import CompanyBenefits from "@/components/companyBenefits";
import Heading from "@/components/heading";
import AuthenticatedLayout from "@/components/layouts/authenticatedLayout";
import YearlyEarnings from "@/components/yearlyEarnings";
import YearStatistic from "@/components/yearStatistic";
import redisUser from "@/lib/redisUser";
import { useSalary } from "@/utils/salaryProvider";
import * as React from "react";

export default function User(props) {
  const { yearSalaryStatistics, nextYearSalaryStatistics, isLoadingSalary } = useSalary();

  return (
    <>
      <Heading variant="pageHeading" className="mb-24">{`Hi ${props?.user?.name}`}</Heading>
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

export async function getStaticPaths() {
  const users = await redisUser.get();

  return {
    paths: users.map(user => ({ params: { id: user.id } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const user = await redisUser.getById(params.id);

  return {
    props: {
      user
    }
  };
}

User.layoutProps = {
  meta: {
    title: "User"
  },
  Layout: AuthenticatedLayout
};
