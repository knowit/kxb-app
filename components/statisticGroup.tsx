import { WithChildren } from "@/types";
import * as React from "react";

type StatisticGroupProps = WithChildren<{}>;

const StatisticGroup = ({ children }: StatisticGroupProps) => {
  return <div className="grid grid-cols-2 gap-4 mb-4">{children}</div>;
};

export default StatisticGroup;
