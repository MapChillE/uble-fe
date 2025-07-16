"use client";

import { Button } from "@workspace/ui/components/button";
import { Category } from "@/types/category";
import { memo } from "react";
import { useCategoryStore } from "@/store/useCategoryStore";

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
    <nav className="scrollbar-hide absolute left-4 right-4 top-16 z-10 flex gap-2 overflow-x-auto whitespace-nowrap py-3">
      {categories.map((cat) => (
        <Button
          key={cat.categoryId}
          variant={
            selectedCategory.categoryId === cat.categoryId ? "filter_select" : "filter_unselect"
          }
          size="sm"
          onClick={() => onSelectCategory(cat)}
        >
          {cat.categoryName}
        </Button>
      ))}
    </nav>
  );
};

export default memo(CategoryBar);
