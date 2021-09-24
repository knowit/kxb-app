import { WithChildren } from "@/types";
import * as React from "react";

type ContainerProps = WithChildren<{
  as?: React.ElementType;
  className?: string;
}>;

const Container = ({ children, as = "div", ...other }: ContainerProps) => {
  const Component = as;
  return <Component {...other}>{children}</Component>;
};

export default Container;
