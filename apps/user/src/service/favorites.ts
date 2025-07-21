import { BrandListData, BrandListResponse } from "@/types/brand";
import api from "@api/http-commons";

export interface FetchFavoritesParams {
  lastBookmarkId?: string;
  size?: number;
}

export const fetchFavorites = async (params: FetchFavoritesParams): Promise<BrandListData> => {
  const res = await api.get<BrandListResponse>("api/bookmarks", { params });
  console.log(res);
  return res.data.data;
};
