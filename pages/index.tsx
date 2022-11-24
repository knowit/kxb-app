import CompanyBenefits from "@/components/companyBenefits";
import AuthenticatedLayout from "@/components/layouts/authenticatedLayout";
import { useSalary, YearlyEarnings, YearStatistic } from "@/components/salary";
import { Heading } from "@/components/ui";
import { useUser } from "@/components/user";
import { getResultForAuthenticatedPage } from "@/utils/pageUtils";
import { GetServerSideProps } from "next";

export default function Home() {
  const { user } = useUser();
  const { yearSalaryStatistics, nextYearSalaryStatistics, isLoadingSalary } = useSalary();

  return (
    <>
      <Heading
        size="5"
        css={{
          marginBottom: "$6",
          "@bp1": {
            marginBottom: "$12"
          }
        }}
      >{`Hi ${user?.name}`}</Heading>
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
