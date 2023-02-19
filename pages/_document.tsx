/* eslint-disable @next/next/no-page-custom-font */
import * as React from "react";

import { Html, Head, Main, NextScript } from "next/document";

function MyDocument(): JSX.Element {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;700&family=Lato:wght@400;700&family=Merriweather:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/static/img/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
export default MyDocument;
