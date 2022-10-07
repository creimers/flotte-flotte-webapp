import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import jwt_decode, { JwtPayload } from "jwt-decode";

import { createClient, dedupExchange, Provider } from "urql";
// import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";
// import { Cache, cacheExchange } from "@urql/exchange-graphcache";

import { AuthProvider } from "context/auth";

const client = createClient({
  url: process.env.NEXT_PUBLIC_API_URI!,
  // exchanges: [dedupExchange],
  fetchOptions: () => {
    const isClient = typeof window !== "undefined";
    if (isClient) {
      const token = localStorage.getItem("jwt-token");
      if (token) {
        const decoded = jwt_decode<JwtPayload>(token);
        const now = new Date();
        if (decoded.exp && now.getTime() < decoded.exp * 1000) {
          return {
            headers: { authorization: token ? `JWT ${token}` : "" },
          };
        }
      }
    }
    return {
      headers: { authorization: "" },
    };
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  // const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <Provider value={client}>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#ff0000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <DefaultSeo
        title="Este-Esel - das freie Lastenrad an der Este"
        description="Der Este-Esel ist das Lastenrad an der Este zur freien Nutzung für alle!"
      />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      <script
        async
        defer
        src="https://scripts.simpleanalyticscdn.com/latest.js"
      ></script>
      <noscript>
        <img
          src="https://queue.simpleanalyticscdn.com/noscript.gif"
          alt="ding dong"
        />
      </noscript>
    </Provider>
  );
}
export default MyApp;
