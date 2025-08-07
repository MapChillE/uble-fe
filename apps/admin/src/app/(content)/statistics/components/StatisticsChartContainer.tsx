"use client";

import { Fragment, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ChartSelector from "./ChartSelector";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import RenderChart from "./RenderChart";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import { statTypes } from "@/types/constants";
import { StatisticsFilter } from "@/types/statistics";
import { fetchStatistics } from "@/service/statistics";

interface StatisticsChartContainerProps {
  params: StatisticsFilter;
}

const StatisticsChartContainer = ({ params }: StatisticsChartContainerProps) => {
  const [activeStatType, setActiveStatType] = useState("click");

  const {
    data: statisticsData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["statistics", activeStatType, params],
    queryFn: () => fetchStatistics({ params, reqUrl: activeStatType }),
    enabled: !!activeStatType, // activeStatType이 있을 때만 쿼리 실행
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // 로딩 상태 처리
  if (isLoading) {
    return <LoadingState activeStatType={activeStatType} setActiveStatType={setActiveStatType} />;
  }

  // 에러 상태 처리
  if (error) {
    return (
      <ErrorState
        activeStatType={activeStatType}
        setActiveStatType={setActiveStatType}
        onRetry={refetch}
      />
    );
  }

  return (
    <Fragment>
      <ChartSelector activeStatType={activeStatType} setActiveStatType={setActiveStatType} />
      <Card className="border-none">
        <CardHeader>
          <CardTitle className="mt-5 text-xl font-bold">
            {statTypes.find((type) => type.id === activeStatType)?.label}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <RenderChart activeStatType={activeStatType} data={statisticsData?.data} />
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default StatisticsChartContainer;
