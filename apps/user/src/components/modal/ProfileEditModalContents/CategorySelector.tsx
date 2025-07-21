import { Button } from "@workspace/ui/components/button";
import { Label } from "@workspace/ui/components/label";
import { CATEGORIES } from "@/types/constants";

interface CategorySelectorProps {
  categoryIds: number[];
  onChange: (ids: number[]) => void;
}

const CategorySelector = ({ categoryIds, onChange }: CategorySelectorProps) => {
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
      <Label className="text-sm font-medium">관심 분야</Label>
      <div className="grid grid-cols-2 gap-2">
        {CATEGORIES.map((cat) => {
          const isSelected = categoryIds.includes(cat.categoryId);
          const isDisabled = !isSelected && categoryIds.length >= 3;
          return (
            <Button
              key={cat.categoryId}
              onClick={() => toggleCategory(cat.categoryId)}
              disabled={isDisabled}
              variant={isSelected ? "onb_selected" : "onb_unselected"}
            >
              {cat.categoryName}
            </Button>
          );
        })}
      </div>
      {categoryIds.length > 0 && (
        <div className="text-center">
          <span className="text-xs text-action-green font-medium">{categoryIds.length}/3개 선택됨</span>
        </div>
      )}
    </div>
  );
};

export default CategorySelector; 