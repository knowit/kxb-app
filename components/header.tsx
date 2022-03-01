import { Logo } from "@/components/icons";
import { Box, Container, Flex, Link, LinkButton, Nav } from "@/components/ui";
import { UserNavDetails, useUser } from "@/components/user";
import * as React from "react";
import { FeedbackPopover } from "./feedback";

export default function Header({ userNavDetails = true, ...other }) {
  const { user } = useUser();

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
          <FeedbackPopover />
          {user.isAdmin ? (
            <LinkButton variant="text" href="/salary-calculator">
              Salary calculator
            </LinkButton>
          ) : null}
        </Flex>

        {userNavDetails && <UserNavDetails />}
      </Container>
    </Nav>
  );
}
