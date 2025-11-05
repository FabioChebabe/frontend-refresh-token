import { httpClient } from "./httpClient";

interface ISignUpDTO {
  name: string;
  email: string;
  password: string;
}

export const signUp = async ({ email, name, password }: ISignUpDTO) => {
  const { data } = await httpClient.post("/signup", {
    email,
    name,
    password,
  });

  return data;
};

interface ISignInDTO {
  email: string;
  password: string;
}

interface ISignInResponse {
  accessToken: string;
  refreshToken: string;
}

export const signInService = async ({ email, password }: ISignInDTO) => {
  const { data } = await httpClient.post<ISignInResponse>("/signin", {
    email,
    password,
  });

  return data;
};

export const refreshTokenService = async (refreshToken: string) => {
  const { data } = await httpClient.post<ISignInResponse>("/refresh-token", {
    refreshToken,
  });

  return data;
};
