import { useEffect } from "react";
import { useCategoryStore } from "@/store/useCategoryStore";
import { apiHandler } from "@api/apiHandler";
import { getCategories } from "@/service/category";
import { ALL_CATEGORY, ANY_CATEGORIES } from "@/types/constants";
import { toast } from "sonner";

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
