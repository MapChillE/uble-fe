import { MapSuggestionResponse, MapSuggestionResult } from "@/types/search";
import api from "@api/http-commons";

interface MapSearchParams {
  keyword: string;
  latitude: number;
  longitude: number;
  size?: number;
}
export async function fetchMapSearch(params: MapSearchParams): Promise<MapSuggestionResult> {
  const { data } = await api.get<MapSuggestionResponse>("/api/stores/suggestions", { params });
  return data.data;
}

interface SearchLogParams {
  searchType: "CLICK" | "ENTER";
  keyword: string;
  isResultExists: boolean;
}
export async function fetchSearchLog(params: SearchLogParams) {
  await api.post("/search/log", params);
}
