import { responseStatus } from "./api";

export type BenefitType = "NORMAL" | "VIP";

export interface UsageRegistRequest {
  benefitType: BenefitType;
}
export interface UsageRegistData {
  id: number;
}
export interface UsageRegistResponse extends responseStatus {
  data: UsageRegistData;
}
