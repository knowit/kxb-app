import { Logo } from "@/components/icons";
import { UserNavDetails, useUser } from "@/components/user";
import { useTheme } from "next-themes";
import * as React from "react";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { FeedbackDialog } from "./feedback";
import { Box, Container, Flex, IconButton, Link, LinkButton, Nav, Svg } from "./ui";

export default function Header({ userNavDetails = true, ...other }) {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const { user } = useUser();

  // After mounting, we have access to the theme
  React.useEffect(() => setMounted(true), []);

  return (
    <Nav variant="header">
      <Container
        size="4"
        center
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Box
          css={{
            flexGrow: 1
          }}
        >
          <Link href="/">
            <Logo />
          </Link>
        </Box>
        <Flex
          alignItems="center"
          gap={{
            "@initial": "0",
            "@bp1": "1"
          }}
          css={{
            display: "none",
            "@bp2": {
              display: "flex",
              ml: "$5"
            }
          }}
        >
          <FeedbackDialog />
          {user.isAdmin ? (
            <LinkButton variant="black" href="/salary-calculator">
              Salary calculator
            </LinkButton>
          ) : null}
        </Flex>

        {userNavDetails && <UserNavDetails />}
        <Box
          css={{
            ml: "$3",
            "@bp1": {
              ml: "$5"
            }
          }}
        >
          <IconButton
            type="button"
            aria-label="Toggle color mode"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {mounted ? (
              theme === "light" ? (
                <Svg as={HiOutlineMoon} variant="black"></Svg>
              ) : (
                <Svg as={HiOutlineSun} variant="white"></Svg>
              )
            ) : (
              <Box
                css={{
                  height: "$4",
                  width: "$4"
                }}
              ></Box>
            )}
          </IconButton>
        </Box>
      </Container>
    </Nav>
  );
}
