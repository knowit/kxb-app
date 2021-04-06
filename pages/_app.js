import { ThemeProvider } from "next-themes";
import * as React from "react";
import Layout from "../components/layouts/layout";
import "../styles/global.css";
import { CalendarProvider } from "../utils/calendarProvider";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <CalendarProvider
        initialData={pageProps?.data}
        year={pageProps?.year}
        month={pageProps?.month}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CalendarProvider>
    </ThemeProvider>
  );
}

export default MyApp;
