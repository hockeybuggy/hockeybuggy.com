import { useEffect } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Script from "next/script";

import { GA_TRACKING_ID, pageview } from "../services/gtag";

import "../styles/main.scss";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {GA_TRACKING_ID !== undefined && (
        <>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
            }}
          />
        </>
      )}

      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
