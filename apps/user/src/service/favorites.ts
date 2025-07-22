import { BrandListData } from "@/types/brand";
import { FavoriteBrandListResponse, FavoritesResponse } from "@/types/favorites";
import { apiHandler } from "@api/apiHandler";
import api from "@api/http-commons";

export interface FetchFavoritesParams {
  lastBookmarkId?: number;
  size?: number;
}

export const fetchFavorites = async (params: FetchFavoritesParams) => {
  return await apiHandler(async () => {
    const { data } = await api.get<FavoriteBrandListResponse>("api/bookmarks", { params });
    return data.data;
  });
};
export const fetchFavoritesQuery = async (params: FetchFavoritesParams): Promise<BrandListData> => {
  const { data, error } = await fetchFavorites(params);

  if (error || !data) {
    throw new Error(error || "즐겨찾기 불러오기 실패");
  }

  return data;
};

interface PostFavoritesParams {
  brandId: number;
}

export const postFavorites = async (params: PostFavoritesParams) => {
  return await apiHandler(async () => {
    const { data } = await api.post<FavoritesResponse>("api/bookmarks", params);
    return data.data;
  });
};
