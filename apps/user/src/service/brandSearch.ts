import {
  BrandSearchResponse,
  BrandSearchResult,
  BrandSuggestionResponse,
  BrandSuggestionResult,
} from "@/types/search";
import api from "@api/http-commons";

interface BrandSearchParams {
  keyword: string;
  page?: number;
  size?: number;
}

export async function fetchBrandSearch(params: BrandSearchParams): Promise<BrandSearchResult> {
  const { data } = await api.get<BrandSearchResponse>("/api/brands/search", {
    params: { keyword: params.keyword, page: params.page, size: params.size },
  });

  return data.data;
}

export async function fetchBrandSuggestions(keyword: string): Promise<BrandSuggestionResult> {
  const { data } = await api.get<BrandSuggestionResponse>("/api/brands/suggestions", {
    params: { keyword, size: 5 },
  });
  return data.data;
}
