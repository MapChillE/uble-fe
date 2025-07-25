"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchBrands } from "@/service/brand";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

import { useState, useMemo } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import DynamicCard from "@/components/ui/DynamicCard";
import type { BrandContent, BrandListData, FetchBrandsParams } from "@/types/brand";
import { Category } from "@/types/category";
import CategorySection from "@/components/common/CategorySection";
import { getCurrentSeason } from "@/utils/season";
import LoadingState from "./ui/LoadingState";
import ErrorState from "./ui/ErrorState";
import EmptyState from "./ui/EmptyState";
import { ALL_CATEGORY } from "@/types/constants";
import { useRouter } from "next/navigation";

const PAGE_SIZE = 8;

export default function EntireSection() {
  const [categorys, setCategorys] = useState<Category>(ALL_CATEGORY);
  const router = useRouter();

  const params = useMemo<FetchBrandsParams>(
    () => ({
      ...(typeof categorys.categoryId === "number" && categorys.categoryId !== 0
        ? { categoryId: categorys.categoryId }
        : {}),
      season: categorys.categoryId === "SEASON" ? getCurrentSeason() : undefined,
      type:
        categorys.categoryId === "VIP"
          ? "VIP"
          : categorys.categoryId === "LOCAL"
            ? "LOCAL"
            : undefined,
      size: PAGE_SIZE,
    }),
    [categorys.categoryId]
  );
  const queryKey = useMemo(() => ["brands", params] as const, [params]);

  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = undefined }) => fetchBrands({ ...params, lastBrandId: pageParam }),
    getNextPageParam: (lastPage: BrandListData) =>
      lastPage.hasNext ? lastPage.lastCursorId : undefined,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    initialPageParam: undefined,
  });

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    fetchNextPage,
  });

  return (
    <div className="space-y-4">
      <SectionHeader title="전체 제휴처" />

      <div className="pl-4 pr-4">
        <CategorySection selectedCategory={categorys} onSelectCategory={setCategorys} />
      </div>

      {isLoading && <LoadingState />}
      {isError && <ErrorState />}

      <div className="p-4">
        {data && (
          <>
            {data.pages.every((page) => page.content.length === 0) ? (
              <EmptyState />
            ) : (
              <>
                <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {data.pages
                    .flatMap((page) => page.content)
                    .map((brand: BrandContent) => (
                      <DynamicCard
                        key={brand.brandId}
                        data={brand}
                        variant="horizontal"
                        onClick={() => router.push(`/partnerships/${brand.brandId}`)}
                      />
                    ))}
                </div>
                {/* 이 div가 보일 때마다 다음 페이지를 불러옵니다 */}
                <div ref={loadMoreRef} className="h-1" />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
