import Container from "@/components/container";
import Nav from "@/components/nav";
import { UserProvider } from "@/components/user/providers/userProvider";
import { CalendarProvider } from "@/utils/calendarProvider";
import { SalaryProvider } from "@/utils/salaryProvider";
import { Provider as NextAuthProvider } from "next-auth/client";
import * as React from "react";

export default function AuthenticatedLayout({ children, pageProps, layoutProps }) {
  return (
    <NextAuthProvider>
      <UserProvider user={pageProps.user}>
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
