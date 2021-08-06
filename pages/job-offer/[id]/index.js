import CompanyBenefits from "@/components/companyBenefits";
import Heading from "@/components/heading";
import PageLayout from "@/components/layouts/pageLayout";
import SalaryOverview from "@/components/salaryOverview";
import Text from "@/components/text";
import planetscaleTableJobOffer from "@/lib/planetscale/repositories/jobOffer";
import * as React from "react";
import useSWR from "swr";

export default function ViewJobOffer({ id, initialJobOffer }) {
  const { data: jobOffer } = useSWR(`/api/job-offer/${initialJobOffer.id}`, {
    initialData: initialJobOffer
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

export async function getServerSideProps(context) {
  return {
    props: {
      id: context.params.id,
      initialJobOffer: await planetscaleTableJobOffer.getByUuid(context.params.id)
    }
  };
}

ViewJobOffer.layoutProps = {
  meta: {
    title: "Job offer"
  },
  Layout: PageLayout,
  userNavDetails: false
};
