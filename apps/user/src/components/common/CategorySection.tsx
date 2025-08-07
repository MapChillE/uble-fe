"use client";
import CategoryBar from "@/components/common/CategoryBar";
import { Category } from "@/types/category";
interface CategorySectionProps {
  selectedCategory: Category;
  onSelectCategory: (cat: Category) => void;
}

const CategorySection = ({ selectedCategory, onSelectCategory }: CategorySectionProps) => {
  return <CategoryBar selectedCategory={selectedCategory} onSelectCategory={onSelectCategory} />;
};

export default CategorySection;
