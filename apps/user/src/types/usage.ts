import { responseStatus } from "./api";

export type BenefitType = "NORMAL" | "VIP" | "LOCAL";

export interface UsageRegistRequest {
  benefitType: BenefitType;
}
export interface UsageRegistData {
  id: number;
}
export interface UsageRegistResponse extends responseStatus {
  data: UsageRegistData;
}

export interface UsageHistoryData {
  id: string;
  storeName: string;
  usedAt: string;
  category: string;
  imageUrl: string;
}

export interface UsageHistoryResponseData {
  totalCount: number;
  historyList: UsageHistoryData[];
}
export interface UsageHistoryResponse extends responseStatus {
  data: UsageHistoryResponseData;
}
