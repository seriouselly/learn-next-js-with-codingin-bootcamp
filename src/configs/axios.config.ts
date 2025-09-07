import axios, { AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STARWARS_API,
  timeout: 10000,
});
