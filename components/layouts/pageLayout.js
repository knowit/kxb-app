import Container from "@/components/container";
import Nav from "@/components/nav";
import { CalendarProvider } from "@/utils/calendarProvider";
import * as React from "react";

export default function PageLayout({ children, pageProps, layoutProps, ...other }) {
  return (
    <CalendarProvider>
      <Nav {...layoutProps} />
      <Container as="main" className="w-full max-w-5xl my-0 mx-auto pt-16 px-8">
        {children}
      </Container>
    </CalendarProvider>
  );
}
