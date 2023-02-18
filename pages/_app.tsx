import type { AppProps } from "next/app";
import Script from "next/script";
import {
  setupContext,
  isProduction,
  isDeployPreview,
} from "../services/buildContext";

import "../styles/main.scss";

setupContext(process.env.CONTEXT);

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      {(isProduction() || isDeployPreview()) && (
        <>
          <Script
            defer
            data-domain="hockeybuggy.com"
            src="https://plausible.io/js/script.js"
          ></Script>
          <Script id="plausible-custom">
            {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
          </Script>
        </>
      )}

      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
