import { AxiosResponse } from "axios";
import { api } from "./axios.config";
import { StarwarData } from "@/interfaces/starwars.interface";

export const axiosFetcher = async (url: string) => {
  const res: AxiosResponse<StarwarData> = await api.get(url);
  return res.data;
};
