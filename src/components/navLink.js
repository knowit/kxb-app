import styled from "@emotion/styled";
import NextLink from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

const StyledNavLink = styled.a`
  color: ${props => (props.active ? props.theme.colors.text500 : props.theme.colors.bg200)};
  font-size: 2rem;
  text-decoration: none;
  text-transform: uppercase;
  padding: 0.5rem 2rem;
`;

export default function NavLink({ children, href, as }) {
  const router = useRouter();
  const path = router.asPath ?? router.pathname;
  const linkPath = as ?? href;

  return (
    <NextLink href={href} as={as} passHref>
      <StyledNavLink active={path === linkPath || path.startsWith(linkPath)}>
        {children}
      </StyledNavLink>
    </NextLink>
  );
}
