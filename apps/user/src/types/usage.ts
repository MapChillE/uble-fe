import { responseStatus } from "./api";

export type BenefitType = "NORMAL" | "VIP";

export interface UsageRegistReq {
  benefitType: BenefitType;
}
export interface UsageRegistData {
  id: number;
}
export interface UsageRegistRes extends responseStatus {
  data: UsageRegistData;
}
