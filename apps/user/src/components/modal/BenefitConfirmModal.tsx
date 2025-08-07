"use client";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import useBenefitConfirmModalStore from "@/store/useBenefitConfirmModalStore";
import { UsageRegistRequest } from "@/types/usage";
import { apiHandler } from "@api/apiHandler";
import { setUsage } from "@/service/usage";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const BenefitConfirmModal = () => {
  const { isOpen, close, storeId, storeDetail, onSuccess } = useBenefitConfirmModalStore();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleClose = () => {
    close();
  };

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["userStatistics"] });
    queryClient.invalidateQueries({ queryKey: ["usageHistory"] });
  };

  const handleYes = async (benefitType: "NORMAL" | "VIP" | "LOCAL" = "NORMAL") => {
    if (storeId !== null) {
      setIsLoading(true);
      const params: UsageRegistRequest = { benefitType };
      const { data } = await apiHandler(() => setUsage(storeId, params));
      setIsLoading(false);
      handleClose();
      if (data?.statusCode === 0) {
        invalidate();
        toast.info("사용 완료 되었습니다.");
        if (onSuccess) onSuccess();
      } else if (data?.statusCode === 2001) {
        toast.warning("해당 제휴처의 사용 가능 횟수를 초과했습니다.");
      } else {
        toast.error("사용 중 오류가 발생했습니다.");
      }
    } else {
      toast.error("네트워크 오류가 발생했습니다.");
    }
  };

  // 혜택 타입별 상태 확인
  const getBenefitTypeStatus = () => {
    if (!storeDetail) return [];

    const benefitTypes = ["NORMAL", "VIP", "LOCAL"] as const;
    const status = [];

    for (const type of benefitTypes) {
      const hasBenefit = storeDetail.benefitList.some((benefit) => benefit.type === type);
      if (hasBenefit) {
        const isAvailable =
          (type === "NORMAL" && storeDetail.normalAvailable) ||
          (type === "VIP" && storeDetail.vipAvailable) ||
          (type === "LOCAL" && storeDetail.localAvailable);

        status.push({
          type,
          available: isAvailable,
          disabled: !isAvailable,
        });
      }
    }

    return status;
  };

  const benefitStatus = getBenefitTypeStatus();

  const getButtonText = (type: string) => {
    switch (type) {
      case "NORMAL":
        return "일반 혜택";
      case "VIP":
        return "VIP콕";
      case "LOCAL":
        return "우리동네";
      default:
        return "혜택 사용";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="z-120 w-[250px]">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            혜택을 사용하시겠어요?
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-center gap-2 pt-2">
          {benefitStatus.map(({ type, disabled }) => (
            <Button
              key={type}
              type="button"
              onClick={() => handleYes(type)}
              variant="modal_submit"
              disabled={isLoading || disabled}
              className="mx-auto w-full max-w-[200px]"
            >
              {getButtonText(type)}
            </Button>
          ))}
          <Button
            type="button"
            variant="modal_cancel"
            onClick={handleClose}
            className="mx-auto w-full max-w-[200px]"
          >
            아니요
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BenefitConfirmModal;
