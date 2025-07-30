"use client";

import { Button } from "@workspace/ui/components/button";
import { Category } from "@/types/category";
import { memo } from "react";
import { useCategoryStore } from "@/store/useCategoryStore";
import { getCategoryIconStyle } from "@/constants/categoryMarkerStyle";

interface CategoryBarProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

const CategoryBar = ({ selectedCategory, onSelectCategory }: CategoryBarProps) => {
  const { categories } = useCategoryStore();

  if (!categories || categories.length === 0) {
    // TODO: 데이터가 없을 때 Skeleton UI 또는 null 반환
    return null;
  }

  return (
    <nav className="scrollbar-hide flex gap-2 overflow-x-auto overflow-y-hidden whitespace-nowrap py-3">
      {categories.map((cat) => {
        const iconStyle = getCategoryIconStyle(cat.categoryName);
        const isSelected = selectedCategory.categoryId === cat.categoryId;

        return (
          <Button
            key={cat.categoryId}
            variant={isSelected ? "filter_select" : "filter_unselect"}
            size="sm"
            onClick={() => onSelectCategory(cat)}
            className="flex items-center gap-2"
          >
            {cat.categoryId !== 0 && <div className={iconStyle.color}>{iconStyle.icon()}</div>}
            <span>{cat.categoryName}</span>
          </Button>
        );
      })}
    </nav>
  );
};

export default memo(CategoryBar);
