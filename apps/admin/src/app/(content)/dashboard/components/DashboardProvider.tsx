import React from "react";
import DashboardContainer from "./DashboardContainer";
import { StatCardData, RankItem } from "@/types/dashboard";

// 예시 데이터
const dashboardData: StatCardData = {
  mau: 17,
  lastMau: 23,
  usageCount: 59,
  lastUsageCount: 111,
  totalBrandCount: 215,
  totalStoreCount: 5641,
};

// 예시 차트 데이터
const topUsageLocalList: RankItem[] = [
  { name: "강남구", count: 7 },
  { name: "광진구", count: 1 },
];

const topUsageRankList: RankItem[] = [
  { name: "GS THE FRESH", count: 10 },
  { name: "GS25", count: 7 },
  { name: "다락", count: 4 },
  { name: "롯데시네마", count: 2 },
  { name: "쉐이크쉑", count: 1 },
];

// 예시 검색어 데이터
const topSearchKeywordList: RankItem[] = [
  { name: "바보", count: 83 },
  { name: "씨지비", count: 7 },
  { name: "GS25", count: 3 },
  { name: "중구 병원", count: 3 },
  { name: "카페", count: 3 },
  { name: "할리스 강변역점", count: 3 },
  { name: "강남 씨지비", count: 2 },
  { name: "건", count: 2 },
  { name: "건대", count: 2 },
  { name: "바", count: 2 },
];

const DashBoardProvider: React.FC = () => {
  return (
    <DashboardContainer
      dashboardData={dashboardData}
      topUsageLocalList={topUsageLocalList}
      topUsageRankList={topUsageRankList}
      topSearchKeywordList={topSearchKeywordList}
    />
  );
};

export default DashBoardProvider;
