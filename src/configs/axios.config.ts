import { AuthCookie } from "@/types";
import axios, { AxiosInstance } from "axios";
import Cookie from "js-cookie";

const cookieName: AuthCookie = "accessToken";

export const api: AxiosInstance = axios.create({
  baseURL: String(process.env.NEXT_PUBLIC_STARWARS_API),
  timeout: 10000,
});

export const authApi: AxiosInstance = axios.create({
  baseURL: String(process.env.NEXT_PUBLIC_AUTH_API),
  timeout: 10000,
});

authApi.interceptors.request.use((config) => {
  const token = Cookie.get(cookieName);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.request.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      Cookie.remove(cookieName);
    }

    if (error instanceof Error) {
      return Promise.reject(error);
    }
    return Promise.reject(new Error(String(error)));
  },
);
