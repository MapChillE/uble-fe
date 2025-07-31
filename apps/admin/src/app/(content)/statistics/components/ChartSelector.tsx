import { statTypes } from "@/types/constants";
import { Badge } from "@workspace/ui/components/badge";
import React from "react";

interface ChartSelectorProps {
  activeStatType: string;
  setActiveStatType: React.Dispatch<React.SetStateAction<string>>;
}
const ChartSelector = ({ activeStatType, setActiveStatType }: ChartSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
      {statTypes.map((type) => (
        <Badge
          key={type.id}
          variant={activeStatType === type.id ? "default" : "outline"}
          className="cursor-pointer whitespace-nowrap px-3 py-1"
          onClick={() => setActiveStatType(type.id)}
        >
          {type.label}
        </Badge>
      ))}
    </div>
  );
};

export default ChartSelector;
