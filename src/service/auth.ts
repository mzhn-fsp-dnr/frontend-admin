import type { AuthCredentials, AuthRefreshCredentials } from "@/api/auth";

import * as authApi from "@/api/auth";
import { authStorage } from "../lib/storage";

export async function signIn(credentials: AuthCredentials) {
  const result = await authApi.auth(credentials);
  authStorage().set(result);
  return result;
}

export async function refresh(credentials: AuthRefreshCredentials) {
  const result = await authApi.refresh(credentials);
  authStorage().set(result);
  return result;
}

export async function me() {
  return await authApi.me();
}

export async function logout() {
  // await authApi.logout();
  authStorage().remove();
}
