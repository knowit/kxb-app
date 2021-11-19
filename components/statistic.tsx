import StatisticSkeleton from "@/components/skeleton/statisticSkeleton";
import * as React from "react";
import { Box, Card, Heading, Text } from "./ui";

type StatisticProps = {
  title: string;
  value: string | number;
  isLoading?: boolean;
};

const Statistic = ({ title, value, isLoading = false }: StatisticProps) => {
  return isLoading ? (
    <StatisticSkeleton />
  ) : (
    <Card>
      <Box
        css={{
          display: "block",
          "@bp1": {
            display: "flex",
            alignItems: "flex-start"
          }
        }}
      >
        <Box
          css={{
            textAlign: "center",
            "@bp1": {
              textAlign: "left"
            }
          }}
        >
          <Text size="1" color="green">
            {title}
          </Text>
          <Heading size="2" noMargin>
            {value}
          </Heading>
        </Box>
      </Box>
    </Card>
  );
};

export default Statistic;
