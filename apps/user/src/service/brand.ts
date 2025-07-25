import {
  AgeRecommendResponse,
  BrandDetailResponse,
  BrandListData,
  BrandListResponse,
  FetchBrandsParams,
  PersonalRecommendResponse,
  TimeRecommendResponse,
} from "@/types/brand";
import { Coordinates } from "@/types/map";
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

export const fetchTimeRecommend = async (): Promise<TimeRecommendResponse> => {
  const { data } = await api.get("/api/users/recommendation/time");
  return data;
};

export const fetchPersonalRecommend = async (
  params: Coordinates
): Promise<PersonalRecommendResponse> => {
  const location = {
    longitude: params[0],
    latitude: params[1],
  };
  const { data } = await api.get("/api/users/recommendation", {
    params: location,
  });
  return data;
};
