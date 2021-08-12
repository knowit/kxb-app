import Heading from "@/components/heading";
import AuthenticatedLayout from "@/components/layouts/authenticatedLayout";
import Text from "@/components/text";
import { UserProfile, useUser } from "@/components/user";
import redisUser from "@/lib/redisUser";
import * as React from "react";

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

Profile.layoutProps = {
  meta: {
    title: "Profile"
  },
  Layout: AuthenticatedLayout
};
