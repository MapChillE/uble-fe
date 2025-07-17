import api from "@api/http-commons";
import { apiHandler } from "@api/apiHandler";
import { StoreListResponse } from "@/types/store";

export interface GetStoresParams {
  latitude: number;
  longitude: number;
  distance: number;
  categoryId?: number;
  brandId?: number;
  season?: string;
  type?: string;
}

export const getStores = (params: GetStoresParams) =>
  apiHandler<StoreListResponse>(() => api.get("/api/stores", { params }));
