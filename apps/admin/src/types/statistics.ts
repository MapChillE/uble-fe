export interface StatisticsFilter {
  rankTarget: "BRAND" | "CATEGORY";
  gender: "MALE" | "FEMALE";
  ageRange: AgeRangeType;
  rank: "NORMAL" | "PREMIUM" | "VIP" | "VVIP" | "NONE";
  benefitType: "VIP" | "LOCAL" | "NORMAL";
}

export type AgeRangeType = 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90;
