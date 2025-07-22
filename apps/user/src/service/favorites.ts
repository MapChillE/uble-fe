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
    throw new Error(error || "즐겨찾기 불러오기에 실패했습니다.");
  }

  return data;
};

interface PostFavoritesParams {
  brandId: number;
}

export const postFavorites = async (params: PostFavoritesParams) => {
  return await apiHandler(async () => {
    const { data } = await api.post<FavoritesResponse>("api/bookmarks", null, { params });
    return data.data;
  });
};

export const postFavoritesMutation = async (params: PostFavoritesParams): Promise<number> => {
  const { data, error } = await postFavorites(params);

  if (error || data === null) {
    throw new Error(error || "즐겨찾기 등록에 실패했습니다.");
  }

  return data;
};

interface DeleteFavoriteParams {
  bookmarkId: number;
}

export const deleteFavorite = async (params: DeleteFavoriteParams): Promise<void> => {
  const { error } = await apiHandler(async () => {
    await api.delete(`/api/bookmarks/${params.bookmarkId}`);
  });

  if (error) {
    throw new Error(error);
  }
};

export const deleteFavoriteMutation = async (params: DeleteFavoriteParams) => {
  await deleteFavorite(params);
  return params.bookmarkId;
};
