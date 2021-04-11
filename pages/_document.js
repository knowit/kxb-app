import Document, { Head, Html, Main, NextScript } from "next/document";
import * as React from "react";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            href="/fonts/inter-var-latin.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <meta charSet="utf-8" />
        </Head>
        <body className="bg-white dark:bg-black text-gray-900 dark:text-gray-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
