import styled from "@emotion/styled";
import * as React from "react";

const StyledTypography = styled.p`
  ${props => props.uppercase && "text-transform: uppercase;"}

  ${props => {
    switch (props.as) {
      case "h1":
        return `
            font-size: 4.8rem;
            margin: 0 0 0.5rem;
        `;
      case "h2":
        return `
            font-size: 3.6rem;
            margin: 0 0 0.5rem;
        `;
      default:
        return `
            font-size: 2.4rem;
            margin: 0 0 0.5rem;
        `;
    }
  }}
`;

export default function Typography({ children, as = "p", ...other }) {
  return (
    <StyledTypography as={as} {...other}>
      {children}
    </StyledTypography>
  );
}
