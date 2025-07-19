import api from "@api/http-commons";
import { StoreContent, StoreListResponse } from "@/types/store";

export interface GetNearbyStoresParams {
  latitude: number;
  longitude: number;
  distance: number;
  categoryId?: number;
  brandId?: number;
  season?: string;
  type?: string;
}

export const getNearbyStores = async (params: GetNearbyStoresParams): Promise<StoreContent[]> => {
  const res = await api.get<StoreListResponse>("/api/stores", { params });
  return res.data.data.storeList;
};
