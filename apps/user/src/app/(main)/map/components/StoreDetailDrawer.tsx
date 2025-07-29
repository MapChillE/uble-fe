"use client";

import { Drawer } from "vaul";
import { DetailCard } from "@/app/(main)/map/components/StoreCard";
import { SummaryCard } from "@/app/(main)/map/components/StoreCard";
import { memo } from "react";
import StoreDetailSkeleton from "./StoreDetailSkeleton";
import useStoreDetailDrawerStore from "@/store/useStoreDetailDrawerStore";
import { useLocationStore } from "@/store/useLocationStore";
import { DEFAULT_LOCATION } from "@/types/constants";

interface StoreDetailDrawerProps {
  trigger?: React.ReactNode;
}

const snapPoints = [0.9, 1];

const StoreDetailDrawer = ({ trigger }: StoreDetailDrawerProps) => {
  const isOpen = useStoreDetailDrawerStore((s) => s.isOpen);
  const summary = useStoreDetailDrawerStore((s) => s.summary);
  const detail = useStoreDetailDrawerStore((s) => s.detail);
  const snapIndex = useStoreDetailDrawerStore((s) => s.snapIndex);
  const isDetailLoading = useStoreDetailDrawerStore((s) => s.isDetailLoading);
  const close = useStoreDetailDrawerStore((s) => s.close);
  const setSnapIndex = useStoreDetailDrawerStore((s) => s.setSnapIndex);
  const loadDetail = useStoreDetailDrawerStore((s) => s.loadDetail);

  const baseLocation = useLocationStore((s) => s.baseLocation);

  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          close();
        }
      }}
      modal
      snapPoints={snapPoints}
      activeSnapPoint={snapPoints[snapIndex] as number}
      setActiveSnapPoint={(snap) => {
        if (typeof snap !== "number") return;

        const newIndex = snapPoints.indexOf(snap);
        if (newIndex !== -1) {
          setSnapIndex(newIndex);
          loadDetail(baseLocation ?? DEFAULT_LOCATION);
        }
      }}
    >
      {trigger && <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>}
      <Drawer.Portal>
        <Drawer.Overlay className="z-80 fixed inset-0 bg-black/40" />
        <Drawer.Content className="z-100 fixed bottom-0 left-0 right-0 mx-auto w-full max-w-md rounded-t-2xl border border-gray-200 bg-white shadow-xl">
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
