"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchBrands } from "@/service/brand";

import { useState, useMemo, useRef, useEffect } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import DynamicCard from "@/components/ui/DynamicCard";
import type {
  BrandContent,
  BrandListData,
  FetchBrandsParams,
} from "@/types/brand";
import { Category } from "@/types/category";
import CategorySection from "@/components/common/CategorySection";

const PAGE_SIZE = 8;

function calcSeason(date: Date) {
  const m = date.getMonth() + 1;
  if (m >= 3 && m <= 5) return "SPRING";
  if (m >= 6 && m <= 8) return "SUMMER";
  if (m >= 9 && m <= 11) return "AUTUMN";
  return "WINTER";
}

const ALL_CATEGORY: Category = { categoryId: 0, categoryName: "전체" };
export default function EntireSection() {
  const [categorys, setCategorys] = useState<Category>(ALL_CATEGORY);
  const [season, setSeason] = useState<string | undefined>(undefined);
  const [type, setType] = useState<string | undefined>(undefined);

  const params = useMemo<FetchBrandsParams>(
    () => ({
      ...(typeof categorys.categoryId === "number" && categorys.categoryId !== 0
        ? { categoryId: categorys.categoryId }
        : {}),
      season,
      type,
      size: PAGE_SIZE,
    }),
    [categorys.categoryId, season, type]
  );
  const queryKey = useMemo(() => ["brands", params] as const, [params]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = undefined }) =>
      fetchBrands({ ...params, lastBrandId: pageParam }),
    getNextPageParam: (lastPage: BrandListData) =>
      lastPage.hasNext ? lastPage.lastCursorId : undefined,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    initialPageParam: undefined,
  });

  // ─── infinite scroll sentinel setup ─────────────────────
  const loadMoreRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" }
    );
    obs.observe(loadMoreRef.current);
    return () => { obs.disconnect(); };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="space-y-4">
      <SectionHeader title="전체 제휴처" />

      {/* 필터 UI */}
      <CategorySection selectedCategory={categorys} onSelectCategory={setCategorys} />

      {isLoading && <p>로딩 중…</p>}
      {isError && <p className="text-red-500">에러: {error?.message}</p>}

      <div className="p-4">
        {data && (
          <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
              {data.pages
                .flatMap(page => page.content)
                .map((brand: BrandContent) => (
                  <DynamicCard
                    key={brand.brandId}
                    data={brand}
                    variant="horizontal"
                  />
                ))}
            </div>

            {/* 이 div가 보일 때마다 다음 페이지를 불러옵니다 */}
            <div ref={loadMoreRef} className="h-1" />
          </>
        )}
      </div>
    </div>
  );
}
