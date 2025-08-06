"use client";
import PartnershipHeader from "./PartnershipHeader";
import PartnershipBenefitList from "./PartnershipBenefitList";
import { useQuery } from "@tanstack/react-query";
import { apiHandler } from "@api/apiHandler";
import { fetchBrandDetail } from "@/service/brand";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useUserStore from "@/store/useUserStore";

const PartnershipContainer = ({ id }: { id: string }) => {
  const router = useRouter();
  const user = useUserStore((s) => s.user);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["brandDetail", id],
    queryFn: async () => {
      const { data: res } = await apiHandler(() => fetchBrandDetail(id));
      return res?.data ?? null;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (!isLoading && !data) {
      if (!user) {
        router.replace("/");
        return;
      } else router.replace("/not-found");
    }
    if (isError) {
      router.replace("/error");
      return;
    }
  }, [isLoading, data, isError, router, user]);

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100dvh-159px)] flex-col items-center justify-center py-10">
        <div className="border-action-green mb-6 h-12 w-12 animate-spin rounded-full border-b-4 border-t-4 border-gray-200" />
        <div className="text-action-green mb-2 text-lg font-semibold">잠시만 기다려 주세요</div>
        <div className="text-gray-500">제휴사 정보를 불러오고 있습니다...</div>
      </div>
    );
  }

  if (!data || !user) {
    return null;
  }

  return (
    <div className="min-h-[calc(100dvh-159px)] space-y-4">
      <div className="space-y-4 p-4">
        <PartnershipHeader {...data} />
        <PartnershipBenefitList {...data} />
      </div>
    </div>
  );
};

export default PartnershipContainer;
