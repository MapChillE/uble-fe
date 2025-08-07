import { useEffect } from "react";
import { useCategoryStore } from "@/store/useCategoryStore";
import { apiHandler } from "@api/apiHandler";
import { getCategories } from "@/service/category";
import { ALL_CATEGORY, ANY_CATEGORIES } from "@/types/constants";
import { toast } from "sonner";
import { Category } from "@/types/category";

/** 카테고리 우선순위 정렬 함수 */
const sortCategoriesByPriority = (categories: Category[]): Category[] => {
  /** 우선순위 카테고리 배열 */
  const priorityOrder = ["카페", "식당", "편의점", "영화관", "쇼핑"];
  const sortedCategories: Category[] = [];
  const remainingCategories: Category[] = [];

  priorityOrder.forEach((categoryName) => {
    const category = categories.find((cat) => cat.categoryName === categoryName);
    if (category) {
      sortedCategories.push(category);
    }
  });

  categories.forEach((category) => {
    if (!priorityOrder.includes(category.categoryName)) {
      remainingCategories.push(category);
    }
  });

  return [...sortedCategories, ...remainingCategories];
};

export const useHydrateCategories = () => {
  const categories = useCategoryStore((s) => s.categories);
  const setCategories = useCategoryStore((s) => s.setCategories);
  const setUserCategories = useCategoryStore((s) => s.setUserCategories);

  useEffect(() => {
    if (categories.length === 0) {
      const fetchCategories = async () => {
        const { data, error } = await apiHandler(() => getCategories());
        if (error) {
          toast.error("카테고리를 불러오지 못했습니다.");
        }
        if (data?.categoryList) {
          // 카테고리를 우선순위 순서로 정렬
          const sortedCategories = sortCategoriesByPriority(data.categoryList);

          setUserCategories(sortedCategories);
          setCategories([
            ALL_CATEGORY,
            ...sortedCategories.map((category) => ({ ...category })),
            ...ANY_CATEGORIES,
          ]);
        }
      };

      fetchCategories();
    }
  }, [categories, setCategories, setUserCategories]);
};
