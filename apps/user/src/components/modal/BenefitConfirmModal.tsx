"use client";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import useBenefitConfirmModalStore from "@/store/useBenefitConfirmModalStore";
import { UsageRegistRequest } from "@/types/usage";
import { apiHandler } from "@api/apiHandler";
import { setUsage } from "@/service/usage";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const BenefitConfirmModal = () => {
  const { isOpen, close, storeId, isVIPcock, vipOnly, onSuccess } = useBenefitConfirmModalStore();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleClose = () => {
    close();
  };

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["userStatistics"] });
    queryClient.invalidateQueries({ queryKey: ["usageHistory"] });
  };
  const handleYes = async (benefitType: "NORMAL" | "VIP" = "NORMAL") => {
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

    // 필요시 추가 로직
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="z-120 w-full max-w-xs">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            혜택을 사용하시겠어요?
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-wrap justify-center space-x-3 pt-2">
          <Button type="button" variant="modal_cancel" onClick={handleClose}>
            아니요
          </Button>
          {isVIPcock && vipOnly && (
            <Button
              type="button"
              onClick={() => handleYes("VIP")}
              variant="modal_submit"
              disabled={isLoading}
            >
              VIP콕 혜택
            </Button>
          )}

          {isVIPcock && !vipOnly && (
            <>
              <Button
                type="button"
                onClick={() => handleYes("NORMAL")}
                variant="modal_submit"
                disabled={isLoading}
              >
                일반 혜택
              </Button>
              <Button
                type="button"
                onClick={() => handleYes("VIP")}
                variant="modal_submit"
                disabled={isLoading}
              >
                VIP콕 혜택
              </Button>
            </>
          )}

          {!isVIPcock && (
            <Button
              type="button"
              onClick={() => handleYes("NORMAL")}
              variant="modal_submit"
              disabled={isLoading}
            >
              일반 혜택
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BenefitConfirmModal;
