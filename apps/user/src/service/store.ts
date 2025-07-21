import api from "@api/http-commons";
import { StoreContent, StoreDetail, StoreDetailResponse, StoreListResponse } from "@/types/store";

interface GetNearbyStoresParams {
  latitude: number;
  longitude: number;
  distance: number;
  categoryId?: number;
  brandId?: number;
  season?: string;
  type?: string;
}

export const getNearbyStores = async (params: GetNearbyStoresParams): Promise<StoreContent[]> => {
  const { data } = await api.get<StoreListResponse>("/api/stores", { params });
  return data.data.storeList;
};

interface GetStoreDetailParams {
  latitude: number;
  longitude: number;
  storeId: number;
}

export const getStoreDetail = async (params: GetStoreDetailParams): Promise<StoreDetail> => {
  const { data } = await api.get<StoreDetailResponse>(`/api/stores/${params.storeId}`, { params });
  return data.data;
};
