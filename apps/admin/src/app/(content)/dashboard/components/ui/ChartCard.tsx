import React, { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  fixedHeight?: boolean;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, children, fixedHeight = true }) => {
  return (
    <Card className="border-gray-200 pb-4 pt-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={fixedHeight ? "h-64 md:h-80" : ""}>{children}</div>
      </CardContent>
    </Card>
  );
};

export default memo(ChartCard);
