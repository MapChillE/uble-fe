"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { useTrendingSearches } from "@/hooks/useTrendingSearches";

interface TrendingSearchesProps {
  onSearchClick: (keyword: string) => void;
}

export default function TrendingSearches({ onSearchClick }: TrendingSearchesProps) {
  const { data, isLoading, error } = useTrendingSearches();
  const trendingSearches = data?.trendingSearches || [];

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "rising":
        return <TrendingUp className="h-3 w-3 text-red-500" />;
      case "falling":
        return <TrendingDown className="h-3 w-3 text-blue-500" />;
      case "new":
        return <span className="text-xs font-semibold text-green-600">NEW</span>;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="px-4 py-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">실시간 인기 검색어</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center gap-2 rounded p-2">
                <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
                <div className="h-4 flex-1 animate-pulse rounded bg-gray-200" />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index + 5} className="flex items-center gap-2 rounded p-2">
                <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
                <div className="h-4 flex-1 animate-pulse rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">실시간 인기 검색어</h3>
        </div>
        <div className="py-4 text-center text-sm text-gray-500">
          인기 검색어를 불러오는데 실패했습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">실시간 인기 검색어</h3>
        {data?.lastUpdated && (
          <span className="text-xs text-gray-500">
            {new Date(data.lastUpdated).toLocaleTimeString("ko-KR", {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            기준
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          {trendingSearches.slice(0, 5).map((item) => (
            <button
              key={item.id}
              onClick={() => onSearchClick(item.keyword)}
              className="flex w-full items-center gap-2 rounded p-2 text-left hover:bg-gray-50"
            >
              <span className="min-w-[20px] text-sm font-medium text-gray-900">{item.id}</span>
              <span className="flex-1 truncate text-sm text-gray-700">{item.keyword}</span>
              {getStatusIcon(item.status)}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {trendingSearches.slice(5, 10).map((item) => (
            <button
              key={item.id}
              onClick={() => onSearchClick(item.keyword)}
              className="flex w-full items-center gap-2 rounded p-2 text-left hover:bg-gray-50"
            >
              <span className="min-w-[20px] text-sm font-medium text-gray-900">{item.id}</span>
              <span className="flex-1 truncate text-sm text-gray-700">{item.keyword}</span>
              {getStatusIcon(item.status)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
