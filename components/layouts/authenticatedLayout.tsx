import { CalendarProvider } from "@/components/calendar";
import Header from "@/components/header";
import { SalaryProvider } from "@/components/salary";
import { Box, Container, Flex, Footer, Heading, Li, Link, Main, Ul } from "@/components/ui";
import { UserProvider } from "@/components/user/providers/userProvider";
import { WithChildren } from "@/types";
import { SessionProvider } from "next-auth/react";
import * as React from "react";
import { FeedbackForm } from "../feedback";
import { Logo } from "../icons";
import { ThemeSelector } from "../theme";

type LayoutProps = WithChildren<{
  pageProps?: Record<string, any>;
  layoutProps?: Record<string, any>;
}>;

export default function AuthenticatedLayout({
  children,
  pageProps,
  layoutProps,
  ...other
}: LayoutProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={30 * 60}>
      <UserProvider session={pageProps.session} user={pageProps.user}>
        <CalendarProvider>
          <SalaryProvider>
            <Header {...layoutProps} />
            <Main>
              <Container
                size="3"
                center
                css={{
                  pt: "$4",
                  px: "$3",
                  "@bp1": {
                    pt: "$8",
                    px: "$4"
                  }
                }}
              >
                {children}
              </Container>
            </Main>
            <Footer variant="main">
              <Container
                size="3"
                center
                css={{
                  pt: "$4",
                  px: "$3",
                  "@bp1": {
                    pt: "$8",
                    px: "$4"
                  }
                }}
              >
                <Flex
                  direction={{
                    "@initial": "column",
                    "@bp1": "row"
                  }}
                  gap={{
                    "@initial": "6",
                    "@bp1": "1"
                  }}
                  justifyContent="between"
                >
                  <Box>
                    <Heading size="1">Resources</Heading>
                    <Ul>
                      <Li>
                        <Link
                          href="https://handbooks.simployer.com/nb-no/handbook/100006?sasid=977f713d-b5c3-45ec-ae83-4ff323b4e473"
                          isExternal
                        >
                          Personal handbook
                        </Link>
                      </Li>
                      <Li>
                        <Link href="https://knowit.cvpartner.com" isExternal>
                          CV Partner
                        </Link>
                      </Li>
                      <Li>
                        <Link href="http://helpit.knowit.no" isExternal>
                          Helpit
                        </Link>
                      </Li>
                      <Li>
                        <Link href="https://ubw.unit4cloud.com/se_kno_prod_web" isExternal>
                          Timekeeping
                        </Link>
                      </Li>
                      <Li>
                        <Link href="https://knowitexperience.slack.com" isExternal>
                          Slack
                        </Link>
                      </Li>
                      <Li>
                        <Link
                          href="https://knowit.sharepoint.com/sites/about/SitePages/Home.aspx"
                          isExternal
                        >
                          Shareit
                        </Link>
                      </Li>
                      <Li>
                        <Link href="https://www.knowit.se/brandbook/introduction/" isExternal>
                          Brand book
                        </Link>
                      </Li>
                      <Li>
                        <Link
                          href="https://knowit.sharepoint.com/sites/info-brand-communications/SitePages/Templates/Templates.aspx"
                          isExternal
                        >
                          Office templates
                        </Link>
                      </Li>
                    </Ul>
                  </Box>
                  <Box>
                    <Heading size="1">Site</Heading>
                    <Ul>
                      <Li>
                        <Link href="/">Home</Link>
                      </Li>
                      <Li>
                        <Link href="/profile">Profile</Link>
                      </Li>
                      <Li>
                        <Link href="/feedback">Feedback</Link>
                      </Li>
                    </Ul>
                  </Box>
                  <Box
                    css={{
                      flexGrow: 1,
                      maxWidth: "360px"
                    }}
                  >
                    <Heading>Feedback</Heading>
                    <FeedbackForm />
                    <ThemeSelector
                      css={{
                        mt: "$4",
                        justifyContent: "flex-end"
                      }}
                    />
                  </Box>
                </Flex>
                <Flex
                  justifyContent="center"
                  css={{
                    padding: "$10 0 $5"
                  }}
                >
                  <Logo />
                </Flex>
              </Container>
            </Footer>
          </SalaryProvider>
        </CalendarProvider>
      </UserProvider>
    </SessionProvider>
  );
}
