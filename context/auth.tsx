import * as React from "react";
import { useRouter } from "next/router";
import useInterval from "@use-it/interval";

import {
  useRefreshTokenMutation,
  useUserQueryQuery,
  UserQueryQuery,
} from "generated/graphql";

import {
  JWT_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  EMAIL_VERIFIED_KEY,
} from "lib/constants";

export enum AuthStatus {
  idle,
  checking,
  authenticated,
  unauthenticated,
}

interface AuthContextInterface {
  authState: AuthStatus;
  setAuthState: (s: AuthStatus) => void;
  logout: () => void;
  user: UserQueryQuery | undefined;
  //   userLoading: boolean;
}

const AuthContext = React.createContext<AuthContextInterface | null>(null);

type AuthProviderProps = { children: React.ReactNode };

function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [authState, setAuthState] = React.useState(AuthStatus.idle);

  const [{ data: user, fetching: userLoading }, getUser] = useUserQueryQuery({
    pause: true,
    requestPolicy: "network-only",
  });
  // {
  //   fetchPolicy: "network-only",
  // },

  function refetchUser() {
    const emailVerified = window.localStorage.getItem(EMAIL_VERIFIED_KEY);
    if (emailVerified) {
      getUser();
    }
  }

  React.useEffect(() => {
    window.addEventListener("storage", refetchUser);
    return () => window.removeEventListener("storage", refetchUser);
  }, []);

  const [{ data: refreshTokenData }, refreshTokenMutation] =
    useRefreshTokenMutation();

  React.useEffect(() => {
    if (refreshTokenData) {
      const { refreshToken, token } = refreshTokenData.refreshToken!;
      if (token && refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        localStorage.setItem(JWT_TOKEN_KEY, token);
        setTimeout(() => {
          setAuthState(AuthStatus.authenticated);
        }, 200);
      } else {
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(JWT_TOKEN_KEY);
        setAuthState(AuthStatus.unauthenticated);
      }
    }
    // else {
    //   localStorage.removeItem(REFRESH_TOKEN_KEY);
    //   localStorage.removeItem(JWT_TOKEN_KEY);
    //   setAuthState(AuthStatus.unauthenticated);
    // }
  }, [refreshTokenData]);

  function logout() {
    router.push("/");
    setTimeout(() => {
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(JWT_TOKEN_KEY);
      setAuthState(AuthStatus.unauthenticated);
    }, 200);
  }

  // initially refresh tokens
  React.useEffect(() => {
    async function refresh() {
      setAuthState(AuthStatus.checking);
      const theRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(JWT_TOKEN_KEY);
      if (!theRefreshToken) {
        setAuthState(AuthStatus.unauthenticated);
      } else {
        // get that token
        try {
          await refreshTokenMutation({
            refreshToken: theRefreshToken,
          });
          // if (router.asPath == "/") {
          // router.push(router.asPath);
          // router.push("/products");
          // router.push({ pathname: router.asPath, query: router.query });
          // }
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
              refreshToken: theRefreshToken,
            });
          } catch (error) {
            router.push("/");
            setAuthState(AuthStatus.unauthenticated);
          }
        }
      })();
    }
  }, 1000 * 120);

  React.useEffect(() => {
    if (authState === AuthStatus.authenticated) {
      getUser();
    }
  }, [authState, getUser]);

  const value: AuthContextInterface = {
    authState,
    setAuthState,
    logout,
    user,
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
