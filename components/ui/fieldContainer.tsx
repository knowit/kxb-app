import { WithChildren } from "@/types";
import * as React from "react";
import { styled } from "stitches.config";

type FieldContainerProps = WithChildren<{
  hidden?: boolean;
}>;

const FieldContainerRoot = styled("div", {
  display: "flex",
  flexDirection: "column",
  mb: "$4",
  width: "100%",
  variants: {
    hidden: {
      true: {
        display: "none"
      }
    }
  }
});

const FieldContainer = ({ children, hidden = false }: FieldContainerProps) => {
  return <FieldContainerRoot hidden={hidden}>{children}</FieldContainerRoot>;
};

export default FieldContainer;
