"use client";
import { useEffect } from "react";
import useUserStore from "@/store/useUserStore";
import { getUserInfo } from "@/service/user";
import { apiHandler } from "@api/apiHandler";
import { useHydrateLocation } from "@/hooks/map/useHydrateLocation";
import { useHydrateCategories } from "@/hooks/map/useHydrateCategories";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

/** 사용자 정보, 카테고리를 가져와서 store에 저장하기 위한 컴포넌트 */
const HydrateData = () => {
  const { setUser, user } = useUserStore();
  const router = useRouter();

  const sendToMain = () => {
    toast.error("유저 정보를 불러오지 못했습니다.\n다시 로그인해 주세요");
    router.replace("/");
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiHandler(() => getUserInfo());
        if (data.statusCode === 1001) {
          sendToMain();
          return;
        }
        setUser(data.data);
      } catch (e) {
        sendToMain();
      }
    })();
  }, [setUser]);

  useHydrateCategories();
  useHydrateLocation();

  return null;
};

export default HydrateData;
