import { refresh } from "@/service/auth";
import axios, { InternalAxiosRequestConfig } from "axios";
import { redirect } from "next/navigation";
import { authStorage } from "./storage";

export const skipTokenHeader = "X-Skip-Token";
export const skipAuthHeader = "X-Skip-Auth";

const tokenInterceptor = async (request: InternalAxiosRequestConfig) => {
  if (request.headers[skipTokenHeader]) {
    return request;
  }
  const authData = authStorage().get();
  if (authData) {
    setBearerToken(authData.accessToken, request);
  } else {
    clearBearerToken(request);
  }
  return request;
};

// Handle 401 and try to refresh token automatically
// Warning: After the access token expires, it refreshes it every time
// when a request fails with 401 on server.
// The reason is that Next App router cannot set cookies in server components
// so it's impossible to update them with the new token.
// We can only hope that middleware will update it at some point.
// @see https://github.com/vercel/next.js/discussions/49843
const tokenRefreshInterceptor = async (error: any) => {
  if (error.response === undefined || error.response.status !== 401)
    return Promise.reject(error);
  if (error.config.headers[skipAuthHeader]) return Promise.reject(error);
  if (error.config._isRetry) redirect("/sign-in");

  const originalRequest = error.config;
  originalRequest._isRetry = true;

  const authData = authStorage().get();
  if (!authData) redirect("/sign-in");

  try {
    const refreshedData = await refresh({
      refresh_token: authData.refreshToken,
    });
    setBearerToken(refreshedData.accessToken, originalRequest);
    originalRequest.headers[skipTokenHeader] = true;

    return client.request(originalRequest);
  } catch {
    redirect("/sign-in");
  }
};

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});
client.interceptors.request.use(tokenInterceptor);
client.interceptors.response.use((cfg) => cfg, tokenRefreshInterceptor);

export function setBearerToken(
  token: string,
  config?: InternalAxiosRequestConfig
) {
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
  if (!config) return;
  config.headers.Authorization = `Bearer ${token}`;
}

export function clearBearerToken(config?: InternalAxiosRequestConfig) {
  client.defaults.headers.common.Authorization = undefined;
  if (!config) return;
  config.headers.Authorization = undefined;
}

export default client;
