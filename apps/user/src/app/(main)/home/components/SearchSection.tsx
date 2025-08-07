"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useState } from "react";
import AutoCompleteInput from "@/components/common/AutoCompleteInput";
import { fetchBrandSuggestions } from "@/service/brandSearch";
import { fetchSearchLog } from "@/service/mapSearch";

const SearchSection = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const q = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(q);

  const [autoComplete, setAutoComplete] = useState<{ type: "CATEGORY" | "BRAND"; value: string }[]>(
    []
  );

  useEffect(() => {
    setSearchQuery(q);
  }, [q]);

  // 자동완성 fetch debounce callback 생성 (100ms 기준)
  const debouncedFetchSuggestions = useDebouncedCallback(async (value: string) => {
    if (value.trim()) {
      const suggestions = await fetchBrandSuggestions(value);
      setAutoComplete(
        suggestions.suggestionList.map((s) => ({
          type: s.type.toUpperCase() === "CATEGORY" ? "CATEGORY" : "BRAND",
          value: s.suggestion,
        }))
      );
    } else {
      setAutoComplete([]);
    }
  }, 100);

  // input 변경 시 상태 업데이트 + 자동완성 fetch
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedFetchSuggestions(value);
  };

  // 자동완성 결과 클릭 시 검색
  const handleAutoSelect = async (query: string) => {
    // 자동완성 클릭 로그 전송 (사용자가 입력한 검색어 사용)
    await fetchSearchLog({
      keyword: query,
      searchType: "CLICK",
      isResultExists: true,
    });

    setSearchQuery(query);

    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("q", query);
      params.set("s", "auto");
    } else {
      params.delete("q");
      params.delete("s");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  // 엔터 키로 검색
  const handleEnterSearch = (query: string) => {
    setSearchQuery(query);
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("q", query);
      params.set("s", "manual");
    } else {
      params.delete("q");
      params.delete("s");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleBackClick = () => {
    router.back();
  };

  return (
    <section className="bg-white p-2">
      <AutoCompleteInput
        searchQuery={searchQuery}
        onChange={handleChange}
        autoComplete={autoComplete}
        onAutoSelect={handleAutoSelect}
        onEnterSearch={handleEnterSearch}
        onBackClick={handleBackClick}
        showBackButton={!!searchParams.get("q")}
      />
    </section>
  );
};

export default SearchSection;
