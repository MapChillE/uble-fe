"use client";

import { useMemo } from "react";

import { BrandContent, BrandListData } from "@/types/brand";
import DynamicCard from "@/components/ui/DynamicCard";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FetchFavoritesParams, fetchFavoritesQuery } from "@/service/favorites";

export default function FavoriteBrandSection() {
  // 즐겨찾기 데이터 받아오기
  const params = useMemo<FetchFavoritesParams>(
    () => ({
      size: 20,
    }),
    []
  );
  const queryKey = ["favoriteBrands", params];
  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => fetchFavoritesQuery({ ...params, lastBookmarkId: pageParam }),
    getNextPageParam: (lastPage: BrandListData) =>
      lastPage.hasNext ? lastPage.lastCursorId : undefined,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    initialPageParam: undefined,
  });

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    fetchNextPage,
  });

  if (isLoading) {
    return <div className="flex h-48 items-center justify-center">로딩중...</div>;
  }

  if (isError) {
    return <div>에러가 발생했습니다: {error.message}</div>;
  }

  const favoriteBrands = data?.pages.flatMap((page) => page.content) || [];
  if (favoriteBrands.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mb-2 text-gray-400"></div>
        <p className="text-gray-500">즐겨찾기한 제휴처가 없습니다.</p>
      </div>
    );
  }
  return (
    <div>
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {favoriteBrands.map((brand: BrandContent) => (
          <DynamicCard key={brand.brandId} data={brand} variant="horizontal" />
        ))}
      </div>
      <div ref={loadMoreRef} className="h-1" />
    </div>
  );
}
