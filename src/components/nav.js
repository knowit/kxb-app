import styled from "@emotion/styled";
import * as React from "react";
import NavLink from "./navLink";

const StyledNav = styled.nav``;

const StyledItems = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
`;

const StyledItem = styled.li``;

export default function Nav({ year, years, months }) {
  return (
    <StyledNav>
      <StyledItems>
        {years?.map(year => (
          <StyledItem key={`styled-item-year-${year}`}>
            <NavLink href="/year/[year]" as={`/year/${year}`}>
              {year}
            </NavLink>
          </StyledItem>
        ))}
      </StyledItems>
      <StyledItems>
        {months?.map(month => (
          <StyledItem key={`styled-item-year-${year}-month-${month}`}>
            <NavLink href="/year/[year]/[month]" as={`/year/${year}/${month?.toLowerCase()}`}>
              {month?.toLowerCase()}
            </NavLink>
          </StyledItem>
        ))}
      </StyledItems>
    </StyledNav>
  );
}
