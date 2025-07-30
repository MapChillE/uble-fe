import { CATEGORIES } from "@/types/constants";
import { StepProps } from "@/types/profile";
import { Button } from "@workspace/ui/components/button";

/** 서버에 정수 배열로 넘겨줘야 해서 key:value 쌍으로 카테고리 선언 */

const CATEGORY_KEYS = Object.keys(CATEGORIES).map(Number); // [1,2,3,4,5,6,7,8]
const SelectCategory = ({ info, setInfo }: StepProps) => {
  // categoryIds를 number[]로 변환 (profile.ts는 그대로 두고 여기서만 처리)
  const categoryIds: number[] = info.categoryIds;

  const toggleInterest = (key: number) => {
    if (categoryIds.includes(key)) {
      setInfo({ ...info, categoryIds: categoryIds.filter((id) => id !== key) });
    } else if (categoryIds.length < 3) {
      setInfo({ ...info, categoryIds: [...categoryIds, key] });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-xl font-semibold leading-tight text-gray-900">
          관심 있는 카테고리를
          <br />
          선택해 주세요
        </h1>
        <p className="text-sm font-medium text-gray-500">
          선택한 항목은 맞춤형 제휴처 추천에 활용돼요. (최대 3개)
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {CATEGORY_KEYS.map((key) => {
            const isSelected = categoryIds.includes(key);
            const isDisabled = !isSelected && categoryIds.length >= 3;

            return (
              <Button
                key={`${key}-${isSelected}`}
                onClick={() => toggleInterest(key)}
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
            <span className="text-action-green text-sm font-semibold">
              {categoryIds.length}/3개 선택됨
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectCategory;
