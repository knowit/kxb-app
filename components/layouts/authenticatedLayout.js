import PageLayout from "@/components/layouts/pageLayout";
import { UserProvider } from "@/components/user/providers/userProvider";
import { CalendarProvider } from "@/utils/calendarProvider";
import { SalaryProvider } from "@/utils/salaryProvider";
import { Provider as NextAuthProvider } from "next-auth/client";
import * as React from "react";

export default function AuthenticatedLayout({ children, pageProps, layoutProps, ...other }) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <UserProvider session={pageProps.session}>
        <CalendarProvider>
          <SalaryProvider>
            <PageLayout layoutProps={layoutProps}>{children}</PageLayout>
          </SalaryProvider>
        </CalendarProvider>
      </UserProvider>
    </NextAuthProvider>
  );
}
