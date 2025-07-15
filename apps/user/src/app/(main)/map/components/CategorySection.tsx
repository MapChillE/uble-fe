"use client";
import CategoryBar from "@/components/common/CategoryBar";
import { useMapStore } from "@/store/useMapStore";

const CategorySection = () => {
  const selectedCategory = useMapStore((s) => s.selectedCategory);
  const setSelectedCategory = useMapStore((s) => s.setSelectedCategory);

  return <CategoryBar selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />;
};

export default CategorySection;
