import Heading from "@/components/heading";
import AuthenticatedLayout from "@/components/layouts/authenticatedLayout";
import Text from "@/components/text";
import { UserProfile, useUser } from "@/components/user";
import { getResultForAuthenticatedPage } from "@/utils/pageUtils";
import * as React from "react";

export default function Profile() {
  const { user } = useUser();

  return (
    <>
      <Heading variant="pageHeading" className="mb-16 lg:mb-24">
        Hi {user?.name}
      </Heading>
      <Text>To edit your settings, use the form below.</Text>
      <UserProfile />
    </>
  );
}

export async function getServerSideProps(context) {
  return getResultForAuthenticatedPage(context);
}

Profile.layoutProps = {
  meta: {
    title: "Profile"
  },
  Layout: AuthenticatedLayout
};