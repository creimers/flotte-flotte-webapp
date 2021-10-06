import * as React from "react";
import { ApolloError } from "@apollo/client";
import { useRouter } from "next/router";
import useInterval from "@use-it/interval";

import {
  //   useUserLazyQuery,
  //   UserQuery,
  useLoginMutation,
  useRefreshTokenMutation,
} from "@generated/graphql";

const JWT_TOKEN_KEY = "jwt-token";
const REFRESH_TOKEN_KEY = "refresh-token";

export enum AuthStatus {
  idle,
  checking,
  authenticated,
  unauthenticated,
}

interface AuthContextInterface {
  authState: AuthStatus;
  loginError: ApolloError | undefined;
  login: (email: string, password: string) => void;
  logout: () => void;
  //   user: UserQuery | undefined;
  //   userLoading: boolean;
}

const AuthContext = React.createContext<AuthContextInterface | null>(null);

type AuthProviderProps = { children: React.ReactNode };

function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [authState, setAuthState] = React.useState(AuthStatus.idle);

  //   const [getUser, { data: user, loading: userLoading }] = useUserLazyQuery({
  //     fetchPolicy: "network-only",
  //   });

  const [loginMutation, { error: loginError }] = useLoginMutation({
    update: (_, { data: result }) => {
      if (result && result.tokenAuth) {
        const { refreshToken, token } = result.tokenAuth;
        if (token && refreshToken) {
          localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
          localStorage.setItem(JWT_TOKEN_KEY, token);
        }
      }
    },
  });

  const [refreshTokenMutation] = useRefreshTokenMutation({
    update: (_, { data: result }) => {
      if (result && result.refreshToken) {
        const { refreshToken, token } = result.refreshToken;
        if (token && refreshToken) {
          localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
          localStorage.setItem(JWT_TOKEN_KEY, token);
        }
      }
    },
    // onError: (error) => {
    //   console.log(error);
    //   setStatus(AuthStatus.unauthenticated);
    //   // redirect to login
    //   router.push("/");
    // },
  });

  async function login(email: string, password: string) {
    try {
      await loginMutation({ variables: { email, password } });
      //   router.push("/products");
      setAuthState(AuthStatus.authenticated);
    } catch (error) {
      //   console.log(error);
    }
  }

  function logout() {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(JWT_TOKEN_KEY);
    setAuthState(AuthStatus.unauthenticated);
    router.push("/");
  }

  // initially refresh tokens
  React.useEffect(() => {
    async function refresh() {
      setAuthState(AuthStatus.checking);
      const theRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      if (!theRefreshToken) {
        // router.push("/");
        setAuthState(AuthStatus.unauthenticated);
      } else {
        // get that token
        try {
          await refreshTokenMutation({
            variables: { refreshToken: theRefreshToken },
          });
          if (router.asPath == "/") {
            // router.push(router.asPath);
            // router.push("/products");
            // router.push({ pathname: router.asPath, query: router.query });
          }

          setTimeout(() => {
            setAuthState(AuthStatus.authenticated);
          }, 200);
        } catch (error) {
          console.log(error);
          // redirect to login
          //   router.push("/");
          setTimeout(() => {
            setAuthState(AuthStatus.unauthenticated);
          }, 200);
        }
      }
    }
    refresh();
  }, []);

  // periodically refresh tokens
  useInterval(() => {
    if (authState === AuthStatus.authenticated) {
      (async () => {
        const theRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
        if (!theRefreshToken) {
          router.push("/");
          setAuthState(AuthStatus.unauthenticated);
        } else {
          // get that token
          try {
            await refreshTokenMutation({
              variables: { refreshToken: theRefreshToken },
            });
          } catch (error) {
            router.push("/");
            setAuthState(AuthStatus.unauthenticated);
          }
        }
      })();
    }
  }, 1000 * 120);

  //   React.useEffect(() => {
  //     if (status === AuthStatus.authenticated) {
  //       getUser();
  //     }
  //   }, [status]);

  const value: AuthContextInterface = {
    authState: authState,
    login,
    loginError,
    logout,
    // user,
    // userLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within the AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
