import { responseStatus } from "./api";

export type Grade = "NONE" | "NORMAL" | "PREMIUM" | "VIP";

/**
 * 브랜드 단일 항목 타입
 */
export interface BrandContent {
  /** 브랜드 고유 ID */
  brandId: number;
  /** 브랜드 이름 */
  name: string;
  /** 브랜드 카테고리 */
  category: string;
  /** 브랜드 설명 */
  description: string;
  /** 브랜드 대표 이미지 URL */
  imgUrl: string;
  /** VIP콕 혜택이 존재하는지 여부 */
  isVIPcock: boolean;
  /** 혜택을 사용할 수 있는 최소 등급 */
  minRank: Grade;
  /** 사용자가 북마크했는지 여부 */
  isBookmarked?: boolean;
  /** 매장 ID(개인 추천 전용) */
  storeId?: number;
  /** 매장 위도(개인 추천 전용) */
  latitude?: number;
  /** 매장 경도(개인 추천 전용) */
  longitude?: number;
}

/**
 * 브랜드 목록 응답 내 데이터 타입
 */
export interface BrandListData {
  /** 현재 페이지에 포함된 브랜드 콘텐츠 배열 */
  content: BrandContent[];
  /** 다음 요청 시 더 가져올 목록이 존재하는지 여부 */
  hasNext?: boolean;
  /** 마지막으로 로드된 브랜드의 커서 ID (다음 요청 시 starting point) */
  lastCursorId?: number;
}

export interface BrandBenefit {
  benefitId: number;
  type: "NORMAL" | "VIP";
  minRank: Grade;
  content: string;
  manual: string;
  provisionCount: string;
}
export interface BrandDetailData {
  brandId: number;
  name: string;
  csrNumber: string;
  description: string;
  imgUrl: string;
  season: string;
  categoryName: string;
  bookmarkId?: number;
  benefits: BrandBenefit[];
  isBookmarked: boolean;
  isVIPcock: boolean;
}

/**
 * 제휴처 브랜드 전체 리스트 API
 */
export interface BrandListResponse extends responseStatus {
  /** 브랜드 목록 데이터 */
  data: BrandListData;
}

/**
 * 제휴처 상세 정보 API
 */
export interface BrandDetailResponse extends responseStatus {
  data: BrandDetailData;
}

/** 브랜드 목록을 가져오기 위한 파라미터 */
export interface FetchBrandsParams {
  categoryId?: number;
  season?: string;
  type?: string;
  lastBrandId?: number;
  size?: number;
}
export interface AgeRecommendData {
  ageRange: number;
  gender: "MALE" | "FEMALE";
  recommendationsList: BrandContent[];
}
export interface AgeRecommendResponse extends responseStatus {
  data: AgeRecommendData;
}

export interface TimeAndPersonalRecommendData {
  recommendationsList: BrandContent[];
}

export interface TimeRecommendResponse extends responseStatus {
  data: TimeAndPersonalRecommendData;
}

export interface PersonalRecommendResponse extends responseStatus {
  data: TimeAndPersonalRecommendData;
}
