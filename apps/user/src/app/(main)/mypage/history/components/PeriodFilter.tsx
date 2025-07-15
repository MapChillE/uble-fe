import { periodOptions } from "@/types/constants";
import { Button } from "@workspace/ui/components/button";
import { Dispatch, SetStateAction } from "react";

interface PeriodFilterProps {
  period: string;
  setPeriod: Dispatch<SetStateAction<string>>;
}
const PeriodFilter = ({ period, setPeriod }: PeriodFilterProps) => {
  return (
    <div className="border-b border-gray-200 bg-white px-4 py-4">
      <div className="flex space-x-2 overflow-x-auto">
        {periodOptions.map((item) => (
          <Button
            key={item.value}
            variant={period === item.value ? "filter_select" : "filter_unselect"}
            size="sm"
            onClick={() => setPeriod(item.value)}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PeriodFilter;
