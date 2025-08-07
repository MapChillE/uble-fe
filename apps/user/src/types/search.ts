import { responseStatus } from "./api";
import { BrandContent } from "./brand";

export interface BrandSearchResult {
  brandList: BrandContent[];
  totalCount: number;
  totalPage: number;
}

export interface BrandSearchResponse extends responseStatus {
  data: BrandSearchResult;
}

export interface Suggestion {
  suggestion: string;
  type: "BRAND" | "CATEGORY";
}

export interface BrandSuggestionResult {
  suggestionList: Suggestion[];
}

export interface BrandSuggestionResponse extends responseStatus {
  data: BrandSuggestionResult;
}

export interface MapSuggestion {
  suggestion: string;
  category: string;
  id: number;
  type: "CATEGORY" | "STORE" | "BRAND";
  longitude: number;
  latitude: number;
  address?: string;
}

export interface MapSuggestionResult {
  suggestionList: MapSuggestion[];
}

export interface MapSuggestionResponse extends responseStatus {
  data: MapSuggestionResult;
}

export interface TrendingKeywordItem {
  keyword: string;
  rank: number;
  count: number;
  change: "UP" | "DOWN" | "SAME" | "NEW";
  diff: number;
}

export interface KeywordList {
  keywordList: TrendingKeywordItem[];
}

export interface KeywordListResponse extends responseStatus {
  data: KeywordList;
}
