"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import useBenefitConfirmModalStore from "@/store/useBenefitConfirmModalStore";
import { UsageRegistReq } from "@/types/usage";
import { apiHandler } from "@api/apiHandler";
import { setUsage } from "@/service/usage";
import { toast } from "sonner";
import { useState } from "react";

const BenefitConfirmModal = () => {
  const { isOpen, close, storeId, isVIPcock, resetInfo } = useBenefitConfirmModalStore();
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = () => {
    close();
    resetInfo();
  };

  const handleYes = async (benefitType: "NORMAL" | "VIP" = "NORMAL") => {
    if (storeId !== null) {
      setIsLoading(true);
      const params: UsageRegistReq = { benefitType };
      const { data } = await apiHandler(() => setUsage(storeId, params));
      setIsLoading(false);
      if (data?.statusCode === 0) {
        toast.info("사용 완료 되었습니다.");
      } else if (data?.statusCode === 2001) {
        toast.warning("해당 제휴처의 사용 가능 횟수를 초과했습니다.");
      } else {
        toast.error("사용 중 오류가 발생했습니다.");
      }
    } else {
      toast.error("네트워크 오류가 발생했습니다.");
    }
    handleClose();
    // 필요시 추가 로직
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-full max-w-xs">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            혜택을 사용하시겠어요?
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-center space-x-3 pt-2">
          <Button type="button" variant="modal_cancel" onClick={handleClose}>
            아니요
          </Button>
          <Button
            type="button"
            onClick={() => handleYes("NORMAL")}
            variant="modal_submit"
            disabled={isLoading}
          >
            일반 혜택
          </Button>
          {isVIPcock && (
            <Button
              type="button"
              onClick={() => handleYes("VIP")}
              variant="modal_submit"
              disabled={isLoading}
            >
              VIP콕 혜택
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BenefitConfirmModal;
