import * as React from "react";
import Container from "../container";
import Nav from "../nav";

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <Container as="main" className="px-8">
        {children}
      </Container>
    </>
  );
}
