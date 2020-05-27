import styled from "@emotion/styled";
import * as React from "react";

const StyledFlex = styled.div`
  display: flex;
  flex-direction: ${props => props.direction ?? "row"};
  flex-wrap: wrap;
  padding: ${props => !props.noPadding && "1rem"};
  margin: ${props => !props.noMargin && "1rem"};
`;

export default function Flex({ children, direction, noPadding, noMargin }) {
  return (
    <StyledFlex direction={direction} noPadding={noPadding} noMargin={noMargin}>
      {children}
    </StyledFlex>
  );
}
