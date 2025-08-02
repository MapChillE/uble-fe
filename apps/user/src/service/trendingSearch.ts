import api from "@api/http-commons";
import { toast } from "sonner";

export interface TrendingSearchItem {
  id: number;
  keyword: string;
  status?: "rising" | "falling" | "new";
  rank?: number;
}

export interface TrendingSearchResponse {
  trendingSearches: TrendingSearchItem[];
  lastUpdated: string;
}

export const fetchTrendingSearches = async (): Promise<TrendingSearchResponse> => {
  try {
    // TODO: 실제 API 엔드포인트로 교체
    const { data } = await api.get<TrendingSearchResponse>("/api/trending-searches");
    return data;
  } catch (error) {
    toast.error("트렌딩 검색어 조회에 실패했습니다.");

    // TODO: (에러 시 기본 데이터 반환) 실제 API 엔드포인트로 교체 후 삭제
    return {
      trendingSearches: [
        { id: 1, keyword: "강남 맛집" },
        { id: 2, keyword: "코엑스" },
        { id: 3, keyword: "홍대 맛집" },
        { id: 4, keyword: "강남 카페" },
      ],
      lastUpdated: new Date().toISOString(),
    };
  }
};
