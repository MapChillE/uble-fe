"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import useBenefitConfirmModalStore from "@/store/useBenefitConfirmModalStore";

const BenefitConfirmModal = () => {
  const { isOpen, close } = useBenefitConfirmModalStore();

  const handleNo = () => {
    close();
    // 필요시 추가 로직
  };
  const handleYes = () => {
    close();
    // 필요시 추가 로직
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="w-full max-w-xs">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            혜택을 사용하셨나요?
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-center space-x-3 pt-2">
          <Button type="button" variant="modal_cancel" onClick={handleNo}>
            아니요
          </Button>
          <Button type="button" onClick={handleYes} variant="modal_submit">
            예
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BenefitConfirmModal;
