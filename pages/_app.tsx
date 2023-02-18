import { useEffect } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
// import Script from "next/script";

// import { GA_TRACKING_ID, pageview } from "../services/gtag";

import "../styles/main.scss";

const pageview = (url: string) => {
  console.log(url);
};

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
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
