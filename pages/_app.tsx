import * as React from "react";
import "../styles/main.scss";
import "prismjs/themes/prism-solarizedlight.css";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}
export default MyApp;
