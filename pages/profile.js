import { getSession } from "next-auth/client";
import * as React from "react";
import Heading from "../components/heading";
import AuthenticatedLayout from "../components/layouts/authenticatedLayout";
import Text from "../components/text";
import { UserProfile, useUser } from "../components/user";

export default function Profile() {
  const { user } = useUser();

  return (
    <>
      <Heading variant="pageHeading">Hi {user?.name}</Heading>
      <Text>To edit your settings, use the form below.</Text>
      <UserProfile />
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      props: {
        session
      }
    };
  }

  return {
    redirect: {
      destination: "/login",
      permanent: false
    }
  };
}

Profile.layoutProps = {
  meta: {
    title: "Profile"
  },
  Layout: AuthenticatedLayout
};
