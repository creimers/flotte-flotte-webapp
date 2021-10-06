import { useMemo } from "react";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  concat,
} from "@apollo/client";

import jwt_decode, { JwtPayload } from "jwt-decode";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_URI}`,
});
const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = localStorage.getItem("jwt-token");

  if (token) {
    const decoded = jwt_decode<JwtPayload>(token);
    const now = new Date();
    if (decoded.exp && now.getTime() < decoded.exp * 1000) {
      operation.setContext({
        headers: {
          authorization: `JWT ${token}`,
        },
      });
    }
  }

  return forward(operation);
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined", // set to true for SSR
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = {}) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") {
    return _apolloClient;
  }

  // Create the Apollo Client once in the client
  if (!apolloClient) {
    apolloClient = _apolloClient;
  }
  return _apolloClient;
}

export function useApollo(initialState: object) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
