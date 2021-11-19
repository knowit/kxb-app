import UserAvatar from "@/components/user/userAvatar";
import { useSalary } from "@/utils/salaryProvider";
import { signOut, useSession } from "next-auth/client";
import * as React from "react";
import { useClickAway } from "react-use";
import { Box, Button, Card, Flex, IconButton, Link, Text } from "../ui";

const UserNavDetails = () => {
  const userMenuRef = React.useRef(null);

  useClickAway(userMenuRef, () => {
    if (showUserMenu) {
      setShowUserMenu(false);
    }
  });

  const [session] = useSession();
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const { nextPayDayStatistics } = useSalary();

  if (!session) {
    return null;
  }

  return (
    <>
      <Flex
        alignItems="end"
        css={{
          ml: "$3",
          "@bp1": {
            ml: "$5"
          }
        }}
      >
        <Box>
          <Text size="1" color="textDark">
            Next paycheck
          </Text>
          <Text size="1">{nextPayDayStatistics.payDay}</Text>
          <Text size="2" fontWeight="bold" color="green">
            {nextPayDayStatistics.netFormatted}
          </Text>
        </Box>
      </Flex>
      <Flex
        alignItems="center"
        css={{
          ml: "$3",
          "@bp1": {
            ml: "$5"
          }
        }}
      >
        <Box
          ref={userMenuRef}
          css={{
            position: "relative"
          }}
        >
          <IconButton size="3" variant="ghost" onClick={() => setShowUserMenu(prev => !prev)}>
            <UserAvatar />
          </IconButton>
          <Card
            css={{
              display: showUserMenu ? "block" : "none",
              position: "absolute",
              right: 0,
              backgroundColor: "$main",
              borderRadius: "$4",
              mt: "$2"
            }}
          >
            <Link href="/profile" onClick={() => setShowUserMenu(false)}>
              Profile
            </Link>
            <Button
              onClick={() => signOut()}
              css={{
                mt: "$3"
              }}
            >
              Logout
            </Button>
          </Card>
        </Box>
      </Flex>
    </>
  );
};

export default UserNavDetails;
