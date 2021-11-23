import { Box, Card, Heading, Skeleton, Text } from "@/components/ui";
import * as React from "react";

type StatisticProps = {
  title: string;
  value: string | number;
  isLoading?: boolean;
};

const Statistic = ({ title, value, isLoading = false }: StatisticProps) => {
  return (
    <Skeleton loading={isLoading}>
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
            <Text
              size="1"
              color="textDark"
              textTransform="uppercase"
              css={{
                mb: "$1"
              }}
            >
              {title}
            </Text>
            <Heading size="1" noMargin>
              {value}
            </Heading>
          </Box>
        </Box>
      </Card>
    </Skeleton>
  );
};

export default Statistic;
