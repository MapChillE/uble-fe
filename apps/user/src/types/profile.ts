import { Dispatch, SetStateAction } from "react";
import { responseStatus } from "./api";

export interface UserInfo {
  nickname?: string;
  rank: string;
  gender: "MALE" | "FEMALE";
  birthDate: string;
  categoryIds: number[];
  barcode?: string;
}

export interface UserStatistics {
  category: string;
  total: number;
}

export interface UserRole {
  role: string | null;
}

export interface InfoForm {
  rank: string;
  gender: string;
  birthDate: string;
  categoryIds: number[];
  barcode?: string;
}

export interface StepProps {
  info: InfoForm;
  setInfo: Dispatch<SetStateAction<InfoForm>>;
}

export interface SetUserInfo extends responseStatus {
  data: InfoForm;
}

export interface LogoutRes extends responseStatus {
  data: null;
}

export interface FeedbackForm {
  title: string;
  content: string;
  score: number;
}

interface FeedbackId {
  feedbackId: number;
}
export interface FeedbackRegistRes extends responseStatus {
  data: FeedbackId;
}

/** 사용자가 가장 많이 사용한 카테고리 */
export interface CategoryStatistics {
  categoryName: string;
  usageCount: number;
}

/** 사용자가 가장 많이 사용한 브랜드 */
export interface BrandStatistics {
  brandName: string;
  usageCount: number;
}

/** 사용자가 가장 많이 혜택을 사용한 날짜 요일, 시간 (null 허용) */
export interface UsagePatternStatistics {
  mostUsedDay: string | null;
  mostUsedWeekday: string | null;
  mostUsedTime: string | null;
}
/** 사용자가 전체 사용자중 몇% 정도의 혜택을 사용하는지 통계 */
export interface UsageComparisonStatistics {
  averageUsageCount: number;
  userUsageCount: number;
  averageDiffPercent: number;
}

/** 사용자가 가장 많은 혜택을 사용한 년 월 그리고 횟수 */
export interface UsageMonthlyStatistics {
  year: number;
  month: number;
  usageCount: number;
}

export interface StaticsDetailData {
  /** 사용자가 가장 많이 사용한 카테고리 */
  categoryRankList: CategoryStatistics[];
  /** 사용자가 가장 많이 사용한 브랜드 */
  brandRankList: BrandStatistics[];
  /** 사용자가 가장 많이 혜택을 사용한 날짜 요일, 시간 */
  benefitUsagePattern: UsagePatternStatistics;
  /** 사용자가 전체 사용자중 몇% 정도의 혜택을 사용하는지 통계 */
  benefitUsageComparison: UsageComparisonStatistics;
  /** 사용자가 가장 많은 혜택을 사용한 년 월 그리고 횟수 */
  monthlyBenefitUsageList: UsageMonthlyStatistics[];
}

export interface StaticsDetailDataResponse extends responseStatus {
  data: StaticsDetailData;
}

export interface StaticsPreviewData {
  mostUsedCategoryName: string | null;
  mostUsedBrandName: string | null;
  monthlyUsedCount: number;
}

export interface StaticsPreviewResponse extends responseStatus {
  data: StaticsPreviewData;
}
