import { Grid } from "@/components/ui";
import { WithChildren } from "@/types";
import * as React from "react";

type StatisticGroupProps = WithChildren<{}>;

const StatisticGroup = ({ children }: StatisticGroupProps) => {
  return (
    <Grid
      gridTemplateColumns={{
        "@initial": 1,
        "@bp1": 2
      }}
      gap="3"
      css={{
        marginBottom: "$4"
      }}
    >
      {children}
    </Grid>
  );
};

export default StatisticGroup;
