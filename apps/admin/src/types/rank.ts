// 공통 응답 구조
export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

// 기본 랭킹 데이터 구조
export interface RankData {
  name: string;
  count: number;
}

// 클릭 랭킹 응답
export interface ClickRankResponse {
  rankTarget: "BRAND" | "CATEGORY";
  clickRankList: RankData[];
}

// 관심도 랭킹 데이터 (날짜별)
export interface InterestRankData extends RankData {
  totalScore: number;
  brandClickCount: number;
  storeClickCount: number;
  usageCount: number;
}

export interface InterestRankItem {
  date: string;
  rankList: InterestRankData[];
}

export interface InterestRankResponse {
  interestRankList: InterestRankItem[];
}

// 사용량 랭킹 응답
export interface UsageRankResponse {
  rankTarget?: "BRAND" | "CATEGORY";
  usageRankList: RankData[];
}

// 로컬 랭킹 응답 (local API)
export interface LocalRankResponse {
  usageRankList: RankData[];
}

// 키워드 랭킹 응답 (keywords/daily-top, keywords/empty-top)
export interface KeywordsRankResponse {
  rankList: {
    date: string;
    rankList: RankData[];
  }[];
}

// API 요청 파라미터
export interface RankParams {
  rankTarget: "BRAND" | "CATEGORY";
  gender?: "FEMALE" | "MALE" | null;
  ageRange?: number | null;
  rank?: "NORMAL" | "PREMIUM" | "VIP" | "VVIP" | "NONE" | null;
  benefitType?: "VIP" | "LOCAL" | "NORMAL" | null;
}

// 타입별 응답 타입
export type ClickRankApiResponse = ApiResponse<ClickRankResponse>;
export type InterestRankApiResponse = ApiResponse<InterestRankResponse>;
export type UsageRankApiResponse = ApiResponse<UsageRankResponse>;
export type LocalRankApiResponse = ApiResponse<LocalRankResponse>;
