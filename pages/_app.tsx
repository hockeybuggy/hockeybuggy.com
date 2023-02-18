import type { AppProps } from "next/app";
import Script from "next/script";
import { setupTracking, isTrackingEnabled } from "../services/tracking";

import "../styles/main.scss";

setupTracking(process.env.NEXT_PUBLIC_PLAUSIBLE_ENABLED);

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      {isTrackingEnabled() && (
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
