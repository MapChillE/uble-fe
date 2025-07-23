"use client";
import PartnershipHeader from "./PartnershipHeader";
import PartnershipBenefitList from "./PartnershipBenefitList";
import { useQuery } from "@tanstack/react-query";
import { apiHandler } from "@api/apiHandler";
import { fetchBrandDetail } from "@/service/brand";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import UserBarcode from "@/components/common/UserBarcode";
import BarcodeContainer from "./BarcodeContainer";

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
      <div className="flex min-h-[300px] flex-col items-center justify-center py-10">
        <div className="mb-6 h-12 w-12 animate-spin rounded-full border-b-4 border-t-4 border-[#41d596] border-gray-200" />
        <div className="mb-2 text-lg font-semibold text-[#41d596]">잠시만 기다려 주세요</div>
        <div className="text-gray-500">제휴사 정보를 불러오고 있습니다...</div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4 p-4">
        <PartnershipHeader {...data} />
        <PartnershipBenefitList {...data} />
        <BarcodeContainer />
      </div>
    </div>
  );
};

export default PartnershipContainer;
