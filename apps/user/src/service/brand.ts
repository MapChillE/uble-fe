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
import { toast } from "sonner";

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

export interface OfflineBrand {
  id: number;
  name: string;
  imageUrl: string;
}

export interface OfflineBrandListResponse {
  content: OfflineBrand[];
  hasNext: boolean;
  lastCursorId: number;
}

export interface OfflineBrandListParams {
  lastBrandId?: number;
  size?: number;
}

export const fetchOfflineBrandNames = async (
  params: OfflineBrandListParams = {}
): Promise<OfflineBrandListResponse> => {
  const { lastBrandId, size = 20 } = params;

  const queryParams = new URLSearchParams();
  if (lastBrandId) {
    queryParams.append("lastBrandId", lastBrandId.toString());
  }
  if (size) {
    queryParams.append("size", size.toString());
  }

  try {
    const response = await api.get(`/api/brands/names?${queryParams.toString()}`);
    const { data } = response.data;
    return data;
  } catch (error) {
    toast.error("주변 제휴처 목록을 불러오는데 실패했습니다.");
    return {
      content: [],
      hasNext: false,
      lastCursorId: 0,
    };
  }
};
