import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchOfflineBrandNames, OfflineBrandListParams } from "@/service/brand";
import { toast } from "sonner";

export const useOfflineBrands = (size: number = 20) => {
  return useInfiniteQuery({
    queryKey: ["offline-brands"],
    queryFn: async ({ pageParam }) => {
      try {
        const params: OfflineBrandListParams = { size };
        if (pageParam) {
          params.lastBrandId = pageParam;
        }
        const result = await fetchOfflineBrandNames(params);
        return result;
      } catch (error) {
        toast.error("주변 제휴처 목록을 불러오는데 실패했습니다.");
        throw error;
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      // 마지막 페이지의 내용이 없으면 중단
      if (!lastPage.hasNext || !lastPage.content?.length) {
        return undefined;
      }

      // 마지막 브랜드의 ID를 다음 커서로 사용
      const lastBrand = lastPage.content[lastPage.content.length - 1];
      if (!lastBrand || !lastBrand.id) {
        return undefined;
      }
      return lastBrand.id;
    },
    initialPageParam: undefined as number | undefined,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    retry: 2,
    retryDelay: 1000,
  });
};
