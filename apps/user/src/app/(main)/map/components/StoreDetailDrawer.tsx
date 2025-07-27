"use client";

import { Drawer } from "vaul";
import { StoreSummary, StoreDetail } from "@/types/store";
import { DetailCard } from "@/app/(main)/map/components/StoreCard";
import { SummaryCard } from "@/app/(main)/map/components/StoreCard";
import { memo, useEffect, useState } from "react";
import { Skeleton } from "@workspace/ui/components/skeleton";
import StoreDetailSkeleton from "./StoreDetailSkeleton";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  summary: StoreSummary | null;
  detail: StoreDetail | null;
  snapIndex: number;
  setSnapIndex: (snap: number) => void;
  onSnapChange: (snap: number | string) => void;
  isDetailLoading: boolean;
};

const snapPoints = [0.9, 1];

const StoreDetailDrawer = ({
  isOpen,
  onClose,
  summary,
  detail,
  snapIndex,
  setSnapIndex,
  onSnapChange,
  isDetailLoading,
}: Props) => {
  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
      modal
      snapPoints={snapPoints}
      activeSnapPoint={snapPoints[snapIndex as number]} // index → 실제 snapPoint 값
      setActiveSnapPoint={(snap) => {
        if (typeof snap !== "number") return;

        const newIndex = snapPoints.indexOf(snap);
        if (newIndex !== -1) {
          setSnapIndex(newIndex);
          onSnapChange(newIndex);
        }
      }}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="z-100 fixed inset-0 bg-black/40" />
        <Drawer.Content className="z-150 fixed bottom-0 left-0 right-0 mx-auto w-full max-w-md rounded-t-2xl border border-gray-200 bg-white shadow-xl">
          <div className="mx-auto my-3 h-1 w-12 rounded-full bg-gray-300" />
          <Drawer.Title className="text-center text-base font-bold"></Drawer.Title>
          {summary && (
            <div className="max-h-[75vh] overflow-y-auto p-4">
              {snapIndex === 0 ? (
                <SummaryCard data={summary} />
              ) : isDetailLoading ? (
                <StoreDetailSkeleton />
              ) : detail ? (
                <DetailCard data={detail} />
              ) : null}
            </div>
          )}
          <Drawer.Description></Drawer.Description>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default memo(StoreDetailDrawer);
