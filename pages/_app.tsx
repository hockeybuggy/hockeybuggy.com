import * as React from "react";
import "../styles/main.scss";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}
export default MyApp;