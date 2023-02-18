import type { AppProps } from "next/app";
import Script from "next/script";
import { isProduction } from "../services/buildContext";

import "../styles/main.scss";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      {isProduction() && (
        <Script
          defer
          data-domain="hockeybuggy.com"
          src="https://plausible.io/js/script.js"
        ></Script>
      )}
      <Script id="plausible-custom">
        {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
      </Script>

      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
