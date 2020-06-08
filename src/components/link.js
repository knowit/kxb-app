import styled from "@emotion/styled";
import NextLink from "next/link";
import * as React from "react";

const StyledLink = styled.a``;

export default function Link({ children, href, as }) {
  return (
    <NextLink href={href} as={as} passHref>
      <StyledLink>{children}</StyledLink>
    </NextLink>
  );
}
