import CompanyBenefits from "@/components/companyBenefits";
import Heading from "@/components/heading";
import PageLayout from "@/components/layouts/pageLayout";
import SalaryOverview from "@/components/salaryOverview";
import Text from "@/components/text";
import prisma from "@/lib/prisma";
import { GetServerSideProps } from "next";
import * as React from "react";
import useSWR from "swr";

export default function ViewJobOffer({ id, initialJobOffer }) {
  const { data: jobOffer } = useSWR(`/api/job-offer/${id}`, {
    fallbackData: initialJobOffer
  });

  return (
    <>
      <Heading variant="pageHeading">{`Hi ${jobOffer?.firstName} ${jobOffer.lastName}`}</Heading>
      <Text>This is your Knowit job offer.</Text>
      <SalaryOverview hourlyRate={jobOffer.hourlyRate} commission={jobOffer.commission} />
      <CompanyBenefits />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { created, updated, ...jobOffer } = await prisma.jobOffer.findUnique({
    where: {
      id: +context.params.id
    }
  });

  return {
    props: {
      id: context.params.id,
      initialJobOffer: {
        ...jobOffer,
        commission: +jobOffer.commission
      }
    }
  };
};

ViewJobOffer.layoutProps = {
  meta: {
    title: "Job offer"
  },
  Layout: PageLayout,
  userNavDetails: false
};
