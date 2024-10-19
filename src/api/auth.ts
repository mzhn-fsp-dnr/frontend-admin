import client, { skipAuthHeader, skipTokenHeader } from "@/lib/axios";
import { User } from "./users";

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthRefreshCredentials {
  refresh_token: string;
}

export interface AuthResult {
  accessToken: string;
  refreshToken: string;
}

export async function auth(credentials: AuthCredentials) {
  const headers = { [skipAuthHeader]: true };
  const { data } = await client.post<AuthResult>("/auth/login", credentials, {
    // headers,
  });
  return data;
}

export async function refresh(credentials: AuthRefreshCredentials) {
  const token = credentials.refresh_token;

  const headers = {
    Authorization: `Bearer ${token}`,
    [skipAuthHeader]: true,
    [skipTokenHeader]: true,
  };
  const { data } = await client.post<AuthResult>(
    `/auth/refresh`,
    {},
    { headers }
  );
  return data;
}

export async function me() {
  const { data } = await client.get<User>(`/auth/profile`);
  return data;
}

export async function logout() {
  await client.post(`/auth/logout`);
}
