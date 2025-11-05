import { storageKeys } from "@/config/storageKeys";
import { refreshTokenService, signInService } from "@/services/AuthService";
import { httpClient } from "@/services/httpClient";
import React, {
  createContext,
  useCallback,
  useLayoutEffect,
  useState,
} from "react";

interface ISignInProps {
  email: string;
  password: string;
}

interface IAuthContextValue {
  isAuthenticated: boolean;
  signIn({ email, password }: ISignInProps): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem(storageKeys.accesToken);
  });

  const signIn = useCallback(async ({ email, password }: ISignInProps) => {
    const { accessToken, refreshToken } = await signInService({
      email,
      password,
    });

    localStorage.setItem(storageKeys.accesToken, accessToken);
    localStorage.setItem(storageKeys.refreshToken, refreshToken);
    setIsAuthenticated(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.clear();
    setIsAuthenticated(false);
  }, []);

  useLayoutEffect(() => {
    const interceptorId = httpClient.interceptors.request.use((config) => {
      const accessToken = localStorage.getItem(storageKeys.accesToken);

      if (accessToken) {
        config.headers.set("Authorization", `Bearer ${accessToken}`);
      }

      return config;
    });

    return () => {
      httpClient.interceptors.request.eject(interceptorId);
    };
  }, []);

  useLayoutEffect(() => {
    const interceptorId = httpClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        const refreshToken = localStorage.getItem(storageKeys.refreshToken);

        if (originalRequest.url === "/refresh-token") {
          setIsAuthenticated(false);
          localStorage.clear();
          return Promise.reject(error);
        }

        if (
          (error.response && error.response.status !== 401) ||
          !refreshToken
        ) {
          return Promise.reject(error);
        }

        const response = await refreshTokenService(refreshToken);

        localStorage.setItem(storageKeys.accesToken, response.accessToken);
        localStorage.setItem(storageKeys.refreshToken, response.refreshToken);

        return httpClient(originalRequest);
      },
    );

    return () => {
      httpClient.interceptors.response.eject(interceptorId);
    };
  }, []);

  const value: IAuthContextValue = {
    isAuthenticated,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
