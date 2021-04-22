import { Provider as NextAuthProvider } from "next-auth/client";
import { ThemeProvider } from "next-themes";
import * as React from "react";
import { UserProvider } from "../components/user/providers/userProvider";
import "../styles/global.css";
import { CalendarProvider } from "../utils/calendarProvider";
import { SalaryProvider } from "../utils/salaryProvider";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <NextAuthProvider
        options={{
          clientMaxAge: 0,
          keepAlive: 0
        }}
        session={pageProps.session}
      >
        <UserProvider session={pageProps.session}>
          <CalendarProvider
            initialData={pageProps?.data}
            year={pageProps?.year}
            month={pageProps?.month}
          >
            <SalaryProvider>
              <Component {...pageProps} />
            </SalaryProvider>
          </CalendarProvider>
        </UserProvider>
      </NextAuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
