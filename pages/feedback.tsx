import { FeedbackForm } from "@/components/feedback";
import AuthenticatedLayout from "@/components/layouts/authenticatedLayout";
import { Flex, Heading, Paragraph } from "@/components/ui";
import { getResultForAuthenticatedPage } from "@/utils/pageUtils";
import { GetServerSideProps } from "next";
import * as React from "react";

export default function Feedback() {
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
        textAlign="center"
      >
        We appreciate all feedback
      </Heading>
      <Paragraph textAlign="center">
        Good or bad, small or big. We appreciate all feedback.
      </Paragraph>
      <Flex
        justifyContent="center"
        css={{
          margin: "$10 0"
        }}
      >
        <FeedbackForm />
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  return getResultForAuthenticatedPage(context);
};

Feedback.layoutProps = {
  meta: {
    title: "Feedback"
  },
  Layout: AuthenticatedLayout
};
