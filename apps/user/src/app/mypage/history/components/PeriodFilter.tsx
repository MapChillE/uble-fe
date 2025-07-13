import { periodOptions } from '@/types/constants';
import { Button } from '@workspace/ui/components/button';
import React, { Dispatch, SetStateAction } from 'react';

interface PeriodFilterProps {
  period: string;
  setPeriod: Dispatch<SetStateAction<string>>;
}
const PeriodFilter = ({ period, setPeriod }: PeriodFilterProps) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-4">
      <div className="flex space-x-2 overflow-x-auto">
        {periodOptions.map((item) => (
          <Button
            key={item.value}
            variant={period === item.value ? "default" : "outline"}
            size="sm"
            onClick={() => setPeriod(item.value)}
            className={`whitespace-nowrap ${period === item.value ? "bg-[#41d596] hover:bg-[#41d596]/90" : "hover:bg-gray-50"
              }`}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PeriodFilter;