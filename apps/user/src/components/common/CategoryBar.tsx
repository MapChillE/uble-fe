"use client";

import { Button } from "@workspace/ui/components/button";
import { CATEGORIES } from "@/types/constants";
import { useMapStore } from "@/store/useMapStore";

export default function CategoryBar() {
  const { selectedCategory, setSelectedCategory } = useMapStore();

  return (
    <nav className="scrollbar-hide absolute left-4 right-4 top-16 z-10 flex gap-2 overflow-x-auto whitespace-nowrap py-3">
      {/* TODO:  추후 백엔드에서 받아온 CATEGORIES로 사용 */}
      {CATEGORIES.map((cat) => (
        <Button
          key={cat}
          variant={selectedCategory === cat ? "filter_select" : "filter_unselect"}
          size="sm"
          onClick={() => setSelectedCategory(cat)}
        >
          {cat}
        </Button>
      ))}
    </nav>
  );
}
