"use client";

import { fetchUserStatisticsDetail } from "@/service/user";
import { StaticsDetailDataResponse } from "@/types/profile";
import { useQuery } from "@tanstack/react-query";
import { BarChart3, Loader2 } from "lucide-react";
import { Fragment } from "react";
import StatisticsCharts from "./StatisticsChart";

const StatisticsDetail = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["userStatisticsDetail"] as const,
    queryFn: fetchUserStatisticsDetail,
    select: (res: StaticsDetailDataResponse) => res.data,
  });

  if (isLoading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        <span className="ml-2 text-gray-600">상세 통계 로딩 중…</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        상세 통계를 불러올 수 없습니다. 잠시 후 다시 시도해 주세요.
      </div>
    );
  }

  if (!data) {
    return <div className="text-center text-gray-500">상세 통계 데이터가 없습니다.</div>;
  }

  // 데이터가 비어있는지 확인
  const hasData =
    data.categoryRankList.length > 0 ||
    data.brandRankList.length > 0 ||
    data.monthlyBenefitUsageList.length > 0;

  return (
    <Fragment>
      {!hasData ? (
        <div className="flex h-20 flex-col items-center justify-center space-y-1 text-center">
          <p>아직 혜택을 사용하지 않으셨네요!</p>
          <p>지도에서 주변 혜택을 찾아보세요!</p>
        </div>
      ) : (
        <StatisticsCharts data={data} />
      )}
    </Fragment>
  );
};

export default StatisticsDetail;
