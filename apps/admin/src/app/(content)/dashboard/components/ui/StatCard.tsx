import React from "react";
import { Card, CardContent } from "@workspace/ui/components/card";
import { cn } from "@workspace/ui/lib/utils";
import { LucideIcon } from "lucide-react";

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

const calculateChange = (current: number, previous: number) => {
  if (previous === 0) return { value: 0, percentage: 0, isPositive: true };

  const change = current - previous;
  const percentage = Math.round((change / previous) * 100);

  return {
    value: Math.abs(change),
    percentage: Math.abs(percentage),
    isPositive: change >= 0,
  };
};

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: number;
  previousValue?: number;
  subtitle?: string;
  color: "green" | "orange" | "purple" | "blue" | "red";
  showChange?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  title,
  value,
  previousValue,
  subtitle,
  color,
  showChange = false,
}) => {
  /**변화율 계산 후 변화율 표시용 변수*/
  const change = previousValue !== undefined ? calculateChange(value, previousValue) : null;

  return (
    <Card className={cn("border-l-4", `border-${color}-500`)}>
      <CardContent className="p-4 md:p-6">
        <div className="mb-2 flex items-center justify-between">
          <Icon className={cn("h-8 w-8", `text-${color}-600`)} />
          <span className="text-xs text-gray-500">{subtitle}</span>
        </div>
        <div>
          <p className="mb-1 text-sm font-medium text-gray-600">{title}</p>
          <p className={cn("text-2xl font-bold md:text-4xl", `text-${color}-600`)}>
            {formatNumber(value)}
          </p>
          {showChange && change && (
            <div className="mt-2 flex items-center">
              <span
                className={cn(
                  "rounded-full px-2 py-1 text-xs",
                  change.isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                )}
              >
                {change.isPositive ? "+" : "-"}
                {formatNumber(change.value)} ({change.percentage}%)
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
