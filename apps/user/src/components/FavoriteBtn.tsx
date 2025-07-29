"use client";

import { Heart } from "lucide-react";
import classNames from "classnames";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFavoriteMutation, postFavoritesMutation } from "@/service/favorites";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BrandContent, BrandListData, FetchBrandsParams } from "@/types/brand";
import { fetchBrands } from "@/service/brand";

interface FavoriteBtnProps {
  brandId: number;
  bookmarked?: boolean;
  variant: string;
}
const FavoriteBtn = ({ brandId, bookmarked = false, variant }: FavoriteBtnProps) => {
  const queryClient = useQueryClient();
  const [isLiked, setIsLiked] = useState(bookmarked);
  useEffect(() => {
    setIsLiked(bookmarked);
  }, [bookmarked]);

  /** 캐시 무효화, useQuery를 사용하는 쿼리들 업데이트 */
  const invalidate = () => {
    ["timeRecommend", "ageRecommend", "favoriteBrands", "brandSearch"].forEach((k) =>
      queryClient.invalidateQueries({ queryKey: [k] })
    );
    queryClient.invalidateQueries({ queryKey: ["brandDetail", brandId.toString()] });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (newIsLiked: boolean) =>
      newIsLiked ? postFavoritesMutation({ brandId }) : deleteFavoriteMutation({ brandId }),
    onMutate: async (newState: boolean) => {
      // InfiniteQuery에 먼저 낙관적 업데이트
      const infiniteKeys = ([["brands"]] as const).map((k) => ({
        queryKey: k,
      }));

      // 쿼리 취소 & 백업
      await Promise.all(
        infiniteKeys.map(({ queryKey }) => queryClient.cancelQueries({ queryKey }))
      );
      const prev = infiniteKeys.map(({ queryKey }) => ({
        queryKey,
        data: queryClient.getQueryData(queryKey),
      }));

      // 캐시 토글
      infiniteKeys.forEach(({ queryKey }) => {
        queryClient.setQueryData(queryKey, (old: any) =>
          old
            ? {
                ...old,
                pages: old.pages.map((page: any) => ({
                  ...page,
                  content: page.content.map((item: any) =>
                    item.brandId === brandId ? { ...item, isBookmarked: newState } : item
                  ),
                })),
              }
            : old
        );
      });

      return { prev };
    },
    onSuccess: async (newState) => {
      setIsLiked((prev) => !prev);
      // 1) "brands" 로 시작하는 모든 infiniteQuery 키만 골라서
      const brandQueries = queryClient.getQueriesData<{
        pages: BrandListData[];
        pageParams: any[];
      }>({
        queryKey: ["brands"], // prefix로 걸러내고
        exact: false, // 정확히 일치 말고 시작만 일치
      });

      for (const [fullKey, data] of brandQueries) {
        // 2) 타입 가드: data.pages 가 배열인지 확인
        if (!data || typeof data !== "object" || !Array.isArray((data as any).pages)) {
          continue;
        }

        const pages = (data as any).pages as BrandListData[];
        const pageParams = (data as any).pageParams as any[];

        // 어느 페이지에 이 brandId가 있는지 찾기
        const pageIndex = pages.findIndex((page) =>
          page.content.some((item) => item.brandId === brandId)
        );
        if (pageIndex === -1) continue;

        // cursor param 꺼내기
        const cursor = pageParams[pageIndex];
        const params = fullKey[1] as FetchBrandsParams; // ["brands", params]
        try {
          // 해당 페이지 하나만 재요청
          const updatedPage = await fetchBrands({
            ...params,
            lastBrandId: cursor,
          });

          // 캐시에 그 페이지만 대체
          queryClient.setQueryData(fullKey, (old: any) => {
            if (!old || !Array.isArray(old.pages)) return old;
            return {
              ...old,
              pages: old.pages.map((pg: any, i: number) => (i === pageIndex ? updatedPage : pg)),
            };
          });
        } catch (err) {
          toast.error("오류가 발생했습니다. 잠시 후 다시 이용해 주세요.");
        }
        // 하나만 바꾸고 루프 종료
        break;
      }

      // 그 외 invalidate
      invalidate();
    },
    onError: (error: Error) => {
      setIsLiked((prev) => !prev); // 실패했으면 상태 복구
      toast.error("오류가 발생했습니다. 잠시 후 다시 이용해 주세요.");
    },
    onSettled: invalidate,
  });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = !isLiked;
    mutate(newState);
  };

  return (
    <button onClick={handleClick} disabled={isPending}>
      <Heart
        className={classNames(
          variant === "vertical" ? "h-4 w-4" : "h-5 w-5",
          isLiked ? "text-[#FD7563]" : "text-gray-400 hover:text-gray-600"
        )}
        fill={isLiked ? "#FD7563" : "none"}
      />
    </button>
  );
};

export default FavoriteBtn;
