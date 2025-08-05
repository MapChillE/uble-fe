import { ResponseStatus } from "./responseStatus";

// 랭킹 아이템 기본 타입
export interface RankItem {
  name: string;
  count: number;
}

// 대시보드 메인 데이터 타입
export interface DashboardData {
  // 통계 카드 데이터
  mau: number;
  lastMau: number;
  usageCount: number;
  lastUsageCount: number;
  totalBrandCount: number;
  totalStoreCount: number;

  // 랭킹 리스트 데이터
  topUsageRankList: RankItem[];
  topUsageLocalList: RankItem[];
  topSearchKeywordList: RankItem[];
}

// 대시보드 API 응답 타입
export interface DashboardResponse extends ResponseStatus {
  data: DashboardData;
}

// 통계 카드용 데이터 타입 (StatCard 컴포넌트에서 사용)
export interface StatCardData {
  mau: number;
  lastMau: number;
  usageCount: number;
  lastUsageCount: number;
  totalBrandCount: number;
  totalStoreCount: number;
}
