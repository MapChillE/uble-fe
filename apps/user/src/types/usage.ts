import { responseStatus } from "./api";
export interface UsageRegistReq {
  benefitType: string;
}
export interface UsageRegistData {
  id: number;
}
export interface UsageRegistRes extends responseStatus {
  data: UsageRegistData;
}
