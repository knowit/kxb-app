import AuthenticatedLayout from "@/components/layouts/authenticatedLayout";
import { Flex, Heading, Paragraph } from "@/components/ui";
import { UserProfile, useUser } from "@/components/user";
import { getResultForAuthenticatedPage } from "@/utils/pageUtils";
import { GetServerSideProps } from "next";
import * as React from "react";

export default function Profile() {
  const { user } = useUser();

  return (
    <>
      <Heading size="5">Hi {user?.name}</Heading>
      <Paragraph>To edit your settings, use the form below.</Paragraph>
      <Flex>
        <UserProfile />
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  return getResultForAuthenticatedPage(context);
};

Profile.layoutProps = {
  meta: {
    title: "Profile"
  },
  Layout: AuthenticatedLayout
};
