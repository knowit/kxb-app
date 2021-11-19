import "@/styles/global.css";
import { IdProvider } from "@radix-ui/react-id";
import { ThemeProvider } from "next-themes";
import * as React from "react";

function MyApp({ Component, pageProps }) {
  const Layout = Component.layoutProps?.Layout || React.Fragment;

  const layoutProps = Component.layoutProps?.Layout
    ? { pageProps, layoutProps: Component.layoutProps }
    : {};

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <IdProvider>
        <Layout {...layoutProps}>
          <Component {...pageProps} />
        </Layout>
      </IdProvider>
    </ThemeProvider>
  );
}

export default MyApp;
