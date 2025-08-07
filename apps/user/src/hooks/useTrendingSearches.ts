import { useQuery } from "@tanstack/react-query";
import { fetchTrendingSearches } from "@/service/trendingSearch";
import { KeywordList } from "@/types/search";

export const useTrendingSearches = () => {
  return useQuery<KeywordList>({
    queryKey: ["trending-searches"],
    queryFn: fetchTrendingSearches,
    staleTime: 5 * 60 * 1000, // 5분간 fresh 상태 유지
    gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
    refetchOnWindowFocus: false, // 윈도우 포커스 시 재요청 안함
    refetchOnMount: true, // 컴포넌트 마운트 시 재요청
    retry: 2, // 실패 시 2번 재시도
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // 지수 백오프
  });
};
