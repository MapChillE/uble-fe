import api from "@api/http-commons";
import {
  StoreContent,
  StoreDetail,
  StoreDetailResponse,
  StoreListResponse,
  StoreSummary,
  StoreSummaryResponse,
} from "@/types/store";

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

interface GetStoreParams {
  latitude: number;
  longitude: number;
  storeId: number;
}

export const getStoreDetail = async (params: GetStoreParams): Promise<StoreDetail> => {
  const { data } = await api.get<StoreDetailResponse>(`/api/stores/${params.storeId}`, { params });
  return data.data;
};

export const getStoreSummary = async (params: GetStoreParams): Promise<StoreSummary> => {
  const { data } = await api.get<StoreSummaryResponse>(`/api/stores/summary/${params.storeId}`, {
    params,
  });
  return data.data;
};
