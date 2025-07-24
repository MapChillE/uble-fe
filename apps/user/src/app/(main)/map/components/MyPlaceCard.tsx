import { Pencil, Star, Trash2 } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { deleteMyPlace } from "@/service/map";
import { useMapStore } from "@/store/useMapStore";
import { toast } from "sonner";
import useConfirmModalStore from "@/store/useConfirmModalStore";

interface MyPlaceCardProps {
  placeId: number;
  name: string;
  address?: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function MyPlaceCard({
  placeId,
  name,
  address,
  selected = false,
  onClick,
}: MyPlaceCardProps) {
  const removeMyPlace = useMapStore((s) => s.removeMyPlace);

  // TODO: 내 장소명 변경
  const handleEditName = () => {};

  // TODO: 내 장소 주소값 변경
  const handleEditAddress = () => {};

  // 내 장소 삭제
  const handleDelete = () => {
    const { open } = useConfirmModalStore.getState();

    open({
      message: "장소를 삭제하시겠어요?",
      confirmText: "삭제",
      cancelText: "취소",
      onConfirm: async () => {
        try {
          await deleteMyPlace(placeId);
          removeMyPlace(placeId); // zustand store에서 제거
          toast.success("삭제되었습니다.");
        } catch {
          toast.error("장소 삭제에 실패했습니다.");
        }
      },
    });
  };

  return (
    <div
      className={`mb-2 flex items-center gap-3 rounded-lg py-3 pl-4 pr-2 ${
        selected ? "border border-green-300 bg-green-50" : "bg-gray-50"
      }`}
      onClick={onClick}
    >
      {address ? (
        <Star className="h-5 w-5 text-yellow-500" />
      ) : (
        <Star className="h-5 w-5 text-gray-300" />
      )}
      {/* 장소명 + 주소 */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center gap-1">
          <span className="font-semibold">{name}</span>
        </div>
        {address ? (
          <div className="text-xs text-gray-500">{address}</div>
        ) : (
          <div
            className="text-xs text-blue-500 underline"
            onClick={(e) => {
              e.stopPropagation();
              handleEditAddress();
            }}
          >
            주소 등록하기
          </div>
        )}
      </div>
      {/* 수정/삭제 아이콘 */}
      <div className="ml-2">
        <Button
          variant="none"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            handleEditName();
          }}
        >
          <Pencil className="h-4 w-4 text-gray-400 hover:text-gray-600" />
        </Button>
        <Button
          variant="none"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        >
          <Trash2 className="text-gray-400 hover:text-red-500" />
        </Button>
      </div>
    </div>
  );
}
