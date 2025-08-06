"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import useConfirmModalStore from "@/store/useConfirmModalStore";
import { useState } from "react";

const ConfirmModal = () => {
  const { isOpen, message, confirmText, cancelText, onConfirm, close } = useConfirmModalStore();

  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (!onConfirm) return close();
    try {
      setIsLoading(true);
      await onConfirm();
    } finally {
      setIsLoading(false);
      close();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="w-full max-w-xs">
        <DialogHeader>
          <DialogTitle className="whitespace-pre-line text-center text-lg font-semibold">
            {message}
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-center space-x-3 pt-2">
          <Button variant="modal_submit" onClick={close}>
            {cancelText}
          </Button>
          <Button variant="modal_cancel" onClick={handleConfirm} disabled={isLoading}>
            {confirmText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;
