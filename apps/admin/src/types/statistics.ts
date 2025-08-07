export interface StatisticsFilter {
  rankTarget: "BRAND" | "CATEGORY";
  gender: "MALE" | "FEMALE" | null;
  ageRange: AgeRangeType | null;
  rank: "NORMAL" | "PREMIUM" | "VIP" | "VVIP" | "NONE" | null;
  benefitType: "VIP" | "LOCAL" | "NORMAL" | null;
}

export type AgeRangeType = 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90;
