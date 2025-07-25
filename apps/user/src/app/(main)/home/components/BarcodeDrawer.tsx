"use client";
import { Drawer } from "vaul";
import BarcodeContainer from "@/components/ui/BarcodeContainer";

interface BarcodeDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialRevealed?: boolean;
}

const BarcodeDrawer = ({ open, onOpenChange, initialRevealed = true }: BarcodeDrawerProps) => {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-30 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-md rounded-t-2xl bg-white p-6 shadow-lg">
          <Drawer.Title className="mb-4 text-lg font-bold">멤버십 바코드</Drawer.Title>
          <BarcodeContainer storeId={0} isVIPcock={false} initialRevealed={initialRevealed} />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default BarcodeDrawer;
