"use client";
import DashboardContainer from "./DashboardContainer";
import DashboardSkeleton from "./ui/DashboardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "@/service/dashboard";

const DashBoardProvider: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => fetchDashboardData(),
  });

  // 로딩 상태일 때 스켈레톤 UI 표시
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  // 에러 상태일 때 에러 메시지 표시
  if (error) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold text-red-600">데이터를 불러오는데 실패했습니다.</p>
          <p className="text-gray-600">잠시 후 다시 시도해 주세요.</p>
        </div>
      </div>
    );
  }

  // 데이터가 없을 때
  if (!data?.data) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-600">데이터가 없습니다.</p>
        </div>
      </div>
    );
  }

  const {
    mau,
    lastMau,
    usageCount,
    lastUsageCount,
    totalBrandCount,
    totalStoreCount,
    topUsageRankList,
    topUsageLocalList,
    topSearchKeywordList,
  } = data.data;

  // StatCardData 형태로 변환
  const dashboardData = {
    mau,
    lastMau,
    usageCount,
    lastUsageCount,
    totalBrandCount,
    totalStoreCount,
  };

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
