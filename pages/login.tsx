import { LoginButtons } from "@/components/auth";
import { Box, Flex, Heading, Image, Paragraph, Svg, Text } from "@/components/ui";
import { GetServerSideProps } from "next";
import { getProviders, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import * as React from "react";

export default function Login({ session }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(!!session);

  React.useEffect(() => {
    if (session) {
      setIsLoading(true);
      router.push("/");
    }
  }, [session, router]);

  return isLoading ? (
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
        alignItems="center"
        justifyContent="center"
        css={{
          width: "100%",
          height: "100vh",
          my: 0,
          mx: "auto"
        }}
      >
        <Box
          css={{
            marginBottom: "$5"
          }}
        >
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            size="8"
            variant="green"
            spin
            css={{
              "& circle": {
                opacity: 0.25
              },
              "& path": {
                opacity: 0.75
              }
            }}
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </Svg>
        </Box>
        <Heading size="5">Logging you in</Heading>
        <Text>This may take a few seconds, please don&#39;t close this page.</Text>
      </Flex>
    </Box>
  ) : (
    <Box
      css={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "$main"
      }}
    >
      <Box
        css={{
          mx: "auto",
          height: "100%",
          maxWidth: "$xlContainer"
        }}
      >
        <Box
          css={{
            position: "relative",
            zIndex: 10,
            pb: "$7",
            backgroundColor: "$main",
            height: "100%",
            "@bp1": {
              pb: "$8"
            },
            "@bp2": {
              pb: "$10",
              maxWidth: "$mdContainer",
              width: "100vw",
              height: "100vh"
            }
          }}
        >
          <Svg
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            variant="main"
            css={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              height: "100vh",
              width: "192px",
              transform: "translateX(50%)"
            }}
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </Svg>

          <Flex
            direction="column"
            justifyContent="center"
            alignItems="start"
            css={{
              mx: "auto",
              height: "100%",
              px: "$4",
              "@bp1": {
                px: "$6"
              }
            }}
          >
            <Heading size="5">KXB Specialist</Heading>
            <Paragraph>Login to see your estimated salary.</Paragraph>
            <LoginButtons onClick={() => setIsLoading(true)} />
          </Flex>
        </Box>
      </Box>
      <Box
        css={{
          display: "none",
          "@bp1": {
            display: "block",
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            width: "50%"
          }
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
          alt="Login"
          layout="fill"
          css={{
            height: "100vh",
            width: "100vw",
            objectFit: "cover",
            opacity: 0.65
          }}
        />
      </Box>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context);

  return {
    props: {
      session,
      loginProviders: await getProviders()
    }
  };
};
