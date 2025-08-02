"use client";

import React, { useState, useMemo, useCallback, memo } from "react";
import { X } from "lucide-react";
import SearchInput from "./SearchInput";
import BrandCard, { OfflineBrand } from "./BrandCard";
import { useOfflineBrands } from "@/hooks/useOfflineBrands";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import LoadingState from "@/app/(main)/home/components/ui/LoadingState";
import ErrorState from "@/app/(main)/home/components/ui/ErrorState";
import EmptyState from "@/app/(main)/home/components/ui/EmptyState";

interface BrandSelectionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onBrandSelect: (brandId: number | null, brandName?: string) => void;
  selectedBrandId: number | null;
}

const BrandSelectionDrawer = memo(
  ({ isOpen, onClose, onBrandSelect, selectedBrandId }: BrandSelectionDrawerProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
      useOfflineBrands(20);

    // 무한 스크롤 훅 사용
    const loadMoreRef = useInfiniteScroll({
      hasNextPage,
      fetchNextPage,
    });

    // 모든 브랜드를 평면화 (안전한 필터링 + 중복 제거)
    const allBrands = useMemo(() => {
      if (!data?.pages) return [];
      const brands = data.pages
        .flatMap((page) => page.content)
        .filter((brand) => brand && typeof brand.id === "number" && brand.name);

      // 중복된 id 제거 (마지막에 온 것을 유지)
      const uniqueBrands = brands.reduce((acc, brand) => {
        acc.set(brand.id, brand);
        return acc;
      }, new Map<number, OfflineBrand>());

      return Array.from(uniqueBrands.values());
    }, [data?.pages]);

    // 검색 필터링
    const filteredBrands = useMemo(() => {
      if (!searchQuery) return allBrands;
      return allBrands.filter((brand) =>
        brand.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }, [allBrands, searchQuery]);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    }, []);

    const handleBrandClick = useCallback(
      (brandId: number) => {
        const newSelectedId = selectedBrandId === brandId ? null : brandId;

        if (newSelectedId) {
          // 브랜드 선택 시: 해당 브랜드 정보 찾기
          const selectedBrand = allBrands.find((brand) => brand.id === newSelectedId);
          onBrandSelect(newSelectedId, selectedBrand?.name);
        } else {
          // 브랜드 해제 시
          onBrandSelect(null);
        }
      },
      [selectedBrandId, allBrands, onBrandSelect]
    );

    return (
      <>
        {isOpen && <div className="z-100 fixed inset-0 bg-black/40" onClick={onClose} />}

        <div
          className={`z-110 fixed bottom-0 left-0 right-0 rounded-t-xl bg-white transition-transform duration-300 ${
            isOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="p-4">
            {/* 헤더 */}
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">오프라인 제휴처 선택</h3>
              <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* 검색 */}
            <div className="mb-4">
              <SearchInput
                searchQuery={searchQuery}
                onChange={handleSearchChange}
                placeholder="브랜드 검색"
              />
            </div>

            {/* Brand list */}
            <div className="max-h-96 overflow-y-auto">
              {isLoading ? (
                <LoadingState />
              ) : error ? (
                <ErrorState />
              ) : filteredBrands.length === 0 ? (
                <EmptyState />
              ) : (
                <>
                  <div className="space-y-2">
                    {filteredBrands.map((brand) => (
                      <BrandCard
                        key={brand.id}
                        brand={brand}
                        isSelected={selectedBrandId === brand.id}
                        onSelect={handleBrandClick.bind(null, brand.id)}
                      />
                    ))}
                  </div>

                  {/* 무한 스크롤 트리거 */}
                  {hasNextPage && !searchQuery && <div ref={loadMoreRef} className="h-4" />}

                  {/* 로딩 상태 표시 */}
                  {isFetchingNextPage && (
                    <div className="flex min-h-[200px] animate-pulse flex-col items-center justify-center text-gray-500">
                      <div className="mb-3 h-10 w-10 animate-spin rounded-full border-b-2 border-gray-400" />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default BrandSelectionDrawer;
