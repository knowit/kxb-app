import { Box, Flex, Heading, Link, Paragraph, Svg } from "@/components/ui";
import { sessionUserIsSpecialist } from "@/utils/sessionUtils";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import * as React from "react";
import { HiLockClosed } from "react-icons/hi";

export default function AccessDenied({ session }) {
  return (
    <Box
      css={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100vh",
        zIndex: 50,
        overflow: "hidden",
        backgroundColor: "$main",
        color: "$secondary"
      }}
    >
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        css={{
          width: "100%",
          height: "100vh",
          maxWidth: "$lgContainer",
          my: 0,
          mx: "auto"
        }}
      >
        <Svg
          as={HiLockClosed}
          size="8"
          variant="red"
          css={{
            mb: "$6"
          }}
        />
        <Heading size="5">{`Hi ${session?.user?.name}`}</Heading>
        <Paragraph textAlign="center">
          We found an account in your name, but you seem lack access to this app. If this is a
          mistake and you should have access, then please send an email to{" "}
          <Link
            href="mailto:tommy.barvag@knowit.no"
            css={{
              color: "$green"
            }}
          >
            tommy.barvag@knowit.no
          </Link>{" "}
          requesting access.
        </Paragraph>
      </Flex>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context);

  // Session user is specialist and should not see
  // access denied page. Redirect to index
  if (sessionUserIsSpecialist(session)) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }

  return {
    props: {
      session
    }
  };
};
