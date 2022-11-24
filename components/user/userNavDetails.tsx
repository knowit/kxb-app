import { useSalary } from "@/components/salary";
import { Box, Flex, Text } from "@/components/ui";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import * as React from "react";

const UserAvatarPopover = dynamic(() => import("./userAvatarPopover"), {
  ssr: true
});

const UserNavDetails = () => {
  const { data: session } = useSession();
  const { nextPayDayStatistics } = useSalary();

  if (!session) {
    return null;
  }

  return (
    <>
      <Flex
        alignItems="end"
        css={{
          ml: "$2",
          "@bp1": {
            ml: "$5"
          }
        }}
      >
        <Box
          css={{
            minWidth: "120px",
            "@bp1": {
              minWidth: "125px"
            }
          }}
        >
          <Text size="1" color="textDark">
            Next paycheck
          </Text>
          <Text size="1">{nextPayDayStatistics.payDay}</Text>
          <Text size="2" fontWeight="bold" color="green">
            {nextPayDayStatistics.netFormatted}
          </Text>
          {nextPayDayStatistics.halfTax ? (
            <Text size="1" color="textDark">
              Half tax
            </Text>
          ) : null}
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
        <UserAvatarPopover />
      </Flex>
    </>
  );
};

export default UserNavDetails;
