import { ThemeProvider } from "next-themes";
import * as React from "react";
import { globalCss, lightTheme } from "stitches.config";

const globalStyles = globalCss({
  "*, ::before, ::after": {
    boxSizing: "border-box",
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "currentColor"
  },
  html: {
    overflowX: "hidden"
  },
  body: {
    backgroundColor: "$main",
    color: "$text",
    fontFamily: "$default",
    minWidth: "360px",
    scrollBehavior: "smooth",
    margin: 0,
    padding: 0
  },
  "#__next": {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  }
});

type MyAppProps = {
  Component: React.ComponentType & {
    layoutProps?: any;
  };
  pageProps?: Record<string, any>;
};

function MyApp({ Component, pageProps }: MyAppProps) {
  globalStyles();
  const Layout = Component.layoutProps?.Layout || React.Fragment;

  const layoutProps = Component.layoutProps?.Layout
    ? { pageProps, layoutProps: Component.layoutProps }
    : {};

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark-theme"
      value={{
        dark: "dark-theme",
        light: lightTheme.className
      }}
    >
      <Layout {...layoutProps}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
