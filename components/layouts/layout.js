import * as React from "react";
import Container from "../container";
import Nav from "../nav";

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <Container as="main">{children}</Container>
    </>
  );
}
