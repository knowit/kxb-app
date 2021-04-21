import * as React from "react";
import Heading from "../components/heading";
import Text from "../components/text";
import useUser from "../components/user/hooks/useUser";

export default function Profile() {
  const { user } = useUser();

  return (
    <>
      <Heading variant="pageHeading">Hi {user?.name}</Heading>
      <Text>
        To edit your settings, use the form below. We persist changes as you type, so don't worry
        about saving.
      </Text>
    </>
  );
}
