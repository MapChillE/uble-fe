import { KeywordList, KeywordListResponse } from "@/types/search";
import api from "@api/http-commons";
import { toast } from "sonner";

export const fetchTrendingSearches = async (): Promise<KeywordList> => {
  try {
    const { data } = await api.get<KeywordListResponse>("/api/search/popular-keywords");
    return data.data;
  } catch (error) {
    toast.error("실시간 인기 검색어 조회에 실패했습니다.");

    return {
      keywordList: [],
    };
  }
};
