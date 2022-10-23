import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "urql";
import { never } from "wonka";

import { AuthProvider } from "context/auth";

const mockClient = {
  executeSubscription: jest.fn(() => never),
  executeQuery: jest.fn(() => never),
} as any;

const AllTheProviders: React.FC = ({ children }) => (
  <Provider value={mockClient}>
    <AuthProvider>{children}</AuthProvider>
  </Provider>
);

const customRender = (ui: React.ReactElement, options: RenderOptions = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender };
