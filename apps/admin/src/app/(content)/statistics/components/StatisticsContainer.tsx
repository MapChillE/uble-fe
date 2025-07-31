"use client";
import { useState } from "react";
import { StatisticsFilter as StatisticsType } from "@/types/statistics";
import StatisticsFilter from "./StatisticsFilter";
import StatisticsChartContainer from "./StatisticsChartContainer";

const StatisticsContainer = () => {
  const [filters, setFilters] = useState<StatisticsType>({
    rankTarget: "BRAND",
    gender: "MALE",
    ageRange: 10,
    rank: "NONE",
    benefitType: "NORMAL",
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">통계 조회</h2>
        <p className="mt-2 text-sm text-gray-600 md:text-base">다양한 조건으로 통계를 확인하세요</p>
      </div>
      {/* 필터 섹션 */}
      <StatisticsFilter filters={filters} setFilters={setFilters} />
      {/* 통계 타입 선택, 차트 출력 */}
      <StatisticsChartContainer params={filters} />
    </div>
  );
};

export default StatisticsContainer;
