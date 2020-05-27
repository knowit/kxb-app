import styled from "@emotion/styled";
import * as React from "react";

const StyledContainer = styled.div`
  width: ${props => {
    switch (props.width) {
      case "sm":
        return "35rem";
      default:
        return "auto";
    }
  }};
`;

export default function Container({ children, ...other }) {
  return <StyledContainer {...other}>{children}</StyledContainer>;
}
