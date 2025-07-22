"use client";
import PartnershipHeader from "./PartnershipHeader";
import PartnershipBenefitList from "./PartnershipBenefitList";
import { useQuery } from "@tanstack/react-query";
import { apiHandler } from "@api/apiHandler";
import { fetchBrandDetail } from "@/service/brand";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PartnershipContainer = ({ id }: { id: string }) => {
  const router = useRouter();

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
      router.replace("/not-found");
    }
    if (isError) {
      router.replace("/error");
    }
  }, [isLoading, data, isError, router]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#41d596] border-b-4 border-gray-200 mb-6" />
        <div className="text-lg font-semibold text-[#41d596] mb-2">잠시만 기다려 주세요</div>
        <div className="text-gray-500">제휴사 정보를 불러오고 있습니다...</div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="p-4 space-y-4">
        <PartnershipHeader {...data} />
        <PartnershipBenefitList {...data} />
      </div>
    </div>
  );
};

export default PartnershipContainer;