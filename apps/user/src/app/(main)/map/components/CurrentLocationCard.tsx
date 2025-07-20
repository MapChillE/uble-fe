import { MapPin } from "lucide-react";

interface CurrentLocationCardProps {
  address?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function CurrentLocationCard({
  address,
  isSelected,
  onClick,
}: CurrentLocationCardProps) {
  return (
    <div
      className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 ${
        isSelected ? "border-green-300 bg-green-50" : "border-gray-200 bg-white"
      }`}
      onClick={onClick}
    >
      <MapPin className="h-6 w-6 text-blue-500" />
      <div className="flex-1">
        <div className="font-semibold">현재 위치</div>
        <div className="text-xs text-gray-500">{address || "GPS로 찾은 내 위치"}</div>
      </div>
      {isSelected && <span className="h-2 w-2 rounded-full bg-green-400" />}
    </div>
  );
}
