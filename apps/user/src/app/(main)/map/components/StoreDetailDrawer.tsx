"use client";

import { Drawer } from "vaul";
import { StoreDetail } from "@/types/store";
import { DetailCard } from "@/app/(main)/map/components/StoreCard";
import { memo, useEffect, useState } from "react";
type Props = {
  isOpen: boolean;
  onClose: () => void;
  detail: StoreDetail | null;
  snapIndex: number;
  setSnapIndex: (idx: number) => void;
};

const snapPoints = [0.65, 1];

const StoreDetailDrawer = ({ isOpen, onClose, detail, snapIndex, setSnapIndex }: Props) => {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[snapIndex]!);

  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      modal
      snapPoints={snapPoints}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-30 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 mx-auto w-full max-w-md rounded-t-2xl border border-gray-200 bg-white shadow-xl">
          <div className="mx-auto my-3 h-1 w-12 rounded-full bg-gray-300" />
          <Drawer.Title className="text-center text-base font-bold">제휴처 정보</Drawer.Title>
          {detail && (
            <div className="max-h-[75vh] overflow-y-auto p-4">
              <DetailCard data={detail} />
            </div>
          )}
          <Drawer.Description></Drawer.Description>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default memo(StoreDetailDrawer);
