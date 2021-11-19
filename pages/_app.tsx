import { IdProvider } from "@radix-ui/react-id";
import { ThemeProvider } from "next-themes";
import * as React from "react";
import { globalCss } from "stitches.config";

const globalStyles = globalCss({
  "*, ::before, ::after": {
    boxSizing: "border-box",
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "currentColor"
  },
  body: {
    backgroundColor: "$main",
    color: "$text",
    fontFamily: "$default",
    minWidth: "360px",
    scrollBehavior: "smooth"
  },
  "#__next": {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  }
});

function MyApp({ Component, pageProps }) {
  globalStyles();
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
