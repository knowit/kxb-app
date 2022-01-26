import { WithChildren } from "@/types";
import * as React from "react";
import { CSS, styled } from "stitches.config";

type FieldContainerProps = WithChildren<{
  hidden?: boolean;
  css?: CSS;
}>;

const FieldContainerRoot = styled("div", {
  display: "flex",
  flexDirection: "column",
  mb: "$4",
  width: "100%",
  position: "relative",
  variants: {
    hidden: {
      true: {
        display: "none"
      }
    }
  }
});

const FieldContainer = ({ children, hidden = false, ...other }: FieldContainerProps) => {
  return (
    <FieldContainerRoot hidden={hidden} {...other}>
      {children}
    </FieldContainerRoot>
  );
};

export default FieldContainer;
