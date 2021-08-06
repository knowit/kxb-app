import Container from "@/components/container";
import Heading from "@/components/heading";
import AuthenticatedLayout from "@/components/layouts/authenticatedLayout";
import LinkButton from "@/components/linkButton";
import planetscaleTableJobOffer from "@/lib/planetscale/repositories/jobOffer";
import { getResultForAuthenticatedPage } from "@/utils/pageUtils";
import * as React from "react";
import useSWR from "swr";

export default function JobOffer({ initialJobOffers }) {
  const { data: jobOffers } = useSWR("api/job-offer", { initialData: initialJobOffers });

  return (
    <>
      <Heading variant="pageHeading">Job offer</Heading>
      <Container className="mb-8">
        {jobOffers?.map(jobOffer => (
          <div key={jobOffer.uuid} className="flex gap-4 justify-start items-center mb-4">
            <div>{jobOffer.firstName}</div>
            <div>{jobOffer.lastName}</div>
            <div>{jobOffer.email}</div>
            <div>{jobOffer.phone}</div>
            <LinkButton href={`/job-offer/${jobOffer.id}/edit`}>Edit</LinkButton>
            <LinkButton variant="secondary" href={`/job-offer/${jobOffer.uuid}`}>
              View
            </LinkButton>
          </div>
        ))}
      </Container>
      <LinkButton href="/job-offer/create">Create job offer</LinkButton>
    </>
  );
}

export async function getServerSideProps(context) {
  const authenticatedPageProps = await getResultForAuthenticatedPage(context);

  return {
    props: {
      ...authenticatedPageProps,
      initialJobOffers: await planetscaleTableJobOffer.get()
    }
  };
}

JobOffer.layoutProps = {
  meta: {
    title: "Job offer"
  },
  Layout: AuthenticatedLayout
};
