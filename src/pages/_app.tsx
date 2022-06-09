import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { ENV } from "../env";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    (async () => {
      const liff = (await import("@line/liff")).default;
      liff
        .init({ liffId: ENV.LINE_LIFF_ID })
        .then(() => {})
        .catch((err: any) => {
          console.error({ err });
        });
    })();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
