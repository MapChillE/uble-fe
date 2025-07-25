import {
  AgeRecommendResponse,
  BrandDetailResponse,
  BrandListData,
  BrandListResponse,
  FetchBrandsParams,
} from "@/types/brand";
import api from "@api/http-commons";

export const fetchBrands = async (params: FetchBrandsParams): Promise<BrandListData> => {
  const res = await api.get<BrandListResponse>("api/brands", { params });
  return res.data.data;
};

export const fetchBrandDetail = async (params: string): Promise<BrandDetailResponse> => {
  const { data } = await api.get(`/api/brands/${params}`);
  return data;
};

export const fetchAgeRecommend = async (): Promise<AgeRecommendResponse> => {
  const { data } = await api.get("/api/users/recommendation/similar");
  return data;
};
