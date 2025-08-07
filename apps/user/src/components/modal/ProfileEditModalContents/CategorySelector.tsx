import { Button } from "@workspace/ui/components/button";
import { Label } from "@workspace/ui/components/label";
import { CATEGORIES } from "@/types/constants";

interface CategorySelectorProps {
  categoryIds: number[];
  onChange: (ids: number[]) => void;
}
const CategorySelector = ({ categoryIds, onChange }: CategorySelectorProps) => {
  const CATEGORY_KEYS = Object.keys(CATEGORIES).map(Number);
  const toggleCategory = (categoryId: number) => {
    const exists = categoryIds.includes(categoryId);
    if (exists) {
      onChange(categoryIds.filter((id) => id !== categoryId));
    } else if (categoryIds.length < 3) {
      onChange([...categoryIds, categoryId]);
    }
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">관심 카테고리</Label>
      <div className="grid grid-cols-3 gap-2">
        {CATEGORY_KEYS.map((key) => {
          const isSelected = categoryIds.includes(key);
          const isDisabled = !isSelected && categoryIds.length >= 3;

          return (
            <Button
              key={`${key}-${isSelected}`}
              onClick={() => toggleCategory(key)}
              disabled={isDisabled}
              variant={isSelected ? "onb_selected" : "onb_unselected"}
              className={isSelected ? "" : "hover:bg-gray-100 hover:text-gray-600"}
            >
              <span className="text-sm font-semibold">
                {CATEGORIES[key as keyof typeof CATEGORIES]}
              </span>
            </Button>
          );
        })}
      </div>
      {categoryIds.length > 0 && (
        <div className="text-center">
          <span className="text-action-green text-xs font-medium">
            {categoryIds.length}/3개 선택됨
          </span>
        </div>
      )}
    </div>
  );
};

export default CategorySelector;
