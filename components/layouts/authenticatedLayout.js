import { Provider as NextAuthProvider } from "next-auth/client";
import * as React from "react";
import { CalendarProvider } from "../../utils/calendarProvider";
import { SalaryProvider } from "../../utils/salaryProvider";
import Container from "../container";
import Nav from "../nav";
import { UserProvider } from "../user/providers/userProvider";

export default function AuthenticatedLayout({ children, pageProps, layoutProps, ...other }) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <UserProvider session={pageProps.session}>
        <CalendarProvider>
          <SalaryProvider>
            <Nav {...layoutProps} />
            <Container as="main" className="w-full max-w-5xl my-0 mx-auto pt-16 px-8">
              {children}
            </Container>
          </SalaryProvider>
        </CalendarProvider>
      </UserProvider>
    </NextAuthProvider>
  );
}
