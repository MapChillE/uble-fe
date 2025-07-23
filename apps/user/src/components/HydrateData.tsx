"use client";
import { useEffect } from "react";
import useUserStore from "@/store/useUserStore";
import { getUserInfo } from "@/service/user";
import { apiHandler } from "@api/apiHandler";
import { useCategoryStore } from "@/store/useCategoryStore";
import { getCategories } from "@/service/category";
import { ALL_CATEGORY, ANY_CATEGORYS } from "@/types/constants";

/** 사용자 정보, 카테고리를 가져와서 store에 저장하기 위한 컴포넌트 */
const HydrateData = () => {
  const { setUser, user } = useUserStore();
  const setCategories = useCategoryStore((s) => s.setCategories);
  const setUserCategories = useCategoryStore((s) => s.setUserCategories);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiHandler(() => getUserInfo());
        setUser(data.data);
      } catch (e) {
        // alert("유저 정보를 불러오지 못했습니다. 다시 로그인해 주세요");
      }
    })();
  }, [setUser]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiHandler(() => getCategories());
        if (data && data.categoryList) {
          setCategories([
            ALL_CATEGORY,
            ...data.categoryList.map((category) => ({ ...category })),
            ...ANY_CATEGORYS,
          ]);
          setUserCategories(data.categoryList);
        }
      } catch (e) {
        // alert("카테고리 불러오기 실패");
      }
    })();
  }, []);

  return null;
};

export default HydrateData;
