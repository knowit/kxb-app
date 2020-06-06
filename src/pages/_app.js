import * as React from "react";
import Layout from "../containers/layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout year={pageProps?.year} years={pageProps?.years} months={pageProps?.months}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
