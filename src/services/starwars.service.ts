import { AxiosResponse } from "axios";
import { api } from "@/configs/axios.config";
import { PaginationParams, StarwarData } from "@/interfaces";

export const fetchCharacters = async ({
  page = 1,
  limit = 10,
}: PaginationParams = {}): Promise<StarwarData> => {
  const response: AxiosResponse<StarwarData> = await api.get("/characters", {
    params: { page, limit },
  });
  return response.data;
};

export const charactersQueryKey = (params: PaginationParams) => [
  "characters",
  params,
];
