import { StoreDetail, StoreSummary } from "@/types/store";
import { Sheet } from "react-modal-sheet";
import { DetailCard, SummaryCard } from "@/app/(main)/map/components/StoreCard";

const StoreDetailSheet = ({
  isOpen,
  onClose,
  detail,
  snapIndex,
  setSnapIndex,
}: {
  isOpen: boolean;
  onClose: () => void;
  detail: StoreDetail | null;
  snapIndex: number;
  setSnapIndex: (idx: number) => void;
}) => (
  <Sheet
    isOpen={isOpen}
    onClose={onClose}
    snapPoints={[800, 380]}
    initialSnap={snapIndex}
    onSnap={setSnapIndex}
  >
    <Sheet.Container className="z-40 mx-auto max-w-md border-t border-gray-200 bg-white shadow-lg">
      <Sheet.Header className="sr-only">
        <div className="text-center font-bold">제휴처 정보</div>
      </Sheet.Header>
      <Sheet.Content className="p-0">
        <div className="flex flex-shrink-0 justify-center rounded-t-2xl bg-white py-3">
          <div className="h-1 w-12 rounded-full bg-gray-300"></div>
        </div>
        <Sheet.Scroller>{detail && <DetailCard data={detail} />}</Sheet.Scroller>
      </Sheet.Content>
    </Sheet.Container>
    <Sheet.Backdrop className="pointer-events-auto z-50" />
  </Sheet>
);

export default StoreDetailSheet;
