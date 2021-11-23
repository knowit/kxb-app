import Calendar from "@/components/calendar";
import SalaryStatistics from "@/components/salaryStatistics";
import { Flex, FlexItem } from "@/components/ui";
import { UserProfile } from "@/components/user";
import * as React from "react";

export default function YearlyEarnings() {
  return (
    <Flex
      css={{
        width: "100%",
        marginBottom: "$6",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        "@bp1": {
          flexDirection: "row",
          marginBottom: "$12"
        }
      }}
    >
      <FlexItem
        css={{
          order: "1",
          "@bp1": {
            order: "-1"
          }
        }}
      >
        <UserProfile />
      </FlexItem>
      <FlexItem
        css={{
          flexGrow: 1,
          maxWidth: "$calendarContainer",
          marginBottom: "$6",
          "@bp1": {
            marginLeft: "$4"
          }
        }}
      >
        <Calendar />
        <SalaryStatistics />
      </FlexItem>
    </Flex>
  );
}
