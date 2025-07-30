"use client";

import { useState, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";

import { Button } from "@workspace/ui/components/button";
import SearchInput from "@/components/common/SearchInput";
import MapSearchResult from "@/app/(main)/map/components/MapSearchResult";
import { useLocationStore } from "@/store/useLocationStore";
import { fetchMapSearch, fetchSearchLog } from "@/service/mapSearch";
import { DEFAULT_LOCATION, DEFAULT_ZOOM_LEVEL } from "@/types/constants";
import { MapSuggestion } from "@/types/search";

export default function SearchContainer() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MapSuggestion[]>([]);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const enterFiredRef = useRef(false);

  const router = useRouter();
  const pathname = usePathname();
  const urlParams = useSearchParams();
  const currentLoc = useLocationStore((s) => s.currentLocation);

  /** 검색 & (필요 시) 로그 */
  const runSearch = async (keyword: string, via: "ENTER" | "AUTO") => {
    setLoading(true);
    try {
      const res = await fetchMapSearch({
        keyword,
        latitude: currentLoc?.[1] ?? DEFAULT_LOCATION[1],
        longitude: currentLoc?.[0] ?? DEFAULT_LOCATION[0],
      });
      setResults(res.suggestionList);

      if (via === "ENTER") {
        await fetchSearchLog({
          keyword,
          searchType: "ENTER",
          isResultExists: res.suggestionList.length > 0,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("검색 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  /** 입력 자동완성 (디바운스) */
  const debouncedAutoSearch = useDebouncedCallback((v: string) => {
    if (enterFiredRef.current) {
      // ENTER 직후 첫 AUTO 무시
      enterFiredRef.current = false;
      return;
    }
    v.trim() ? runSearch(v, "AUTO") : setResults([]);
  }, 200);

  const handleBack = () => router.back();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setQuery(v);
    debouncedAutoSearch(v);

    /* 주소창 파라미터 갱신 */
    const p = new URLSearchParams(urlParams);
    v ? p.set("q", v) : p.delete("q");
    router.replace(`${pathname}?${p.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.nativeEvent as any).isComposing) return; // IME 조합 중 무시
    if (e.key !== "Enter") return;
    if (enterFiredRef.current) return; // 중복 차단

    e.preventDefault();
    const v = e.currentTarget.value.trim();
    if (!v) return;

    enterFiredRef.current = true;
    debouncedAutoSearch.cancel();
    runSearch(v, "ENTER");
    setTimeout(() => {
      enterFiredRef.current = false;
    }, 200); // 200 ms 후 풀기
  };

  const handleResultClick = async (item: MapSuggestion) => {
    if (!item.latitude || !item.longitude) {
      toast.error("위치 정보를 찾을 수 없습니다.");
      return;
    }

    /* 클릭 로그 */
    await fetchSearchLog({ keyword: query, searchType: "CLICK", isResultExists: true });

    /* 파라미터 조립 후 라우팅 */
    const p = new URLSearchParams({
      lat: item.latitude.toString(),
      lng: item.longitude.toString(),
      searchQuery: query,
    });

    if (item.type === "STORE") {
      p.set("storeId", item.id.toString());
    } else {
      p.set("zoom", DEFAULT_ZOOM_LEVEL.toString());
      p.set("type", item.type);
      p.set("id", item.id.toString());
    }
    router.push(`/map?${p.toString()}`);
  };

  return (
    <div className="flex h-full flex-col bg-white">
      {/* 헤더 */}
      <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-3">
        <Button variant="ghost" size="sm" onClick={handleBack} className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="flex-1">
          <SearchInput
            ref={inputRef}
            searchQuery={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="검색어를 입력하세요"
          />
        </div>
      </div>

      {/* 검색 결과 */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex h-full items-center justify-center" />
        ) : results.length ? (
          <MapSearchResult searchResults={results} onResultClick={handleResultClick} />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
