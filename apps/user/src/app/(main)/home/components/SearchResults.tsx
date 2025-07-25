"use client";

import { toast } from "sonner";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchBrandSearch } from "@/service/brandSearch";
import DynamicCard from "@/components/ui/DynamicCard";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { BrandContent } from "@/types/brand";
import { BrandSearchResult } from "@/types/search";

const PAGE_SIZE = 12;

const SearchResults = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const router = useRouter();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
    useInfiniteQuery<BrandSearchResult, Error>({
      queryKey: ["brandSearch", q],
      queryFn: ({ pageParam = 0 }) =>
        fetchBrandSearch({ keyword: q, page: pageParam as number, size: PAGE_SIZE }),
      getNextPageParam: (lastPage, allPages: BrandSearchResult[]) =>
        lastPage.brandList.length === PAGE_SIZE ? allPages.length : undefined,
      initialPageParam: 0,
      enabled: !!q,
      refetchOnWindowFocus: false,
    });

  if (isError) {
    toast.error("검색 결과를 불러오는데 실패했습니다.");
  }

  const loadMoreRef = useInfiniteScroll({
    hasNextPage: !!hasNextPage,
    fetchNextPage,
  });

  if (!q) return null;

  const results: BrandContent[] = data ? data.pages.flatMap((page) => page.brandList) : [];

  return (
    <div className="w-full p-4">
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading ? (
          <div className="col-span-full py-4 text-center">로딩중...</div>
        ) : results.length > 0 ? (
          results.map((brand) => (
            <DynamicCard
              key={brand.brandId}
              data={brand}
              variant="horizontal"
              onClick={() => router.push(`/partnerships/${brand.brandId}`)}
            />
          ))
        ) : (
          <div className="col-span-full text-center">검색 결과가 없습니다.</div>
        )}
      </div>
      {hasNextPage && <div ref={loadMoreRef} className="h-1" />}
      {isFetchingNextPage && (
        <div className="item-center flex w-full justify-center">
          <div className="border-action-green mb-6 h-12 w-12 animate-spin items-center justify-center rounded-full border-b-4 border-t-4 border-gray-200" />
        </div>
      )}
    </div>
  );
};

export default SearchResults;
