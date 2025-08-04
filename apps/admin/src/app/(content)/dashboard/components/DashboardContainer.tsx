import React from "react";
import StatCards from "./StatCards";
import ChartSection from "./ChartSection";
import SearchKeywordTable from "./SearchKeywordTable";
import { StatCardData, RankItem } from "@/types/dashboard";

interface DashboardContainerProps {
  dashboardData: StatCardData;
  topUsageLocalList: RankItem[];
  topUsageRankList: RankItem[];
  topSearchKeywordList: RankItem[];
}

const DashboardContainer: React.FC<DashboardContainerProps> = ({
  dashboardData,
  topUsageLocalList,
  topUsageRankList,
  topSearchKeywordList,
}) => {
  return (
    <div className="space-y-6">
      {/* 상단 통계 카드 */}
      <StatCards dashboardData={dashboardData} />

      {/* 차트 섹션 */}
      <ChartSection topUsageLocalList={topUsageLocalList} topUsageRankList={topUsageRankList} />

      {/* 검색어 테이블 */}
      <SearchKeywordTable topSearchKeywordList={topSearchKeywordList} />
    </div>
  );
};

export default DashboardContainer;
