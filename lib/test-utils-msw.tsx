import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import fetch from "cross-fetch";

const cache = new InMemoryCache();
const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:2000/graphql", fetch }),
  cache: cache,
});

import { AuthProvider } from "context/auth";

const AllTheProviders: React.FC = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>{children}</AuthProvider>
    </ApolloProvider>
  );
};

const customRender = (ui: React.ReactElement, options: RenderOptions = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender };
