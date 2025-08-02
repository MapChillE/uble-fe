"use client";

import React, { memo } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { useTrendingSearches } from "@/hooks/useTrendingSearches";
import { TrendingKeywordItem } from "@/types/search";

interface TrendingSearchItemProps {
  id: number;
  keyword: string;
  status?: string;
  onSearchClick: (keyword: string) => void;
}

// 개별 검색어 아이템 컴포넌트
const TrendingSearchItem = memo(
  ({ id, keyword, status, onSearchClick }: TrendingSearchItemProps) => {
    const getStatusIcon = (status?: string) => {
      switch (status) {
        case "UP":
          return <TrendingUp className="h-3 w-3 text-red-500" />;
        case "DOWN":
          return <TrendingDown className="h-3 w-3 text-blue-500" />;
        case "NEW":
          return <span className="text-action-green text-xs font-semibold">NEW</span>;
        case "SAME":
          return <span className="text-xs font-semibold text-gray-500">-</span>;
        default:
          return null;
      }
    };

    const handleClick = () => {
      onSearchClick(keyword);
    };

    return (
      <button
        onClick={handleClick}
        className="flex w-full items-center gap-2 rounded p-2 text-left hover:bg-gray-50"
      >
        <span className="min-w-[20px] text-sm font-medium text-gray-900">{id}</span>
        <span className="flex-1 truncate text-sm text-gray-700">{keyword}</span>
        {getStatusIcon(status)}
      </button>
    );
  }
);

// 검색어 리스트 컴포넌트
const TrendingSearchList = memo(
  ({
    items,
    onSearchClick,
  }: {
    items: TrendingKeywordItem[];
    onSearchClick: (keyword: string) => void;
  }) => (
    <div className="space-y-2">
      {items.map((item) => (
        <TrendingSearchItem
          key={item.keyword}
          id={item.rank}
          keyword={item.keyword}
          status={item.change}
          onSearchClick={onSearchClick}
        />
      ))}
    </div>
  )
);

// 로딩 스켈레톤 컴포넌트
const TrendingSearchSkeleton = () => (
  <div className="flex items-center gap-2 rounded p-2">
    <Skeleton className="h-4 w-4 rounded" />
    <Skeleton className="h-4 flex-1 rounded" />
  </div>
);

// 로딩 스켈레톤 리스트 컴포넌트
const TrendingSearchSkeletonList = () => (
  <div className="space-y-2">
    {Array.from({ length: 5 }).map((_, index) => (
      <TrendingSearchSkeleton key={index} />
    ))}
  </div>
);

interface TrendingSearchesSectionProps {
  onSearchClick: (keyword: string) => void;
}

const TrendingSearchesSection = ({ onSearchClick }: TrendingSearchesSectionProps) => {
  const { data, isLoading, error } = useTrendingSearches();
  const trendingSearches = data?.keywordList || [];

  const firstColumnItems = trendingSearches.slice(0, 5);
  const secondColumnItems = trendingSearches.slice(5, 10);

  return (
    <div className="px-4 py-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">실시간 인기 검색어</h3>
        <span className="text-xs text-gray-500">
          {new Date().toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          기준
        </span>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-2 gap-4">
          <TrendingSearchSkeletonList />
          <TrendingSearchSkeletonList />
        </div>
      ) : error ? (
        <div className="py-4 text-center text-sm text-gray-500">
          인기 검색어를 불러오는데 실패했습니다.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <TrendingSearchList items={firstColumnItems} onSearchClick={onSearchClick} />
          <TrendingSearchList items={secondColumnItems} onSearchClick={onSearchClick} />
        </div>
      )}
    </div>
  );
};

export default memo(TrendingSearchesSection);
