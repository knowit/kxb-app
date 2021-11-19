import Header from "@/components/header";
import { UserProvider } from "@/components/user/providers/userProvider";
import { CalendarProvider } from "@/utils/calendarProvider";
import { SalaryProvider } from "@/utils/salaryProvider";
import { Provider as NextAuthProvider } from "next-auth/client";
import * as React from "react";
import { Box } from "../ui";

export default function AuthenticatedLayout({ children, pageProps, layoutProps, ...other }) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <UserProvider session={pageProps.session} user={pageProps.user}>
        <CalendarProvider>
          <SalaryProvider>
            <Header {...layoutProps} />
            <Box
              as="main"
              css={{
                width: "100%",
                maxWidth: "$lgContainer",
                my: 0,
                mx: "auto",
                pt: "$4",
                px: "$3",
                "@bp1": {
                  pt: "$8",
                  px: "$4"
                }
              }}
            >
              {children}
            </Box>
          </SalaryProvider>
        </CalendarProvider>
      </UserProvider>
    </NextAuthProvider>
  );
}
