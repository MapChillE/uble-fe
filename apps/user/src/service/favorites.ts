import { BrandListData, BrandListResponse } from "@/types/brand";
import api from "@api/http-commons";

export interface FetchFavoritesParams {
  lastBookmarkId?: number;
  size?: number;
}

export const fetchFavorites = async (params: FetchFavoritesParams): Promise<BrandListData> => {
  const { data } = await api.get<BrandListResponse>("api/bookmarks", { params });
  return data.data;
};
