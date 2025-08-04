"use client";

import { Label } from "@workspace/ui/components/label";
import { RadioGroup, RadioGroupItem } from "@workspace/ui/components/radio-group";

export type BenefitCategory = null | "GIFT" | "DISCOUNT";

interface BenefitCategorySelectorProps {
  selectedCategory: BenefitCategory;
  onSelectCategory: (category: BenefitCategory) => void;
}

export default function BenefitCategorySelector({
  selectedCategory,
  onSelectCategory,
}: BenefitCategorySelectorProps) {
  const categories = [
    { value: "GIFT", label: "상품 증정" },
    { value: "DISCOUNT", label: "할인 혜택" },
  ] as const;

  const handleValueChange = (value: string) => {
    if (selectedCategory === value) {
      onSelectCategory(null);
    } else {
      onSelectCategory(value as "GIFT" | "DISCOUNT");
    }
  };

  return (
    <div className="flex gap-4">
      {categories.map((category) => (
        <div
          key={category.value}
          className="flex cursor-pointer items-center space-x-2"
          onClick={() => handleValueChange(category.value)}
        >
          <div
            className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
              selectedCategory === category.value
                ? "border-action-green bg-action-green"
                : "border-gray-300"
            }`}
          >
            {selectedCategory === category.value && (
              <div className="h-2 w-2 rounded-full bg-white"></div>
            )}
          </div>
          <Label className="cursor-pointer text-sm">{category.label}</Label>
        </div>
      ))}
    </div>
  );
}
