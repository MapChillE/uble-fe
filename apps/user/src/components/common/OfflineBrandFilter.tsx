"use client";

import { Button } from "@workspace/ui/components/button";
import { Filter } from "lucide-react";

interface OfflineBrandFilterProps {
  isSelected: boolean;
  onSelect: () => void;
  selectedBrandName?: string | null;
}

export default function OfflineBrandFilter({
  isSelected,
  onSelect,
  selectedBrandName,
}: OfflineBrandFilterProps) {
  return (
    <div className="px-0 py-0">
      <Button
        variant={isSelected ? "category_selected" : "category_unselected"}
        size="sm"
        onClick={onSelect}
        className="flex items-center gap-2"
      >
        <Filter className="h-4 w-4" />
        {/* TODO: 필터링 아이콘 옆 설명 추가 or X */}
        {/* <span></span> */}
        {selectedBrandName && (
          <span className="text-action-green ml-1 rounded-full bg-white/30 px-1.5 py-0.5 text-xs">
            {selectedBrandName}
          </span>
        )}
      </Button>
    </div>
  );
}
