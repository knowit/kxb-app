import * as React from "react";
import { Container } from "../components/container";
import GlobalStyles from "../components/globalStyles";
import Nav from "../components/nav";

export default function Layout({ children, year, years, months }) {
  return (
    <>
      <GlobalStyles />
      <Nav year={year} years={years} months={months} />
      <Container as="main">{children}</Container>
    </>
  );
}
