import React from "react";
import { render, RenderOptions } from "@testing-library/react";
// import { ApolloProvider } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
// import { useApollo } from "lib/apolloClient";

import { AuthProvider } from "context/auth";

const AllTheProviders: React.FC = ({ children }) => (
  <MockedProvider>
    <AuthProvider>{children}</AuthProvider>
  </MockedProvider>
);

const customRender = (ui: React.ReactElement, options: RenderOptions = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender };
