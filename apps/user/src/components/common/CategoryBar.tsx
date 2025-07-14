"use client";

import { Button } from "@workspace/ui/components/button";
import { CATEGORIES, Category } from "@/types/constants";

type CategoryBarProps = {
  selected: Category;
  onSelect: (category: Category) => void;
};

export default function CategoryBar({ selected, onSelect }: CategoryBarProps) {
  return (
    <nav className="scrollbar-hide absolute left-4 right-4 top-16 z-10 flex gap-2 overflow-x-auto whitespace-nowrap py-3">
      {CATEGORIES.map((cat) => (
        <Button
          key={cat}
          variant={selected === cat ? "filter_select" : "filter_unselect"}
          size="sm"
          onClick={() => onSelect(cat)}
        >
          {cat}
        </Button>
      ))}
    </nav>
  );
}
