import * as React from "react";
import GlobalStyles from "../components/globalStyles";
import Nav from "../components/nav";

export default function Layout({ children, year, years, months }) {
  return (
    <>
      <GlobalStyles />
      <Nav year={year} years={years} months={months} />
      {children}
    </>
  );
}
