"use client";

import { Fragment, useState } from "react";
import ChartSelector from "./ChartSelector";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import RenderChart from "./RenderChart";
import { statTypes } from "@/types/constants";
import { StatisticsFilter } from "@/types/statistics";

interface StatisticsChartContainerProps {
  params: StatisticsFilter;
}
const StatisticsChartContainer = ({ params }: StatisticsChartContainerProps) => {
  const [activeStatType, setActiveStatType] = useState("click");
  return (
    <Fragment>
      <ChartSelector activeStatType={activeStatType} setActiveStatType={setActiveStatType} />
      <Card>
        <CardHeader>
          <CardTitle className="mt-5 text-xl font-bold">
            {statTypes.find((type) => type.id === activeStatType)?.label}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <RenderChart activeStatType={activeStatType} />
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default StatisticsChartContainer;
