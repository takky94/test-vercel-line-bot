import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { ENV } from "../env";

function MyApp({ Component, pageProps }: AppProps) {
  const [liffObject, setLiffObject] = useState<any>(null);

  useEffect(() => {
    import("@line/liff").then((liff: any) => {
      liff
        .init({ liffId: ENV.LINE_LIFF_ID })
        .then(() => {
          setLiffObject(liff);
          if (liff.isLoggedIn()) {
            // ログインの確認を取れたら
          }
        })
        .catch((err: any) => {
          console.error({ err });
        });
    });
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
