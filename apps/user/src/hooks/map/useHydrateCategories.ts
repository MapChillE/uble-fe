import { useEffect } from "react";
import { useCategoryStore } from "@/store/useCategoryStore";
import { apiHandler } from "@api/apiHandler";
import { getCategories } from "@/service/category";
import { ALL_CATEGORY, ANY_CATEGORIES } from "@/types/constants";

export const useHydrateCategories = () => {
  const categories = useCategoryStore((s) => s.categories);
  const setCategories = useCategoryStore((s) => s.setCategories);
  const setUserCategories = useCategoryStore((s) => s.setUserCategories);

  useEffect(() => {
    if (categories.length === 0) {
      const fetchCategories = async () => {
        const { data, error } = await apiHandler(() => getCategories());
        if (error) {
          console.log("카테고리 로딩 실패: ", error);
          // TODO: 에러 상태 관리 또는 토스트 알림 추가
        }
        if (data?.categoryList) {
          setUserCategories(data.categoryList);
          setCategories([
            ALL_CATEGORY,
            ...data.categoryList.map((category) => ({ ...category })),
            ...ANY_CATEGORIES,
          ]);
        }
      };

      fetchCategories();
    }
  }, [categories, setCategories, setUserCategories]);
};
